const readGrades = require('./read.grades');
const saveGrades = require('./save.grades');

function validateGrade(grade) {
  if (!Number.isFinite(grade) || grade < 0 || grade > 100) {
    throw new Error('Grade must be a number between 0 and 100.');
  }
}

async function updateGrade(identifier, updates) {
  if (identifier === undefined || identifier === '' || !updates) {
    throw new Error('Provide a grade ID or student name and update values.');
  }

  const grades = await readGrades();
  const numericId = Number(identifier);
  const record = grades.find((item) => Number.isInteger(numericId) && item.id === numericId
    || item.name.toLowerCase() === String(identifier).trim().toLowerCase());

  if (!record) {
    return null;
  }

  if (updates.name !== undefined) {
    if (!updates.name.trim()) throw new Error('Student name cannot be empty.');
    record.name = updates.name.trim();
  }

  if (updates.subject !== undefined) {
    if (!updates.subject.trim()) throw new Error('Subject cannot be empty.');
    record.subject = updates.subject.trim();
  }

  if (updates.grade !== undefined) {
    validateGrade(updates.grade);
    record.grade = updates.grade;
  }

  await saveGrades(grades);
  return record;
}

module.exports = updateGrade;
