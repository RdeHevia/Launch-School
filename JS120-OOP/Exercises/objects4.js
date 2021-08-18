/*
- object factory

properties (not requirements) :
  - name: string
  - year: string
  - courses: [course1, course2...]
    course1: {
      - name of the course: string
      - course code: number
      - notes: string. notes separated by ';'
    }

methods:
  - info()
  - addCourse()
  - listCourse()
  - addNote()
  - updateNote()
  - viewNotes()
*/
/*
addNote:
EXAMPLE:
> foo.addNote(101, 'Fun course'); -> courses[101].notes: 'Fun course'
> foo.addNote(101, 'Remember to study for algebra');
    courses[101].notes: 'Fun course; Remember to study for algebra
ALGORITHM:
1. Using the courseCode, find the index of the course in the array.
2. Determine if the notes property already exist:
    no -> create it and add the note
    yes -> check if the value associated is a non-empty string:
      yes -> append string using ; as a separator
      no -> assign the string to the property
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
      let course = this.findCourse(courseCode);
      if (!course.hasOwnProperty('notes') || course.notes === '') {
        course.notes = newNote;
      } else {
        course.notes = ''.concat(course.notes, '; ', newNote);
      }
    },

    updateNote(courseCode, newNote) {
      let course = this.findCourse(courseCode);
      course.notes = newNote;
    },

    findCourse(courseCode) {
      let index = this.courses.findIndex(course => course.code === courseCode);
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
foo.info();
// "Foo is a 1st year student"
foo.listCourses();
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"