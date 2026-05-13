import PageHero from "../components/sections/PageHero";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Reveal from "../components/ui/Reveal";
import { company, pageMeta } from "../data/site";
import { usePageSeo } from "../hooks/usePageSeo";

export default function Referrals() {
  usePageSeo(pageMeta.referrals);

  const steps = [
    "Share participant goals, clinical needs, and current supports.",
    "Confirm the right mix of nursing, disability, community, or training services.",
    "Coordinate next steps with families, participants, and existing providers.",
  ];

  return (
    <>
      <PageHero
        badge="Referrals"
        title="A clear referral page scaffold for participants, families, and partner organisations."
        description="This phase focuses on page structure, strong calls to action, and calm information hierarchy. A future phase can add forms, secure uploads, and intake documents."
        aside={
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">Direct contact</p>
            <a href={company.phoneHref} className="block text-2xl font-bold text-ink">
              {company.phone}
            </a>
            <a href={company.emailHref} className="text-sm text-ink/68">
              {company.email}
            </a>
          </div>
        }
      />

      <section className="section-pad">
        <div className="site-container grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <Card tint="teal" className="h-full">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">Referral steps</p>
              <div className="mt-6 grid gap-4">
                {steps.map((step, index) => (
                  <div key={step} className="rounded-[1.5rem] bg-white/80 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                      Step {index + 1}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-ink/74">{step}</p>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal>
            <Card className="h-full">
              <div className="space-y-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">Next build phase</p>
                <h2 className="text-3xl font-display font-semibold leading-tight text-ink">
                  Ready for an intake form, referral pack downloads, and provider-facing process detail.
                </h2>
                <p className="text-sm leading-8 text-ink/68">
                  The visual system is ready for a richer referrals experience without redesigning the page structure.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button href={company.emailHref}>Email Referral Team</Button>
                  <Button href={company.phoneHref} variant="ghost">
                    Call Now
                  </Button>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>
    </>
  );
}
