import About from "../../src/views/About";
import JsonLd from "../../src/components/seo/JsonLd";
import { pageMeta } from "../../src/data/site";
import { createPageMetadata } from "../../src/lib/metadata";
import { createBreadcrumbStructuredData } from "../../src/lib/structuredData";

export const metadata = createPageMetadata("/about", pageMeta.about);
const breadcrumbData = createBreadcrumbStructuredData([
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
]);

export default function AboutPage() {
  return (
    <>
      <JsonLd id="breadcrumb-about" data={breadcrumbData} />
      <About />
    </>
  );
}
