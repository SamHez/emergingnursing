import Home from "../src/views/Home";
import { pageMeta } from "../src/data/site";
import { createPageMetadata } from "../src/lib/metadata";

export const metadata = createPageMetadata("/", pageMeta.home);

export default function HomePage() {
  return <Home />;
}
