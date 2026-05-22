"use client";

import { cloneElement, isValidElement, useEffect, useMemo, useState } from "react";
import FeaturePageHero from "../components/sections/FeaturePageHero";
import AppIcon from "../components/ui/AppIcon";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import ScrollReveal from "../components/ui/ScrollReveal";
import SectionHeader from "../components/ui/SectionHeader";
import { sampleJobs } from "../data/jobs";
import { company, pageMedia } from "../data/site";
import {
  PUBLIC_API_ENDPOINTS,
  apiPostFormData,
  fetchPublicJobs,
  mapApiErrors,
} from "../lib/api";

const MAX_RESUME_SIZE_MB = 10;
const ACCEPTED_RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"];
const ACCEPTED_RESUME_INPUT = ".pdf,.doc,.docx";

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
  jobSelection: "",
  jobId: "",
  role: "",
  location: "",
  availability: "",
  qualifications: "",
  experience: "",
  resume: null,
  message: "",
};

function normalizeJob(job, index, isFallback = false) {
  return {
    id: typeof job.id === "number" ? job.id : null,
    selectValue:
      typeof job.id === "number" && !isFallback ? `job-${job.id}` : `fallback-${index}`,
    title: job.title || "Vacancy",
    location: job.location || "Western Australia",
    employmentType: job.employment_type || job.type || "",
    description: job.description || job.summary || "Role details will be shared during recruitment.",
    requirements:
      job.requirements || "Role requirements will be confirmed as part of the application process.",
    isFallback,
  };
}

const fallbackJobs = sampleJobs.map((job, index) => normalizeJob(job, index, true));

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

