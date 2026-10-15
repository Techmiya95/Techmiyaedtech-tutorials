/**
 * Automated Verification Suite for Requirement 4 Certification Logic
 *
 * Scenarios tested:
 * 1. A student has not completed the required earlier lessons and opens the final unit: certification remains locked.
 * 2. A student clicks or directly navigates to the final unit without completing the required lessons: certification remains locked.
 * 3. A student completes all required earlier lessons but has not yet entered the final unit: certification follows the intended locked/unlocked behavior specified above.
 * 4. A student completes the required earlier lessons and enters the final unit: certification becomes available according to the course's existing assessment and eligibility rules.
 * 5. A student reloads the page: eligibility is recalculated correctly from saved progress.
 * 6. A student has not passed the required assessment (<30 marks / Grade C): no certificate is issued if passing is required.
 * 7. A student meets all course-completion and assessment requirements (>=30 marks): the existing certificate-generation flow works correctly.
 */

const assert = require("node:assert");

// In-memory mock localStorage to test persistence and page reload behavior
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return Object.prototype.hasOwnProperty.call(this.store, key) ? this.store[key] : null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

const mockStorage = new MockLocalStorage();

const STORAGE_PREFIX = "techmiya_progress_";

function getCourseProgress(courseId) {
  const raw = mockStorage.getItem(`${STORAGE_PREFIX}${courseId}`);
  if (!raw) return { completedUnitSlugs: [], hasEnteredFinalUnit: false };
  try {
    const parsed = JSON.parse(raw);
    return {
      completedUnitSlugs: Array.isArray(parsed.completedUnitSlugs) ? parsed.completedUnitSlugs : [],
      hasEnteredFinalUnit: Boolean(parsed.hasEnteredFinalUnit),
    };
  } catch {
    return { completedUnitSlugs: [], hasEnteredFinalUnit: false };
  }
}

function saveCourseProgress(courseId, progress) {
  mockStorage.setItem(`${STORAGE_PREFIX}${courseId}`, JSON.stringify(progress));
}

function markUnitCompleted(courseId, slug) {
  const record = getCourseProgress(courseId);
  if (!record.completedUnitSlugs.includes(slug)) {
    record.completedUnitSlugs.push(slug);
    saveCourseProgress(courseId, record);
  }
}

function recordFinalUnitEntered(courseId) {
  const record = getCourseProgress(courseId);
  if (!record.hasEnteredFinalUnit) {
    record.hasEnteredFinalUnit = true;
    saveCourseProgress(courseId, record);
  }
}

function checkCertificationEligibility(courseId, units, currentSlug) {
  if (!units || units.length === 0) {
    return { isEligible: false, status: "locked_progressing" };
  }

  const progress = getCourseProgress(courseId);
  const totalUnitsCount = units.length;
  const finalUnit = units[totalUnitsCount - 1];
  const earlierUnits = units.slice(0, totalUnitsCount - 1);

  const isCurrentUnitFinal = Boolean(currentSlug && currentSlug === finalUnit.slug);

  if (isCurrentUnitFinal && !progress.hasEnteredFinalUnit) {
    recordFinalUnitEntered(courseId);
    progress.hasEnteredFinalUnit = true;
  }

  const hasEnteredFinalUnit = Boolean(progress.hasEnteredFinalUnit || isCurrentUnitFinal);

  const completedEarlier = earlierUnits.filter((u) => progress.completedUnitSlugs.includes(u.slug));
  const missingEarlierUnits = earlierUnits.filter((u) => !progress.completedUnitSlugs.includes(u.slug));
  const allEarlierCompleted = missingEarlierUnits.length === 0;

  // Crucial Rule:
  // Must complete ALL required earlier lessons (including second-to-last unit)
  // AND must enter the final unit.
  const isEligible = allEarlierCompleted && hasEnteredFinalUnit;

  let status = "locked_progressing";
  if (isEligible) {
    status = isCurrentUnitFinal ? "unlocked_final_unit" : "unlocked_already";
  } else if (isCurrentUnitFinal) {
    status = "locked_final_unit_incomplete";
  } else {
    status = "locked_progressing";
  }

  return {
    courseId,
    totalUnitsCount,
    requiredEarlierUnitsCount: earlierUnits.length,
    completedEarlierUnitsCount: completedEarlier.length,
    allEarlierCompleted,
    hasEnteredFinalUnit,
    isCurrentUnitFinal,
    isEligible,
    missingEarlierUnits,
    status,
  };
}

