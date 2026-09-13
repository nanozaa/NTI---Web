const readGrades = require('./read.grades');
const saveGrades = require('./save.grades');

function validateGrade(grade) {
  if (!Number.isFinite(grade) || grade < 0 || grade > 100) {
    throw new Error('Grade must be a number between 0 and 100.');
  }
}

async function addGrade(name, subject, grade) {
  if (!name || !subject) {
    throw new Error('Student name and subject are required.');
  }

  validateGrade(grade);

  const grades = await readGrades();
  const nextId = grades.reduce((highestId, record) => Math.max(highestId, record.id), 0) + 1;
  const newRecord = {
    id: nextId,
    name: name.trim(),
    subject: subject.trim(),
    grade
  };

  grades.push(newRecord);
  await saveGrades(grades);
  return newRecord;
}

module.exports = addGrade;
