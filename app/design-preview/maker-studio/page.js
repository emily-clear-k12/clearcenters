import { notFound } from "next/navigation";
import { scanMakerLibrary } from "../../../lib/cases/maker-studio/library";
import MakerPreview from "./MakerPreview";
export const dynamic = "force-dynamic";
export const metadata = {title:"Maker Studio · Design preview",robots:{index:false,follow:false}};
export default function Page() {
  if (process.env.NODE_ENV !== "development" && process.env.VERCEL_ENV !== "preview") notFound();
  return <MakerPreview library={scanMakerLibrary()} />;
}
