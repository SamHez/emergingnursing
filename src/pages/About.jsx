import FeaturePageHero from "../components/sections/FeaturePageHero";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import ScrollReveal from "../components/ui/ScrollReveal";
import SectionHeader from "../components/ui/SectionHeader";
import { company, pageMedia, pageMeta } from "../data/site";
import { usePageSeo } from "../hooks/usePageSeo";

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path
        d="M12 20s5-3.5 5-8.5a5 5 0 1 0-10 0C7 16.5 12 20 12 20Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="1.75" />
    </svg>
  );
}

function ValuesIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m12 3 2.1 4.82L19 9.1l-3.68 3.2L16 17l-4-2.3L8 17l.68-4.7L5 9.1l4.9-1.28L12 3Z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path
        d="M12 21s7-3.6 7-9.1V6.2L12 3 5 6.2v5.7C5 17.4 12 21 12 21Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="m9.4 12 1.8 1.8 3.6-3.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GroupIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <circle cx="8.5" cy="8" r="3" />
      <circle cx="16.5" cy="9.5" r="2.5" />
      <path d="M3.5 19a5 5 0 0 1 10 0" strokeLinecap="round" />
      <path d="M14 18a4 4 0 0 1 6.5-3.12" strokeLinecap="round" />
    </svg>
  );
}

const values = company.values.map((value) => ({
  title: value,
  text: {
    Accountability: "We take ownership of care quality, communication, and the outcomes we influence.",
    Trust: "We build dependable relationships through consistency, respect, and transparent support.",
    Respect: "Every client is treated with dignity, privacy, and regard for their lived experience.",
    Passion: "We bring energy, empathy, and professionalism to every support relationship.",
    Inclusiveness: "We create welcoming support that recognises identity, culture, and individual choice.",
  }[value],
}));

const policies = [
  {
    title: "Privacy and Confidentiality",
    text: "Personal information is handled carefully, respectfully, and in line with professional obligations.",
  },
  {
    title: "Cultural and Linguistic Diversity",
    text: "Supports are delivered with awareness of culture, language, identity, and lived experience.",
  },
  {
    title: "Accessibility",
    text: "Communication and service pathways are designed to remain clear, inclusive, and practical.",
  },
  {
    title: "Abuse and Neglect Zero Tolerance",
    text: "Concerns are taken seriously and addressed with immediate safeguarding and escalation.",
  },
  {
    title: "Risk Management",
    text: "Supports are planned with safety, foresight, and a clear understanding of participant needs.",
  },
  {
    title: "Infection Control",
    text: "Clinical hygiene and infection prevention practices are embedded in everyday service delivery.",
  },
  {
    title: "Child Safety",
    text: "Where children and young people are involved, their safety and wellbeing remain a priority.",
  },
];

const approachPoints = [
  "Choice and control remain central to how supports are discussed, planned, and reviewed.",
  "Clients are actively involved in planning and decision-making around their support pathway.",
  "Care is shaped around personal values, preferences, routines, and long-term goals.",
  "Our team brings disability support experience and practical care understanding to each service arrangement.",
];

