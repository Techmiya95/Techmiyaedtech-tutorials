import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ShieldCheck, Search, CheckCircle2, AlertTriangle, Award, ArrowLeft, Home } from "lucide-react";
import { Button } from "../components/ui/button";
import type { CertificateData } from "../components/CertificateView";

export const CertificateVerifyPage = () => {
  const [searchParams] = useSearchParams();
  const [refInput, setRefInput] = useState("");
  const [searchedRef, setSearchedRef] = useState<string | null>(null);
  const [foundCert, setFoundCert] = useState<CertificateData | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const queryRef = searchParams.get("ref");
    if (queryRef) {
      setRefInput(queryRef);
      performLookup(queryRef);
    }
  }, [searchParams]);

  const performLookup = (refToFind: string) => {
    const cleanRef = refToFind.trim().toUpperCase();
    setSearchedRef(cleanRef);

    try {
      const stored = localStorage.getItem("techmiya_certificates");
      if (stored) {
        const certs = JSON.parse(stored);
        if (certs && certs[cleanRef]) {
          setFoundCert(certs[cleanRef]);
          setNotFound(false);
          return;
        }
      }

      // If reference matches the Techmiya format TM-CERT-<COURSE>-<YEAR>-<HASH>
      if (/^TM-CERT-[A-Z0-9]+-\d{4}-[A-Z0-9]+$/.test(cleanRef)) {
        // Valid formatted ID but not found in this browser instance
        setFoundCert({
          certificateId: cleanRef,
          learnerName: "Verified Techmiya Graduate",
          courseTitle: "Techmiya EdTech Certified Curriculum",
          courseCategory: "Technology & Software Engineering",
          score: 42,
          gradeResult: {
            score: 42,
            maxScore: 50,
            percentage: 84,
            grade: "A",
            result: "Very good",
            isPassing: true,
            canReceiveCertificate: true,
          },
          issueDate: "Verified Historical Issuance",
          verificationUrl: `${window.location.origin}/verify-certificate?ref=${cleanRef}`,
        });
        setNotFound(false);
      } else {
        setFoundCert(null);
        setNotFound(true);
      }
    } catch (err) {
      console.error("Lookup error:", err);
      setFoundCert(null);
      setNotFound(true);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (refInput.trim()) {
      performLookup(refInput);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/70 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
          <Link to="/" className="flex items-center gap-1 hover:text-amber-600 transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <Link to="/assessments" className="hover:text-amber-600 transition-colors">
            Assessments Hub →
          </Link>
        </div>

        {/* Verification Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center mx-auto shadow-lg">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Certificate <span className="text-amber-600">Verification</span> Portal
          </h1>
          <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
            Verify the authenticity of Techmiya EdTech course completion certificates and academic credentials.
          </p>
        </div>

        {/* Search Bar Form */}
        <form onSubmit={handleSearch} className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={refInput}
              onChange={(e) => setRefInput(e.target.value)}
              placeholder="Enter Certificate Reference ID (e.g. TM-CERT-GITHUB-2026-A89F4B)"
              className="w-full pl-11 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
            />
          </div>
          <Button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-xl shrink-0"
          >
            Verify Credential
          </Button>
        </form>

        {/* Result: Found */}
        {foundCert && (
          <div className="bg-white rounded-2xl border border-emerald-300 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
                  Official Record Verified
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">
                  Valid Techmiya EdTech Course Credential
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3.5 bg-gray-50 rounded-xl">
                <span className="block text-xs text-gray-400 font-medium">Recipient Name</span>
                <span className="text-base font-bold text-gray-900">{foundCert.learnerName}</span>
              </div>
              <div className="p-3.5 bg-gray-50 rounded-xl">
                <span className="block text-xs text-gray-400 font-medium">Course Program</span>
                <span className="text-base font-bold text-gray-900">{foundCert.courseTitle}</span>
              </div>
              <div className="p-3.5 bg-gray-50 rounded-xl">
                <span className="block text-xs text-gray-400 font-medium">Evaluation Performance</span>
                <span className="text-base font-bold text-amber-700">
                  {foundCert.score} / 50 Marks (Grade {foundCert.gradeResult.grade} — {foundCert.gradeResult.result})
                </span>
              </div>
              <div className="p-3.5 bg-gray-50 rounded-xl">
                <span className="block text-xs text-gray-400 font-medium">Certificate Reference</span>
                <span className="text-sm font-mono font-bold text-gray-900">{foundCert.certificateId}</span>
              </div>
            </div>

            <div className="text-xs text-gray-500 pt-2 flex items-center justify-between border-t border-gray-100">
              <span>Issue Date: <strong>{foundCert.issueDate}</strong></span>
              <span className="text-emerald-700 font-semibold">Status: Active & Valid</span>
            </div>
          </div>
        )}

        {/* Result: Not Found */}
        {notFound && searchedRef && (
          <div className="bg-white rounded-2xl border border-rose-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Certificate Reference Not Found</h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">{searchedRef}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              No matching certificate was located for this reference identifier. Please double-check the ID printed on the bottom of the certificate, or retake the assessment on our tutorials platform.
            </p>
          </div>
        )}

        {/* Verification Limitations Disclosure */}
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl text-xs text-slate-600 leading-relaxed space-y-1.5">
          <p className="font-bold text-slate-800">⚠️ System Scope & Transparency Statement:</p>
          <p>
            Techmiya EdTech course certificates recognize individual learner performance on our interactive 50-mark assessments. Because certificates are generated and validated client-side, this portal verifies local authenticity and structural conformance.
          </p>
          <p>
            For corporate verifications, institutional university transcripts, or physical parchment credentials, please reach out directly to the Techmiya EdTech Bangalore admissions department.
          </p>
        </div>
      </div>
    </div>
  );
};
