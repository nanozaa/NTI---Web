const fs = require('fs/promises');
const path = require('path');

const gradesFile = path.join(__dirname, '..', 'data', 'grades.json');

async function readGrades() {
  try {
    const fileContents = await fs.readFile(gradesFile, 'utf8');
    const grades = JSON.parse(fileContents);

    if (!Array.isArray(grades)) {
      throw new Error('grades.json must contain an array.');
    }

    return grades;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }

    throw error;
  }
}

module.exports = readGrades;
