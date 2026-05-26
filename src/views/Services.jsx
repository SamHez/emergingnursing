import Image from "next/image";
import FeaturePageHero from "../components/sections/FeaturePageHero";
import AppIcon from "../components/ui/AppIcon";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import ScrollReveal from "../components/ui/ScrollReveal";
import SectionHeader from "../components/ui/SectionHeader";
import { pageMedia } from "../data/site";

const overviewServices = [
  { title: "Registered Nurse Support", icon: "stethoscope", desc: "Clinical nursing care for complex and routine health needs at home." },
  { title: "Support Coordination", icon: "compass", desc: "Help to connect services and make your NDIS plan easier to use." },
  { title: "Nursing Support Work", icon: "usersRound", desc: "Practical daily living assistance to build independence and routines." },
  { title: "Capacity Building", icon: "trendingUp", desc: "Goal-focused supports to strengthen skills and community involvement." },
  { title: "Community Access", icon: "usersRound", desc: "Support to participate in community activities, appointments, and social life." },
  { title: "Transport Support", icon: "carFront", desc: "Safe and reliable transport for appointments, social activities, and essentials." },
  { title: "Employment Support", icon: "briefcaseBusiness", desc: "Practical support to find and sustain meaningful work or training." },
  { title: "Support in the Home", icon: "house", desc: "Home-based assistance that keeps routines, safety and wellbeing steady." },
];

const nursingSupport = {
  eyebrow: "Nursing Support",
  title: "Clinical support delivered with calm oversight and practical confidence.",
  icon: "stethoscope",
  image: pageMedia.servicesDetail1,
  items: [
    "Medication management",
    "Wound care",
    "Stoma/PEG management",
    "Indwelling and suprapubic catheter support",
    "Health monitoring",
    "Staff and family training for complex care needs",
    "Dysphagia Support",
    "Subcutaneus Injections",
    "Complex Bowel Care",
    "Tracheostomy",
    "Continence Assessments & Management",
    "Dementia Care",
    "SIL & Respite Homes",
  ],
};

const combinedSupportServices = {
  eyebrow: "Coordination & Everyday Support",
  title: "Support Coordination and Support work, brought together.",
  description:
    "We help make plans easier to understand and daily support easier to rely on, so participants can move through routines, services, and goals with less friction.",
  groups: [
    {
      title: "Support Coordination",
      icon: "compass",
      tone: "warm",
      items: [
        "Understand your NDIS Plan",
        "Identify and collaborate with providers",
        "Facilitate service agreements",
        "Build independence in managing support",
      ],
    },
    {
      title: "Support Work",
      icon: "usersRound",
      tone: "light",
      items: ["Personal care", "Household tasks", "Social support", "Transportation"],
    },
  ],
};

const capacityBuilding = {
  eyebrow: "Capacity Building",
  title: "Goal-focused support that strengthens confidence and skills.",
  icon: "trendingUp",
  items: [
    "Life skills development",
    "Social and community participation",
    "Therapeutic support guidance",
    "Assistive technology guidance",
  ],
};

const supportSteps = [
  
  {
    step: "01",
    title: "Initial meeting",
    text: "We take time to understand your circumstances, preferences, and current supports.",
  },
  {
    step: "02",
    title: "Needs and goals assessment",
    text: "Support planning is shaped around clinical needs, day-to-day priorities, and NDIS goals.",
  },
  {
    step: "03",
    title: "Care plan and service agreement",
    text: "Once details are clear, we confirm the approach and move into service commencement.",
  },
];

