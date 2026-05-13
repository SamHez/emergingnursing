import { useState } from "react";
import { Link } from "react-router-dom";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Reveal from "../components/ui/Reveal";
import SectionHeader from "../components/ui/SectionHeader";
import {
  company,
  homeChoicePoints,
  homeFaqs,
  homeHeroCards,
  homeMedia,
  homeServices,
  homeSteps,
  homeTrustStrip,
  pageMeta,
} from "../data/site";
import { usePageSeo } from "../hooks/usePageSeo";

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartPulseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d="M19.5 13.57 12 21l-7.5-7.43A5 5 0 0 1 12 6.18a5 5 0 0 1 7.5 7.39Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3 12h4l2-3 3 6 2-3h7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m3 10.5 9-7 9 7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 9.5V20h14V9.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 20v-6h5v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CommunityIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" strokeLinecap="round" />
      <circle cx="9.5" cy="7" r="3.5" />
      <path d="M20 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" />
      <path d="M16 3.13a3.5 3.5 0 0 1 0 6.74" strokeLinecap="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3Z" />
      <path d="M5 19l.8 1.8L7.5 22l-1.7.8L5 24l-.8-1.2L2.5 22l1.7-1.2L5 19Z" />
      <path d="m19 14 .8 1.8L21.5 17l-1.7.8L19 19l-.8-1.2-1.7-.8 1.7-1.2L19 14Z" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="8" y="3" width="8" height="4" rx="1.5" />
      <path d="M8 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <path d="M9 12h6M9 16h4" strokeLinecap="round" />
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

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const trustIcons = [ShieldIcon, HomeIcon, HeartPulseIcon, ClipboardIcon];
const serviceIcons = [HeartPulseIcon, SparkIcon, HomeIcon, ClipboardIcon, CommunityIcon];

function HeroSection() {
  return (
    <section className="relative min-h-[30rem] overflow-hidden bg-[#082D36] sm:min-h-[46rem] lg:min-h-[30rem]">
      <img
        src={homeMedia.hero}
        alt="Support worker assisting a participant with guided upper-body movement"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,30,37,0.76)_0%,rgba(6,30,37,0.66)_30%,rgba(6,30,37,0.52)_58%,rgba(6,30,37,0.4)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,30,36,0.12)_0%,rgba(5,30,36,0.18)_32%,rgba(6,52,62,0.62)_72%,rgba(6,52,62,0.94)_100%)]" />
      

      <div className="site-container relative flex min-h-[44rem] flex-col items-center justify-center pb-14 pt-[12.5rem] text-center sm:pb-16 sm:pt-[13rem] lg:min-h-30rem] lg:pb-20 lg:pt-[3rem]">
        <Reveal className="mx-auto w-full max-w-4xl">
          <div className="space-y-7">
            <div className="flex flex-wrap justify-center gap-3">
              <Badge tone="teal">Registered NDIS Provider</Badge>
              {/*<Badge>Western Australia</Badge>*/}
            </div>

            <div className="space-y-5">
              {/*<p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-100/85">
                Emerging Nursing and Disability Services
              </p>*/}
              <h1 className="mx-auto max-w-4xl text-balance text-[1.2rem] font-display font-semibold leading-[1.04] text-white sm:text-[3.35rem] lg:text-[3.4rem]">
                Empowering Independence Through NDIS Support
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-8 text-white/80 sm:text-sm">
                Emerging Nursing and Disability Services supports Australians with disabilities to
                live with greater autonomy, confidence, and choice.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
              <Button to="/referrals" size="lg">
                Make a Referral
              </Button>
              <Button to="/services" variant="secondary" size="lg">
                Explore Services
              </Button>
            </div>
          </div>
        </Reveal>

        {/*<Reveal className="mt-12 w-full hidden">
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2 xl:grid-cols-4">
            {homeHeroCards.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="rounded-[1.8rem] border border-white/12 bg-white/10 p-5 text-left text-white shadow-glass"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-100/84">
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-white/78">{item.text}</p>
              </div>
            ))}
          </div>
        </Reveal>*/}
      </div>
    </section>
  );
}

