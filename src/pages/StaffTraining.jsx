import { useEffect, useMemo, useState } from "react";
import FeaturePageHero from "../components/sections/FeaturePageHero";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import ScrollReveal from "../components/ui/ScrollReveal";
import SectionHeader from "../components/ui/SectionHeader";
import { company, pageMedia, pageMeta } from "../data/site";
import { trainingModules } from "../data/training";
import { usePageSeo } from "../hooks/usePageSeo";

const STORAGE_KEY = "emerging_training_records";
const workflowSteps = [
  {
    id: 1,
    label: "Select module",
    description: "Pick the training topic to review.",
  },
  {
    id: 2,
    label: "Complete quiz",
    description: "Answer the quick knowledge check.",
  },
  {
    id: 3,
    label: "Get certificate",
    description: "Generate or print the completion record.",
  },
];

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M6 4.5h10.5A1.5 1.5 0 0 1 18 6v13.5H7.5A1.5 1.5 0 0 0 6 21V4.5Z" />
      <path d="M6 18h12" strokeLinecap="round" />
      <path d="M9 8h6M9 11h6" strokeLinecap="round" />
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

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-ink">{label}</label>
      {children}
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
  return new Intl.DateTimeFormat("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

function createCertificateId(moduleId) {
  return `ENDS-${moduleId.toUpperCase().slice(0, 4)}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export default function StaffTraining() {
  usePageSeo(pageMeta.training);

  const [records, setRecords] = useState({});
  const [selectedId, setSelectedId] = useState(trainingModules[0].id);
  const [answers, setAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [step, setStep] = useState(1);
  const [staffName, setStaffName] = useState("");
  const [staffNameError, setStaffNameError] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    setRecords(saved);
  }, []);

  const selectedModule = useMemo(
    () => trainingModules.find((module) => module.id === selectedId),
    [selectedId],
  );
  const completionRecords = useMemo(
    () =>
      Object.values(records).sort(
        (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime(),
      ),
    [records],
  );

  const selectedRecord = selectedModule ? records[selectedModule.id] : null;
  const canOpenCertificateStep = Boolean(quizResult || selectedRecord);
  const currentScore = quizResult?.score ?? selectedRecord?.score ?? null;

  useEffect(() => {
    setAnswers({});
    setQuizResult(null);
    setStaffName(selectedRecord?.staffName || "");
    setStaffNameError("");
  }, [selectedId, selectedRecord?.staffName]);

  useEffect(() => {
    return () => {
      document.body.classList.remove("printing-certificate");
    };
  }, []);

  function moduleStatus(module) {
    if (records[module.id]?.completedAt) {
      return "Completed";
    }

    if (selectedId === module.id) {
      return "In Progress";
    }

    return "Not Started";
  }

  function updateAnswer(index, value) {
    setAnswers((current) => ({ ...current, [index]: Number(value) }));
  }

  function selectModule(moduleId, nextStep = 1) {
    setSelectedId(moduleId);
    setStep(nextStep);
  }

  function resetWorkflow() {
    setAnswers({});
    setQuizResult(null);
    setStaffName(selectedRecord?.staffName || "");
    setStaffNameError("");
    setStep(1);
  }

  function submitQuiz(event) {
    event.preventDefault();
    // Allow quiz to complete regardless of answers — treat as passed for demo purposes
    const score = selectedModule.quiz.reduce((total, item, index) => {
      return total + (answers[index] === item.answer ? 1 : 0);
    }, 0);

    const passed = true; // demo: always pass

    setQuizResult({
      passed,
      score: score,
      message: "Quiz recorded. Enter the staff name below to generate the certificate.",
    });
    // advance to certificate step
    setStep(3);
  }

  function completeModule() {
    if (!staffName.trim()) {
      setStaffNameError("Staff name is required to generate a certificate.");
      return;
    }

    const existingRecord = records[selectedModule.id];

    const completion = {
      moduleId: selectedModule.id,
      moduleTitle: selectedModule.title,
      staffName: staffName.trim(),
      completedAt: new Date().toISOString(),
      certificateId: existingRecord?.certificateId ?? createCertificateId(selectedModule.id),
      score: quizResult?.score ?? existingRecord?.score ?? selectedModule.passScore,
      total: existingRecord?.total ?? selectedModule.quiz.length,
    };

    const nextRecords = {
      ...records,
      [selectedModule.id]: completion,
    };

    setRecords(nextRecords);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextRecords));
    setStaffNameError("");
    setSelectedId(selectedModule.id);
    setStep(3);
  }

  function printCertificate() {
    document.body.classList.add("printing-certificate");
    window.print();
    window.setTimeout(() => {
      document.body.classList.remove("printing-certificate");
    }, 200);
  }

  return (
    <div className="bg-cream">
      <FeaturePageHero
        chips={["STAFF TRAINING", "Compliance Demo"]}
        title="Staff Training & Competency"
        description="Training resources and completion records to support safe, consistent, person-centred care."
        note=""
        image={pageMedia.trainingHero}
        actions={
          <Button href="#training-modules" size="lg">
            Open Training Workflow
          </Button>
        }
      />

      <section id="training-modules" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute right-[-8rem] top-6 h-48 w-48 rounded-full bg-teal-100/70" />
        <div className="pointer-events-none absolute left-[-8rem] top-1/3 h-56 w-56 rounded-full bg-[#EAF8F7]" />
        <div className="site-container">
          <ScrollReveal>
            <SectionHeader
              badge="Training Modules"
              title="Training Modules"
              description="Select a module, complete the quiz, and generate the certificate from one guided workflow without jumping to another section."
              align="center"
              className="mx-auto"
            />
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="mt-12 rounded-[2.4rem] border border-sand/80 bg-[#F6FAF9] p-3 shadow-soft">
              <div className="grid gap-3 lg:grid-cols-3">
                {workflowSteps.map((item) => {
                  const isActive = step === item.id;
                  const isLocked = item.id === 3 && !canOpenCertificateStep;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={isLocked}
                      onClick={() => !isLocked && setStep(item.id)}
                      className={`rounded-[1.5rem] border px-5 py-5 text-left transition ${
                        isActive
                          ? "border-[#0C7380] bg-[#0B3F3E] text-white shadow-soft"
                          : isLocked
                            ? "cursor-not-allowed border-transparent bg-white/70 text-ink/38"
                            : "border-transparent bg-white text-ink hover:border-[#0C7380]/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                            isActive
                              ? "bg-white/14 text-white"
                              : isLocked
                                ? "bg-sand/60 text-ink/45"
                                : "bg-[#E8F6F4] text-[#015451]"
                          }`}
                        >
                          {item.id}
                        </span>
                        <div>
                          <p className="text-base font-semibold">{item.label}</p>
                          <p className={`mt-1 text-sm ${isActive ? "text-white/72" : "text-ink/58"}`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 rounded-[2rem] bg-white p-5 sm:p-7 lg:p-8">
                {step === 1 ? (
                  <div className="grid gap-6">
                    <div className="rounded-[2rem] bg-[#0B3F3E] px-6 py-7 text-white sm:px-8">
                      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                        <div className="max-w-3xl">
                          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9EE4DA]">
                            Selected module
                          </p>
                          <h2 className="mt-4 text-3xl font-display font-semibold leading-tight sm:text-4xl">
                            {selectedModule.title}
                          </h2>
                          <p className="mt-4 text-sm leading-8 text-white/74">{selectedModule.summary}</p>
                          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-semibold text-white">
                              <ClockIcon />
                              {selectedModule.duration}
                            </span>
                            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 font-semibold text-white">
                              {moduleStatus(selectedModule)}
                            </span>
                            {selectedRecord ? (
                              <span className="inline-flex items-center gap-2 rounded-full bg-[#DFF5ED] px-4 py-2 font-semibold text-[#0B6D57]">
                                <CheckIcon />
                                Completed {formatDate(selectedRecord.completedAt)}
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <Button onClick={() => setStep(2)} size="lg">
                            Start quiz
                          </Button>
                          {selectedRecord ? (
                            <Button variant="ghostDark" onClick={() => setStep(3)} size="lg">
                              View certificate
                            </Button>
                          ) : null}
                          <Button variant="ghostDark" onClick={resetWorkflow} size="lg">
                            Reset
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      {trainingModules.map((module) => {
                        const status = moduleStatus(module);
                        const active = module.id === selectedId;

                        return (
                          <button
                            key={module.id}
                            type="button"
                            onClick={() => selectModule(module.id, 1)}
                            className="h-full w-full text-left"
                          >
                            <div
                              className={`flex h-full flex-col rounded-[1.7rem] border px-5 py-5 transition ${
                                active
                                  ? "border-[#0C7380] bg-[#0F4C4B] text-white shadow-soft"
                                  : "border-sand/80 bg-[#FBFCFB] text-ink hover:border-[#0C7380]/35 hover:bg-white"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div
                                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                                    active ? "bg-white/12 text-white" : "bg-[#E8F6F4] text-[#015451]"
                                  }`}
                                >
                                  <BookIcon />
                                </div>
                                <span
                                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                    active
                                      ? "bg-white/12 text-white"
                                      : status === "Completed"
                                        ? "bg-[#DFF5ED] text-[#0B6D57]"
                                        : status === "In Progress"
                                          ? "bg-[#EEF6F5] text-[#015451]"
                                          : "bg-[#F1F1EE] text-ink/70"
                                  }`}
                                >
                                  {active ? "Selected" : status}
                                </span>
                              </div>

                              <h3
                                className={`mt-5 text-xl font-bold leading-tight ${
                                  active ? "text-white" : "text-ink"
                                }`}
                              >
                                {module.title}
                              </h3>
                              <p className={`mt-3 text-sm leading-7 ${active ? "text-white/76" : "text-ink/66"}`}>
                                {module.description}
                              </p>

                              <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm">
                                <span
                                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold ${
                                    active ? "bg-white/10 text-white" : "bg-white text-[#015451]"
                                  }`}
                                >
                                  <ClockIcon />
                                  {module.duration}
                                </span>
                                {records[module.id]?.completedAt ? (
                                  <span className={`inline-flex items-center gap-2 text-xs font-semibold ${
                                    active ? "text-white/84" : "text-[#0B6D57]"
                                  }`}>
                                    <CheckIcon />
                                    Completed
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
                    <Card className="border-sand/80 bg-[#F7FBFA] p-7">
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
                        Module detail
                      </p>
                      <h2 className="mt-4 text-3xl font-display font-semibold leading-tight text-ink">
                        {selectedModule.title}
                      </h2>
                      <p className="mt-4 text-sm leading-8 text-ink/68">{selectedModule.summary}</p>
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-[1.4rem] bg-white px-4 py-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0C7380]">
                            Duration
                          </p>
                          <p className="mt-2 text-base font-semibold text-ink">{selectedModule.duration}</p>
                        </div>
                        <div className="rounded-[1.4rem] bg-white px-4 py-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0C7380]">
                            Pass mark
                          </p>
                          <p className="mt-2 text-base font-semibold text-ink">
                            {selectedModule.passScore}/{selectedModule.quiz.length}
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Button variant="ghost" onClick={() => setStep(1)}>
                          Change module
                        </Button>
                        <Button variant="ghost" onClick={resetWorkflow}>
                          Reset
                        </Button>
                      </div>
                    </Card>

                    <Card className="border-sand/80 bg-white p-8">
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
                        Quick quiz
                      </p>
                      <form onSubmit={submitQuiz} className="mt-6 grid gap-6">
                        {selectedModule.quiz.map((item, index) => (
                          <div key={item.question} className="rounded-[1.5rem] bg-[#FBFCFB] px-5 py-5">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#015451]">
                              Question {index + 1}
                            </p>
                            <p className="mt-3 text-base font-semibold text-ink">{item.question}</p>
                            <div className="mt-4 grid gap-3">
                              {item.options.map((option, optionIndex) => (
                                <label
                                  key={option}
                                  className={`flex items-start gap-3 rounded-[1rem] border px-4 py-4 text-sm ${
                                    answers[index] === optionIndex
                                      ? "border-[#0C7380] bg-[#EAF8F7] text-[#015451]"
                                      : "border-sand/90 bg-white text-ink"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={`question-${selectedModule.id}-${index}`}
                                    checked={answers[index] === optionIndex}
                                    onChange={() => updateAnswer(index, optionIndex)}
                                    className="mt-1 h-4 w-4 border-sand text-[#0C7380] focus:ring-teal-200"
                                  />
                                  <span>{option}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-sm leading-7 text-ink/62">
                            Pass mark for this module: {selectedModule.passScore} out of{" "}
                            {selectedModule.quiz.length}.
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <Button type="button" variant="ghost" onClick={() => setStep(1)}>
                              Back to modules
                            </Button>
                            <Button type="submit" size="lg">
                              Finish quiz
                            </Button>
                          </div>
                        </div>
                      </form>
                    </Card>
                  </div>
                ) : null}

                {step === 3 ? (
                  <div className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
                    <Card className="border-sand/80 bg-white p-7">
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
                        Completion details
                      </p>

                      {quizResult ? (
                        <div
                          className={`mt-5 rounded-[1.5rem] px-5 py-5 ${
                            quizResult.passed ? "bg-[#EAF8F7] text-[#015451]" : "bg-[#FFF3F2] text-rose-700"
                          }`}
                        >
                          <p className="text-lg font-bold">
                            Score: {quizResult.score}/{selectedModule.quiz.length}
                          </p>
                          <p className="mt-2 text-sm leading-7">{quizResult.message}</p>
                        </div>
                      ) : selectedRecord ? (
                        <div className="mt-5 rounded-[1.5rem] bg-[#EAF8F7] px-5 py-5 text-[#015451]">
                          <p className="text-lg font-bold">
                            Certificate on file: {selectedRecord.score}/{selectedRecord.total}
                          </p>
                          <p className="mt-2 text-sm leading-7">
                            This module already has a stored completion record. You can print it or
                            update the certificate name below.
                          </p>
                        </div>
                      ) : (
                        <div className="mt-5 rounded-[1.5rem] bg-[#FBFCFB] px-5 py-5 text-ink/68">
                          Complete the quiz first to unlock certificate generation for this module.
                        </div>
                      )}

                      {quizResult || selectedRecord ? (
                        <div className="mt-6 grid gap-4">
                          <Field label="Staff name for certificate">
                            <input
                              type="text"
                              value={staffName}
                              onChange={(event) => {
                                setStaffName(event.target.value);
                                setStaffNameError("");
                              }}
                              className={inputClasses(Boolean(staffNameError))}
                            />
                          </Field>
                          {staffNameError ? (
                            <p className="text-sm font-medium text-rose-700">{staffNameError}</p>
                          ) : null}
                          <div className="flex flex-wrap gap-3">
                            <Button onClick={completeModule} size="lg">
                              {selectedRecord ? "Update certificate" : "Generate certificate"}
                            </Button>
                            <Button variant="ghost" onClick={() => setStep(2)}>
                              Back to quiz
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-6">
                          <Button onClick={() => setStep(2)} size="lg">
                            Go to quiz
                          </Button>
                        </div>
                      )}

                      <div className="mt-8 border-t border-sand/80 pt-8">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
                          Stored completion records
                        </p>
                        <div className="mt-5 grid gap-3">
                          {completionRecords.length > 0 ? (
                            completionRecords.map((record) => (
                              <button
                                key={record.certificateId}
                                type="button"
                                onClick={() => selectModule(record.moduleId, 3)}
                                className={`rounded-[1.4rem] border px-4 py-4 text-left transition ${
                                  record.moduleId === selectedId
                                    ? "border-[#0C7380] bg-[#EAF8F7]"
                                    : "border-sand/90 bg-[#FBFCFB] hover:border-[#0C7380]"
                                }`}
                              >
                                <p className="text-sm font-semibold text-ink">{record.moduleTitle}</p>
                                <p className="mt-2 text-sm leading-7 text-ink/64">
                                  {record.staffName} • {formatDate(record.completedAt)}
                                </p>
                                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0C7380]">
                                  {record.certificateId}
                                </p>
                              </button>
                            ))
                          ) : (
                            <p className="text-sm leading-8 text-ink/66">
                              Completed modules stored in localStorage will appear here.
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>

                    {selectedRecord ? (
                      <div
                        data-print-certificate
                        className="rounded-[2rem] border-[10px] border-[#D5EDE6] bg-[#FBFFFE] p-4 shadow-soft sm:p-6"
                      >
                        <div className="rounded-[1.6rem] border border-[#8DCFC2] px-6 py-8 text-center sm:px-10 sm:py-12">
                          <img
                            src="/assets/brand/logo.png"
                            alt={company.shortName}
                            className="mx-auto h-16 w-auto rounded-[1.2rem] bg-white px-4 py-3"
                          />
                          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-[#0C7380]">
                            Certificate of Completion
                          </p>
                          <h2 className="mt-6 text-3xl font-display font-semibold leading-tight text-ink sm:text-4xl">
                            {selectedRecord.staffName}
                          </h2>
                          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-ink/72">
                            This certificate confirms completion of internal training awareness
                            content.
                          </p>
                          <div className="mt-8 grid gap-4 rounded-[1.5rem] bg-[#F4FBF8] px-5 py-5 text-left sm:grid-cols-2">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0C7380]">
                                Module completed
                              </p>
                              <p className="mt-2 text-sm font-semibold text-ink">
                                {selectedRecord.moduleTitle}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0C7380]">
                                Completion date
                              </p>
                              <p className="mt-2 text-sm font-semibold text-ink">
                                {formatDate(selectedRecord.completedAt)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0C7380]">
                                Certificate ID
                              </p>
                              <p className="mt-2 text-sm font-semibold text-ink">
                                {selectedRecord.certificateId}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0C7380]">
                                Result
                              </p>
                              <p className="mt-2 text-sm font-semibold text-ink">
                                {selectedRecord.score}/{selectedRecord.total}
                              </p>
                            </div>
                          </div>
                          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                            <Button onClick={printCertificate} size="lg">
                              Print / Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Card className="border-sand/80 bg-[#FBFCFB] p-8">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
                          Certificate preview
                        </p>
                        <p className="mt-4 text-sm leading-8 text-ink/66">
                          No certificate has been generated yet for the selected module. Finish the
                          quiz, enter a staff name, and the certificate will appear here.
                        </p>
                        {currentScore !== null ? (
                          <div className="mt-6 rounded-[1.4rem] bg-white px-5 py-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0C7380]">
                              Current result
                            </p>
                            <p className="mt-2 text-lg font-semibold text-ink">
                              {currentScore}/{selectedModule.quiz.length}
                            </p>
                          </div>
                        ) : null}
                      </Card>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
