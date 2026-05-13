import FeaturePageHero from "../components/sections/FeaturePageHero";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import ScrollReveal from "../components/ui/ScrollReveal";
import SectionHeader from "../components/ui/SectionHeader";
import { pageMedia, pageMeta } from "../data/site";
import { usePageSeo } from "../hooks/usePageSeo";

function NurseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M12 6v12M8 10h8" strokeLinecap="round" />
      <path d="M6 7.5h12v10A2.5 2.5 0 0 1 15.5 20h-7A2.5 2.5 0 0 1 6 17.5v-10Z" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <circle cx="12" cy="12" r="8" />
      <path d="m10 10 5-2-2 5-4 2 1-5Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="m3 10 9-6 9 6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10.5V20h12v-9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
      <rect x="4" y="7" width="16" height="12" rx="2" />
      <path d="M4 12h16" strokeLinecap="round" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M6.5 15h11l-1-4.2A2 2 0 0 0 14.56 9H9.44a2 2 0 0 0-1.94 1.8L6.5 15Z" />
      <path d="M5 15h14a1 1 0 0 1 1 1v2h-2M4 18H2v-2a1 1 0 0 1 1-1h1" strokeLinecap="round" />
      <circle cx="7" cy="18" r="1.5" />
      <circle cx="17" cy="18" r="1.5" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M12 18V6" strokeLinecap="round" />
      <path d="m7 11 5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
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

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const overviewServices = [
  { title: "Registered and Enrolled Nurse Support", icon: NurseIcon },
  { title: "Support Coordination", icon: CompassIcon },
  { title: "Support Work", icon: GroupIcon },
  { title: "Capacity Building", icon: ArrowUpIcon },
  { title: "Community Access", icon: GroupIcon },
  { title: "Transport Support", icon: CarIcon },
  { title: "Employment Support", icon: BriefcaseIcon },
  { title: "Support in the Home", icon: HomeIcon },
];

const detailedServices = [
  {
    eyebrow: "Nursing Support",
    title: "Clinical support delivered with calm oversight and practical confidence.",
    icon: NurseIcon,
    tone: "dark",
    items: [
      "Medication management",
      "Wound care",
      "Stoma/PEG management",
      "Indwelling and suprapubic catheter support",
      "Health monitoring",
      "Complex care support",
      "Staff and family training for complex care needs",
    ],
  },
  {
    eyebrow: "Support Coordination",
    title: "Guidance that helps make your NDIS plan clearer and easier to use well.",
    icon: CompassIcon,
    tone: "light",
    items: [
      "Understand your NDIS Plan",
      "Identify and collaborate with providers",
      "Facilitate service agreements",
      "Build independence in managing support",
    ],
  },
  {
    eyebrow: "Support Work",
    title: "Reliable everyday assistance shaped around dignity, comfort, and participation.",
    icon: GroupIcon,
    tone: "light",
    items: ["Personal care", "Household tasks", "Social support", "Transportation"],
  },
  {
    eyebrow: "Capacity Building",
    title: "Goal-focused support that strengthens confidence, skills, and community connection.",
    icon: ArrowUpIcon,
    tone: "dark",
    items: [
      "Life skills development",
      "Social and community participation",
      "Therapeutic support guidance",
      "Assistive technology guidance",
    ],
  },
];

const supportSteps = [
  {
    step: "01",
    title: "Contact us",
    text: "Start with a conversation about the support you are looking for and who it is for.",
  },
  {
    step: "02",
    title: "Initial meeting",
    text: "We take time to understand your circumstances, preferences, and current supports.",
  },
  {
    step: "03",
    title: "Needs and goals assessment",
    text: "Support planning is shaped around clinical needs, day-to-day priorities, and NDIS goals.",
  },
  {
    step: "04",
    title: "Care plan and service agreement",
    text: "Once details are clear, we confirm the approach and move into service commencement.",
  },
];

