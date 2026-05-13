import PageHero from "../components/sections/PageHero";
import Card from "../components/ui/Card";
import Reveal from "../components/ui/Reveal";
import { pageMeta, serviceGroups } from "../data/site";
import { usePageSeo } from "../hooks/usePageSeo";

export default function Services() {
  usePageSeo(pageMeta.services);

  return (
    <>
      <PageHero
        badge="Services"
        title="Service categories are now structured for a premium, expandable healthcare presentation."
        description="This page introduces grouped supports with a consistent visual language that can scale into service-specific detail, eligibility notes, and enquiry pathways."
      />

      <section className="section-pad">
        <div className="site-container grid gap-6">
          {serviceGroups.map((group) => (
            <Reveal key={group.title}>
              <Card className="overflow-hidden p-0">
                <div className="grid gap-0 lg:grid-cols-[0.72fr_1.28fr]">
                  <div className="bg-teal-900 px-7 py-8 text-white">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-200">
                      {group.eyebrow}
                    </p>
                    <h2 className="mt-4 text-2xl font-display font-semibold">{group.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-white/72">{group.description}</p>
                  </div>
                  <div className="grid gap-3 p-7 sm:grid-cols-2 xl:grid-cols-3">
                    {group.items.map((item) => (
                      <div key={item} className="rounded-[1.5rem] border border-sand bg-cream/70 px-4 py-4 text-sm font-medium text-ink/76">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
