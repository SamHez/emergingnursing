"use client";

import { cloneElement, isValidElement, useEffect, useMemo, useRef, useState } from "react";
import FeaturePageHero from "../components/sections/FeaturePageHero";
import AppIcon from "../components/ui/AppIcon";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import ScrollReveal from "../components/ui/ScrollReveal";
import SectionHeader from "../components/ui/SectionHeader";
import { company, pageMedia } from "../data/site";
import {
  PUBLIC_API_ENDPOINTS,
  apiPostJson,
  mapApiErrors,
} from "../lib/api";

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

const formSteps = [
  {
    key: "participant",
    number: "01",
    title: "Participant Details",
    description: "Who the referral is for and how we can make contact.",
    fields: [
      "participantName",
      "dateOfBirth",
      "participantPhone",
      "participantEmail",
      "address",
      "ndisNumber",
      "preferredContactMethod",
    ],
  },
  {
    key: "referrer",
    number: "02",
    title: "Referrer Details",
    description: "Who is making the referral and how they are connected.",
    fields: ["referrerName", "relationship", "referrerPhone", "referrerEmail"],
  },
  {
    key: "support",
    number: "03",
    title: "Support & Plan Details",
    description: "Support required, goals, timeframe, and NDIS plan information.",
    fields: [
      "supportRequired",
      "supportNeeds",
      "goals",
      "preferredStartDate",
      "urgency",
      "planManagement",
    ],
  },
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
};

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
  const control = isValidElement(children)
    ? cloneElement(children, {
        ...children.props,
        "aria-invalid": children.props["aria-invalid"] ?? Boolean(error),
        "aria-describedby": [
          children.props["aria-describedby"],
          error ? errorId : null,
        ]
          .filter(Boolean)
          .join(" ") || undefined,
      })
    : children;

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold text-ink">
        {label}
        {required ? <span className="ml-1 text-[#015451]">*</span> : null}
      </label>
      {control}
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

function NextStepsCard({ compact = false, className = "" }) {
  const items = compact ? nextSteps.slice(0, 3) : nextSteps;

  return (
    <Card className={`border-sand/80 bg-white/74 p-7 ${className}`.trim()}>
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
        What happens next?
      </p>
      <div className={`mt-6 grid ${compact ? "gap-3" : "gap-4"}`}>
        {items.map((item, index) => (
          <div
            key={item}
            className={compact ? "flex items-start gap-3" : "flex items-start gap-4 rounded-[1.5rem] bg-[#F8FBFA] px-4 py-4"}
          >
            <span className={`flex items-center justify-center rounded-full bg-[#0C7380] text-sm font-bold text-white ${compact ? "h-8 w-8" : "h-9 w-9"}`}>
              {index + 1}
            </span>
            <p className={`text-sm text-ink/72 ${compact ? "pt-1 leading-6" : "pt-1 leading-7"}`}>{item}</p>
          </div>
        ))}
      </div>
    </Card>
  );
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

  return errors;
}

