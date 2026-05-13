import PageHero from "../components/sections/PageHero";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Reveal from "../components/ui/Reveal";
import { company, pageMeta } from "../data/site";
import { usePageSeo } from "../hooks/usePageSeo";

export default function Contact() {
  usePageSeo(pageMeta.contact);

  return (
    <>
      <PageHero
        badge="Contact"
        title="Clear contact paths for participants, families, and referral partners."
        description="This phase establishes a polished contact experience with strong mobile usability, direct actions, and room for a future enquiry form or map integration."
      />

      <section className="section-pad">
        <div className="site-container grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <Card tint="teal" className="h-full">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
                Reach the team
              </p>
              <div className="mt-5 space-y-3">
                <a href={company.phoneHref} className="block text-3xl font-extrabold text-ink">
                  {company.phone}
                </a>
                <a href={company.emailHref} className="block text-base text-ink/70">
                  {company.email}
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button href={company.phoneHref}>Call Now</Button>
                <Button href={company.emailHref} variant="ghost">
                  Send Email
                </Button>
              </div>
            </Card>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {company.locations.map((location, index) => (
              <Reveal key={location}>
                <Card className="h-full">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
                    Location {index + 1}
                  </p>
                  <p className="mt-4 text-xl font-bold text-ink">{location}</p>
                  <p className="mt-4 text-sm leading-7 text-ink/68">
                    A future phase can introduce maps, office hours, and enquiry routing by service area.
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
