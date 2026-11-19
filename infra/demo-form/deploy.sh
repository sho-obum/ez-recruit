#!/usr/bin/env bash
# Creates the Book a demo backend in AWS (ap-south-1): Lambda + HTTP API + SES permission, same pattern as ezunihire-contact-form.
# Usage: AWS_PROFILE=deeptalent TO_ADDRESSES=support@ezrecruit.ai bash infra/demo-form/deploy.sh
# Re-run with UPDATE=1 to only push new code and settings.
set -euo pipefail
cd "$(dirname "$0")"
R=ap-south-1; ACCT=$(aws sts get-caller-identity --query Account --output text)
FN=ezrecruit-demo-form; ROLE=ezrecruit-demo-form-role; API_NAME=ezrecruit-demo-api
TO=${TO_ADDRESSES:-support@ezrecruit.ai}
ORIGINS='["https://ezrecruit.ai","https://www.ezrecruit.ai","https://ez-recruit-eight.vercel.app","http://localhost:4370"]'

rm -f code.zip
powershell -NoProfile -Command "Compress-Archive -Force -Path index.mjs,template.mjs -DestinationPath code.zip"

if [ "${UPDATE:-}" = "1" ]; then
  aws lambda update-function-code --function-name $FN --zip-file fileb://code.zip --region $R --output text --query FunctionArn
  aws lambda wait function-updated --function-name $FN --region $R
  aws lambda update-function-configuration --function-name $FN --region $R --environment "Variables={TO_ADDRESSES=$TO}" --output text --query FunctionArn
  exit 0
fi

aws iam create-role --role-name $ROLE --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"},"Action":"sts:AssumeRole"}]}' --output text --query Role.Arn
aws iam attach-role-policy --role-name $ROLE --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
aws iam put-role-policy --role-name $ROLE --policy-name ezrecruit-demo-form-ses-send --policy-document "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":[\"ses:SendEmail\",\"ses:SendRawEmail\"],\"Resource\":[\"arn:aws:ses:$R:$ACCT:identity/ezrecruit.ai\",\"arn:aws:ses:$R:$ACCT:configuration-set/ezrecruit-prod\"]}]}"
sleep 12

aws lambda create-function --function-name $FN --runtime nodejs22.x --handler index.handler --memory-size 128 --timeout 10 \
  --role arn:aws:iam::$ACCT:role/$ROLE --zip-file fileb://code.zip --region $R --environment "Variables={TO_ADDRESSES=$TO}" --output text --query FunctionArn
aws lambda wait function-active --function-name $FN --region $R

API_ID=$(aws apigatewayv2 create-api --name $API_NAME --protocol-type HTTP --region $R \
  --cors-configuration "AllowOrigins=$(echo $ORIGINS | sed 's/[][]//g; s/"//g'),AllowMethods=POST,OPTIONS,AllowHeaders=content-type" --query ApiId --output text)
INT_ID=$(aws apigatewayv2 create-integration --api-id $API_ID --integration-type AWS_PROXY --payload-format-version 2.0 --region $R \
  --integration-uri arn:aws:lambda:$R:$ACCT:function:$FN --query IntegrationId --output text)
aws apigatewayv2 create-route --api-id $API_ID --route-key "POST /demo" --target integrations/$INT_ID --region $R --output text --query RouteId
aws apigatewayv2 create-stage --api-id $API_ID --stage-name '$default' --auto-deploy --region $R \
  --default-route-settings ThrottlingBurstLimit=10,ThrottlingRateLimit=5 --output text --query StageName
aws lambda add-permission --function-name $FN --statement-id apigateway-invoke-demo --action lambda:InvokeFunction --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:$R:$ACCT:$API_ID/*/*/demo" --region $R --output text --query Statement >/dev/null
echo "API: https://$API_ID.execute-api.$R.amazonaws.com/demo"