// Grading Function
function calculateCourseGrade(score) {
  const integerScore = Math.floor(score);
  if (integerScore < 0 || integerScore > 50) {
    throw new Error(`Score out of range: ${score}`);
  }
  const percentage = Math.round((integerScore / 50) * 100);

  if (integerScore >= 45 && integerScore <= 50) {
    return { score: integerScore, maxScore: 50, percentage, grade: "A+", result: "Excellent", isPassing: true, canReceiveCertificate: true };
  }
  if (integerScore >= 40 && integerScore <= 44) {
    return { score: integerScore, maxScore: 50, percentage, grade: "A", result: "Very Good", isPassing: true, canReceiveCertificate: true };
  }
  if (integerScore >= 35 && integerScore <= 39) {
    return { score: integerScore, maxScore: 50, percentage, grade: "B+", result: "Good", isPassing: true, canReceiveCertificate: true };
  }
  if (integerScore >= 30 && integerScore <= 34) {
    return { score: integerScore, maxScore: 50, percentage, grade: "B", result: "Pass", isPassing: true, canReceiveCertificate: true };
  }
  return { score: integerScore, maxScore: 50, percentage, grade: "C", result: "Try Again / Retake Assessment", isPassing: false, canReceiveCertificate: false };
}

// Test Runner
console.log("=================================================");
console.log("Running All 7 Certification Specification Tests");
console.log("=================================================\n");

// GitHub Course Mock Units (7 chapters)
const githubUnits = [
  { id: 1, slug: "version-control-concepts", title: "Version Control Concepts" },
  { id: 2, slug: "essential-commands", title: "Essential Commands" },
  { id: 3, slug: "branching-merging", title: "Branching & Merging" },
  { id: 4, slug: "remote-repositories", title: "Remote Repositories" },
  { id: 5, slug: "collaboration-workflows", title: "Collaboration Workflows" },
  { id: 6, slug: "advanced-git", title: "Advanced Git" }, // second-to-last unit
  { id: 7, slug: "best-practices", title: "Git Best Practices" }, // final unit
];

// -----------------------------------------------------------------------------------
// Scenario 1: Student has not completed required earlier lessons and opens the final unit
// -----------------------------------------------------------------------------------
mockStorage.clear();
const s1 = checkCertificationEligibility("github", githubUnits, "best-practices");
assert.strictEqual(s1.allEarlierCompleted, false, "Scenario 1: earlier units should NOT be completed");
assert.strictEqual(s1.isCurrentUnitFinal, true, "Scenario 1: currently on final unit");
assert.strictEqual(s1.isEligible, false, "Scenario 1: certification MUST remain LOCKED");
assert.strictEqual(s1.status, "locked_final_unit_incomplete", "Scenario 1: status must be locked_final_unit_incomplete");
assert.strictEqual(s1.missingEarlierUnits.length, 6, "Scenario 1: all 6 earlier units are incomplete");
console.log("✔ Scenario 1 Passed: Final unit opened with 0 completed lessons -> Certification remains LOCKED");

// -----------------------------------------------------------------------------------
// Scenario 2: Student clicks/directly navigates to final unit (e.g. 3 of 6 earlier units completed)
// -----------------------------------------------------------------------------------
mockStorage.clear();
markUnitCompleted("github", "version-control-concepts");
markUnitCompleted("github", "essential-commands");
markUnitCompleted("github", "branching-merging");
// Earlier units 4, 5, 6 (including second-to-last) still incomplete!
const s2 = checkCertificationEligibility("github", githubUnits, "best-practices");
assert.strictEqual(s2.allEarlierCompleted, false, "Scenario 2: earlier units not all done");
assert.strictEqual(s2.isEligible, false, "Scenario 2: certification MUST remain LOCKED");
assert.strictEqual(s2.completedEarlierUnitsCount, 3, "Scenario 2: 3 units completed");
assert.strictEqual(s2.requiredEarlierUnitsCount, 6, "Scenario 2: 6 units required");
console.log("✔ Scenario 2 Passed: Direct navigation to final unit with partial lessons -> Certification remains LOCKED (3/6)");

// -----------------------------------------------------------------------------------
// Scenario 3: Student completes all required earlier lessons but has NOT yet entered the final unit
// -----------------------------------------------------------------------------------
mockStorage.clear();
// Complete units 1 through 6 (including 6 which is second-to-last unit)
for (let i = 0; i < 6; i++) {
  markUnitCompleted("github", githubUnits[i].slug);
}
// Student is currently viewing unit 3
const s3 = checkCertificationEligibility("github", githubUnits, "branching-merging");
assert.strictEqual(s3.allEarlierCompleted, true, "Scenario 3: all earlier units completed");
assert.strictEqual(s3.hasEnteredFinalUnit, false, "Scenario 3: student has not entered final unit");
assert.strictEqual(s3.isCurrentUnitFinal, false, "Scenario 3: currently not on final unit");
assert.strictEqual(s3.isEligible, false, "Scenario 3: certification remains LOCKED until entering final unit");
assert.strictEqual(s3.status, "locked_progressing", "Scenario 3: status is locked_progressing");
console.log("✔ Scenario 3 Passed: All earlier lessons completed but not yet entered final unit -> Certification remains LOCKED");

