import PageHero from "../components/sections/PageHero";
import Card from "../components/ui/Card";
import Reveal from "../components/ui/Reveal";
import { company, pageMeta } from "../data/site";
import { usePageSeo } from "../hooks/usePageSeo";

export default function Careers() {
  usePageSeo(pageMeta.careers);

  return (
    <>
      <PageHero
        badge="Careers"
        title="A recruitment page foundation that feels credible, warm, and clinically capable."
        description="The page is structured to support future job listings, team benefits, and role-specific application flows without changing the broader design language."
        aside={
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
              What matters here
            </p>
            <p className="text-sm leading-7 text-ink/68">
              Accountability, Trust, Respect, Passion, and Inclusiveness are already integrated into the site’s voice and hiring narrative.
            </p>
          </div>
        }
      />

      <section className="section-pad">
        <div className="site-container grid gap-6 md:grid-cols-3">
          {[
            "Registered and enrolled nurses",
            "Disability support workers",
            "Care coordination and community-facing roles",
          ].map((item) => (
            <Reveal key={item}>
              <Card className="h-full">
                <p className="text-lg font-bold text-ink">{item}</p>
                <p className="mt-4 text-sm leading-7 text-ink/68">
                  Future role cards can sit here with short descriptions, qualification requirements, and application links.
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
