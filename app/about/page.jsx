import About from "../../src/views/About";
import { pageMeta } from "../../src/data/site";
import { createPageMetadata } from "../../src/lib/metadata";

export const metadata = createPageMetadata("/about", pageMeta.about);

export default function AboutPage() {
  return <About />;
}
