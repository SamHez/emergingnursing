import StaffTraining from "../../src/views/StaffTraining";
import { pageMeta } from "../../src/data/site";
import { createPageMetadata } from "../../src/lib/metadata";

export const metadata = createPageMetadata("/staff-training", pageMeta.training);

export default function StaffTrainingPage() {
  return <StaffTraining />;
}
