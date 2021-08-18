/*
school object
- it uses student object from objects4.js
methods
  -addStudent()
  -enrollStudent()
  -addGrade()
  -getReportCard()
  -courseReport()
*/

// eslint-disable-next-line max-lines-per-function
function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],

    info() {
      console.log(`${this.name} is a ${this.year} year student.`);
    },

    addCourse(course) {
      this.courses.push(course);
    },

    listCourses() {
      return this.courses;
    },

    addNote(courseCode, newNote) {
      let course = this.findCourseByCode(courseCode);
      if (!course.hasOwnProperty('notes') || course.notes === '') {
        course.notes = newNote;
      } else {
        course.notes = ''.concat(course.notes, '; ', newNote);
      }
    },

    updateNote(courseCode, newNote) {
      let course = this.findCourseByCode(courseCode);
      course.notes = newNote;
    },

    findCourseByCode(courseCode) {
      let index = this.courses.findIndex(course => course.code === courseCode);
      return this.courses[index];
    },

    findCourseByName(courseName) {
      let index = this.courses.findIndex(course => course.name === courseName);
      return this.courses[index];
    },

    viewNotes() {
      this.courses.forEach(course => {
        console.log(`${course.name}: ${course.notes}`);
      });
    }
  };
}

let foo = createStudent('Foo', '1st');
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.addNote(102, 'Difficult subject');
foo.updateNote(101, 'Fun course');


let school = {
  students: {},

  addStudent(student) {
    function validYear() {
      const VALID_YEARS = ['1st', '2nd', '3rd', '4th', '5th'];
      return VALID_YEARS.includes(student.year);
    }

    if (validYear()) {
      this.students[student.name.toLowerCase()] = student;
    } else {
      console.log('Invalid Year');
    }
  },

  enrollStudent(student, course) {
    student.addCourse(course);
  },

  addGrade(student, courseCode, grade) {
    // adds grade of a student for a course
    let course = student.findCourseByCode(courseCode);
    course.grade = grade;
  },

  getReportCard(student) {
    // logs the grades of a student for all courses. if the course has no grade,
    // logs 'In progress'
    student.courses.forEach(course => {
      if (!course.hasOwnProperty('grade')) {
        console.log(`${course.name}: In Progress`);
      } else {
        console.log(`${course.name}: ${course.grade}`);
      }
    });
  },

  courseReport(courseName) {
    console.log(`=${courseName} Grade=`);
    let students = Object.values(this.students);
    students.forEach(student => {
      let course = student.findCourseByName(courseName);
      if (course.hasOwnProperty('grade')) {
        console.log(`${student.name}: ${course.grade}`);
      }
    });
  }
};

// console.log(foo);
// console.log(school);
school.addStudent(foo);
// console.log(school.students);
school.enrollStudent(foo,{ name: 'Physics', code: 202, });
school.addGrade(foo, 202, 93);
console.log(school.students.foo);
school.getReportCard(foo);
school.courseReport('Physics');