"use client";

import { cloneElement, isValidElement, useState } from "react";
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
};

const contactCards = [
  {
    label: "Phone",
    icon: "phone",
    value: company.phone,
    href: company.phoneHref,
  },
  {
    label: "Email",
    icon: "mail",
    value: company.email,
    href: company.emailHref,
  },
  {
    label: "Location",
    icon: "mapPin",
    value: company.contactLocations[0],
    href: null,
  },
];

function Field({ label, name, error, required = false, children }) {
  const errorId = `${name}-error`;
  const control = isValidElement(children)
    ? cloneElement(children, {
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
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

function validateForm(form) {
  const errors = {};

  if (!form.fullName.trim()) errors.fullName = "Full name is required.";
  if (!form.email.trim()) errors.email = "Email is required.";
  if (!form.phone.trim()) errors.phone = "Phone is required.";
  if (!form.enquiryType) errors.enquiryType = "Please choose an enquiry type.";
  if (!form.message.trim()) errors.message = "Please enter your message.";

  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [submitted, setSubmitted] = useState(null);

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setSubmissionError("");
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

    try {
      await apiPostJson(PUBLIC_API_ENDPOINTS.contact, {
        full_name: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        subject: form.enquiryType,
        message: form.message.trim(),
      });

      setSubmitted({
        fullName: form.fullName.trim(),
        enquiryType: form.enquiryType,
      });
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      const fieldErrors = mapApiErrors(error.errors, {
        full_name: "fullName",
        subject: "enquiryType",
      });

      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors);
      }

      setSubmissionError(
        error.message || "We could not send your enquiry right now. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
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

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {contactCards.map((card, index) => (
              <ScrollReveal key={card.label} delay={index * 60}>
                <Card className="h-full border-white/10 bg-[linear-gradient(150deg,#0F4C4B_0%,#0D6761_52%,#0A7B73_100%)] p-7 text-white shadow-[0_28px_60px_rgba(10,69,67,0.16)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/14 text-white shadow-[0_12px_28px_rgba(4,22,24,0.14)]">
                    <AppIcon name={card.icon} className="h-5 w-5" />
                  </div>
                  <p className="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-white/74">
                    {card.label}
                  </p>
                  {card.href ? (
                    <a
                      href={card.href}
                      className="mt-3 block text-[1.35rem] font-semibold leading-[1.45] break-words text-white"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <p className="mt-3 text-[1.35rem] font-semibold leading-[1.55] text-white">
                      {card.value}
                    </p>
                  )}
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#F4F8F7] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute left-[-10rem] top-20 h-56 w-56 rounded-full bg-white/80" />
        <div className="site-container grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="xl:col-span-2">
            <ScrollReveal>
              <div className="rounded-[2.2rem] border border-white/45 bg-white/72 p-4 shadow-soft">
                {submitted ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="rounded-[1.8rem] bg-[linear-gradient(145deg,#0F4C4B_0%,#0D6761_48%,#0C7F74_100%)] px-6 py-10 text-white sm:px-10 sm:py-12"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/12 text-teal-100 ring-1 ring-white/12">
                      <AppIcon name="check" className="h-5 w-5" strokeWidth={2.3} />
                    </div>
                    <div className="mx-auto mt-6 max-w-2xl text-center">
                      <h2 className="text-3xl font-bold tracking-[-0.03em] sm:text-[2.2rem]">Enquiry received</h2>
                      <p className="mt-4 text-sm leading-7 text-white/82 sm:text-base">
                      Thanks for getting in touch. Our team has received your enquiry and will be in
                      contact soon.
                      </p>
                    </div>
                    <div className="mx-auto mt-7 max-w-xl rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-5 text-center text-sm leading-7 text-white/84">
                      <p>
                        <span className="font-semibold text-white">Name:</span> {submitted.fullName}
                      </p>
                      <p>
                        <span className="font-semibold text-white">Enquiry type:</span>{" "}
                        {submitted.enquiryType}
                      </p>
                    </div>
                    <div className="mt-8 flex justify-center">
                      <Button onClick={() => setSubmitted(null)} variant="secondary" size="lg" className="min-w-[14rem] justify-center">
                        Send Another Enquiry
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form
                    noValidate
                    onSubmit={handleSubmit}
                    data-api-endpoint={PUBLIC_API_ENDPOINTS.contact}
                    className="rounded-[1.8rem] bg-[#F8F4EC] p-6 sm:p-7"
                  >
                    <SectionHeader
                      badge="Contact Form"
                      title="Tell us how we can help."
                      description="Use this form for general enquiries, referrals, training questions, careers interest, or feedback."
                    />

                    <div className="mt-8 grid gap-5">
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

                    {submissionError ? (
                      <div
                        role="alert"
                        className="mt-6 rounded-[1.2rem] border border-rose-200 bg-rose-50 px-4 py-4 text-sm leading-7 text-rose-800"
                      >
                        {submissionError}
                      </div>
                    ) : null}

                    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={submitting}
                        className="justify-center disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {submitting ? "Sending..." : "Send Enquiry"}
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
