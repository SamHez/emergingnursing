import Contact from "../../src/views/Contact";
import { pageMeta } from "../../src/data/site";
import { createPageMetadata } from "../../src/lib/metadata";

export const metadata = createPageMetadata("/contact", pageMeta.contact);

export default function ContactPage() {
  return <Contact />;
}
