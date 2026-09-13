function listStudents(students) {
  if (!Array.isArray(students)) {
    return [];
  }

  return students.map((student) => ({
    id: student.id,
    name: student.name,
    grades: student.grades,
    average: student.grades.reduce((sum, grade) => sum + grade, 0) / student.grades.length
  }));
}

module.exports = listStudents;
