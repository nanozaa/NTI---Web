const readGrades = require('./read.grades');
const saveGrades = require('./save.grades');

function matchesIdentifier(record, identifier) {
  const numericId = Number(identifier);
  return Number.isInteger(numericId) && String(record.id) === String(numericId)
    || record.name.toLowerCase() === String(identifier).trim().toLowerCase();
}

async function deleteGrade(identifier) {
  if (identifier === undefined || identifier === '') {
    throw new Error('Provide a grade ID or student name.');
  }

  const grades = await readGrades();
  const recordIndex = grades.findIndex((record) => matchesIdentifier(record, identifier));

  if (recordIndex === -1) {
    return null;
  }

  const [deletedRecord] = grades.splice(recordIndex, 1);
  await saveGrades(grades);
  return deletedRecord;
}

module.exports = deleteGrade;
