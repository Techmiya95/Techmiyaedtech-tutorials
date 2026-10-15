import React from "react";
import { Link } from "react-router-dom";
import { Award, BookOpen, CheckCircle2, ShieldCheck, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "../components/ui/button";
import { courseAssessments } from "../data/assessmentsData";
import { getMainSiteBaseUrl } from "../lib/navConfig";

export const AssessmentHubPage = () => {
  const mainSiteUrl = getMainSiteBaseUrl();
  const assessmentsList = Object.values(courseAssessments);

  return (
    <div className="min-h-screen bg-gray-50/60 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Hub Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-200">
            <Award className="w-4 h-4 text-amber-600" />
            Official 50-Mark Certifications
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Course Assessments & <span className="text-amber-600">Certificates</span>
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Test your knowledge with our standardized 50-mark course assessments. Score 30 or above (Grade B) to earn your verified Techmiya EdTech certificate of achievement.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link to="/verify-certificate">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <ShieldCheck className="w-4 h-4 text-amber-600" /> Verify Existing Certificate
              </Button>
            </Link>
          </div>
        </div>

        {/* Grading Scale Banner */}
        <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
            Standard Evaluation & Grading Benchmarks
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
              <span className="block text-lg font-black text-emerald-700">45–50</span>
              <span className="block font-bold text-gray-800 mt-0.5">Grade A+</span>
              <span className="text-[10px] text-gray-500">Excellent</span>
            </div>
            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl">
              <span className="block text-lg font-black text-blue-700">40–44</span>
              <span className="block font-bold text-gray-800 mt-0.5">Grade A</span>
              <span className="text-[10px] text-gray-500">Very Good</span>
            </div>
            <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl">
              <span className="block text-lg font-black text-indigo-700">35–39</span>
              <span className="block font-bold text-gray-800 mt-0.5">Grade B+</span>
              <span className="text-[10px] text-gray-500">Good</span>
            </div>
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl">
              <span className="block text-lg font-black text-amber-700">30–34</span>
              <span className="block font-bold text-gray-800 mt-0.5">Grade B</span>
              <span className="text-[10px] text-emerald-700 font-semibold">Pass (Threshold)</span>
            </div>
            <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl col-span-2 sm:col-span-1">
              <span className="block text-lg font-black text-rose-700">0–29</span>
              <span className="block font-bold text-gray-800 mt-0.5">Grade C</span>
              <span className="text-[10px] text-rose-700 font-semibold">Try Again / Retake</span>
            </div>
          </div>
        </div>

        {/* Assessment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assessmentsList.map((item) => (
            <div
              key={item.courseId}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded uppercase tracking-wider">
                  {item.courseCategory}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2">
                  {item.courseTitle}
                </h3>
                <div className="space-y-1.5 text-xs text-gray-600 mb-6">
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>25 Multiple Choice Questions (2 marks each)</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Total Marks: <strong>50 Marks</strong></span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Passing Score: <strong>30 Marks (60%)</strong></span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Downloadable PDF Certificate on pass</span>
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-100">
                <Link to={`/assessment/${item.courseId}`} className="block">
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs py-2.5">
                    Take 50-Mark Exam →
                  </Button>
                </Link>
                <Link
                  to={
                    item.courseId === "github"
                      ? "/devops/github"
                      : item.courseId === "c"
                      ? "/c-programming"
                      : `/${item.courseId}`
                  }
                  className="block text-center text-xs font-semibold text-gray-600 hover:text-amber-600 py-1 transition-colors"
                >
                  Review Study Materials First
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Cross-Website Banner: Professional Career Programs */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-8 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
              Career Acceleration
            </span>
            <h3 className="text-2xl font-bold">
              Looking for 100% Placement-Assisted Professional Programs?
            </h3>
            <p className="text-xs sm:text-sm text-blue-200 max-w-xl">
              Explore Techmiya&apos;s full-time training cohorts in Full Stack Development, Cloud & DevOps, Data Science, and Generative AI with live corporate projects and interview coaching.
            </p>
          </div>
          <a
            href={`${mainSiteUrl}/courses`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <Button className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-6 py-3 rounded-xl flex items-center gap-2">
              Browse Professional Programs <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
