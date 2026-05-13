import { useEffect, useMemo, useState } from "react";
import FeaturePageHero from "../components/sections/FeaturePageHero";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import ScrollReveal from "../components/ui/ScrollReveal";
import SectionHeader from "../components/ui/SectionHeader";
import { pageMedia, pageMeta } from "../data/site";
import { trainingModules } from "../data/training";
import { usePageSeo } from "../hooks/usePageSeo";

const STORAGE_KEY = "emerging_training_records";

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

  const selectedRecord = selectedModule ? records[selectedModule.id] : null;

  useEffect(() => {
    setAnswers({});
    setQuizResult(null);
    setStaffName(selectedRecord?.staffName || "");
    setStaffNameError("");
  }, [selectedId, selectedRecord?.staffName]);

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

  function submitQuiz(event) {
    event.preventDefault();

    const answeredCount = Object.keys(answers).length;

    if (answeredCount < selectedModule.quiz.length) {
      setQuizResult({
        passed: false,
        score: 0,
        message: "Please answer all quiz questions before submitting.",
      });
      return;
    }

    const score = selectedModule.quiz.reduce((total, item, index) => {
      return total + (answers[index] === item.answer ? 1 : 0);
    }, 0);

    const passed = score >= selectedModule.passScore;

    setQuizResult({
      passed,
      score,
      message: passed
        ? "Quiz passed. Enter the staff name below to generate the certificate."
        : "Quiz result below pass mark. Review the module summary and try again.",
    });
  }

  function completeModule() {
    if (!staffName.trim()) {
      setStaffNameError("Staff name is required to generate a certificate.");
      return;
    }

    const completion = {
      moduleId: selectedModule.id,
      moduleTitle: selectedModule.title,
      staffName: staffName.trim(),
      completedAt: new Date().toISOString(),
      certificateId: createCertificateId(selectedModule.id),
      score: quizResult.score,
      total: selectedModule.quiz.length,
    };

    const nextRecords = {
      ...records,
      [selectedModule.id]: completion,
    };

    setRecords(nextRecords);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextRecords));
    setStaffNameError("");
  }

  function printCertificate() {
    window.print();
  }

  return (
    <div className="bg-cream">
      <FeaturePageHero
        chips={["STAFF TRAINING", "Compliance Demo"]}
        title="Staff Training & Competency"
        description="Training resources and completion records to support safe, consistent, person-centred care."
        note="This lightweight training demo is designed to show how internal modules, quiz completion, and certificate records could later connect to a secure backend or LMS."
        image={pageMedia.trainingHero}
        actions={
          <>
            <Button href="#training-modules" size="lg">
              View Modules
            </Button>
            <Button href="#certificate-record" variant="ghostDark" size="lg">
              View Certificate
            </Button>
          </>
        }
      />

      <section id="training-modules" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute right-[-8rem] top-6 h-48 w-48 rounded-full bg-teal-100/70" />
        <div className="site-container">
          <ScrollReveal>
            <SectionHeader
              badge="Training Modules"
              title="Awareness modules built for safe, consistent support practice."
              description="Each sample module includes a short content summary, quiz questions, and a local completion record for demo purposes."
              align="center"
              className="mx-auto"
            />
          </ScrollReveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {trainingModules.map((module, index) => {
              const status = moduleStatus(module);
              const active = module.id === selectedId;

              return (
                <ScrollReveal key={module.id} delay={index * 60}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(module.id)}
                    className={`h-full w-full text-left ${
                      active ? "translate-y-[-2px]" : ""
                    }`}
                  >
                    <Card
                      className={`h-full border-sand/80 p-7 ${
                        active ? "bg-[#0F4C4B] text-white" : "bg-[#FBFCFB]"
                      }`}
                    >
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        active ? "bg-white/12 text-white" : "bg-[#E8F6F4] text-[#015451]"
                      }`}>
                        <BookIcon />
                      </div>
                      <h2 className={`mt-5 text-xl font-bold leading-tight ${active ? "text-white" : "text-ink"}`}>
                        {module.title}
                      </h2>
                      <p className={`mt-3 text-sm leading-7 ${active ? "text-white/78" : "text-ink/66"}`}>
                        {module.description}
                      </p>
                      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
                        <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 ${
                          active ? "bg-white/10 text-white" : "bg-white text-[#015451]"
                        }`}>
                          <ClockIcon />
                          {module.duration}
                        </span>
                        <span className={`inline-flex rounded-full px-4 py-2 font-semibold ${
                          status === "Completed"
                            ? "bg-[#DFF5ED] text-[#0B6D57]"
                            : status === "In Progress"
                              ? active
                                ? "bg-white/10 text-white"
                                : "bg-[#EEF6F5] text-[#015451]"
                              : "bg-[#F1F1EE] text-ink/70"
                        }`}>
                          {status}
                        </span>
                      </div>
                    </Card>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#F4F8F7] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute left-[-10rem] top-20 h-56 w-56 rounded-full bg-white/80" />
        <div className="site-container grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-6">
            <ScrollReveal>
              <Card className="border-sand/80 bg-white p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
                  Module Detail
                </p>
                <h2 className="mt-4 text-3xl font-display font-semibold leading-tight text-ink">
                  {selectedModule.title}
                </h2>
                <p className="mt-4 text-sm leading-8 text-ink/68">{selectedModule.summary}</p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#E8F6F4] px-4 py-2 text-sm font-semibold text-[#015451]">
                  <ClockIcon />
                  Estimated duration: {selectedModule.duration}
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <Card className="border-sand/80 bg-white p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
                  Quick Quiz
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
                    <Button type="submit" size="lg">
                      Complete Quiz
                    </Button>
                  </div>
                </form>
              </Card>
            </ScrollReveal>
          </div>

          <div className="grid gap-6">
            <ScrollReveal>
              <Card className="border-sand/80 bg-white p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
                  Result
                </p>
                {quizResult ? (
                  <div className="mt-5">
                    <div
                      className={`rounded-[1.5rem] px-5 py-5 ${
                        quizResult.passed ? "bg-[#EAF8F7] text-[#015451]" : "bg-[#FFF3F2] text-rose-700"
                      }`}
                    >
                      <p className="text-lg font-bold">
                        Score: {quizResult.score}/{selectedModule.quiz.length}
                      </p>
                      <p className="mt-2 text-sm leading-7">{quizResult.message}</p>
                    </div>

                    {quizResult.passed ? (
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
                        <div>
                          <Button onClick={completeModule} size="lg">
                            Generate Certificate
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <p className="mt-4 text-sm leading-8 text-ink/66">
                    Open a module, complete the quiz, and a result summary will appear here.
                  </p>
                )}
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <Card className="border-sand/80 bg-[#0F4C4B] p-7 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-200">
                  Admin note
                </p>
                <p className="mt-4 text-sm leading-8 text-white/78">
                  This is a frontend training demo. For production, connect to secure staff
                  accounts, backend records, trainer verification, expiry dates, and compliance
                  reporting.
                </p>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="certificate-record" className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="site-container">
          <ScrollReveal>
            <SectionHeader
              badge="Certificate Record"
              title="Completion certificate ready for print or download."
              description="Once a module is passed and a staff name is entered, a printable certificate is generated and stored locally."
            />
          </ScrollReveal>

          <div className="mt-12 grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
            <ScrollReveal>
              {selectedRecord ? (
                <div className="rounded-[2rem] border-[10px] border-[#D5EDE6] bg-[#FBFFFE] p-4 shadow-soft sm:p-6">
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
                      This certificate confirms completion of internal training awareness content.
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
                  <p className="text-sm leading-8 text-ink/66">
                    No certificate has been generated yet for the selected module. Complete the
                    quiz and enter a staff name to create one.
                  </p>
                </Card>
              )}
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <Card className="border-sand/80 bg-[#FBFCFB] p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#015451]">
                  Stored completion records
                </p>
                <div className="mt-6 grid gap-4">
                  {Object.keys(records).length > 0 ? (
                    Object.values(records).map((record) => (
                      <button
                        key={record.certificateId}
                        type="button"
                        onClick={() => setSelectedId(record.moduleId)}
                        className="rounded-[1.4rem] border border-sand/90 bg-white px-4 py-4 text-left hover:border-[#0C7380]"
                      >
                        <p className="text-sm font-semibold text-ink">{record.moduleTitle}</p>
                        <p className="mt-2 text-sm leading-7 text-ink/64">
                          {record.staffName} • {formatDate(record.completedAt)}
                        </p>
                      </button>
                    ))
                  ) : (
                    <p className="text-sm leading-8 text-ink/66">
                      Completed modules stored in localStorage will appear here.
                    </p>
                  )}
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
