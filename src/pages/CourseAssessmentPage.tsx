import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Award,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  Home,
  Check,
  User,
} from "lucide-react";
import { courseAssessments } from "../data/assessmentsData";
import { calculateCourseGrade, type GradeResult } from "../lib/grading";
import { CertificateView, type CertificateData } from "../components/CertificateView";
import {
  getCourseUnits,
  checkCertificationEligibility,
  recordFinalUnitEntered,
  normalizeCourseKey,
} from "../lib/courseProgress";
import { Button } from "@/components/ui/button";

export const CourseAssessmentPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const activeCourseId = normalizeCourseKey(courseId || "github");
  const assessment = courseAssessments[activeCourseId] || courseAssessments["github"];

  const units = getCourseUnits(activeCourseId);
  const eligibility = checkCertificationEligibility(activeCourseId, units);

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [gradeResult, setGradeResult] = useState<GradeResult | null>(null);
  const [learnerName, setLearnerName] = useState("");
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Record entry to assessment and load cached candidate name
  useEffect(() => {
    window.scrollTo(0, 0);
    recordFinalUnitEntered(activeCourseId);
    const savedName = localStorage.getItem("techmiya_learner_name");
    if (savedName) {
      setLearnerName(savedName);
    }
  }, [activeCourseId]);

  const totalQuestions = assessment.questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (isSubmitted) return; // Locked once submitted
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitted) return;

    if (answeredCount < totalQuestions) {
      const confirmSubmit = window.confirm(
        `You have answered ${answeredCount} out of ${totalQuestions} questions. Are you sure you want to submit now? Unanswered questions will receive 0 marks.`
      );
      if (!confirmSubmit) return;
    }

    // Calculate marks: 2 marks per correct MCQ = 50 marks max
    let earnedMarks = 0;
    assessment.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        earnedMarks += 2;
      }
    });

    const result = calculateCourseGrade(earnedMarks);
    setGradeResult(result);
    setIsSubmitted(true);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleClaimCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradeResult || !gradeResult.canReceiveCertificate) return;

    const trimmedName = learnerName.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setErrorMsg("Please enter your full official name to display on your certificate.");
      return;
    }
    setErrorMsg("");

    // Cache learner name
    localStorage.setItem("techmiya_learner_name", trimmedName);

    // Generate unique verifiable certificate ID
    const year = new Date().getFullYear();
    const courseCode = assessment.courseId.toUpperCase().slice(0, 6);
    const randomHash = Math.random().toString(36).substring(2, 8).toUpperCase();
    const certId = `TM-CERT-${courseCode}-${year}-${randomHash}`;

    const dateStr = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const certPayload: CertificateData = {
      certificateId: certId,
      learnerName: trimmedName,
      courseTitle: assessment.courseTitle,
      courseCategory: assessment.courseCategory,
      score: gradeResult.score,
      gradeResult: gradeResult,
      issueDate: dateStr,
      verificationUrl: `${window.location.origin}/verify-certificate?ref=${certId}`,
    };

    // Save record to local registry for verification lookup
    try {
      const stored = localStorage.getItem("techmiya_certificates");
      const list = stored ? JSON.parse(stored) : {};
      list[certId] = certPayload;
      localStorage.setItem("techmiya_certificates", JSON.stringify(list));
    } catch (err) {
      console.error("Local storage error:", err);
    }

    setCertificateData(certPayload);
    setShowCertificate(true);
    window.scrollTo(0, 0);
  };

  const handleRetake = () => {
    setAnswers({});
    setIsSubmitted(false);
    setGradeResult(null);
    setShowCertificate(false);
    setCertificateData(null);
    window.scrollTo(0, 0);
  };

  if (showCertificate && certificateData) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <CertificateView
          data={certificateData}
          onBack={() => setShowCertificate(false)}
        />
      </div>
    );
  }

  const courseBasePath =
    activeCourseId === "github"
      ? "/devops/github"
      : activeCourseId === "c"
      ? "/c-programming"
      : activeCourseId === "devops"
      ? "/devops"
      : `/${activeCourseId}`;

  return (
    <div className="min-h-screen bg-gray-50/60 pb-16">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
            <Link to="/" className="flex items-center gap-1 hover:text-amber-600 transition-colors">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/assessments" className="hover:text-amber-600 transition-colors">
              Assessments
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-semibold">{assessment.courseTitle}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Prerequisite Guidance (non-blocking) */}
        {units.length > 0 && !eligibility.isEligible && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Course Modules in Progress ({eligibility.completedEarlierUnitsCount} of {eligibility.requiredEarlierUnitsCount} units completed)</p>
                <p className="text-xs text-amber-800 mt-0.5">
                  You can attempt all 25 questions below now. Note that completing all course modules is required for official certificate issuance.
                </p>
              </div>
            </div>
            <Link
              to={courseBasePath}
              className="text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 px-3.5 py-2 rounded-lg shrink-0 transition-colors"
            >
              Review Modules →
            </Link>
          </div>
        )}

        {/* Exam Header Card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full uppercase tracking-wider">

                Official Course Examination
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
                {assessment.courseTitle}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Category: <span className="font-semibold text-gray-700">{assessment.courseCategory}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to={courseBasePath}
              >
                <Button variant="outline" size="sm" className="text-xs gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> Revise Course Notes
                </Button>
              </Link>
            </div>
          </div>

          {/* Exam Rules Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-gray-50/80 rounded-xl border border-gray-100 text-center text-xs">
            <div>
              <span className="block text-gray-400 font-medium">Total Marks</span>
              <span className="text-base font-bold text-gray-900">50 Marks</span>
            </div>
            <div>
              <span className="block text-gray-400 font-medium">Questions</span>
              <span className="text-base font-bold text-gray-900">25 MCQs (2 marks ea)</span>
            </div>
            <div>
              <span className="block text-gray-400 font-medium">Pass Threshold</span>
              <span className="text-base font-bold text-amber-600">30 / 50 (60%)</span>
            </div>
            <div>
              <span className="block text-gray-400 font-medium">Certificate</span>
              <span className="text-base font-bold text-emerald-600">Eligible upon Passing</span>
            </div>
          </div>

          {/* Grading Legend Callout */}
          <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-500 flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong>Grading Scale:</strong> 45–50: <span className="text-emerald-700 font-bold">A+ (Excellent)</span> | 40–44: <span className="text-blue-700 font-bold">A (Very Good)</span> | 35–39: <span className="text-indigo-700 font-bold">B+ (Good)</span> | 30–34: <span className="text-amber-700 font-bold">B (Pass)</span> | 0–29: <span className="text-rose-700 font-bold">C (Try Again)</span>
            </span>
            <span className="text-gray-400">Single attempt submission</span>
          </div>
        </div>

        {/* Real-time Progress Bar (while taking exam) */}
        {!isSubmitted && (
          <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-sm p-4 rounded-xl border border-gray-200/80 shadow-md">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-700 mb-1.5">
              <span>
                Progress: <strong className="text-amber-600">{answeredCount}</strong> / {totalQuestions} answered
              </span>
              <span>{progressPercent}% Complete</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Results Banner (when submitted) */}
        {isSubmitted && gradeResult && (
          <div
            className={`p-6 sm:p-8 rounded-2xl border shadow-sm ${
              gradeResult.isPassing
                ? "bg-gradient-to-br from-emerald-50 via-white to-amber-50 border-emerald-300"
                : "bg-gradient-to-br from-rose-50 via-white to-gray-50 border-rose-200"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                    gradeResult.isPassing
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-rose-100 text-rose-800"
                  }`}
                >
                  {gradeResult.isPassing ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Assessment Passed
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-4 h-4 text-rose-600" /> Passing Threshold Not Met
                    </>
                  )}
                </span>
                <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
                  Your Score: <span className="text-amber-600">{gradeResult.score} / 50</span> ({gradeResult.percentage}%)
                </h2>
                <p className="text-base font-semibold text-gray-800 mt-1">
                  Assigned Grade: <span className="text-xl font-black text-amber-700">{gradeResult.grade}</span> — {gradeResult.result}
                </p>
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                <Button
                  onClick={handleRetake}
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs border-gray-300"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake Assessment
                </Button>
              </div>
            </div>

            {/* If Passed: Certificate Claim Form */}
            {gradeResult.canReceiveCertificate ? (
              <div className="mt-6 pt-6 border-t border-emerald-200/80 bg-white/80 p-5 rounded-xl border border-emerald-100">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  Claim Your Official Techmiya Certificate
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 mb-4">
                  Congratulations! You achieved a passing score of {gradeResult.score}/50. Please enter your name exactly as you would like it to appear on your downloadable and printable certificate.
                </p>
                <form onSubmit={handleClaimCertificate} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={learnerName}
                      onChange={(e) => setLearnerName(e.target.value)}
                      placeholder="Enter Full Name (e.g. John Doe)"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm px-6"
                  >
                    Generate Certificate →
                  </Button>
                </form>
                {errorMsg && <p className="text-xs text-rose-600 font-semibold mt-2">{errorMsg}</p>}
              </div>
            ) : (
              <div className="mt-6 pt-6 border-t border-rose-200 text-sm text-rose-900 bg-rose-50/50 p-4 rounded-xl">
                <p className="font-bold">Next Steps & Guidance:</p>
                <p className="mt-1 text-xs sm:text-sm text-gray-700 leading-relaxed">
                  The minimum passing score to earn a verified course certificate is <strong>30 out of 50 (Grade B)</strong>. Your score was {gradeResult.score}/50 (Grade C — Try Again). We recommend revising the course modules, reviewing the incorrect answers below, and taking the assessment again.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Questions Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {assessment.questions.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined;
            const selectedOpt = answers[q.id];
            const isCorrect = selectedOpt === q.correctAnswer;

            return (
              <div
                key={q.id}
                className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all ${
                  isSubmitted
                    ? isCorrect
                      ? "border-emerald-300 bg-emerald-50/20"
                      : "border-rose-300 bg-rose-50/20"
                    : isAnswered
                    ? "border-amber-300 shadow-sm"
                    : "border-gray-200"
                }`}
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-gray-100 text-gray-800 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      2 Marks
                    </span>
                  </div>
                  {isSubmitted && (
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                        isCorrect
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> +2 Marks
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" /> 0 Marks
                        </>
                      )}
                    </span>
                  )}
                </div>

                {/* Question Text */}
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 leading-snug">
                  {q.question}
                </h3>

                {/* Options */}
                <div className="space-y-2.5">
                  {q.options.map((option, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    const isCorrectOption = q.correctAnswer === optIdx;

                    let optionStyle =
                      "border-gray-200 hover:border-amber-300 hover:bg-amber-50/40 text-gray-800";

                    if (!isSubmitted) {
                      if (isSelected) {
                        optionStyle = "border-amber-500 bg-amber-50 text-amber-950 font-semibold shadow-sm";
                      }
                    } else {
                      if (isCorrectOption) {
                        optionStyle = "border-emerald-500 bg-emerald-100/70 text-emerald-950 font-bold";
                      } else if (isSelected && !isCorrect) {
                        optionStyle = "border-rose-500 bg-rose-100/70 text-rose-950 line-through";
                      } else {
                        optionStyle = "border-gray-200 text-gray-500 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${optionStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-full border text-xs font-bold flex items-center justify-center shrink-0 ${
                              isSelected
                                ? isSubmitted
                                  ? isCorrect
                                    ? "bg-emerald-600 border-emerald-600 text-white"
                                    : "bg-rose-600 border-rose-600 text-white"
                                  : "bg-amber-500 border-amber-500 text-white"
                                : "border-gray-300 bg-white text-gray-600"
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{option}</span>
                        </div>
                        {isSubmitted && isCorrectOption && (
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-200/80 px-2 py-0.5 rounded">
                            Correct Answer
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation (shown after submission) */}
                {isSubmitted && (
                  <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-600 bg-gray-50/60 p-3 rounded-lg leading-relaxed">
                    <p className="font-semibold text-gray-800 mb-0.5">Explanation:</p>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Submit Actions */}
          {!isSubmitted && (
            <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center space-y-3">
              <p className="text-xs text-gray-500">
                Please verify all answers before submitting. Each question is worth 2 marks (50 marks total).
              </p>
              <Button
                type="submit"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm sm:text-base px-8 py-3 rounded-xl shadow-md transition-all"
              >
                Submit Assessment ({answeredCount}/{totalQuestions} Answered) →
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
