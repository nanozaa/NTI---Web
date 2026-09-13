const students = require('../data/students');

function addStudent(newStudent) {
  if (!newStudent || !newStudent.name || !Array.isArray(newStudent.grades)) {
    return 'Invalid student data';
  }

  const student = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    name: newStudent.name,
    grades: newStudent.grades
  };

  students.push(student);
  return student;
}

module.exports = addStudent;
