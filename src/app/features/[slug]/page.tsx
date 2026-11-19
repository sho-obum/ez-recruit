import { notFound } from "next/navigation";
import Landing, { LANDING, getLanding, landingMeta } from "@/components/page/Landing";

type Props = { params: Promise<{ slug: string }> };
const features = LANDING.filter(l => l.path.startsWith("/features/"));

export const dynamicParams = false;
export const generateStaticParams = () => features.map(f => ({ slug: f.path.split("/")[2] }));

export async function generateMetadata({ params }: Props) {
  return landingMeta(`/features/${(await params).slug}/`);
}

export default async function FeaturePage({ params }: Props) {
  const path = `/features/${(await params).slug}/`;
  if (!features.some(f => f.path === path)) notFound();
  return <Landing page={getLanding(path)} />;
}
