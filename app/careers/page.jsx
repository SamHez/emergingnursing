import Careers from "../../src/views/Careers";
import { pageMeta } from "../../src/data/site";
import { createPageMetadata } from "../../src/lib/metadata";

export const metadata = createPageMetadata("/careers", pageMeta.careers);

export default function CareersPage() {
  return <Careers />;
}
