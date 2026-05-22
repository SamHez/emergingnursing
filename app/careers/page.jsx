import Careers from "../../src/views/Careers";
import JsonLd from "../../src/components/seo/JsonLd";
import { pageMeta } from "../../src/data/site";
import { createPageMetadata } from "../../src/lib/metadata";
import { createBreadcrumbStructuredData } from "../../src/lib/structuredData";

export const metadata = createPageMetadata("/careers", pageMeta.careers);
const breadcrumbData = createBreadcrumbStructuredData([
  { name: "Home", path: "/" },
  { name: "Careers", path: "/careers" },
]);

export default function CareersPage() {
  return (
    <>
      <JsonLd id="breadcrumb-careers" data={breadcrumbData} />
      <Careers />
    </>
  );
}
