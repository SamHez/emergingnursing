import StaffTraining from "../../src/views/StaffTraining";
import JsonLd from "../../src/components/seo/JsonLd";
import { pageMeta } from "../../src/data/site";
import { createPageMetadata } from "../../src/lib/metadata";
import { createBreadcrumbStructuredData } from "../../src/lib/structuredData";

export const metadata = createPageMetadata("/staff-training", pageMeta.training);
const breadcrumbData = createBreadcrumbStructuredData([
  { name: "Home", path: "/" },
  { name: "Staff Training", path: "/staff-training" },
]);

export default function StaffTrainingPage() {
  return (
    <>
      <JsonLd id="breadcrumb-staff-training" data={breadcrumbData} />
      <StaffTraining />
    </>
  );
}
