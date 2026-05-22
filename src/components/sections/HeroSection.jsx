import { company } from "../../data/site";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import AppIcon from "../ui/AppIcon";
import Card from "../ui/Card";
import Reveal from "../ui/Reveal";

export default function HeroSection() {
  return (
    <section className="site-container pt-10 sm:pt-12">
      <div className="grid items-stretch gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal className="relative overflow-hidden rounded-[2.75rem] border border-white/50 bg-[#0C3844] px-7 py-10 text-white shadow-soft sm:px-10 sm:py-12 lg:min-h-[42rem] lg:px-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,182,236,0.22),transparent_32%),radial-gradient(circle_at_85%_25%,rgba(116,201,108,0.18),transparent_28%),linear-gradient(180deg,rgba(12,56,68,0.72),rgba(7,38,48,0.95))]" />
          <div className="absolute inset-y-0 right-[-6rem] w-[24rem] rounded-full bg-white/10" />
          <img
            src="/assets/brand/favicon.png"
            alt=""
            className="absolute bottom-[-2rem] right-[-1rem] w-48 opacity-[0.14] saturate-0 lg:w-64"
          />

          <div className="relative flex h-full flex-col justify-between gap-12">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Badge tone="teal">Registered NDIS Provider</Badge>
                <Badge>Western Australia</Badge>
                <Badge>Person-Centred Care</Badge>
              </div>

              <div className="max-w-3xl space-y-6">
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-teal-100/80">
                  Emerging Nursing and Disability Services
                </p>
                <h1 className="text-balance text-4xl font-display font-semibold leading-tight sm:text-5xl lg:text-7xl">
                  Nursing and disability support that protects dignity and builds independence.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-white/78">
                  {company.aim} Trusted support across Bennett Springs and the wider
                  Western Australia community.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button to="/referrals" size="lg">
                  Make a Referral
                </Button>
                <Button to="/services" variant="secondary" size="lg">
                  Explore Services
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Clinical support",
                  text: "Nursing, medication, wound care, PEG, catheter, and complex care capability.",
                },
                {
                  title: "Community access",
                  text: "Home, transport, social participation, life skills, and goal-focused coordination.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.75rem] border border-white/18 bg-white/12 p-5"
                >
                  <p className="text-base font-semibold">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-white/72">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6">
          <Reveal>
            <Card className="relative overflow-hidden p-0">
              <div className="absolute inset-0 bg-mesh-gradient opacity-80" />
              <div className="relative grid gap-8 p-7">
                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
                    Care approach
                  </p>
                  <h2 className="text-3xl font-display font-semibold leading-tight text-ink">
                    Calm, capable support shaped around real participant goals.
                  </h2>
                </div>

                <div className="grid gap-4">
                  {[
                    "Responsive communication with participants, families, and support networks",
                    "Practical care planning focused on wellbeing, safety, and autonomy",
                    "Professional nursing oversight for everyday and complex needs",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-[1.5rem] bg-white/75 p-4">
                      <AppIcon name="check" className="h-5 w-5 text-teal-700" strokeWidth={2} />
                      <p className="text-sm leading-7 text-ink/75">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Reveal>

          <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <Card tint="teal" className="h-full">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
                    Contact
                  </p>
                  <a href={company.phoneHref} className="mt-3 block text-2xl font-bold text-ink">
                    {company.phone}
                  </a>
                  <a href={company.emailHref} className="mt-2 block text-sm text-ink/68">
                    {company.email}
                  </a>
                </div>
                <div className="rounded-2xl bg-white/80 p-3">
                  <img src="/assets/brand/favicon.png" alt="" className="h-11 w-11" />
                </div>
              </div>
            </Card>

            <Card className="h-full">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
                  Locations
                </p>
                {company.locations.map((location) => (
                  <div key={location} className="flex items-start gap-3 rounded-[1.5rem] bg-sky-50 p-4">
                    <AppIcon name="mapPin" className="h-5 w-5 text-sky-600" strokeWidth={2} />
                    <p className="text-sm leading-7 text-ink/76">{location}</p>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
