import Landing, { getLanding, landingMeta } from "@/components/page/Landing";

const PATH = "/ats-for-recruitment-agencies/";
export const metadata = landingMeta(PATH);

export default function Page() {
  return <Landing page={getLanding(PATH)} />;
}
