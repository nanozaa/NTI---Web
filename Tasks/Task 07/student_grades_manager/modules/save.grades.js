const fs = require('fs/promises');
const path = require('path');

const gradesFile = path.join(__dirname, '..', 'data', 'grades.json');

async function saveGrades(grades) {
  await fs.mkdir(path.dirname(gradesFile), { recursive: true });
  await fs.writeFile(gradesFile, `${JSON.stringify(grades, null, 2)}\n`, 'utf8');
}

module.exports = saveGrades;