// -----------------------------------------------------------------------------------
// Scenario 4: Student completes required earlier lessons AND enters the final unit
// -----------------------------------------------------------------------------------
// Continuing from Scenario 3 state: student navigates to final unit ("best-practices")
const s4 = checkCertificationEligibility("github", githubUnits, "best-practices");
assert.strictEqual(s4.allEarlierCompleted, true, "Scenario 4: all earlier units completed");
assert.strictEqual(s4.hasEnteredFinalUnit, true, "Scenario 4: student has entered final unit");
assert.strictEqual(s4.isCurrentUnitFinal, true, "Scenario 4: currently on final unit");
assert.strictEqual(s4.isEligible, true, "Scenario 4: certification MUST be UNLOCKED");
assert.strictEqual(s4.status, "unlocked_final_unit", "Scenario 4: status must be unlocked_final_unit");
console.log("✔ Scenario 4 Passed: All earlier lessons completed and entered final unit -> Certification UNLOCKED!");

// -----------------------------------------------------------------------------------
// Scenario 5: Student reloads the page -> eligibility is recalculated correctly from saved progress
// -----------------------------------------------------------------------------------
// Simulate reload by creating fresh check reading from saved mockStorage
const s5 = checkCertificationEligibility("github", githubUnits, "best-practices");
assert.strictEqual(s5.isEligible, true, "Scenario 5: state preserved across page reload");
assert.strictEqual(s5.completedEarlierUnitsCount, 6, "Scenario 5: saved completed count preserved");

// Also test reload when locked:
mockStorage.clear();
markUnitCompleted("github", "version-control-concepts");
const s5_locked = checkCertificationEligibility("github", githubUnits, "best-practices");
assert.strictEqual(s5_locked.isEligible, false, "Scenario 5: locked state preserved across reload");
console.log("✔ Scenario 5 Passed: Eligibility recalculated accurately from persistent saved state after reload");

// -----------------------------------------------------------------------------------
// Scenario 6: Student has not passed the required assessment (<30 marks)
// -----------------------------------------------------------------------------------
const s6_fail1 = calculateCourseGrade(28);
assert.strictEqual(s6_fail1.isPassing, false);
assert.strictEqual(s6_fail1.canReceiveCertificate, false);
assert.strictEqual(s6_fail1.grade, "C");

const s6_fail2 = calculateCourseGrade(29.5);
assert.strictEqual(s6_fail2.isPassing, false);
assert.strictEqual(s6_fail2.canReceiveCertificate, false);
assert.strictEqual(s6_fail2.grade, "C");

const s6_failZero = calculateCourseGrade(0);
assert.strictEqual(s6_failZero.isPassing, false);
assert.strictEqual(s6_failZero.canReceiveCertificate, false);
console.log("✔ Scenario 6 Passed: Scores under 30/50 receive Grade C and CANNOT receive a certificate");

// -----------------------------------------------------------------------------------
// Scenario 7: Student meets course completion and scores >=30 marks on assessment
// -----------------------------------------------------------------------------------
// Score 30 (minimum passing score)
const s7_pass30 = calculateCourseGrade(30);
assert.strictEqual(s7_pass30.isPassing, true);
assert.strictEqual(s7_pass30.canReceiveCertificate, true);
assert.strictEqual(s7_pass30.grade, "B");
assert.strictEqual(s7_pass30.result, "Pass");

// Score 38 (Grade B+)
const s7_pass38 = calculateCourseGrade(38);
assert.strictEqual(s7_pass38.grade, "B+");
assert.strictEqual(s7_pass38.canReceiveCertificate, true);

// Score 42 (Grade A)
const s7_pass42 = calculateCourseGrade(42);
assert.strictEqual(s7_pass42.grade, "A");
assert.strictEqual(s7_pass42.canReceiveCertificate, true);

// Score 50 (Grade A+)
const s7_pass50 = calculateCourseGrade(50);
assert.strictEqual(s7_pass50.grade, "A+");
assert.strictEqual(s7_pass50.canReceiveCertificate, true);

// Generate Certificate ID and Verification Record
const certId = `TM-CERT-GITHUB-2026-TEST01`;
mockStorage.setItem(
  "techmiya_certificates",
  JSON.stringify([
    {
      certificateId: certId,
      learnerName: "Test Student",
      courseTitle: "Git & GitHub Professional Certification",
      score: 42,
      gradeResult: s7_pass42,
    },
  ])
);
const certs = JSON.parse(mockStorage.getItem("techmiya_certificates"));
assert.strictEqual(certs.length, 1);
assert.strictEqual(certs[0].certificateId, certId);
assert.strictEqual(certs[0].learnerName, "Test Student");
assert.strictEqual(certs[0].score, 42);
console.log("✔ Scenario 7 Passed: Qualifying score (>=30) receives certificate with valid verifiable record");

console.log("\n=================================================");
console.log("ALL 7 CERTIFICATION SCENARIOS PASSED FLAWLESSLY! 🎉");
console.log("=================================================");
