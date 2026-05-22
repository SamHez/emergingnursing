import Referrals from "../../src/views/Referrals";
import JsonLd from "../../src/components/seo/JsonLd";
import { pageMeta } from "../../src/data/site";
import { createPageMetadata } from "../../src/lib/metadata";
import { createBreadcrumbStructuredData } from "../../src/lib/structuredData";

export const metadata = createPageMetadata("/referrals", pageMeta.referrals);
const breadcrumbData = createBreadcrumbStructuredData([
  { name: "Home", path: "/" },
  { name: "Referrals", path: "/referrals" },
]);

export default function ReferralsPage() {
  return (
    <>
      <JsonLd id="breadcrumb-referrals" data={breadcrumbData} />
      <Referrals />
    </>
  );
}
