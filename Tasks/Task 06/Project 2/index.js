const students = require('./data/students');
const addStudent = require('./modules/addStudent');
const listStudents = require('./modules/listStudents');
const filterPassed = require('./modules/filterPassed');

console.log('All students:');
console.log(listStudents(students));

const newStudent = { name: 'Diana', grades: [90, 88, 92] };
addStudent(newStudent);

console.log('\nAfter adding Diana:');
console.log(listStudents(students));

console.log('\nPassed students:');
console.log(filterPassed(students));
