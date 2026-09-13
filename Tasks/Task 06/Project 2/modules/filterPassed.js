const calculateAverage = require('./calculateAverage');

function filterPassed(students) {
  if (!Array.isArray(students)) {
    return [];
  }

  return students.filter((student) => calculateAverage(student.grades) >= 60);
}

module.exports = filterPassed;
