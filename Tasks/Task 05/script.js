class Person {
  #email;
  #id;

  constructor(name, email, id) {
    this.name = name;
    this.email = email;
    this.id = id;
  }

  get email() {
    return this.#email;
  }

  set email(value) {
    if (typeof value !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      throw new Error("Email must be a valid email address.");
    }

    this.#email = value;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    if (value === undefined || value === null || String(value).trim() === "") {
      throw new Error("ID is required.");
    }

    this.#id = String(value).trim();
  }

  describeRole() {
    return `${this.name} is a school member.`;
  }
}

class Principal extends Person {
  constructor(name, email, id) {
    super(name, email, id);
    this.members = [];
  }

  addMember(member) {
    if (!(member instanceof Teacher) && !(member instanceof Student)) {
      throw new Error("Only teachers and students can be added as members.");
    }

    if (!this.members.some((schoolMember) => schoolMember.id === member.id)) {
      this.members.push(member);
    }
  }

  removeMember(memberId) {
    this.members = this.members.filter((member) => member.id !== String(memberId));
  }

  listMembers() {
    return [...this.members];
  }

  describeRole() {
    return `${this.name} manages the school and its members.`;
  }
}

class Teacher extends Person {
  constructor(name, email, id, subject) {
    super(name, email, id);
    this.subject = subject;
    this.grades = new Map();
  }

  gradeStudent(student, grade) {
    if (!(student instanceof Student)) {
      throw new Error("Grades can only be assigned to students.");
    }

    if (typeof grade !== "number" || grade < 0 || grade > 100) {
      throw new Error("Grade must be a number between 0 and 100.");
    }

    this.grades.set(student.name, grade);
  }

  listGradedStudents() {
    return Object.fromEntries(this.grades);
  }

  describeRole() {
    return `${this.name} teaches ${this.subject}.`;
  }
}

class Student extends Person {
  constructor(name, email, id) {
    super(name, email, id);
    this.enrolledSubjects = [];
  }

  enroll(subject) {
    if (typeof subject !== "string" || subject.trim() === "") {
      throw new Error("Subject name is required.");
    }

    const cleanSubject = subject.trim();
    if (!this.enrolledSubjects.includes(cleanSubject)) {
      this.enrolledSubjects.push(cleanSubject);
    }
  }

  viewEnrolledSubjects() {
    return [...this.enrolledSubjects];
  }

  describeRole() {
    return `${this.name} is studying ${this.enrolledSubjects.length} subject(s).`;
  }
}

const principal = new Principal("Mona Hassan", "mona@school.com", "P-001");
const teacher = new Teacher("Ahmed Ali", "ahmed@school.com", "T-001", "Mathematics");
const student = new Student("Sara Mohamed", "sara@school.com", "S-001");

principal.addMember(teacher);
principal.addMember(student);
teacher.gradeStudent(student, 95);
student.enroll("Mathematics");
student.enroll("Science");

const allMembers = [principal, teacher, student];

function renderSchoolData() {
  const output = document.querySelector("#output");
  output.innerHTML = `
    <p>${allMembers.map((member) => member.describeRole()).join("</p><p>")}</p>
    <h2>School members</h2>
    <ul>${principal.listMembers().map((member) => `<li>${member.name} (${member.id})</li>`).join("")}</ul>
    <h2>${student.name}'s subjects</h2>
    <p>${student.viewEnrolledSubjects().join(", ")}</p>
    <h2>Grades by ${teacher.name}</h2>
    <p>${Object.entries(teacher.listGradedStudents()).map(([name, grade]) => `${name}: ${grade}`).join(", ")}</p>
  `;
}

if (typeof document !== "undefined") {
  renderSchoolData();
}

if (typeof module !== "undefined") {
  module.exports = { Person, Principal, Teacher, Student };
}