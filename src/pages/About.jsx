import PageHero from "../components/sections/PageHero";
import Card from "../components/ui/Card";
import Reveal from "../components/ui/Reveal";
import { company, pageMeta } from "../data/site";
import { usePageSeo } from "../hooks/usePageSeo";

export default function About() {
  usePageSeo(pageMeta.about);

  return (
    <>
      <PageHero
        badge="About Us"
        title="A care organisation focused on dignity, empathy, and measurable wellbeing."
        description="This first pass establishes the About page structure with brand-consistent storytelling blocks that can later expand into team profiles, governance, and participant outcomes."
        aside={
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
              Guiding values
            </p>
            <div className="flex flex-wrap gap-2">
              {company.values.map((value) => (
                <span key={value} className="rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800">
                  {value}
                </span>
              ))}
            </div>
          </div>
        }
      />

      <section className="section-pad">
        <div className="site-container grid gap-6 lg:grid-cols-3">
          {[
            { title: "Aim", text: company.aim },
            { title: "Mission", text: company.mission },
            { title: "Vision", text: company.vision },
          ].map((item) => (
            <Reveal key={item.title}>
              <Card className="h-full">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">{item.title}</p>
                <p className="mt-4 text-sm leading-8 text-ink/72">{item.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
