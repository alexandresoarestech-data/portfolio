import { Portfolio } from "@/components/Portfolio";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("en");

export default function HomeEn() {
  return <Portfolio lang="en" />;
}
