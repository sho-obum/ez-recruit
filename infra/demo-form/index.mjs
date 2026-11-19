import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { buildEmail } from "./template.mjs";

// Book a demo form: validates the request and emails it through Amazon SES (ap-south-1, ezrecruit.ai identity).
const ses = new SESv2Client({});
const TO = (process.env.TO_ADDRESSES ?? "support@ezrecruit.ai").split(",").map(s => s.trim()).filter(Boolean);
const FROM = process.env.FROM_ADDRESS ?? "EZRecruit website <noreply@ezrecruit.ai>";

const ALLOWED_ORIGINS = new Set([
  "https://ezrecruit.ai",
  "https://www.ezrecruit.ai",
  "https://ez-recruit-eight.vercel.app",
  "http://localhost:4370",
]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const cors = origin => ({
  "Access-Control-Allow-Origin": ALLOWED_ORIGINS.has(origin) ? origin : "https://ezrecruit.ai",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
});
const reply = (statusCode, origin, body) => ({ statusCode, headers: cors(origin), body: JSON.stringify(body) });
// One line only, capped: stops header injection and oversized input.
const line = (v, max) => String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

export const handler = async event => {
  const origin = event?.headers?.origin ?? event?.headers?.Origin ?? "";
  const method = event?.requestContext?.http?.method ?? event?.httpMethod;
  if (method === "OPTIONS") return { statusCode: 204, headers: cors(origin), body: "" };

  let p;
  try { p = JSON.parse(event?.body ?? "{}"); } catch { return reply(400, origin, { error: "Invalid request." }); }

  // Bots fill the hidden field: pretend it worked and send nothing.
  if (p.fax) return reply(200, origin, { ok: true });

  const name = line(p.name, 120), email = line(p.email, 200), company = line(p.company, 200);
  const size = line(p.size, 40), message = String(p.message ?? "").trim().slice(0, 2000);
  if (!name) return reply(400, origin, { error: "Please enter your name." });
  if (!EMAIL_RE.test(email)) return reply(400, origin, { error: "Please enter a valid email address." });
  if (!company) return reply(400, origin, { error: "Please enter your company." });

  const { text, html } = buildEmail({ name, email, company, size, message, page: line(p.page, 200) || "/demo/" });

  try {
    await ses.send(new SendEmailCommand({
      FromEmailAddress: FROM,
      Destination: { ToAddresses: TO },
      ReplyToAddresses: [email],
      Content: { Simple: { Subject: { Data: `Demo request: ${company}`, Charset: "UTF-8" }, Body: { Text: { Data: text, Charset: "UTF-8" }, Html: { Data: html, Charset: "UTF-8" } } } },
    }));
  } catch (err) {
    console.error("SES send failed", err);
    return reply(502, origin, { error: "Could not send your request right now." });
  }
  return reply(200, origin, { ok: true });
};
