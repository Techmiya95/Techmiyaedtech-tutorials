import React, { useRef } from "react";
import { Award, CheckCircle2, Download, Printer, ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import type { GradeResult } from "../lib/grading";

export interface CertificateData {
  certificateId: string;
  learnerName: string;
  courseTitle: string;
  courseCategory: string;
  score: number;
  gradeResult: GradeResult;
  issueDate: string;
  verificationUrl: string;
}

export const CertificateView = ({
  data,
  onBack,
}: {
  data: CertificateData;
  onBack?: () => void;
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action Toolbar (hidden when printing) */}
      <div className="print:hidden flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2">
          {onBack && (
            <Button variant="outline" size="sm" onClick={onBack} className="gap-1.5">
              <ArrowLeft className="w-4 h-4" /> Back to Assessment
            </Button>
          )}
          <span className="text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Certificate Issued • Reference ID: {data.certificateId}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handlePrint}
            className="bg-amber-600 hover:bg-amber-700 text-white gap-2 shadow-sm"
          >
            <Printer className="w-4 h-4" /> Print / Save as PDF
          </Button>
        </div>
      </div>

      {/* Printable Certificate Frame */}
      <div
        id="techmiya-certificate-frame"
        className="relative bg-white text-gray-900 border-[12px] border-amber-600/80 p-8 sm:p-12 md:p-16 rounded-2xl shadow-2xl max-w-4xl mx-auto overflow-hidden print:m-0 print:border-[10px] print:shadow-none print:max-w-none print:w-full print:h-auto"
        style={{
          backgroundImage: "radial-gradient(circle at center, #ffffff 60%, #fffbf0 100%)",
        }}
      >
        {/* Decorative Inner Border */}
        <div className="absolute inset-3 border-2 border-dashed border-amber-400/60 pointer-events-none rounded-xl" />

        {/* Header Branding */}
        <div className="relative text-center space-y-2 mb-8">
          <div className="inline-flex items-center justify-center gap-2.5 mb-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-md">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold tracking-wider text-gray-900 uppercase">
              Techmiya <span className="text-amber-600">Ed-Tech</span>
            </span>
          </div>
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500 font-semibold">
            Centre of Excellence in Technology Education
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-2" />
        </div>

        {/* Certificate Title */}
        <div className="relative text-center my-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-wide">
            Certificate of Achievement
          </h2>
          <p className="text-sm sm:text-base text-gray-600 italic mt-3">
            This credential certifies that
          </p>
        </div>

        {/* Recipient Name */}
        <div className="relative text-center my-6 py-2 border-b-2 border-amber-300 max-w-lg mx-auto">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-900 tracking-tight">
            {data.learnerName}
          </h3>
        </div>

        {/* Achievement Statement */}
        <div className="relative text-center max-w-2xl mx-auto my-6 space-y-2 text-gray-700 text-sm sm:text-base leading-relaxed">
          <p>
            has successfully completed the comprehensive assessment and satisfied all technical proficiency requirements for
          </p>
          <h4 className="text-xl sm:text-2xl font-bold text-gray-900 py-1">
            {data.courseTitle}
          </h4>
          <p className="text-xs sm:text-sm text-gray-600">
            Field of Specialization: <span className="font-semibold text-gray-800">{data.courseCategory}</span>
          </p>
        </div>

        {/* Performance Score Badge */}
        <div className="relative my-8 flex items-center justify-center">
          <div className="inline-flex items-center gap-6 bg-amber-50/80 border border-amber-200/80 px-6 py-3 rounded-2xl shadow-inner">
            <div className="text-center">
              <span className="block text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Score Achieved</span>
              <span className="text-lg font-bold text-gray-900">{data.score} / 50</span>
            </div>
            <div className="w-px h-8 bg-amber-200" />
            <div className="text-center">
              <span className="block text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Grade</span>
              <span className="text-lg font-extrabold text-amber-600">{data.gradeResult.grade} ({data.gradeResult.percentage}%)</span>
            </div>
            <div className="w-px h-8 bg-amber-200" />
            <div className="text-center">
              <span className="block text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Status</span>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Verified Pass</span>
            </div>
          </div>
        </div>

        {/* Signatures & Issue Metadata */}
        <div className="relative mt-12 pt-8 border-t border-gray-200 grid grid-cols-3 items-end text-center text-xs text-gray-600">
          <div>
            <div className="font-serif italic text-base sm:text-lg text-gray-800 font-bold mb-1">
              Joel Fernando
            </div>
            <div className="border-t border-gray-300 pt-1">
              <p className="font-semibold text-gray-900">Academic Director</p>
              <p className="text-[10px] text-gray-500">Techmiya EdTech</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            {/* Gold Seal Graphic */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-amber-500 bg-amber-100/70 flex flex-col items-center justify-center shadow-md p-1">
              <ShieldCheck className="w-6 h-6 text-amber-600 mb-0.5" />
              <span className="text-[9px] font-black uppercase text-amber-900 leading-tight">OFFICIAL</span>
              <span className="text-[7px] text-amber-700 font-bold">SEAL</span>
            </div>
            <p className="text-[10px] font-mono text-gray-500 mt-2">
              Issued: {data.issueDate}
            </p>
          </div>

          <div>
            <div className="font-serif italic text-base sm:text-lg text-gray-800 font-bold mb-1">
              Adil M.
            </div>
            <div className="border-t border-gray-300 pt-1">
              <p className="font-semibold text-gray-900">Lead Technical Instructor</p>
              <p className="text-[10px] text-gray-500">Techmiya Curriculum Board</p>
            </div>
          </div>
        </div>

        {/* Verification Footer */}
        <div className="relative mt-8 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-2">
          <span>Certificate ID: <strong className="font-mono text-gray-800">{data.certificateId}</strong></span>
          <span className="text-center sm:text-right">
            Verification Portal: <strong className="text-amber-700">{data.verificationUrl}</strong>
          </span>
        </div>
      </div>

      {/* Transparency Note (hidden when printing) */}
      <div className="print:hidden bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs text-slate-600 leading-relaxed max-w-4xl mx-auto">
        <p className="font-semibold text-slate-800 mb-1">ℹ️ Verification & Architectural Disclosure:</p>
        <p>
          This certificate reflects the learner&apos;s verified client-side performance on the 50-mark Techmiya Course Examination.
          Certificate records are cached locally in your browser storage. For accredited degree programs, corporate verification, or physical diploma issuance, please contact Techmiya EdTech administration.
        </p>
      </div>
    </div>
  );
};
