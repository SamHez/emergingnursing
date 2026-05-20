import Services from "../../src/views/Services";
import { pageMeta } from "../../src/data/site";
import { createPageMetadata } from "../../src/lib/metadata";

export const metadata = createPageMetadata("/services", pageMeta.services);

export default function ServicesPage() {
  return <Services />;
}
