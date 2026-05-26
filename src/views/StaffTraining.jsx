"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import FeaturePageHero from "../components/sections/FeaturePageHero";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import ScrollReveal from "../components/ui/ScrollReveal";
import SectionHeader from "../components/ui/SectionHeader";
import { company, pageMedia } from "../data/site";
import { apiGet, apiPostJson, buildPublicApiUrl, mapApiErrors, PUBLIC_API_ENDPOINTS } from "../lib/api";

const signupInitialState = {
  full_name: "",
  email: "",
  phone: "",
  organisation: "",
  role_position: "",
  course_id: "",
  preferred_training_date: "",
  notes: "",
};

const certificateInitialState = {
  email: "",
  certificate_number: "",
};

function Field({ label, htmlFor, error, hint, children }) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {hint ? <p className="text-sm text-ink/58">{hint}</p> : null}
      {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}
    </div>
  );
}

function inputClasses(hasError) {
  return `w-full rounded-[1.05rem] border bg-white px-4 py-3 text-sm text-ink outline-none transition ${
    hasError
      ? "border-rose-400 ring-2 ring-rose-100"
      : "border-sand/90 focus:border-[#0C7380] focus:ring-4 focus:ring-teal-100"
  }`;
}

function formatDate(date) {
  const timestamp = Date.parse(date);

  if (Number.isNaN(timestamp)) {
    return date;
  }

  return new Intl.DateTimeFormat("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(timestamp));
}

function validateSignup(form) {
  const errors = {};

  if (!form.full_name.trim()) {
    errors.full_name = "Full name is required.";
  }

  if (!form.email.trim()) {
    errors.email = "Email address is required.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Phone number is required.";
  }

  if (!form.course_id) {
    errors.course_id = "Please select a course.";
  }

  return errors;
}

function validateCertificateLookup(form) {
  const errors = {};

  if (!form.email.trim()) {
    errors.email = "Email address is required.";
  }

  return errors;
}

export default function StaffTraining() {
  const [activeTab, setActiveTab] = useState("signup");
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState("");
  const [signupForm, setSignupForm] = useState(signupInitialState);
  const [signupErrors, setSignupErrors] = useState({});
  const [signupSubmitting, setSignupSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState("");
  const [lookupForm, setLookupForm] = useState(certificateInitialState);
  const [lookupErrors, setLookupErrors] = useState({});
  const [lookupSubmitting, setLookupSubmitting] = useState(false);
  const [lookupMessage, setLookupMessage] = useState("");
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadCourses() {
      setCoursesLoading(true);

      try {
        const response = await apiGet(PUBLIC_API_ENDPOINTS.trainingCourses);

        if (!active) {
          return;
        }

        setCourses(Array.isArray(response.items) ? response.items : []);
        setCoursesError("");
      } catch (error) {
        if (!active) {
          return;
        }

        setCourses([]);
        setCoursesError(error.message || "Unable to load training courses right now.");
      } finally {
        if (active) {
          setCoursesLoading(false);
        }
      }
    }

    loadCourses();

    return () => {
      active = false;
    };
  }, []);

  const selectedCourse = useMemo(
    () => courses.find((course) => String(course.id) === String(signupForm.course_id)),
    [courses, signupForm.course_id],
  );

  async function handleSignupSubmit(event) {
    event.preventDefault();

    if (signupSubmitting) {
      return;
    }

    const nextErrors = validateSignup(signupForm);
    setSignupErrors(nextErrors);
    setSignupSuccess("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSignupSubmitting(true);

    try {
      await apiPostJson(PUBLIC_API_ENDPOINTS.trainingSignup, {
        ...signupForm,
        course_id: Number(signupForm.course_id),
      });

      setSignupSuccess("Thank you. Your staff training signup has been received and our team will be in touch.");
      setSignupForm(signupInitialState);
      setSignupErrors({});
    } catch (error) {
      setSignupErrors(
        mapApiErrors(error.errors, {
          fullName: "full_name",
          rolePosition: "role_position",
          preferredTrainingDate: "preferred_training_date",
        }),
      );
      setSignupSuccess("");
    } finally {
      setSignupSubmitting(false);
    }
  }

  async function handleLookupSubmit(event) {
    event.preventDefault();

    if (lookupSubmitting) {
      return;
    }

    const nextErrors = validateCertificateLookup(lookupForm);
    setLookupErrors(nextErrors);
    setLookupMessage("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setLookupSubmitting(true);

    try {
      const response = await apiPostJson(PUBLIC_API_ENDPOINTS.certificateVerify, lookupForm);
      const items = Array.isArray(response.items) ? response.items : [];
      setCertificates(items);
      setLookupMessage(items.length ? "" : "No certificates were found for that email.");
    } catch (error) {
      setCertificates([]);
      setLookupMessage(
        error.message ||
          "We could not find a certificate for that email. Please confirm the email used during training or contact Emerging Nursing.",
      );
      setLookupErrors(mapApiErrors(error.errors));
    } finally {
      setLookupSubmitting(false);
    }
  }

  return (
    <div className="bg-cream">
      <FeaturePageHero
        chips={["STAFF TRAINING", "Certificates"]}
        title="Staff Training & Certificate Access"
        description="Book staff training, keep course participation moving, and help completed participants retrieve their certificate securely."
        note=""
        image={pageMedia.trainingHero}
        actions={
          <div className="flex flex-wrap gap-4">
            <Button href="#staff-training-workflow" size="lg">
              Sign up for training
            </Button>
            <Button href="#staff-training-workflow" variant="secondary" size="lg" onClick={() => setActiveTab("certificate")}>
              Access certificate
            </Button>
          </div>
        }
      />

      <section id="staff-training-workflow" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute right-[-8rem] top-6 h-48 w-48 rounded-full bg-teal-100/70" />
        <div className="pointer-events-none absolute left-[-8rem] top-1/3 h-56 w-56 rounded-full bg-[#EAF8F7]" />
        <div className="site-container">
          <ScrollReveal>
            <SectionHeader
              badge="Training Workflow"
              title="Choose the training action you need"
              description="Register staff for an upcoming course or locate a certificate using the email used during training."
              align="center"
              className="mx-auto"
            />
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3 rounded-[2rem] border border-sand/80 bg-[#F6FAF9] p-3 shadow-soft">
              <button
                type="button"
                className={`inline-flex min-h-14 items-center justify-center rounded-full px-6 text-sm font-semibold transition ${
                  activeTab === "signup"
                    ? "bg-white text-ink shadow-soft"
                    : "bg-transparent text-ink/65 hover:text-ink"
                }`}
                onClick={() => setActiveTab("signup")}
              >
                Sign up for staff training
              </button>
              <button
                type="button"
                className={`inline-flex min-h-14 items-center justify-center rounded-full px-6 text-sm font-semibold transition ${
                  activeTab === "certificate"
                    ? "bg-white text-ink shadow-soft"
                    : "bg-transparent text-ink/65 hover:text-ink"
                }`}
                onClick={() => setActiveTab("certificate")}
              >
                Access certificate
              </button>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_minmax(0,0.95fr)]">
            <ScrollReveal delay={120}>
              <Card className="rounded-[2.4rem] p-7 sm:p-9">
                {activeTab === "signup" ? (
                  <div className="space-y-7">
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0C7380]">
                        Staff Training Signup
                      </p>
                      <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                        Register for the next available course
                      </h2>
                      <p className="max-w-2xl text-base leading-8 text-ink/68">
                        Submit a training request for yourself or a team member. 
                      </p>
                    </div>

                    {signupSuccess ? (
                      <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-800">
                        {signupSuccess}
                      </div>
                    ) : null}

                    {coursesError ? (
                      <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-medium text-rose-700">
                        {coursesError}
                      </div>
                    ) : null}

                    {!coursesLoading && courses.length === 0 ? (
                      <div className="rounded-[1.6rem] border border-sand/80 bg-cream px-5 py-5 text-sm leading-7 text-ink/72">
                        There are no public training courses available at the moment. Please contact{" "}
                        <a className="font-semibold text-teal-800" href={company.emailHref}>
                          {company.email}
                        </a>{" "}
                        to register your interest.
                      </div>
                    ) : null}

                    <form className="space-y-5" onSubmit={handleSignupSubmit}>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Full name" htmlFor="training_full_name" error={signupErrors.full_name}>
                          <input
                            id="training_full_name"
                            className={inputClasses(Boolean(signupErrors.full_name))}
                            value={signupForm.full_name}
                            onChange={(event) => setSignupForm((current) => ({ ...current, full_name: event.target.value }))}
                          />
                        </Field>
                        <Field label="Email address" htmlFor="training_email" error={signupErrors.email}>
                          <input
                            id="training_email"
                            type="email"
                            className={inputClasses(Boolean(signupErrors.email))}
                            value={signupForm.email}
                            onChange={(event) => setSignupForm((current) => ({ ...current, email: event.target.value }))}
                          />
                        </Field>
                        <Field label="Phone number" htmlFor="training_phone" error={signupErrors.phone}>
                          <input
                            id="training_phone"
                            className={inputClasses(Boolean(signupErrors.phone))}
                            value={signupForm.phone}
                            onChange={(event) => setSignupForm((current) => ({ ...current, phone: event.target.value }))}
                          />
                        </Field>
                        <Field label="Organisation / employer" htmlFor="training_organisation" error={signupErrors.organisation}>
                          <input
                            id="training_organisation"
                            className={inputClasses(Boolean(signupErrors.organisation))}
                            value={signupForm.organisation}
                            onChange={(event) => setSignupForm((current) => ({ ...current, organisation: event.target.value }))}
                          />
                        </Field>
                        <Field label="Role / position" htmlFor="training_role_position" error={signupErrors.role_position}>
                          <input
                            id="training_role_position"
                            className={inputClasses(Boolean(signupErrors.role_position))}
                            value={signupForm.role_position}
                            onChange={(event) => setSignupForm((current) => ({ ...current, role_position: event.target.value }))}
                          />
                        </Field>
                        <Field
                          label="Course selection"
                          htmlFor="training_course_id"
                          error={signupErrors.course_id}
                          hint={coursesLoading ? "Loading courses..." : undefined}
                        >
                          <select
                            id="training_course_id"
                            className={inputClasses(Boolean(signupErrors.course_id))}
                            value={signupForm.course_id}
                            onChange={(event) => setSignupForm((current) => ({ ...current, course_id: event.target.value }))}
                            disabled={coursesLoading || courses.length === 0}
                          >
                            <option value="">Select a course</option>
                            {courses.map((course) => (
                              <option key={course.id} value={course.id}>
                                {course.title}
                              </option>
                            ))}
                          </select>
                        </Field>
                        <Field label="Preferred training date" htmlFor="training_preferred_date" error={signupErrors.preferred_training_date}>
                          <input
                            id="training_preferred_date"
                            type="date"
                            className={inputClasses(Boolean(signupErrors.preferred_training_date))}
                            value={signupForm.preferred_training_date}
                            onChange={(event) => setSignupForm((current) => ({ ...current, preferred_training_date: event.target.value }))}
                          />
                        </Field>
                      </div>

                      <Field label="Notes / message" htmlFor="training_notes" error={signupErrors.notes}>
                        <textarea
                          id="training_notes"
                          rows={5}
                          className={`${inputClasses(Boolean(signupErrors.notes))} resize-y`}
                          value={signupForm.notes}
                          onChange={(event) => setSignupForm((current) => ({ ...current, notes: event.target.value }))}
                        />
                      </Field>

                      <div className="flex flex-wrap items-center gap-4">
                        <Button type="submit" size="lg" disabled={signupSubmitting || coursesLoading || courses.length === 0}>
                          {signupSubmitting ? "Submitting..." : "Sign up for staff training"}
                        </Button>
                        {selectedCourse ? (
                          <p className="text-sm leading-7 text-ink/65">
                            Selected course: <span className="font-semibold text-ink">{selectedCourse.title}</span>
                          </p>
                        ) : null}
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-7">
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0C7380]">
                        Certificate Access
                      </p>
                      <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                        Find and download a certificate
                      </h2>
                      <p className="max-w-2xl text-base leading-8 text-ink/68">
                        Enter the email used during training to check whether a certificate is available. If you have the certificate number, add it to narrow the search.
                      </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleLookupSubmit}>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Email address" htmlFor="certificate_email" error={lookupErrors.email}>
                          <input
                            id="certificate_email"
                            type="email"
                            className={inputClasses(Boolean(lookupErrors.email))}
                            value={lookupForm.email}
                            onChange={(event) => setLookupForm((current) => ({ ...current, email: event.target.value }))}
                          />
                        </Field>
                        <Field
                          label="Certificate number"
                          htmlFor="certificate_number"
                          hint="Optional, if you already have the certificate number."
                          error={lookupErrors.certificate_number}
                        >
                          <input
                            id="certificate_number"
                            className={inputClasses(Boolean(lookupErrors.certificate_number))}
                            value={lookupForm.certificate_number}
                            onChange={(event) => setLookupForm((current) => ({ ...current, certificate_number: event.target.value }))}
                          />
                        </Field>
                      </div>

                      <Button type="submit" size="lg" disabled={lookupSubmitting}>
                        {lookupSubmitting ? "Searching..." : "Find my certificate"}
                      </Button>
                    </form>

                    {lookupMessage ? (
                      <div className="rounded-[1.5rem] border border-sand/80 bg-cream px-5 py-4 text-sm leading-7 text-ink/72">
                        {lookupMessage}
                      </div>
                    ) : null}

                    {certificates.length > 0 ? (
                      <div className="space-y-4">
                        {certificates.map((certificate) => (
                          <div
                            key={certificate.id || certificate.certificate_number}
                            className="rounded-[1.6rem] border border-sand/80 bg-[#F7FAFA] p-5 shadow-soft"
                          >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                              <div className="space-y-2">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0C7380]">
                                  {certificate.certificate_number}
                                </p>
                                <h3 className="font-display text-2xl font-semibold text-ink">
                                  {certificate.staff_name}
                                </h3>
                                <p className="text-sm leading-7 text-ink/68">{certificate.course_title_snapshot || certificate.course_title}</p>
                                <p className="text-sm leading-7 text-ink/58">
                                  Completed {formatDate(certificate.completion_date_snapshot || certificate.completion_date)}
                                </p>
                              </div>

                              {certificate.public_download_url ? (
                                <Button href={certificate.public_download_url} size="lg" target="_blank" rel="noreferrer">
                                  Download certificate
                                </Button>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                )}
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={180}>
              <div className="space-y-6">
                <Card tint="teal" className="overflow-hidden rounded-[2.4rem] p-0">
                  <div className="relative m-6 overflow-hidden rounded-[2rem] h-72 sm:m-7 sm:h-80">
                    <Image
                      src={pageMedia.trainingHero}
                      alt="Emerging Nursing training session"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 38vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-950/75 via-teal-900/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/72">Course Access</p>
                      <h3 className="mt-3 font-display text-2xl font-semibold sm:text-[2rem]">
                        Live training options with secure certificate retrieval
                      </h3>
                    </div>
                  </div>
                </Card>

                <Card className="rounded-[2.4rem] p-7 sm:p-8">
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0C7380]">
                        How it works
                      </p>
                      <h3 className="mt-3 font-display text-2xl font-semibold text-ink">
                        Clear steps for staff, coordinators, and employers
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          title: "Choose the right course",
                          copy: "Public course options are pulled from the active training catalogue managed inside the admin portal.",
                        },
                        {
                          title: "Complete the signup",
                          copy: "Training signups are stored securely and appear in the admin records workflow for review and completion.",
                        },
                        {
                          title: "Retrieve the certificate later",
                          copy: "Once a course is completed and certified, the participant can verify their email and download the stored PDF certificate.",
                        },
                      ].map((item, index) => (
                        <div key={item.title} className="rounded-[1.45rem] border border-sand/80 bg-[#F8FBFB] px-5 py-4">
                          <div className="flex items-start gap-4">
                            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 font-semibold text-teal-900">
                              0{index + 1}
                            </span>
                            <div>
                              <h4 className="text-lg font-semibold text-ink">{item.title}</h4>
                              <p className="mt-2 text-sm leading-7 text-ink/68">{item.copy}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-[1.45rem] border border-sand/80 bg-white px-5 py-5">
                      <p className="text-sm leading-7 text-ink/68">
                        Need help booking training or locating a certificate? Contact{" "}
                        <a className="font-semibold text-teal-800" href={company.phoneHref}>
                          {company.phone}
                        </a>{" "}
                        or{" "}
                        <a className="font-semibold text-teal-800" href={company.emailHref}>
                          {company.email}
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