export default function Referrals() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const formTopRef = useRef(null);
  const shouldScrollToFormRef = useRef(false);

  const supportSummary = useMemo(() => form.supportRequired.join(", "), [form.supportRequired]);
  const activeStep = formSteps[currentStep];

  useEffect(() => {
    if (!shouldScrollToFormRef.current) {
      return;
    }

    shouldScrollToFormRef.current = false;
    formTopRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [currentStep, submitted]);

  function requestFormTopScroll() {
    shouldScrollToFormRef.current = true;
  }

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setSubmissionError("");
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

  function getStepErrors(stepIndex) {
    const allErrors = validateForm(form);
    const stepFields = new Set(formSteps[stepIndex].fields);

    return Object.fromEntries(
      Object.entries(allErrors).filter(([field]) => stepFields.has(field)),
    );
  }

  function handleNextStep() {
    const stepErrors = getStepErrors(currentStep);

    if (Object.keys(stepErrors).length > 0) {
      setErrors((current) => ({ ...current, ...stepErrors }));
      return;
    }

    requestFormTopScroll();
    setCurrentStep((step) => Math.min(step + 1, formSteps.length - 1));
  }

  function handlePreviousStep() {
    requestFormTopScroll();
    setCurrentStep((step) => Math.max(step - 1, 0));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateForm(form);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setSubmissionError("");

    const payload = {
      ...form,
      participantName: form.participantName.trim(),
      participantPhone: form.participantPhone.trim(),
      participantEmail: form.participantEmail.trim(),
      address: form.address.trim(),
      ndisNumber: form.ndisNumber.trim(),
      referrerName: form.referrerName.trim(),
      relationship: form.relationship.trim(),
      organisation: form.organisation.trim(),
      referrerPhone: form.referrerPhone.trim(),
      referrerEmail: form.referrerEmail.trim(),
      supportNeeds: form.supportNeeds.trim(),
      goals: form.goals.trim(),
    };

    try {
      await apiPostJson(PUBLIC_API_ENDPOINTS.referrals, payload);

      requestFormTopScroll();
      setSubmitted({
        participantName: payload.participantName,
        referrerName: payload.referrerName,
        supportSummary,
        urgency: payload.urgency,
      });
      setForm(initialForm);
      setErrors({});
      setCurrentStep(0);
    } catch (error) {
      const fieldErrors = mapApiErrors(error.errors, {
        participant_name: "participantName",
        participant_email: "participantEmail",
        participant_phone: "participantPhone",
        referrer_name: "referrerName",
        referrer_email: "referrerEmail",
        referrer_phone: "referrerPhone",
        relationship_to_participant: "relationship",
        ndis_number: "ndisNumber",
        preferred_contact_method: "preferredContactMethod",
        support_required: "supportRequired",
      });

      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors);
      }

      setSubmissionError(
        error.message || "We could not submit the referral right now. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
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
                <div ref={formTopRef} className="rounded-[2rem] border border-white/40 bg-white/68 p-7 shadow-soft backdrop-saturate-150 sm:p-8">
                  <SectionHeader
                    badge="Referrals"
                    title="Referral Form"
                    description="Emerging Nursing and Disability Services works with participants, families, carers, support coordinators, and plan managers to arrange suitable NDIS supports."
                    
                  />
                </div>
              </ScrollReveal>
            </div>

            {!submitted ? (
              <div>
              <ScrollReveal>
                <NextStepsCard compact />
              </ScrollReveal>
              </div>
            ) : null}
          </div>

          {submitted ? (
            <div className="mt-6 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="grid gap-6">
                <ScrollReveal>
                  <div
                    role="status"
                    aria-live="polite"
                    className="rounded-[1.8rem] bg-[#0F4C4B] px-6 py-8 text-white sm:px-8"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-teal-100">
                      <AppIcon name="check" className="h-4 w-4" strokeWidth={2.2} />
                    </div>
                    <h2 className="mt-5 text-2xl font-bold sm:text-3xl">Referral submitted</h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
                      Thank you. Our intake team has received this referral and will contact{" "}
                      {submitted.referrerName || submitted.participantName} to discuss the next step.
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
                  <NextStepsCard />
                </ScrollReveal>
              </div>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={handleSubmit}
              data-api-endpoint={PUBLIC_API_ENDPOINTS.referrals}
              className="mt-6 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]"
            >
              <div className="xl:col-span-2">
                <div className="rounded-[2rem] border border-white/45 bg-white/68 p-4 shadow-soft sm:p-5">
                  <div className="grid gap-3 lg:grid-cols-3">
                    {formSteps.map((step, index) => {
                      const isActive = index === currentStep;
                      const isCompleted = index < currentStep;

                      return (
                        <button
                          key={step.key}
                          type="button"
                          onClick={() => {
                            if (index <= currentStep) {
                              requestFormTopScroll();
                              setCurrentStep(index);
                            }
                          }}
                          className={`rounded-[1.5rem] border px-5 py-4 text-left transition ${
                            isActive
                              ? "border-[#0C7380] bg-[linear-gradient(145deg,#0F4C4B_0%,#0D6761_100%)] text-white shadow-[0_22px_48px_rgba(10,69,67,0.12)]"
                              : isCompleted
                                ? "border-[#BDE6DF] bg-[#EAF8F7] text-[#0B2D36]"
                                : "border-white/70 bg-white text-ink/72"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className={`text-xs font-semibold uppercase tracking-[0.26em] ${isActive ? "text-white/70" : "text-[#015451]"}`}>
                              Step {step.number}
                            </span>
                            {isCompleted ? (
                              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/14 text-current">
                                <AppIcon name="check" className="h-4 w-4" strokeWidth={2.3} />
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-3 text-lg font-bold">{step.title}</p>
                          <p className={`mt-2 text-sm leading-6 ${isActive ? "text-white/78" : "text-ink/62"}`}>
                            {step.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="xl:col-span-2">
                <div className="rounded-[2.2rem] border border-white/45 bg-white/62 p-4 shadow-soft sm:p-5">
                  <SectionBlock
                    title={activeStep.title}
                    description={activeStep.description}
                  >
                    <div key={activeStep.key} className="referral-step-panel">
                      {currentStep === 0 ? (
                        <>
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
                        </>
                      ) : null}

                      {currentStep === 1 ? (
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
                      ) : null}

                      {currentStep === 2 ? (
                        <div className="grid gap-8">
                        <div>
                          <fieldset>
                            <legend className="text-sm font-semibold text-ink">
                              Support required <span className="ml-1 text-[#015451]">*</span>
                            </legend>
                            <div
                              className="mt-4 grid gap-3 sm:grid-cols-2"
                              aria-describedby={errors.supportRequired ? "supportRequired-error" : undefined}
                            >
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
                          </fieldset>
                          {errors.supportRequired ? (
                            <p
                              id="supportRequired-error"
                              className="mt-3 text-sm font-medium text-rose-700"
                            >
                              {errors.supportRequired}
                            </p>
                          ) : null}
                        </div>

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

                        <div>
                          <fieldset>
                            <legend className="text-sm font-semibold text-ink">
                              NDIS plan management <span className="ml-1 text-[#015451]">*</span>
                            </legend>
                            <div
                              className="mt-4 grid gap-3 sm:grid-cols-2"
                              aria-describedby={errors.planManagement ? "planManagement-error" : undefined}
                            >
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
                          </fieldset>
                          {errors.planManagement ? (
                            <p
                              id="planManagement-error"
                              className="mt-3 text-sm font-medium text-rose-700"
                            >
                              {errors.planManagement}
                            </p>
                          ) : null}
                        </div>

                        <div className="rounded-[1.5rem] border border-[#DDECEA] bg-[#F8FBFA] px-5 py-5">
                          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#015451]">
                            Review before submitting
                          </p>
                          <div className="mt-4 grid gap-3 text-sm leading-7 text-ink/72 sm:grid-cols-2">
                            <p><span className="font-semibold text-ink">Participant:</span> {form.participantName || "Not provided yet"}</p>
                            <p><span className="font-semibold text-ink">Referrer:</span> {form.referrerName || "Not provided yet"}</p>
                            <p><span className="font-semibold text-ink">Support:</span> {supportSummary || "Not selected yet"}</p>
                            <p><span className="font-semibold text-ink">Plan management:</span> {form.planManagement || "Not selected yet"}</p>
                          </div>
                        </div>
                        </div>
                      ) : null}
                    </div>

                    {submissionError ? (
                      <div
                        role="alert"
                        className="mt-6 rounded-[1.2rem] border border-rose-200 bg-rose-50 px-4 py-4 text-sm leading-7 text-rose-800"
                      >
                        {submissionError}
                      </div>
                    ) : null}

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-sm font-medium text-ink/58">
                        Step {currentStep + 1} of {formSteps.length}
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        {currentStep > 0 ? (
                          <Button
                            type="button"
                            variant="ghost"
                            size="lg"
                            onClick={handlePreviousStep}
                          >
                            Back
                          </Button>
                        ) : null}
                        {currentStep < formSteps.length - 1 ? (
                          <Button
                            type="button"
                            size="lg"
                            className="justify-center"
                            onClick={handleNextStep}
                          >
                            Continue
                          </Button>
                        ) : (
                          <Button
                            size="lg"
                            className="justify-center disabled:cursor-not-allowed disabled:opacity-70"
                            type="submit"
                            disabled={submitting}
                          >
                            {submitting ? "Submitting..." : "Submit Referral"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </SectionBlock>
                </div>
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
                          <AppIcon name="phone" className="h-5 w-5" />
                        </span>
                        <span className="text-sm font-semibold">{company.phone}</span>
                      </a>
                      <a href={company.emailHref} className="flex items-center gap-3 rounded-[1.4rem] bg-white/8 px-4 py-4 hover:bg-white/12">
                        <span className="text-teal-200">
                          <AppIcon name="mail" className="h-5 w-5" />
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
