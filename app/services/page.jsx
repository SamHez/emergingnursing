import Services from "../../src/views/Services";
import JsonLd from "../../src/components/seo/JsonLd";
import { pageMeta } from "../../src/data/site";
import { createPageMetadata } from "../../src/lib/metadata";
import { createBreadcrumbStructuredData } from "../../src/lib/structuredData";

export const metadata = createPageMetadata("/services", pageMeta.services);
const breadcrumbData = createBreadcrumbStructuredData([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
]);

export default function ServicesPage() {
  return (
    <>
      <JsonLd id="breadcrumb-services" data={breadcrumbData} />
      <Services />
    </>
  );
}
