import { notFound } from "next/navigation";
import { listBroadcastBoothPublicCases } from "../../../lib/cases/broadcast-booth/index.public";
import BroadcastPreview from "./BroadcastPreview";

export const dynamic = "force-dynamic";
export const metadata = { title: "Broadcast Booth · Design preview", robots: { index: false, follow: false } };

export default function Page() {
  // Public lesson content only. No auth bypass, student data, or submission API.
  if (process.env.NODE_ENV !== "development" && process.env.VERCEL_ENV !== "preview") notFound();
  return <BroadcastPreview cases={listBroadcastBoothPublicCases()} />;
}
