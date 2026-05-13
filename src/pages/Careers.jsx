import { useState } from "react";
import FeaturePageHero from "../components/sections/FeaturePageHero";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import ScrollReveal from "../components/ui/ScrollReveal";
import SectionHeader from "../components/ui/SectionHeader";
import { sampleJobs } from "../data/jobs";
import { company, pageMedia, pageMeta } from "../data/site";
import { usePageSeo } from "../hooks/usePageSeo";

const STORAGE_KEY = "emerging_careers_demo";

const workplacePoints = [
  {
    title: "Person-centred care culture",
    text: "We focus on care that respects the individual, their goals, and the realities of everyday life.",
  },
  {
    title: "Respectful and inclusive team",
    text: "Our work is guided by professionalism, empathy, and a strong regard for people and perspectives.",
  },
  {
    title: "Meaningful community impact",
    text: "Every role contributes directly to improving autonomy, confidence, and daily wellbeing for participants.",
  },
  {
    title: "Professional growth",
    text: "We value curiosity, initiative, and steady development across support and clinical roles.",
  },
  {
    title: "Training and competency support",
    text: "Learning and capability-building remain part of how we maintain quality and consistency in care delivery.",
  },
  {
    title: "Flexible support environments",
    text: "Our roles can involve home, community, and participant-led settings that keep work varied and purposeful.",
  },
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  role: "",
  availability: "",
  qualifications: "",
  experience: "",
  resumePlaceholder: "",
  message: "",
  consent: false,
};

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
      <rect x="4" y="7" width="16" height="12" rx="2" />
      <path d="M4 12h16" strokeLinecap="round" />
    </svg>
  );
}

function GrowthIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M5 19h14" strokeLinecap="round" />
      <path d="M7 16.5V9m5 7.5V5m5 11.5v-4" strokeLinecap="round" />
      <path d="m15 9 2.5-2.5L20 9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path
        d="M19.5 13.57 12 21l-7.5-7.43A5 5 0 0 1 12 6.18a5 5 0 0 1 7.5 7.39Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path
        d="M12 20s5-3.5 5-8.5a5 5 0 1 0-10 0C7 16.5 12 20 12 20Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="1.75" />
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

function Field({ label, name, error, required = false, children }) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold text-ink">
        {label}
        {required ? <span className="ml-1 text-[#015451]">*</span> : null}
      </label>
      {children}
      {error ? <p className="text-sm font-medium text-rose-700">{error}</p> : null}
    </div>
  );
}

function inputClasses(hasError) {
  return `w-full rounded-[1.1rem] border bg-white px-4 py-3 text-sm text-ink outline-none transition ${
    hasError
      ? "border-rose-400 ring-2 ring-rose-100"
      : "border-sand/90 focus:border-[#0C7380] focus:ring-4 focus:ring-teal-100"
  }`;
}

function validateForm(form) {
  const errors = {};

  if (!form.fullName.trim()) errors.fullName = "Full name is required.";
  if (!form.email.trim()) errors.email = "Email is required.";
  if (!form.phone.trim()) errors.phone = "Phone is required.";
  if (!form.role) errors.role = "Please select a role of interest.";
  if (!form.availability.trim()) errors.availability = "Availability is required.";
  if (!form.qualifications.trim()) errors.qualifications = "Qualifications are required.";
  if (!form.experience.trim()) errors.experience = "Experience summary is required.";
  if (!form.consent) errors.consent = "Consent is required before submitting.";

  return errors;
}

