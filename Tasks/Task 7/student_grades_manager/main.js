const addGrade = require('./modules/add.grade');
const deleteGrade = require('./modules/delete.grade');
const readGrades = require('./modules/read.grades');
const updateGrade = require('./modules/update.grade');

function printUsage() {
  console.log(`Student Grades Manager

Commands:
  node main.js list
  node main.js add "Student Name" "Subject" 95
  node main.js update <id-or-name> [name] [subject] <grade>
  node main.js delete <id-or-name>
`);
}

async function main() {
  const [command, ...args] = process.argv.slice(2);

  switch (command) {
    case 'list': {
      const grades = await readGrades();
      console.table(grades);
      break;
    }
    case 'add': {
      const [name, subject, grade] = args;
      const record = await addGrade(name, subject, Number(grade));
      console.log('Grade added:', record);
      break;
    }
    case 'update': {
      const [identifier, name, subject, grade] = args;
      const record = await updateGrade(identifier, {
        ...(name && { name }),
        ...(subject && { subject }),
        ...(grade !== undefined && { grade: Number(grade) })
      });
      console.log(record ? 'Grade updated:' : 'Grade not found:', record || '');
      break;
    }
    case 'delete': {
      const record = await deleteGrade(args[0]);
      console.log(record ? 'Grade deleted:' : 'Grade not found:', record || '');
      break;
    }
    default:
      printUsage();
  }
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});
