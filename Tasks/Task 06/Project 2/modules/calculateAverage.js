function calculateAverage(grades) {
  if (!Array.isArray(grades) || grades.length === 0) {
    return 0;
  }

  const total = grades.reduce((sum, grade) => sum + grade, 0);
  return total / grades.length;
}

module.exports = calculateAverage;
