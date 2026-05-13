import { useMemo, useState } from "react";
import FeaturePageHero from "../components/sections/FeaturePageHero";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import ScrollReveal from "../components/ui/ScrollReveal";
import SectionHeader from "../components/ui/SectionHeader";
import { company, pageMedia, pageMeta } from "../data/site";
import { usePageSeo } from "../hooks/usePageSeo";

const STORAGE_KEY = "emerging_referrals_demo";

const supportOptions = [
  "Nursing Support",
  "Support Coordination",
  "Support Work",
  "In-Home Support",
  "Community Access",
  "Capacity Building",
  "Transport Support",
  "Employment Support",
  "Other",
];

const nextSteps = [
  "We review your referral",
  "We contact you for an initial conversation",
  "We arrange an initial meeting",
  "We prepare a personalised support plan",
];

const initialForm = {
  participantName: "",
  dateOfBirth: "",
  participantPhone: "",
  participantEmail: "",
  address: "",
  ndisNumber: "",
  preferredContactMethod: "",
  referrerName: "",
  relationship: "",
  organisation: "",
  referrerPhone: "",
  referrerEmail: "",
  supportRequired: [],
  supportNeeds: "",
  goals: "",
  preferredStartDate: "",
  urgency: "Standard",
  planManagement: "",
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

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionBlock({ title, description, children }) {
  return (
    <div className="rounded-[1.9rem] border border-white/40 bg-white/72 p-6 shadow-soft sm:p-7">
      <div className="max-w-3xl space-y-2">
        <h2 className="text-xl font-bold text-ink sm:text-2xl">{title}</h2>
        {description ? <p className="text-sm leading-7 text-ink/66">{description}</p> : null}
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Field({ label, name, error, required = false, children }) {
  const errorId = `${name}-error`;

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold text-ink">
        {label}
        {required ? <span className="ml-1 text-[#015451]">*</span> : null}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="text-sm font-medium text-rose-700">
          {error}
        </p>
      ) : null}
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

  if (!form.participantName.trim()) errors.participantName = "Participant full name is required.";
  if (!form.dateOfBirth) errors.dateOfBirth = "Date of birth is required.";
  if (!form.participantPhone.trim()) errors.participantPhone = "Participant phone is required.";
  if (!form.participantEmail.trim()) errors.participantEmail = "Participant email is required.";
  if (!form.address.trim()) errors.address = "Address or suburb is required.";
  if (!form.ndisNumber.trim()) errors.ndisNumber = "NDIS number is required.";
  if (!form.preferredContactMethod) {
    errors.preferredContactMethod = "Please choose a preferred contact method.";
  }

  if (!form.referrerName.trim()) errors.referrerName = "Referrer full name is required.";
  if (!form.relationship.trim()) errors.relationship = "Relationship to participant is required.";
  if (!form.referrerPhone.trim()) errors.referrerPhone = "Referrer phone is required.";
  if (!form.referrerEmail.trim()) errors.referrerEmail = "Referrer email is required.";

  if (form.supportRequired.length === 0) {
    errors.supportRequired = "Select at least one type of support.";
  }

  if (!form.supportNeeds.trim()) {
    errors.supportNeeds = "Please describe the support needs.";
  }

  if (!form.goals.trim()) {
    errors.goals = "Please describe the participant goals or outcomes.";
  }

  if (!form.preferredStartDate) {
    errors.preferredStartDate = "Preferred start date is required.";
  }

  if (!form.urgency) {
    errors.urgency = "Please choose an urgency level.";
  }

  if (!form.planManagement) {
    errors.planManagement = "Please choose the NDIS plan management type.";
  }

  if (!form.consent) {
    errors.consent = "Consent is required before submitting a referral.";
  }

  return errors;
}

export default function Referrals() {
  usePageSeo(pageMeta.referrals);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const supportSummary = useMemo(() => form.supportRequired.join(", "), [form.supportRequired]);

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function toggleSupport(option) {
    setForm((current) => {
      const exists = current.supportRequired.includes(option);
      return {
        ...current,
        supportRequired: exists
          ? current.supportRequired.filter((item) => item !== option)
          : [...current.supportRequired, option],
      };
    });
    setErrors((current) => ({ ...current, supportRequired: undefined }));
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
      supportSummary,
    };

    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    localStorage.setItem(STORAGE_KEY, JSON.stringify([payload, ...existing]));

    // Connect your API or email service here when backend handling is confirmed.
    // Example: await fetch("/api/referrals", { method: "POST", body: JSON.stringify(payload) });
    // Example: trigger an email workflow using your chosen provider after validation succeeds.

    setSubmitted(payload);
    setForm(initialForm);
    setErrors({});
  }

  return (
    <div className="bg-cream">
      <FeaturePageHero
        chips={["REFERRALS", "NDIS Intake"]}
        title="Make a Referral"
        description="Complete the form below and our team will contact you to discuss support needs, goals, and next steps."
        note="We work with participants, families, carers, support coordinators, plan managers, and representatives to coordinate suitable NDIS supports with clarity and care."
        image={pageMedia.referralsHero}
      />

      <section className="relative overflow-hidden bg-[#F6F3EC] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute left-[-8rem] top-8 h-48 w-48 rounded-full bg-white/70" />
        <div className="pointer-events-none absolute right-[-8rem] bottom-8 h-56 w-56 rounded-full bg-teal-100/70" />
        <div className="site-container">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
            <div>
              <ScrollReveal>
                <div className="rounded-[2rem] border border-white/40 bg-white/68 p-7 shadow-soft backdrop-saturate-150 sm:p-8">
                  <SectionHeader
                    badge="Referrals"
                    title="Referral Form"
                    description="Emerging Nursing and Disability Services works with participants, families, carers, support coordinators, and plan managers to arrange suitable NDIS supports."
                  />
                </div>
              </ScrollReveal>
            </div>

            <div>
              <ScrollReveal>
                <Card className="border-sand/80 bg-white/74 p-7">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
                    What happens next?
                  </p>
                  <div className="mt-6 grid gap-3">
                    {nextSteps.slice(0, 3).map((item, index) => (
                      <div key={item} className="flex items-start gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0C7380] text-sm font-bold text-white">
                          {index + 1}
                        </span>
                        <p className="pt-1 text-sm leading-6 text-ink/72">{item}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </ScrollReveal>
            </div>
          </div>

          {submitted ? (
            <div className="mt-6 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="grid gap-6">
                <ScrollReveal>
                  <div className="rounded-[1.8rem] bg-[#0F4C4B] px-6 py-8 text-white sm:px-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-teal-100">
                      <CheckIcon />
                    </div>
                    <h2 className="mt-5 text-2xl font-bold sm:text-3xl">Referral submitted</h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
                      Thank you. This demo submission has been saved locally for review and our team
                      would next contact {submitted.referrerName || submitted.participantName} to
                      discuss the referral.
                    </p>
                    <div className="mt-6 rounded-[1.5rem] bg-white/10 px-5 py-5 text-sm leading-7 text-white/84">
                      <p>
                        <span className="font-semibold text-white">Participant:</span> {submitted.participantName}
                      </p>
                      <p>
                        <span className="font-semibold text-white">Support requested:</span> {submitted.supportSummary}
                      </p>
                      <p>
                        <span className="font-semibold text-white">Urgency:</span> {submitted.urgency}
                      </p>
                    </div>
                    <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                      <Button onClick={() => setSubmitted(null)} variant="secondary" size="lg">
                        Submit Another
                      </Button>
                      <Button to="/contact" variant="ghostDark" size="lg">
                        Contact Us
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              <div className="grid gap-6">
                <ScrollReveal delay={120}>
                  <Card className="border-sand/80 bg-white/74 p-7">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
                      What happens next?
                    </p>
                    <div className="mt-6 grid gap-4">
                      {nextSteps.map((item, index) => (
                        <div key={item} className="flex items-start gap-4 rounded-[1.5rem] bg-[#F8FBFA] px-4 py-4">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0C7380] text-sm font-bold text-white">
                            {index + 1}
                          </span>
                          <p className="pt-1 text-sm leading-7 text-ink/72">{item}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </ScrollReveal>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit} className="mt-6 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="xl:col-span-2">
                <SectionBlock
                  title="Participant Details"
                  description="Basic participant information helps us understand who the referral is for and how to make contact."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Participant full name" name="participantName" error={errors.participantName} required>
                      <input
                        id="participantName"
                        name="participantName"
                        type="text"
                        value={form.participantName}
                        onChange={(event) => updateField("participantName", event.target.value)}
                        className={inputClasses(Boolean(errors.participantName))}
                        aria-invalid={Boolean(errors.participantName)}
                      />
                    </Field>
                    <Field label="Date of birth" name="dateOfBirth" error={errors.dateOfBirth} required>
                      <input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={form.dateOfBirth}
                        onChange={(event) => updateField("dateOfBirth", event.target.value)}
                        className={inputClasses(Boolean(errors.dateOfBirth))}
                        aria-invalid={Boolean(errors.dateOfBirth)}
                      />
                    </Field>
                    <Field label="Phone" name="participantPhone" error={errors.participantPhone} required>
                      <input
                        id="participantPhone"
                        name="participantPhone"
                        type="tel"
                        value={form.participantPhone}
                        onChange={(event) => updateField("participantPhone", event.target.value)}
                        className={inputClasses(Boolean(errors.participantPhone))}
                        aria-invalid={Boolean(errors.participantPhone)}
                      />
                    </Field>
                    <Field label="Email" name="participantEmail" error={errors.participantEmail} required>
                      <input
                        id="participantEmail"
                        name="participantEmail"
                        type="email"
                        value={form.participantEmail}
                        onChange={(event) => updateField("participantEmail", event.target.value)}
                        className={inputClasses(Boolean(errors.participantEmail))}
                        aria-invalid={Boolean(errors.participantEmail)}
                      />
                    </Field>
                    <Field label="Address/suburb" name="address" error={errors.address} required>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        value={form.address}
                        onChange={(event) => updateField("address", event.target.value)}
                        className={inputClasses(Boolean(errors.address))}
                        aria-invalid={Boolean(errors.address)}
                      />
                    </Field>
                    <Field label="NDIS number" name="ndisNumber" error={errors.ndisNumber} required>
                      <input
                        id="ndisNumber"
                        name="ndisNumber"
                        type="text"
                        value={form.ndisNumber}
                        onChange={(event) => updateField("ndisNumber", event.target.value)}
                        className={inputClasses(Boolean(errors.ndisNumber))}
                        aria-invalid={Boolean(errors.ndisNumber)}
                      />
                    </Field>
                  </div>

                  <div className="mt-5">
                    <Field
                      label="Preferred contact method"
                      name="preferredContactMethod"
                      error={errors.preferredContactMethod}
                      required
                    >
                      <select
                        id="preferredContactMethod"
                        name="preferredContactMethod"
                        value={form.preferredContactMethod}
                        onChange={(event) => updateField("preferredContactMethod", event.target.value)}
                        className={inputClasses(Boolean(errors.preferredContactMethod))}
                        aria-invalid={Boolean(errors.preferredContactMethod)}
                      >
                        <option value="">Select one</option>
                        <option value="Phone">Phone</option>
                        <option value="Email">Email</option>
                        <option value="Either">Either</option>
                      </select>
                    </Field>
                  </div>
                </SectionBlock>
              </div>

              <div className="xl:col-span-2">
                <ScrollReveal>
                  <div className="rounded-[2.2rem] border border-white/45 bg-white/62 p-4 shadow-soft sm:p-5">
                    <SectionBlock
                      title="Referrer Details"
                      description="Tell us who is making the referral and how they are connected to the participant."
                    >
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Referrer full name" name="referrerName" error={errors.referrerName} required>
                          <input
                            id="referrerName"
                            name="referrerName"
                            type="text"
                            value={form.referrerName}
                            onChange={(event) => updateField("referrerName", event.target.value)}
                            className={inputClasses(Boolean(errors.referrerName))}
                            aria-invalid={Boolean(errors.referrerName)}
                          />
                        </Field>
                        <Field label="Relationship to participant" name="relationship" error={errors.relationship} required>
                          <input
                            id="relationship"
                            name="relationship"
                            type="text"
                            value={form.relationship}
                            onChange={(event) => updateField("relationship", event.target.value)}
                            className={inputClasses(Boolean(errors.relationship))}
                            aria-invalid={Boolean(errors.relationship)}
                          />
                        </Field>
                        <Field label="Organisation" name="organisation" error={errors.organisation}>
                          <input
                            id="organisation"
                            name="organisation"
                            type="text"
                            value={form.organisation}
                            onChange={(event) => updateField("organisation", event.target.value)}
                            className={inputClasses(Boolean(errors.organisation))}
                            aria-invalid={Boolean(errors.organisation)}
                          />
                        </Field>
                        <Field label="Phone" name="referrerPhone" error={errors.referrerPhone} required>
                          <input
                            id="referrerPhone"
                            name="referrerPhone"
                            type="tel"
                            value={form.referrerPhone}
                            onChange={(event) => updateField("referrerPhone", event.target.value)}
                            className={inputClasses(Boolean(errors.referrerPhone))}
                            aria-invalid={Boolean(errors.referrerPhone)}
                          />
                        </Field>
                        <div className="sm:col-span-2">
                          <Field label="Email" name="referrerEmail" error={errors.referrerEmail} required>
                            <input
                              id="referrerEmail"
                              name="referrerEmail"
                              type="email"
                              value={form.referrerEmail}
                              onChange={(event) => updateField("referrerEmail", event.target.value)}
                              className={inputClasses(Boolean(errors.referrerEmail))}
                              aria-invalid={Boolean(errors.referrerEmail)}
                            />
                          </Field>
                        </div>
                      </div>
                    </SectionBlock>

                    <SectionBlock
                      title="Support Required"
                      description="Select the areas where support may be required."
                    >
                      <div className="grid gap-3 sm:grid-cols-2">
                        {supportOptions.map((option) => {
                          const checked = form.supportRequired.includes(option);

                          return (
                            <label
                              key={option}
                              className={`flex items-center gap-3 rounded-[1.1rem] border px-4 py-4 text-sm font-medium transition ${
                                checked
                                  ? "border-[#0C7380] bg-[#EAF8F7] text-[#015451]"
                                  : "border-sand/90 bg-white text-ink"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleSupport(option)}
                                className="h-4 w-4 rounded border-sand text-[#0C7380] focus:ring-teal-200"
                              />
                              <span>{option}</span>
                            </label>
                          );
                        })}
                      </div>
                      {errors.supportRequired ? (
                        <p className="mt-3 text-sm font-medium text-rose-700">{errors.supportRequired}</p>
                      ) : null}
                    </SectionBlock>

                    <SectionBlock
                      title="Support Details"
                      description="Help us understand the participant’s current needs, goals, and preferred timeframe."
                    >
                      <div className="grid gap-5">
                        <Field label="Brief description of support needs" name="supportNeeds" error={errors.supportNeeds} required>
                          <textarea
                            id="supportNeeds"
                            name="supportNeeds"
                            rows="4"
                            value={form.supportNeeds}
                            onChange={(event) => updateField("supportNeeds", event.target.value)}
                            className={inputClasses(Boolean(errors.supportNeeds))}
                            aria-invalid={Boolean(errors.supportNeeds)}
                          />
                        </Field>
                        <Field label="Goals or outcomes the participant wants to achieve" name="goals" error={errors.goals} required>
                          <textarea
                            id="goals"
                            name="goals"
                            rows="4"
                            value={form.goals}
                            onChange={(event) => updateField("goals", event.target.value)}
                            className={inputClasses(Boolean(errors.goals))}
                            aria-invalid={Boolean(errors.goals)}
                          />
                        </Field>
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Field label="Preferred start date" name="preferredStartDate" error={errors.preferredStartDate} required>
                            <input
                              id="preferredStartDate"
                              name="preferredStartDate"
                              type="date"
                              value={form.preferredStartDate}
                              onChange={(event) => updateField("preferredStartDate", event.target.value)}
                              className={inputClasses(Boolean(errors.preferredStartDate))}
                              aria-invalid={Boolean(errors.preferredStartDate)}
                            />
                          </Field>
                          <Field label="Urgency level" name="urgency" error={errors.urgency} required>
                            <select
                              id="urgency"
                              name="urgency"
                              value={form.urgency}
                              onChange={(event) => updateField("urgency", event.target.value)}
                              className={inputClasses(Boolean(errors.urgency))}
                              aria-invalid={Boolean(errors.urgency)}
                            >
                              <option value="Standard">Standard</option>
                              <option value="Soon">Soon</option>
                              <option value="Urgent">Urgent</option>
                            </select>
                          </Field>
                        </div>
                      </div>
                    </SectionBlock>

                    <SectionBlock
                      title="NDIS Plan Details"
                      description="Tell us how the participant’s plan is currently managed."
                    >
                      <div className="grid gap-3 sm:grid-cols-2">
                        {["Plan managed", "Self managed", "NDIA managed", "Unsure"].map((option) => (
                          <label
                            key={option}
                            className={`flex items-center gap-3 rounded-[1.1rem] border px-4 py-4 text-sm font-medium transition ${
                              form.planManagement === option
                                ? "border-[#0C7380] bg-[#EAF8F7] text-[#015451]"
                                : "border-sand/90 bg-white text-ink"
                            }`}
                          >
                            <input
                              type="radio"
                              name="planManagement"
                              value={option}
                              checked={form.planManagement === option}
                              onChange={(event) => updateField("planManagement", event.target.value)}
                              className="h-4 w-4 border-sand text-[#0C7380] focus:ring-teal-200"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                      {errors.planManagement ? (
                        <p className="mt-3 text-sm font-medium text-rose-700">{errors.planManagement}</p>
                      ) : null}
                    </SectionBlock>

                    <SectionBlock title="Consent">
                      <label className="flex items-start gap-3 rounded-[1.1rem] border border-sand/90 bg-white px-4 py-4 text-sm text-ink">
                        <input
                          type="checkbox"
                          checked={form.consent}
                          onChange={(event) => updateField("consent", event.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-sand text-[#0C7380] focus:ring-teal-200"
                        />
                        <span>
                          I confirm the participant or authorised representative consents to being
                          contacted about this referral.
                        </span>
                      </label>
                      {errors.consent ? (
                        <p className="mt-3 text-sm font-medium text-rose-700">{errors.consent}</p>
                      ) : null}
                    </SectionBlock>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm leading-7 text-ink/62">
                        This is a frontend-ready demo form. Submitted entries are stored locally in
                        your browser for preview purposes only.
                      </p>
                      <Button size="lg" className="justify-center" type="submit">
                        Submit Referral
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              <div className="grid gap-6">
                <ScrollReveal delay={120}>
                  <Card className="border-sand/80 bg-white/74 p-7 hidden">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
                      Contact directly
                    </p>
                    <div className="mt-6 grid gap-4">
                      <a href={company.phoneHref} className="flex items-center gap-3 rounded-[1.4rem] bg-white/8 px-4 py-4 hover:bg-white/12">
                        <span className="text-teal-200">
                          <PhoneIcon />
                        </span>
                        <span className="text-sm font-semibold">{company.phone}</span>
                      </a>
                      <a href={company.emailHref} className="flex items-center gap-3 rounded-[1.4rem] bg-white/8 px-4 py-4 hover:bg-white/12">
                        <span className="text-teal-200">
                          <MailIcon />
                        </span>
                        <span className="text-sm font-semibold">{company.email}</span>
                      </a>
                    </div>
                  </Card>
                </ScrollReveal>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