function TrustStripSection() {
  return (
    <section className="bg-white">
      <div className="site-container">
        <Reveal className="grid gap-0 border-b border-sand/80 py-8 md:grid-cols-[0.92fr_1.08fr] lg:grid-cols-[0.8fr_1.2fr]">
          <div className="pb-6 md:border-r md:border-sand/80 md:pb-0 md:pr-8">
            <p className="max-w-[16rem] text-xl font-semibold leading-tight text-ink">
              Trusted support foundations for participants and families across Western Australia.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 md:pl-8 xl:grid-cols-4">
            {homeTrustStrip.map((item, index) => {
              const Icon = trustIcons[index];

              return (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                    <Icon />
                  </span>
                  <div>
                    <p className="text-base font-bold text-ink">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-ink/60">{item.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="section-pad bg-[#F3F7F6]">
      <div className="site-container grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <Reveal className="order-2 lg:order-1">
          <div className="max-w-2xl space-y-6">
            <Badge tone="default">About Emerging Nursing</Badge>
            <h2 className="text-balance text-4xl font-display font-semibold leading-[1.02] text-ink sm:text-5xl">
              Respectful support that strengthens independence, wellbeing, and everyday confidence.
            </h2>
            <p className="max-w-xl text-base leading-8 text-ink/68 sm:text-lg">
              Emerging Nursing and Disability Services supports people through the NDIS and aims to
              enable Australians with disabilities to live as autonomously and independently as
              possible.
            </p>
            <div className="flex flex-wrap gap-3">
              {company.locations.map((location) => (
                <span
                  key={location}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-teal-800 shadow-soft"
                >
                  {location}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/70 shadow-soft">
            <img
              src={homeMedia.about}
              alt="Support worker assisting a participant at home"
              className="h-[25rem] w-full object-cover sm:h-[28rem]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,36,43,0.04)_0%,rgba(9,36,43,0.52)_100%)]" />
            <div className="absolute bottom-5 left-5 right-5 rounded-[1.4rem] border border-white/15 bg-white/16 p-4 text-white shadow-glass sm:left-auto sm:right-5 sm:max-w-[25rem] sm:p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-100/86">
                Values
              </p>
              <p className="mt-3 text-sm leading-7">
                Accountability • Trust • Respect • Passion • Inclusiveness
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="section-pad bg-white">
      <div className="site-container">
        <Reveal>
          <SectionHeader
            badge="Our Core NDIS Support Services"
            title="Our Services"
            description="A focused service mix delivered with calm coordination, inclusive care, and respect for each participant’s goals and circumstances."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {homeServices.map((service, index) => {
            const Icon = serviceIcons[index];

            return (
              <Reveal key={service.title}>
                <Card className="group h-full bg-[#F8FBFA] p-8">
                  <div className="flex h-full flex-col">
                    <span className="flex  h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-mint-500 text-white shadow-soft">
                      <Icon />
                    </span>
                    <h2 className="mt-7 text-1xl font-display font-semibold leading-tight text-ink ">
                      {service.title}
                    </h2>
                    <p className="mt-4 flex-1 text-sm leading-8 text-ink/66 hidden">
                      {service.description}
                    </p>
                    <Link
                      to="/services"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
                    >
                      Learn more
                      <ArrowIcon />
                    </Link>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SupportStepsSection() {
  return (
    <section className="section-pad bg-white">
      <div className="site-container">
        <Reveal>
          <SectionHeader
            badge="How We Set Up Your Supports"
            title="A simple process that starts with listening well and planning carefully."
            description="We keep the setup process clear, respectful, and participant-focused from the first conversation through to service commencement."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-4">
          {homeSteps.map((item) => (
            <Reveal key={item.step}>
              <Card className="h-full bg-[#FBFCFB] p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
                  Step {item.step}
                </p>
                <h2 className="mt-4 text-xl font-bold leading-tight text-ink">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-ink/66">{item.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChoiceSection() {
  return (
    <section className="section-pad bg-[#F3F7F6]">
      <div className="site-container grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-white/70 shadow-soft">
            <img
              src={homeMedia.choice}
              alt="Caregiver supporting a participant using a wheelchair"
              className="h-[25rem] w-full object-cover sm:h-[30rem]"
            />
          </div>
        </Reveal>

        <Reveal>
          <div className="h-full rounded-[2rem] bg-[#103F47] p-8 text-white shadow-soft sm:p-10 lg:p-12">
            <Badge tone="default">Choice and Control</Badge>
            <h2 className="mt-6 max-w-2xl text-balance text-4xl font-display font-semibold leading-[1.02] text-white sm:text-5xl">
              Planning stays grounded in participant choice, personal values, and everyday realities.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/74">
              Emerging Nursing works to ensure support feels tailored, respectful, and aligned with
              the participant’s goals, preferences, and NDIS plan.
            </p>

            <div className="mt-8 grid gap-4">
              {homeChoicePoints.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-4"
                >
                  <span className="mt-1 text-teal-200">
                    <CheckIcon />
                  </span>
                  <p className="text-sm leading-7 text-white/78">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ReferralBand() {
  return (
    <section className="section-pad bg-white pb-12 pt-16 sm:pb-14">
      <div className="site-container">
        <Reveal className="rounded-[2rem] border border-sand bg-[#F6F1E7] px-8 py-10 shadow-soft sm:px-10 sm:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-700">
                Referral Pathway
              </p>
              <h2 className="mt-3 text-balance text-3xl font-display font-semibold leading-tight text-ink sm:text-4xl">
                Need support for yourself, a family member, or a participant?
              </h2>
            </div>
            <div>
              <Button to="/referrals" size="lg">
                Make a Referral
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CareersSection() {
  return (
    <section className="bg-white pb-12 sm:pb-14">
      <div className="site-container">
        <Reveal>
          <Card className="bg-[#F8FBFA] px-8 py-10 sm:px-10 sm:py-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-700">
                  Careers
                </p>
                <h2 className="mt-3 text-balance text-3xl font-display font-semibold leading-tight text-ink sm:text-4xl">
                  Join a team committed to respectful, person-centred support.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-ink/68">
                  We welcome compassionate professionals who value accountability, trust, respect,
                  passion, and inclusiveness.
                </p>
              </div>
              <div>
                <Button to="/careers" size="lg">
                  View Careers
                </Button>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="rounded-[1.5rem] border border-sand bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
      >
        <span className="text-base font-semibold text-ink sm:text-lg">{item.question}</span>
        <span className={`text-teal-700 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-7 text-ink/66 sm:px-6">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section-pad bg-[#F3F7F6]">
      <div className="site-container grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
        <Reveal>
          <div className="max-w-xl space-y-5">
            <Badge tone="default">Support Info</Badge>
            <h2 className="text-balance text-4xl font-display font-semibold leading-[1.04] text-ink sm:text-5xl">
              Clear answers for participants, families, and referral partners.
            </h2>
            <p className="text-base leading-8 text-ink/68">
              A short overview of common questions about how supports begin, how referrals work,
              and how Emerging Nursing helps people engage with services confidently.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid gap-4">
            {homeFaqs.map((item, index) => (
              <FaqItem
                key={item.question}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="bg-white pb-24 pt-16 sm:pt-20">
      <div className="site-container">
        <Reveal className="rounded-[2rem] border border-sand bg-[#FBF6ED] px-8 py-12 text-center shadow-soft sm:px-10 sm:py-14">
          <Badge tone="dark">Ready to Begin</Badge>
          <h2 className="mx-auto mt-6 max-w-3xl text-balance text-3xl font-display font-semibold leading-tight text-ink sm:text-4xl lg:text-[3.2rem]">
            Ready to start your NDIS support journey?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-ink/68">
            Speak with a team that values compassionate support, thoughtful planning, and services
            designed around real participant goals.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button to="/referrals" size="lg">
              Make a Referral
            </Button>
            <Button to="/contact" variant="ghost" size="lg">
              Contact Us
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  usePageSeo(pageMeta.home);

  return (
    <div className="bg-cream">
      <HeroSection />
      <TrustStripSection />
      <AboutSection />
      <ServicesSection />
      <ChoiceSection />
      {/*<SupportStepsSection />
      <ReferralBand />
      <CareersSection />*/}
      <FaqSection />
    </div>
  );
}
