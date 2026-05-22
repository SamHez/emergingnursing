import Home from "../src/views/Home";
import JsonLd from "../src/components/seo/JsonLd";
import { pageMeta } from "../src/data/site";
import { createPageMetadata } from "../src/lib/metadata";
import { createBreadcrumbStructuredData } from "../src/lib/structuredData";

export const metadata = createPageMetadata("/", pageMeta.home);
const breadcrumbData = createBreadcrumbStructuredData([{ name: "Home", path: "/" }]);

export default function HomePage() {
  return (
    <>
      <JsonLd id="breadcrumb-home" data={breadcrumbData} />
      <Home />
    </>
  );
}
