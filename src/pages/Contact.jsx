import { useState } from "react";
import FeaturePageHero from "../components/sections/FeaturePageHero";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import ScrollReveal from "../components/ui/ScrollReveal";
import SectionHeader from "../components/ui/SectionHeader";
import { company, pageMedia, pageMeta } from "../data/site";
import { usePageSeo } from "../hooks/usePageSeo";

const STORAGE_KEY = "emerging_contact_demo";

const enquiryOptions = [
  "General enquiry",
  "Referral",
  "Careers",
  "Staff training",
  "Feedback or complaint",
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  enquiryType: "",
  message: "",
  consent: false,
};

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path
        d="M6.8 4h2.4a1 1 0 0 1 1 .82l.42 2.5a1 1 0 0 1-.29.88L8.8 9.74a13 13 0 0 0 5.46 5.46l1.54-1.53a1 1 0 0 1 .88-.29l2.5.42a1 1 0 0 1 .82 1v2.4a1 1 0 0 1-.95 1A15.5 15.5 0 0 1 5.8 4.95 1 1 0 0 1 6.8 4Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M4 7.5h16v9A1.5 1.5 0 0 1 18.5 18h-13A1.5 1.5 0 0 1 4 16.5v-9Z" />
      <path d="m5 8 7 5 7-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
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
  if (!form.enquiryType) errors.enquiryType = "Please choose an enquiry type.";
  if (!form.message.trim()) errors.message = "Please enter your message.";
  if (!form.consent) errors.consent = "Consent is required before submitting.";

  return errors;
}

export default function Contact() {
  usePageSeo(pageMeta.contact);

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

    // Connect an API or email workflow here when backend handling is confirmed.
    // Example: await fetch("/api/contact", { method: "POST", body: JSON.stringify(payload) });

    setSubmitted(payload);
    setForm(initialForm);
    setErrors({});
  }

  return (
    <div className="bg-cream">
      <FeaturePageHero
        chips={["CONTACT", "Support Team"]}
        title="Contact Emerging Nursing"
        description="We are here to help you every step of the way."
        note="Reach out for general enquiries, referrals, careers, training, or feedback and our team will guide the next step clearly."
        image={pageMedia.contactHero}
      />

      <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute right-[-8rem] top-8 h-48 w-48 rounded-full bg-teal-100/70" />
        <div className="site-container">
          <ScrollReveal>
            <SectionHeader
              badge="Contact Details"
              title="Get In Touch"
              description="Emerging Nursing and Disability Services PVT LTD is a Registered NDIS Provider in Western Australia, supporting participants and families across local service areas."
              align="center"
              className="mx-auto"
            />
          </ScrollReveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <ScrollReveal>
              <Card className="h-full border-sand/80 bg-[#FBFCFB] p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F6F4] text-[#015451]">
                  <PhoneIcon />
                </div>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
                  Phone
                </p>
                <a href={company.phoneHref} className="mt-3 block text-xl font-bold text-ink">
                  {company.phone}
                </a>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={60}>
              <Card className="h-full border-sand/80 bg-[#FBFCFB] p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F6F4] text-[#015451]">
                  <MailIcon />
                </div>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
                  Email
                </p>
                <a href={company.emailHref} className="mt-3 block text-xl font-bold break-all text-ink">
                  {company.email}
                </a>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <Card className="h-full border-sand/80 bg-[#FBFCFB] p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F6F4] text-[#015451]">
                  <PinIcon />
                </div>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
                  Locations
                </p>
                <div className="mt-3 space-y-3 text-sm leading-7 text-ink/72">
                  {company.contactLocations.map((location) => (
                    <p key={location}>{location}</p>
                  ))}
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={180}>
              <Card className="h-full border-sand/80 bg-[linear-gradient(180deg,#0F4C4B_0%,#0B6764_100%)] p-7 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-200">
                  Referral
                </p>
                <p className="mt-4 text-sm leading-8 text-white/78">
                  Need to discuss supports for a participant? Start with the referral pathway.
                </p>
                <div className="mt-6">
                  <Button to="/referrals" variant="secondary">
                    Make a Referral
                  </Button>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#F4F8F7] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute left-[-10rem] top-20 h-56 w-56 rounded-full bg-white/80" />
        <div className="site-container grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="grid gap-6">
            <ScrollReveal>
              <div className="rounded-[2.2rem] border border-white/45 bg-white/72 p-4 shadow-soft">
                {submitted ? (
                  <div className="rounded-[1.8rem] bg-[#0F4C4B] px-6 py-8 text-white sm:px-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-teal-100">
                      <CheckIcon />
                    </div>
                    <h2 className="mt-5 text-2xl font-bold sm:text-3xl">Enquiry received</h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
                      Thanks for getting in touch. This demo enquiry has been saved locally and is
                      ready to connect to a future API or email workflow.
                    </p>
                    <div className="mt-6 rounded-[1.5rem] bg-white/10 px-5 py-5 text-sm leading-7 text-white/84">
                      <p>
                        <span className="font-semibold text-white">Name:</span> {submitted.fullName}
                      </p>
                      <p>
                        <span className="font-semibold text-white">Enquiry type:</span>{" "}
                        {submitted.enquiryType}
                      </p>
                    </div>
                    <div className="mt-6">
                      <Button onClick={() => setSubmitted(null)} variant="secondary" size="lg">
                        Send Another Enquiry
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form noValidate onSubmit={handleSubmit} className="rounded-[1.8rem] bg-[#F8F4EC] p-6 sm:p-7">
                    <SectionHeader
                      badge="Contact Form"
                      title="Tell us how we can help."
                      description="Use this form for general enquiries, referrals, training questions, careers interest, or feedback."
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
                      <Field label="Enquiry type" name="enquiryType" error={errors.enquiryType} required>
                        <select
                          id="enquiryType"
                          value={form.enquiryType}
                          onChange={(event) => updateField("enquiryType", event.target.value)}
                          className={inputClasses(Boolean(errors.enquiryType))}
                        >
                          <option value="">Select one</option>
                          {enquiryOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <div className="sm:col-span-2">
                        <Field label="Message" name="message" error={errors.message} required>
                          <textarea
                            id="message"
                            rows="5"
                            value={form.message}
                            onChange={(event) => updateField("message", event.target.value)}
                            className={inputClasses(Boolean(errors.message))}
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
                          I consent to being contacted about this enquiry and understand this is a
                          frontend demo submission stored locally in the browser.
                        </span>
                      </label>
                      {errors.consent ? (
                        <p className="mt-3 text-sm font-medium text-rose-700">{errors.consent}</p>
                      ) : null}
                    </div>

                    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm leading-7 text-ink/62">
                        Backend integration for email or CRM handling can be connected here later.
                      </p>
                      <Button type="submit" size="lg" className="justify-center">
                        Send Enquiry
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

          <div className="grid gap-6">


            <ScrollReveal delay={180}>
              <Card className="hidden border-sand/80 bg-[linear-gradient(180deg,#0F4C4B_0%,#0D6761_100%)] p-7 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-200">
                  Direct support
                </p>
                <p className="mt-4 text-sm leading-8 text-white/78">
                  If your enquiry is urgent or you would prefer to speak directly, contact the team
                  by phone or email.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button href={company.phoneHref} variant="secondary">
                    Call Our Team
                  </Button>
                  <Button href={company.emailHref} variant="ghostDark">
                    Email Us
                  </Button>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