export default function Services() {
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
              title="What We Offer"
              description="We deliver supports that help clients manage health needs, maintain routines, build skills, and engage with their communities more confidently."
              align="center"
              className="mx-auto"
            />
          </ScrollReveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {overviewServices.map((service, index) => {
                return (
                  <ScrollReveal key={service.title} delay={index * 60}>
                    <Card className="group h-full border border-[#E3F0EC] bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FCFB_100%)] p-6 shadow-[0_20px_45px_rgba(15,76,75,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,76,75,0.12)] sm:p-7">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E1F4F0] text-[#015451] transition-transform duration-300 group-hover:scale-105">
                          <AppIcon name={service.icon} className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h2 className="text-[1.45rem] font-semi-bold leading-[1.18] text-ink">{service.title}</h2>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-ink/72">{service.desc}</p>
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
              title="Support Areas Explained with Clarity."
              description="Each service area is designed to work around individual goals, support needs, and the level of coordination required."
            />
          </ScrollReveal>

          <div className="mt-14 grid gap-6">
            <ScrollReveal>
              <Card className="overflow-hidden border-sand/70 bg-white p-0">
                <div className="grid gap-4 p-4 lg:grid-cols-[0.92fr_1.08fr] lg:gap-0">
                  <div className="rounded-[2.2rem] bg-[#0F4C4B] px-6 py-7 text-white sm:px-8 sm:py-9">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/14">
                      <AppIcon name={nursingSupport.icon} className="h-5 w-5" />
                    </div>
                    <p className="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-teal-100/82">
                      {nursingSupport.eyebrow}
                    </p>
                    <h2 className="mt-4 text-3xl font-display font-semibold leading-tight sm:text-[2.45rem]">
                      {nursingSupport.title}
                    </h2>
                    <div className="mt-7 overflow-hidden rounded-[1.8rem] border border-white/12 bg-white/8">
                      <Image
                        src={nursingSupport.image}
                        alt="Clinical nursing support meeting in a calm care setting"
                        width={1200}
                        height={920}
                        sizes="(min-width: 1024px) 34vw, 100vw"
                        className="h-[12rem] w-full object-cover sm:h-[15rem]"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 px-3 pb-3 pt-0 sm:grid-cols-2 sm:px-4 sm:pb-4 lg:p-8">
                    {nursingSupport.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-[1.5rem] border border-sand/70 bg-white px-4 py-4"
                      >
                        <span className="mt-1 text-[#015451]">
                          <AppIcon name="check" className="h-4 w-4" strokeWidth={2.2} />
                        </span>
                        <p className="text-sm leading-7 text-ink/72">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <Card className="overflow-hidden border-sand/70 bg-white p-0">
                <div className="grid gap-4 p-4 lg:grid-cols-[0.84fr_1.16fr] lg:gap-0">
                  <div className="rounded-[2.2rem] bg-[linear-gradient(180deg,#FBF6ED_0%,#F7F0E0_100%)] px-6 py-7 text-ink sm:px-8 sm:py-9">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
                      {combinedSupportServices.eyebrow}
                    </p>
                    <h2 className="mt-4 text-3xl font-display font-semibold leading-tight sm:text-[2.45rem]">
                      {combinedSupportServices.title}
                    </h2>
                    <p className="mt-5 max-w-xl text-base leading-8 text-ink/70">
                      {combinedSupportServices.description}
                    </p>
                  </div>

                  <div className="grid gap-4 px-3 pb-3 pt-0 sm:px-4 sm:pb-4 lg:grid-cols-2 lg:gap-5 lg:p-8">
                    {combinedSupportServices.groups.map((group) => (
                      <div
                        key={group.title}
                        className={`rounded-[1.9rem] border px-5 py-5 ${
                          group.tone === "warm"
                            ? "border-[#E9DCC3] bg-[#FFF9F0]"
                            : "border-[#DCEDEA] bg-[#F8FBFA]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                            group.tone === "warm" ? "bg-white text-[#0B2D36]" : "bg-white text-[#015451]"
                          }`}>
                            <AppIcon name={group.icon} className="h-5 w-5" />
                          </div>
                          <h3 className="text-xl font-bold text-ink">{group.title}</h3>
                        </div>

                        <div className="mt-5 grid gap-3">
                          {group.items.map((item) => (
                            <div key={item} className="flex items-start gap-3 rounded-[1.2rem] bg-white px-4 py-3">
                              <span className="mt-1 text-[#015451]">
                                <AppIcon name="check" className="h-4 w-4" strokeWidth={2.2} />
                              </span>
                              <p className="text-sm leading-7 text-ink/72">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <Card className="overflow-hidden border border-[#13615D] bg-[linear-gradient(180deg,#0F4C4B_0%,#125B58_100%)] p-0 text-white">
                <div className="px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
                  <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-8">
                    <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white lg:mx-0">
                      <AppIcon name={capacityBuilding.icon} className="h-6 w-6" />
                      </div>
                      <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-teal-100/82">
                        {capacityBuilding.eyebrow}
                      </p>
                      <h2 className="mt-4 text-balance text-3xl font-display font-semibold leading-tight sm:text-[2.25rem]">
                        {capacityBuilding.title}
                      </h2>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-0">
                      {capacityBuilding.items.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-[1.35rem] border border-white/12 bg-white/8 px-4 py-3.5 backdrop-blur-sm"
                        >
                          <span className="mt-1 text-teal-100">
                            <AppIcon name="check" className="h-4 w-4" strokeWidth={2.2} />
                          </span>
                          <p className="text-sm leading-7 text-white/88 sm:text-[0.96rem]">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="site-container grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[2.2rem] border border-sand/70 shadow-soft">
              <Image
                src={pageMedia.servicesDetail}
                alt="Healthcare professional speaking with a patient"
                width={1200}
                height={1200}
                sizes="(min-width: 1024px) 45vw, 100vw"
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
                title="Our Process"
                description=""
              />
            </ScrollReveal>
            {/* We take a structured approach so supports start with clarity, realistic planning, and agreement on what good service delivery should look like. */}

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
