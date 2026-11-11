import { Portfolio } from "@/components/Portfolio";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("pt");

export default function Home() {
  return <Portfolio lang="pt" />;
}