export default function Services() {
  usePageSeo(pageMeta.services);

  return (
    <div className="bg-cream">
      <FeaturePageHero
        chips={["OUR SERVICES", "NDIS Support"]}
        title="NDIS Services"
        description="Practical nursing and disability supports delivered with structure, empathy, and a clear focus on client outcomes."
        note="Our service offering combines clinical capability and day-to-day disability support so care can remain both professional and genuinely responsive to the person."
        image={pageMedia.servicesHero}
      />

      <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute right-[-8rem] top-6 h-48 w-48 rounded-full bg-teal-100/70" />
        <div className="site-container">
          <ScrollReveal>
            <SectionHeader
              badge="Services Overview"
              title="A service mix built around independence, access, and dependable support."
              description="We deliver supports that help clients manage health needs, maintain routines, build skills, and engage with their communities more confidently."
              align="center"
              className="mx-auto"
            />
          </ScrollReveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {overviewServices.map((service, index) => {
              const Icon = service.icon;

              return (
                <ScrollReveal key={service.title} delay={index * 60}>
                  <Card className="h-full border-sand/80 bg-[#FBFCFB] p-7">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F6F4] text-[#015451]">
                      <Icon />
                    </div>
                    <h2 className="mt-5 text-xl font-bold leading-tight text-ink">{service.title}</h2>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#F4F8F7] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute left-[-10rem] top-20 h-56 w-56 rounded-full bg-white/80" />
        <div className="site-container">
          <ScrollReveal>
            <SectionHeader
              badge="Detailed Services"
              title="Support areas explained with clarity."
              description="Each service area is designed to work around individual goals, support needs, and the level of coordination required."
            />
          </ScrollReveal>

          <div className="mt-14 grid gap-6">
            {detailedServices.map((service, index) => {
              const Icon = service.icon;
              const dark = service.tone === "dark";

              return (
                <ScrollReveal key={service.eyebrow} delay={index * 80}>
                  <Card className="overflow-hidden border-sand/70 bg-white p-0">
                    <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                      <div
                        className={`px-7 py-8 sm:px-8 sm:py-10 ${
                          dark ? "bg-[#0F4C4B] text-white" : "bg-[#FBF6ED] text-ink"
                        }`}
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/14">
                          <Icon />
                        </div>
                        <p
                          className={`mt-5 text-sm font-semibold uppercase tracking-[0.24em] ${
                            dark ? "text-teal-100/82" : "text-[#015451]"
                          }`}
                        >
                          {service.eyebrow}
                        </p>
                        <h2 className="mt-4 text-3xl font-display font-semibold leading-tight">
                          {service.title}
                        </h2>
                      </div>

                      <div className="grid gap-3 p-7 sm:grid-cols-2 sm:p-8">
                        {service.items.map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-3 rounded-[1.5rem] border border-sand/70 bg-white px-4 py-4"
                          >
                            <span className="mt-1 text-[#015451]">
                              <CheckIcon />
                            </span>
                            <p className="text-sm leading-7 text-ink/72">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="site-container grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[2.2rem] border border-sand/70 shadow-soft">
              <img
                src={pageMedia.servicesDetail}
                alt="Healthcare professional speaking with a patient"
                className="h-[25rem] w-full object-cover sm:h-[31rem]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,46,54,0.08)_0%,rgba(8,46,54,0.58)_100%)]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] bg-white/90 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
                  Coordinated supports
                </p>
                <p className="mt-3 text-sm leading-7 text-ink/72">
                  We work to make the setup process clear, supportive, and aligned with the
                  practical realities of each participant’s day-to-day life.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <SectionHeader
                badge="How We Set Up Your Supports"
                title="A simple process built around listening carefully and planning well."
                description="We take a structured approach so supports start with clarity, realistic planning, and agreement on what good service delivery should look like."
              />
            </ScrollReveal>

            <div className="mt-10 grid gap-4">
              {supportSteps.map((item, index) => (
                <ScrollReveal key={item.step} delay={index * 70}>
                  <Card className="border-sand/80 bg-[#FBFCFB] px-6 py-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
                      Step {item.step}
                    </p>
                    <h3 className="mt-3 text-xl font-bold text-ink">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-ink/66">{item.text}</p>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0F4C4B] py-16 text-white sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute right-[-8rem] top-[-5rem] h-64 w-64 rounded-full bg-white/8" />
        <div className="site-container">
          <ScrollReveal className="rounded-[2.4rem] border border-white/10 bg-white/6 px-8 py-12 text-center shadow-soft sm:px-10 lg:px-14">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-200">
              Next Step
            </p>
            <h2 className="mx-auto mt-5 max-w-3xl text-balance text-3xl font-display font-semibold leading-tight sm:text-4xl lg:text-[3.2rem]">
              Let&apos;s discuss the support that best suits your NDIS plan.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/76">
              Whether you need nursing care, daily support, or help coordinating services, we can
              talk through a pathway that fits your goals and circumstances.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button to="/referrals" size="lg">
                Make a Referral
              </Button>
              <Button to="/contact" variant="ghostDark" size="lg">
                Contact Us
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