export default function About() {
  usePageSeo(pageMeta.about);

  return (
    <div className="bg-cream">
      <FeaturePageHero
        chips={["ABOUT US", "Story & Commitment"]}
        title="About Emerging Nursing"
        description="Registered NDIS support built around dignity, independence, and choice."
        note="We provide thoughtful nursing and disability supports designed to strengthen autonomy, build trust, and meet everyday goals with care that feels respectful and professional."
        image={pageMedia.aboutHero}
      />

      <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute left-[-8rem] top-8 h-40 w-40 rounded-full bg-teal-100/70" />
        <div className="site-container grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[2.2rem] border border-sand/70 shadow-soft">
              <img
                src={pageMedia.aboutStory}
                alt="Support professional meeting with a participant"
                className="h-[25rem] w-full object-cover sm:h-[31rem]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,46,54,0.06)_0%,rgba(8,46,54,0.5)_100%)]" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <SectionHeader
              badge="Who We Are"
              title="Support grounded in autonomy, compassion, and dependable care."
              description="Emerging Nursing and Disability Services is a registered NDIS Provider in Western Australia. We support people with disabilities to live as autonomously and independently as possible."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              {company.locations.map((location) => (
                <div
                  key={location}
                  className="inline-flex items-center gap-2 rounded-full border border-sand bg-cream px-4 py-2 text-sm font-semibold text-[#015451]"
                >
                  <LocationIcon />
                  <span>{location}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-2xl text-base leading-8 text-ink/68">
              Our approach combines clinical understanding, disability support experience, and
              genuine collaboration with clients, families, and support networks.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#F4F8F7] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute right-[-10rem] top-16 h-56 w-56 rounded-full bg-teal-100/70" />
        <div className="site-container">
          <ScrollReveal>
            <SectionHeader
              badge="Aim, Mission, Vision"
              title="Clear purpose behind the way we support people."
              description="Our service direction is shaped by long-term wellbeing, participant choice, and respectful care delivery."
              align="center"
              className="mx-auto"
            />
          </ScrollReveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              { title: "Aim", text: company.aim },
              { title: "Mission", text: company.mission },
              { title: "Vision", text: company.vision },
            ].map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 90}>
                <Card className="h-full border-sand/80 bg-white p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
                    {item.title}
                  </p>
                  <p className="mt-5 text-sm leading-8 text-ink/72">{item.text}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="site-container">
          <ScrollReveal>
            <SectionHeader
              badge="Our Values"
              title="Five values that shape every support relationship."
              description="These principles guide how we communicate, plan care, and show up consistently for clients and families."
            />
          </ScrollReveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
            {values.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 70}>
                <Card className="h-full border-sand/80 bg-[#FBFCFB] p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-[#015451]">
                    <ValuesIcon />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink/66">{item.text}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#F8F4EC] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute bottom-[-5rem] left-[-4rem] h-56 w-56 rounded-full bg-white/70" />
        <div className="site-container grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <ScrollReveal>
            <SectionHeader
              badge="Person-Centred Approach"
              title="Planning stays centred on the person, not just the service."
              description="We believe strong supports are built through collaboration, practical understanding, and care that reflects what matters most to the individual."
            />
            <div className="mt-8 grid gap-4">
              {approachPoints.map((item, index) => (
                <ScrollReveal key={item} delay={index * 80}>
                  <div className="flex items-start gap-4 rounded-[1.7rem] border border-white/80 bg-white/85 px-5 py-5 shadow-soft">
                    <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-50 text-[#015451]">
                      {index < 2 ? <GroupIcon /> : <ShieldIcon />}
                    </span>
                    <p className="text-sm leading-7 text-ink/72">{item}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="relative overflow-hidden rounded-[2.2rem] border border-white/70 shadow-soft">
              <img
                src={pageMedia.aboutApproach}
                alt="Support worker assisting a participant in the community"
                className="h-[25rem] w-full object-cover sm:h-[31rem]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,46,54,0.08)_0%,rgba(8,46,54,0.52)_100%)]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] bg-white/90 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
                  Local support
                </p>
                <p className="mt-3 text-sm leading-7 text-ink/72">
                  With service presence in High Wycombe and Caversham, our support remains grounded
                  in local understanding and practical coordination.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="site-container">
          <ScrollReveal>
            <SectionHeader
              badge="Policies and Safety"
              title="Professional safeguards that support trusted care."
              description="Our operating approach is built around privacy, safety, accessibility, and responsible service delivery."
              align="center"
              className="mx-auto"
            />
          </ScrollReveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {policies.map((item, index) => (
              <ScrollReveal
                key={item.title}
                delay={index * 70}
                className={index === 0 || index === 3 ? "xl:col-span-2" : ""}
              >
                <Card className="h-full border-sand/80 bg-[#FBFCFB] p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F6F4] text-[#015451]">
                    <ShieldIcon />
                  </div>
                  <h3 className="mt-5 text-xl font-bold leading-tight text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink/66">{item.text}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={140} className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Button to="/services" size="lg">
              Explore Services
            </Button>
            <Button to="/contact" variant="ghost" size="lg">
              Contact Us
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
