/**
 * Centralized Grading Utility for Techmiya EdTech Course Assessments
 *
 * Exact non-overlapping 50-mark score ranges:
 * 45–50: A+ — Excellent
 * 40–44: A  — Very Good
 * 35–39: B+ — Good
 * 30–34: B  — Pass
 * 0–29:  C  — Try Again / Retake Assessment
 *
 * Minimum passing score is 30/50 (60%).
 * A failing score must NEVER be rounded up to a pass.
 */

export type Grade = "A+" | "A" | "B+" | "B" | "C";

export interface GradeResult {
  score: number;
  maxScore: 50;
  percentage: number;
  grade: Grade;
  result: string;
  isPassing: boolean;
  canReceiveCertificate: boolean;
}

export function calculateCourseGrade(score: number): GradeResult {
  if (typeof score !== "number" || isNaN(score)) {
    throw new Error(`Score must be a valid number. Received: ${score}`);
  }

  // Strict rule: do not round a failing score up to a pass. Use floor.
  const integerScore = Math.floor(score);

  if (integerScore < 0 || integerScore > 50) {
    throw new Error(`Score out of range: must be between 0 and 50. Received: ${score}`);
  }

  const percentage = Math.round((integerScore / 50) * 100);

  if (integerScore >= 45 && integerScore <= 50) {
    return {
      score: integerScore,
      maxScore: 50,
      percentage,
      grade: "A+",
      result: "Excellent",
      isPassing: true,
      canReceiveCertificate: true,
    };
  }

  if (integerScore >= 40 && integerScore <= 44) {
    return {
      score: integerScore,
      maxScore: 50,
      percentage,
      grade: "A",
      result: "Very Good",
      isPassing: true,
      canReceiveCertificate: true,
    };
  }

  if (integerScore >= 35 && integerScore <= 39) {
    return {
      score: integerScore,
      maxScore: 50,
      percentage,
      grade: "B+",
      result: "Good",
      isPassing: true,
      canReceiveCertificate: true,
    };
  }

  if (integerScore >= 30 && integerScore <= 34) {
    return {
      score: integerScore,
      maxScore: 50,
      percentage,
      grade: "B",
      result: "Pass",
      isPassing: true,
      canReceiveCertificate: true,
    };
  }

  // 0 - 29 (Fail)
  return {
    score: integerScore,
    maxScore: 50,
    percentage,
    grade: "C",
    result: "Try Again / Retake Assessment",
    isPassing: false,
    canReceiveCertificate: false,
  };
}