function validateResume(file) {
  if (!file) {
    return "";
  }

  const lowerName = file.name.toLowerCase();
  const allowedExtension = ACCEPTED_RESUME_EXTENSIONS.some((extension) =>
    lowerName.endsWith(extension),
  );

  if (!allowedExtension) {
    return "Please upload a PDF, DOC, or DOCX file.";
  }

  if (file.size > MAX_RESUME_SIZE_MB * 1024 * 1024) {
    return `Please upload a file smaller than ${MAX_RESUME_SIZE_MB}MB.`;
  }

  return "";
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

  const resumeError = validateResume(form.resume);
  if (resumeError) errors.resume = resumeError;

  return errors;
}

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState("");
  const [form, setForm] = useState(initialForm);
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [submitted, setSubmitted] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadJobs() {
      try {
        const items = await fetchPublicJobs();
        if (!active) {
          return;
        }

        setJobs(items.map((job, index) => normalizeJob(job, index)));
        setJobsError("");
      } catch (error) {
        if (!active) {
          return;
        }

        setJobs([]);
        setJobsError(
          error.message || "Live vacancies are temporarily unavailable. You can still send a general application.",
        );
      } finally {
        if (active) {
          setJobsLoading(false);
        }
      }
    }

    loadJobs();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isInterestModalOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeInterestModal();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isInterestModalOpen, submitted]);

  const vacancyItems = useMemo(() => {
    if (jobs.length > 0) {
      return jobs;
    }

    return jobsError ? fallbackJobs : [];
  }, [jobs, jobsError]);

  const roleOptions = useMemo(() => {
    if (jobs.length > 0) {
      return jobs;
    }

    return jobsError ? fallbackJobs : [];
  }, [jobs, jobsError]);

  function openInterestModal(selection = "") {
    if (selection) {
      handleRoleChange(selection);
    }

    setSubmissionError("");
    setIsInterestModalOpen(true);
  }

  function closeInterestModal() {
    setIsInterestModalOpen(false);

    if (submitted) {
      setSubmitted(null);
      setForm(initialForm);
      setErrors({});
      setSubmissionError("");
    }
  }

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setSubmissionError("");
  }

  function handleRoleChange(value) {
    if (value === "general") {
      setForm((current) => ({
        ...current,
        jobSelection: "general",
        jobId: "",
        role: "General Expression of Interest",
        location: "",
      }));
      setErrors((current) => ({ ...current, role: undefined }));
      setSubmissionError("");
      return;
    }

    const selectedJob = roleOptions.find((job) => job.selectValue === value);

    setForm((current) => ({
      ...current,
      jobSelection: value,
      jobId: selectedJob?.id ? String(selectedJob.id) : "",
      role: selectedJob?.title || "",
      location: selectedJob?.location || "",
    }));
    setErrors((current) => ({ ...current, role: undefined }));
    setSubmissionError("");
  }

  function handleResumeChange(event) {
    const file = event.target.files?.[0] || null;
    const resumeError = validateResume(file);

    setForm((current) => ({ ...current, resume: resumeError ? null : file }));
    setErrors((current) => ({
      ...current,
      resume: resumeError || undefined,
    }));
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

    const payload = new FormData();
    payload.append("full_name", form.fullName.trim());
    payload.append("email", form.email.trim());
    payload.append("phone", form.phone.trim());
    payload.append("role", form.role);
    payload.append("availability", form.availability.trim());
    payload.append("qualifications", form.qualifications.trim());
    payload.append("experience", form.experience.trim());

    if (form.location.trim()) {
      payload.append("location", form.location.trim());
    }

    if (form.jobId) {
      payload.append("job_id", form.jobId);
    }

    if (form.message.trim()) {
      payload.append("message", form.message.trim());
    }

    if (form.resume) {
      payload.append("resume", form.resume);
    }

    try {
      await apiPostFormData(PUBLIC_API_ENDPOINTS.applications, payload);

      setSubmitted({
        fullName: form.fullName.trim(),
        role: form.role,
        availability: form.availability.trim(),
      });
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      const fieldErrors = mapApiErrors(error.errors, {
        full_name: "fullName",
        job_id: "role",
        cover_message: "experience",
        resume: "resume",
      });

      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors);
      }

      setSubmissionError(
        error.message || "We could not send your application right now. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-cream">
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
            <Button onClick={() => openInterestModal()} variant="ghostDark" size="lg">
              Submit Expression of Interest
            </Button>
          </>
        }
      />

      <section id="vacancies" className="relative overflow-hidden bg-[#F4F8F7] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute left-[-10rem] top-20 h-56 w-56 rounded-full bg-white/80" />
        <div className="site-container">
          <ScrollReveal>
            <SectionHeader badge="Vacancies" title="Current Vacancies" description="" />
          </ScrollReveal>

          {jobsLoading ? (
            <div className="mt-12 rounded-[2rem] border border-sand/80 bg-white px-6 py-8 text-sm leading-7 text-ink/66">
              Loading current vacancies...
            </div>
          ) : null}

          {!jobsLoading && jobsError ? (
            <div className="mt-6 rounded-[1.6rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-7 text-amber-900">
              {jobsError}
            </div>
          ) : null}

          {!jobsLoading && vacancyItems.length === 0 ? (
            <div className="mt-12 rounded-[2rem] border border-sand/80 bg-white px-6 py-8 text-sm leading-7 text-ink/66">
              There are no published vacancies right now. You can still submit a general expression
              of interest below.
            </div>
          ) : null}

          {vacancyItems.length > 0 ? (
            <div className="mt-12 grid gap-6 xl:grid-cols-2">
              {vacancyItems.map((job, index) => (
                <ScrollReveal key={job.selectValue} delay={index * 80}>
                  <Card className="h-full overflow-hidden border-sand/80 bg-white p-0">
                    <div className="grid h-full gap-0 lg:grid-cols-[0.82fr_1.18fr]">
                      <div className="rounded-[1.875rem] bg-[linear-gradient(180deg,#0F4C4B_0%,#0B6764_100%)] px-7 py-8 text-white">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-100/84">
                          Vacancy
                        </p>
                        <h2 className="mt-4 text-3xl font-display font-semibold leading-tight">
                          {job.title}
                        </h2>
                        <div className="mt-6 flex flex-wrap gap-3 text-sm">
                          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                            <AppIcon name="mapPin" className="h-4 w-4" />
                            {job.location}
                          </span>
                          {job.employmentType ? (
                            <span className="inline-flex rounded-full bg-white/10 px-4 py-2">
                              {job.employmentType}
                            </span>
                          ) : null}
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
                          <Button onClick={() => openInterestModal(job.selectValue)} size="md">
                            Apply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          ) : null}
        </div>
      </section>

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
              const iconName =
                index % 3 === 0 ? "heart" : index % 3 === 1 ? "briefcaseBusiness" : "trendingUp";

              return (
                <ScrollReveal key={item.title} delay={index * 70}>
                  <Card className="h-full border-sand/80 bg-[#FBFCFB] p-7">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F6F4] text-[#015451]">
                      <AppIcon name={iconName} className="h-5 w-5" />
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
                  We are looking for compassionate professionals who value accountability, trust, respect, passion, and inclusiveness
                </p>
                <div className="mt-6">
                  <Button onClick={() => openInterestModal()} variant="ghost">
                      Open Application Form
                  </Button>
                </div>
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
                  Discover our staff training resources and see how structured awareness modules can help strengthen onboarding and improve team competency.
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
                  <div className="rounded-[1.8rem] bg-[#F8F4EC] px-6 py-7 sm:px-8">
                    <SectionHeader
                      badge="Interest Form"
                      title="Expression of Interest"
                      description="Open the application form in a focused popup to submit your interest, upload your resume, and share your availability."
                    />
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="max-w-2xl text-sm leading-7 text-ink/68">
                        You can apply for a current vacancy or send a general expression of interest.
                        Our recruitment team will review your details and contact you if your profile
                        aligns with upcoming roles.
                      </p>
                      <Button onClick={() => openInterestModal()} size="lg">
                        Open Application Form
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {isInterestModalOpen ? (
        <div
          className="fixed inset-0 z-[110] flex items-start justify-center bg-[#072D33]/65 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="careers-interest-modal-title"
          onClick={closeInterestModal}
        >
          <div
            className="relative max-h-[calc(100vh-3rem)] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/45 bg-white shadow-[0_30px_90px_rgba(5,34,40,0.24)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeInterestModal}
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-sand/80 bg-white text-ink shadow-soft transition hover:bg-cream"
              aria-label="Close application form"
            >
              <AppIcon name="x" className="h-5 w-5" strokeWidth={2} />
            </button>

            {submitted ? (
              <div
                role="status"
                aria-live="polite"
                className="bg-[#0F4C4B] px-6 py-8 text-white sm:px-8 sm:py-10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-teal-100">
                  <AppIcon name="check" className="h-4 w-4" strokeWidth={2.2} />
                </div>
                <h2 id="careers-interest-modal-title" className="mt-5 text-2xl font-bold sm:text-3xl">
                  Application received
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
                  Thanks for your interest. Our recruitment team has received your application and
                  will review it shortly.
                </p>
                <div className="mt-6 rounded-[1.5rem] bg-white/10 px-5 py-5 text-sm leading-7 text-white/84">
                  <p>
                    <span className="font-semibold text-white">Applicant:</span> {submitted.fullName}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Role:</span> {submitted.role}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Availability:</span> {submitted.availability}
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button onClick={closeInterestModal} variant="secondary" size="lg">
                    Close
                  </Button>
                  <Button onClick={() => setSubmitted(null)} variant="ghostDark" size="lg">
                    Submit Another Application
                  </Button>
                </div>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={handleSubmit}
                data-api-endpoint={PUBLIC_API_ENDPOINTS.applications}
                className="rounded-[2rem] bg-[#F8F4EC] p-6 sm:p-7 lg:p-8"
              >
                <SectionHeader
                  badge="Interest Form"
                  title="Expression of Interest"
                  description=""
                  headingId="careers-interest-modal-title"
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
                      value={form.jobSelection}
                      onChange={(event) => handleRoleChange(event.target.value)}
                      className={inputClasses(Boolean(errors.role))}
                      disabled={jobsLoading}
                    >
                      <option value="">
                        {jobsLoading ? "Loading roles..." : "Select a role"}
                      </option>
                      {roleOptions.map((job) => (
                        <option key={job.selectValue} value={job.selectValue}>
                          {job.title}
                          {job.employmentType ? ` • ${job.employmentType}` : ""}
                        </option>
                      ))}
                      <option value="general">General Expression of Interest</option>
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
                    <Field label="Upload resume" name="resume" error={errors.resume}>
                      <div className="rounded-[1.2rem] border border-dashed border-sand bg-white px-5 py-5">
                        <input
                          id="resume"
                          type="file"
                          accept={ACCEPTED_RESUME_INPUT}
                          onChange={handleResumeChange}
                          className={inputClasses(Boolean(errors.resume))}
                        />
                        <p className="mt-3 text-sm leading-7 text-ink/64">
                          Accepted file types: PDF, DOC, DOCX. Maximum file size: {MAX_RESUME_SIZE_MB}MB.
                        </p>
                        {form.resume ? (
                          <p className="mt-2 text-sm font-medium text-ink">
                            Selected file: {form.resume.name}
                          </p>
                        ) : null}
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
                    size="lg"
                    type="submit"
                    disabled={submitting}
                    className="justify-center disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
