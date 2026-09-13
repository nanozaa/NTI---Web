const studentName = "Sara";
const attendance = 85;
const midterm = 80;
const finalExam = 90;
const assignment = 88;
const tuitionPaid = true;

function calculateTotalScore(mid, final, assignmentScore) {
  return mid + final + assignmentScore;
}

function determineGrade(total) {
  if (total >= 90) {
    return "A";
  }

  if (total >= 80) {
    return "B";
  }

  if (total >= 70) {
    return "C";
  }

  if (total >= 60) {
    return "D";
  }

  return "F";
}

function checkStudentStatus() {
  if (attendance < 75) {
    console.log(studentName + " failed because attendance is below the required percentage.");
    return;
  }

  if (!tuitionPaid) {
    console.log(studentName + " cannot view results because tuition is unpaid.");
    return;
  }

  const total = calculateTotalScore(midterm, finalExam, assignment);
  const grade = determineGrade(total);

  console.log("Student: " + studentName);
  console.log("Attendance: " + attendance + "%");
  console.log("Total Score: " + total);
  console.log("Letter Grade: " + grade);

  if (grade === "F") {
    console.log("Academic Status: Failed");
  } else {
    console.log("Academic Status: Passed");
  }

  if (total >= 90) {
    console.log("Scholarship eligibility: Eligible for scholarship.");
  }
}

console.log("--- Student Portal ---");
checkStudentStatus();
