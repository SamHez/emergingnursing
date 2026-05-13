import PageHero from "../components/sections/PageHero";
import Card from "../components/ui/Card";
import Reveal from "../components/ui/Reveal";
import { pageMeta } from "../data/site";
import { usePageSeo } from "../hooks/usePageSeo";

export default function StaffTraining() {
  usePageSeo(pageMeta.training);

  const topics = [
    "Medication routines and escalation awareness",
    "PEG, stoma, catheter, and wound care handling guidance",
    "Complex care readiness for staff and family supports",
    "Monitoring, communication, and safe handover practices",
  ];

  return (
    <>
      <PageHero
        badge="Staff Training"
        title="Training page scaffolding for complex care capability and family confidence."
        description="This layout is ready to expand into workshop outlines, audience-specific training options, and booking enquiries while preserving the premium healthcare aesthetic."
      />

      <section className="section-pad">
        <div className="site-container grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <Reveal>
            <Card tint="dark" className="h-full">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-200">
                Delivery focus
              </p>
              <h2 className="mt-4 text-3xl font-display font-semibold leading-tight text-white">
                Practical education for the people supporting everyday care.
              </h2>
              <p className="mt-4 text-sm leading-8 text-white/72">
                The foundation is in place for on-site training, family education sessions, and capability-building modules for higher-needs participants.
              </p>
            </Card>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {topics.map((topic) => (
              <Reveal key={topic}>
                <Card className="h-full">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">Training topic</p>
                  <p className="mt-4 text-sm leading-7 text-ink/74">{topic}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