export default function Careers() {
  usePageSeo(pageMeta.careers);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateForm(form);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const payload = {
      ...form,
      submittedAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    localStorage.setItem(STORAGE_KEY, JSON.stringify([payload, ...existing]));

    // Connect your backend or recruitment platform here when available.
    // Example: await fetch("/api/careers", { method: "POST", body: JSON.stringify(payload) });
    // Resume upload should be wired to storage or recruitment software at the same point.

    setSubmitted(payload);
    setForm(initialForm);
    setErrors({});
  }

  return (
    <div className="bg-cream">
      {/*Join a caring, professional team supporting people with disabilities across Western Australia.*/}
      <FeaturePageHero
        chips={["CAREERS", "Join Our Team"]}
        title="Careers at Emerging Nursing"
        description=""
        note="We are building a team of compassionate professionals who care deeply about quality support, respectful relationships, and meaningful participant outcomes."
        image={pageMedia.careersHero}
        actions={
          <>
            <Button href="#vacancies" size="lg">
              View Current Vacancies
            </Button>
            <Button href="#expression-of-interest" variant="ghostDark" size="lg">
              Submit Expression of Interest
            </Button>
          </>
        }
      />

      <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute right-[-8rem] top-6 h-48 w-48 rounded-full bg-teal-100/70" />
        <div className="site-container">
          <ScrollReveal>
            <SectionHeader
              badge="Why Emerging Nursing"
              title="Why Work With Us"
              description="We want people who are thoughtful, capable, and committed to supporting participants with dignity and consistency."
              align="center"
              className="mx-auto"
            />
          </ScrollReveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {workplacePoints.map((item, index) => {
              const Icon = index % 3 === 0 ? HeartIcon : index % 3 === 1 ? BriefcaseIcon : GrowthIcon;

              return (
                <ScrollReveal key={item.title} delay={index * 70}>
                  <Card className="h-full border-sand/80 bg-[#FBFCFB] p-7">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F6F4] text-[#015451]">
                      <Icon />
                    </div>
                    <h2 className="mt-5 text-xl font-bold leading-tight text-ink">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-ink/66">{item.text}</p>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="vacancies" className="relative overflow-hidden bg-[#F4F8F7] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute left-[-10rem] top-20 h-56 w-56 rounded-full bg-white/80" />
        <div className="site-container">
          <ScrollReveal>
            <SectionHeader
              badge="Vacancies"
              title="Current Vacancies"
              description=""
            />
          </ScrollReveal>

          <div className="mt-12 grid gap-6 xl:grid-cols-2 ">
            {sampleJobs.map((job, index) => (
              <ScrollReveal key={job.title} delay={index * 80}>
                <Card className="h-full border-sand/80 bg-white p-0 overflow-hidden">
                  <div className="grid h-full gap-0 lg:grid-cols-[0.82fr_1.18fr]">
                    <div className="bg-[linear-gradient(180deg,#0F4C4B_0%,#0B6764_100%)] px-7 py-8 text-white" style={{borderRadius: '30px'}}>
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-100/84">
                        Vacancy
                      </p>
                      <h2 className="mt-4 text-3xl font-display font-semibold leading-tight">
                        {job.title}
                      </h2>
                      <div className="mt-6 flex flex-wrap gap-3 text-sm">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                          <PinIcon />
                          {job.location}
                        </span>
                        <span className="inline-flex rounded-full bg-white/10 px-4 py-2">
                          {job.type}
                        </span>
                      </div>
                    </div>

                    <div className="flex h-full flex-col px-7 py-8">
                      <p className="text-sm leading-8 text-ink/70">{job.description}</p>
                      <div className="mt-6 rounded-[1.5rem] bg-[#F8FBFA] px-5 py-5">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
                          Requirements summary
                        </p>
                        <p className="mt-3 text-sm leading-7 text-ink/66">{job.requirements}</p>
                      </div>
                      <div className="mt-6">
                        <Button href="#expression-of-interest" size="md">
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="expression-of-interest"
        className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="pointer-events-none absolute right-[-8rem] bottom-8 h-56 w-56 rounded-full bg-teal-100/70" />
        <div className="site-container">
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <ScrollReveal>
              <Card className="border-sand/80 bg-white p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
                  Recruitment note
                </p>
                <p className="mt-4 text-sm leading-8 text-ink/68">
                  We are looking for compassionate professionals who value accountability, trust,
                  respect, passion, and inclusiveness.
                </p>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={60}>
              <Card className="border-sand/80 bg-[linear-gradient(180deg,#0F4C4B_0%,#0D6761_100%)] p-7 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-200">
                  Contact our team
                </p>
                <div className="mt-6 grid gap-4">
                  <a href={company.phoneHref} className="rounded-[1.4rem] bg-white/10 px-4 py-4 hover:bg-white/14">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-100/78">Phone</p>
                    <p className="mt-2 text-base font-semibold">{company.phone}</p>
                  </a>
                  <a href={company.emailHref} className="rounded-[1.4rem] bg-white/10 px-4 py-4 hover:bg-white/14">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-100/78">Email</p>
                    <p className="mt-2 text-base font-semibold">{company.email}</p>
                  </a>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <Card className="border-sand/80 bg-white p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">Training pathway</p>
                <p className="mt-4 text-sm leading-8 text-ink/68">
                  Explore the staff training demo to see how awareness modules, completion
                  tracking, and certificate generation can support onboarding and competency
                  workflows.
                </p>
                <div className="mt-6">
                  <Button to="/staff-training" variant="ghost">
                    View Staff Training
                  </Button>
                </div>
              </Card>
            </ScrollReveal>
          </div>

          <div className="mt-10">
            <div className="grid gap-6">
              <ScrollReveal>
                <div className="rounded-[2.2rem] border border-white/45 bg-white/70 p-4 shadow-soft">
                  {submitted ? (
                  <div className="rounded-[1.8rem] bg-[#0F4C4B] px-6 py-8 text-white sm:px-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-teal-100">
                      <CheckIcon />
                    </div>
                    <h2 className="mt-5 text-2xl font-bold sm:text-3xl">Application received</h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
                      Thanks for your interest. 
                    </p>
                    <div className="mt-6 rounded-[1.5rem] bg-white/10 px-5 py-5 text-sm leading-7 text-white/84">
                      <p>
                        <span className="font-semibold text-white">Applicant:</span>{" "}
                        {submitted.fullName}
                      </p>
                      <p>
                        <span className="font-semibold text-white">Role:</span> {submitted.role}
                      </p>
                      <p>
                        <span className="font-semibold text-white">Availability:</span>{" "}
                        {submitted.availability}
                      </p>
                    </div>
                    <div className="mt-6">
                      <Button onClick={() => setSubmitted(null)} variant="secondary" size="lg">
                        Submit Another Application
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form noValidate onSubmit={handleSubmit} className="rounded-[1.8rem] bg-[#F8F4EC] p-6 sm:p-7">
                    <SectionHeader
                      badge="Intrest Form"
                      title="Expression of Interest"
                      description=""
                    />

                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      <Field label="Full name" name="fullName" error={errors.fullName} required>
                        <input
                          id="fullName"
                          type="text"
                          value={form.fullName}
                          onChange={(event) => updateField("fullName", event.target.value)}
                          className={inputClasses(Boolean(errors.fullName))}
                        />
                      </Field>

                      <Field label="Email" name="email" error={errors.email} required>
                        <input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(event) => updateField("email", event.target.value)}
                          className={inputClasses(Boolean(errors.email))}
                        />
                      </Field>

                      <Field label="Phone" name="phone" error={errors.phone} required>
                        <input
                          id="phone"
                          type="tel"
                          value={form.phone}
                          onChange={(event) => updateField("phone", event.target.value)}
                          className={inputClasses(Boolean(errors.phone))}
                        />
                      </Field>

                      <Field label="Role interested in" name="role" error={errors.role} required>
                        <select
                          id="role"
                          value={form.role}
                          onChange={(event) => updateField("role", event.target.value)}
                          className={inputClasses(Boolean(errors.role))}
                        >
                          <option value="">Select a role</option>
                          {sampleJobs.map((job) => (
                            <option key={job.title} value={job.title}>
                              {job.title}
                            </option>
                          ))}
                          <option value="General Expression of Interest">
                            General Expression of Interest
                          </option>
                        </select>
                      </Field>

                      <Field label="Availability" name="availability" error={errors.availability} required>
                        <input
                          id="availability"
                          type="text"
                          value={form.availability}
                          onChange={(event) => updateField("availability", event.target.value)}
                          placeholder="e.g. Weekdays, evenings, immediate start"
                          className={inputClasses(Boolean(errors.availability))}
                        />
                      </Field>

                      <Field label="Qualifications" name="qualifications" error={errors.qualifications} required>
                        <input
                          id="qualifications"
                          type="text"
                          value={form.qualifications}
                          onChange={(event) => updateField("qualifications", event.target.value)}
                          placeholder="e.g. Cert III, AHPRA, nursing qualification"
                          className={inputClasses(Boolean(errors.qualifications))}
                        />
                      </Field>

                      <div className="sm:col-span-2">
                        <Field label="Experience summary" name="experience" error={errors.experience} required>
                          <textarea
                            id="experience"
                            rows="4"
                            value={form.experience}
                            onChange={(event) => updateField("experience", event.target.value)}
                            className={inputClasses(Boolean(errors.experience))}
                          />
                        </Field>
                      </div>

                      <div className="sm:col-span-2">
                        <Field label="Upload resume" name="resumePlaceholder" error={errors.resumePlaceholder}>
                          <div className="rounded-[1.2rem] border border-dashed border-sand bg-white px-5 py-5">
                            <p className="text-sm font-semibold text-ink">Resume upload placeholder UI</p>
                            <p className="mt-2 text-sm leading-7 text-ink/64">
                              File upload is not connected yet. Add backend storage or recruitment
                              software integration here later.
                            </p>
                            <input
                              id="resumePlaceholder"
                              type="text"
                              value={form.resumePlaceholder}
                              onChange={(event) => updateField("resumePlaceholder", event.target.value)}
                              placeholder="Optional file name note"
                              className={`${inputClasses(false)} mt-4`}
                            />
                          </div>
                        </Field>
                      </div>

                      <div className="sm:col-span-2">
                        <Field label="Message" name="message" error={errors.message}>
                          <textarea
                            id="message"
                            rows="4"
                            value={form.message}
                            onChange={(event) => updateField("message", event.target.value)}
                            className={inputClasses(false)}
                          />
                        </Field>
                      </div>
                    </div>

                    <div className="mt-6 rounded-[1.2rem] border border-sand/90 bg-white px-4 py-4">
                      <label className="flex items-start gap-3 text-sm text-ink">
                        <input
                          type="checkbox"
                          checked={form.consent}
                          onChange={(event) => updateField("consent", event.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-sand text-[#0C7380] focus:ring-teal-200"
                        />
                        <span>
                          I consent to being contacted about this application and understand this is
                          currently a demo submission stored locally in the browser.
                        </span>
                      </label>
                      {errors.consent ? (
                        <p className="mt-3 text-sm font-medium text-rose-700">{errors.consent}</p>
                      ) : null}
                    </div>

                    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                   
                      <Button size="lg" type="submit" className="justify-center">
                        Submit 
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

          </div>
        </div>
      </section>
    </div>
  );
}
