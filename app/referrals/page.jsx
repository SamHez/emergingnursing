import Referrals from "../../src/views/Referrals";
import { pageMeta } from "../../src/data/site";
import { createPageMetadata } from "../../src/lib/metadata";

export const metadata = createPageMetadata("/referrals", pageMeta.referrals);

export default function ReferralsPage() {
  return <Referrals />;
}
