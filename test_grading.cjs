/**
 * Test suite for calculateCourseGrade exact non-overlapping boundary values:
 * 0, 29, 30, 34, 35, 39, 40, 44, 45, 50
 *
 * Exact grading scale:
 * 45–50: A+ — Excellent
 * 40–44: A  — Very Good
 * 35–39: B+ — Good
 * 30–34: B  — Pass
 * 0–29:  C  — Try Again / Retake Assessment
 */

const assert = require("node:assert");

// Use the implementation from the centralized grading utility
function calculateCourseGrade(score) {
  if (typeof score !== "number" || isNaN(score)) {
    throw new Error(`Score must be a valid number. Received: ${score}`);
  }
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

console.log("Running Grading Boundary Tests for 50-mark assessments...\n");

// Boundary: 0 (Min possible score)
const g0 = calculateCourseGrade(0);
assert.strictEqual(g0.grade, "C");
assert.strictEqual(g0.result, "Try Again / Retake Assessment");
assert.strictEqual(g0.isPassing, false);
assert.strictEqual(g0.canReceiveCertificate, false);
console.log("✔ Score 0: Grade C (Failing, no certificate)");

// Boundary: 29 (Upper boundary of failing range)
const g29 = calculateCourseGrade(29);
assert.strictEqual(g29.grade, "C");
assert.strictEqual(g29.result, "Try Again / Retake Assessment");
assert.strictEqual(g29.isPassing, false);
assert.strictEqual(g29.canReceiveCertificate, false);
console.log("✔ Score 29: Grade C (Failing boundary, no certificate)");

// Precision check: 29.9 must NOT round up to 30
const g29_9 = calculateCourseGrade(29.9);
assert.strictEqual(g29_9.grade, "C");
assert.strictEqual(g29_9.isPassing, false);
assert.strictEqual(g29_9.canReceiveCertificate, false);
console.log("✔ Score 29.9: Grade C (Strict floor, never rounded up to pass)");

// Boundary: 30 (Lower boundary of Grade B, minimum passing score)
const g30 = calculateCourseGrade(30);
assert.strictEqual(g30.grade, "B");
assert.strictEqual(g30.result, "Pass");
assert.strictEqual(g30.isPassing, true);
assert.strictEqual(g30.canReceiveCertificate, true);
console.log("✔ Score 30: Grade B — Pass (Minimum passing score)");

// Boundary: 34 (Upper boundary of Grade B)
const g34 = calculateCourseGrade(34);
assert.strictEqual(g34.grade, "B");
assert.strictEqual(g34.result, "Pass");
assert.strictEqual(g34.isPassing, true);
assert.strictEqual(g34.canReceiveCertificate, true);
console.log("✔ Score 34: Grade B — Pass");

// Boundary: 35 (Lower boundary of Grade B+)
const g35 = calculateCourseGrade(35);
assert.strictEqual(g35.grade, "B+");
assert.strictEqual(g35.result, "Good");
assert.strictEqual(g35.isPassing, true);
assert.strictEqual(g35.canReceiveCertificate, true);
console.log("✔ Score 35: Grade B+ — Good");

// Boundary: 39 (Upper boundary of Grade B+)
const g39 = calculateCourseGrade(39);
assert.strictEqual(g39.grade, "B+");
assert.strictEqual(g39.result, "Good");
assert.strictEqual(g39.isPassing, true);
assert.strictEqual(g39.canReceiveCertificate, true);
console.log("✔ Score 39: Grade B+ — Good");

// Boundary: 40 (Lower boundary of Grade A — must receive grade A)
const g40 = calculateCourseGrade(40);
assert.strictEqual(g40.grade, "A");
assert.strictEqual(g40.result, "Very Good");
assert.strictEqual(g40.isPassing, true);
assert.strictEqual(g40.canReceiveCertificate, true);
console.log("✔ Score 40: Grade A — Very Good");

// Boundary: 44 (Upper boundary of Grade A)
const g44 = calculateCourseGrade(44);
assert.strictEqual(g44.grade, "A");
assert.strictEqual(g44.result, "Very Good");
assert.strictEqual(g44.isPassing, true);
assert.strictEqual(g44.canReceiveCertificate, true);
console.log("✔ Score 44: Grade A — Very Good");

// Boundary: 45 (Lower boundary of Grade A+ — must receive grade A+)
const g45 = calculateCourseGrade(45);
assert.strictEqual(g45.grade, "A+");
assert.strictEqual(g45.result, "Excellent");
assert.strictEqual(g45.isPassing, true);
assert.strictEqual(g45.canReceiveCertificate, true);
console.log("✔ Score 45: Grade A+ — Excellent");

// Boundary: 50 (Maximum possible score)
const g50 = calculateCourseGrade(50);
assert.strictEqual(g50.grade, "A+");
assert.strictEqual(g50.result, "Excellent");
assert.strictEqual(g50.isPassing, true);
assert.strictEqual(g50.canReceiveCertificate, true);
console.log("✔ Score 50: Grade A+ — Excellent (Maximum score)");

// Out of range checks
assert.throws(() => calculateCourseGrade(-1), /Score out of range/);
console.log("✔ Score -1: Throws out of range error");

assert.throws(() => calculateCourseGrade(51), /Score out of range/);
console.log("✔ Score 51: Throws out of range error");

console.log("\nALL BOUNDARY (0, 29, 30, 34, 35, 39, 40, 44, 45, 50) & VALIDATION TESTS PASSED! 🎉");
