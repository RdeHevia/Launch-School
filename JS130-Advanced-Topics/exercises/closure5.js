let Professional = {
  invoice() {
    console.log(this.fullName() + ' is Billing customer');
  },

  payTax() {
    console.log(this.fullName() + ' Paying taxes');
  }
};

function extend (instance, mixin) {
  return Object.assign(instance,mixin);
}

function Person(firstName, lastName, age, gender) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.gender = gender;
}

Person.prototype = {
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  communicate() {
    console.log('Communicating');
  },

  eat() {
    console.log('Eating');
  },

  sleep() {
    console.log('Sleeping');
  },
};

Person.prototype.constructor = Person;

function Doctor(firstName, lastName, age, gender, specialization) {
  Person.call(this,firstName, lastName, age, gender);
  this.specialization = specialization;
}
Doctor.prototype = Object.create(Person.prototype);
Doctor.prototype.constructor = Doctor;
Doctor.prototype.diagnose = function () {
  console.log('Diagnosing');
};

function Student(firstName, lastName, age, gender, degree) {
  Person.call(this, firstName, lastName, age, gender);
  this.degree = degree;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.study = function () {
  console.log(`Studying`);
};

function GraduateStudent(firstName, lastName, age, gender, degree, graduateDegree) {
  Student.call(this,firstName, lastName, age, gender, degree);
  this.graduateDegree = graduateDegree;
}

GraduateStudent.prototype = Object.create(Student.prototype);
GraduateStudent.prototype.constructor = GraduateStudent;
GraduateStudent.prototype.research = function () {
  console.log(`Researching`);
};

let doctor = extend(new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics'), Professional);
console.log(doctor instanceof Person);     // logs true
console.log(doctor instanceof Doctor);     // logs true
doctor.eat();                              // logs 'Eating'
doctor.communicate();                      // logs 'Communicating'
doctor.sleep();                            // logs 'Sleeping'
console.log(doctor.fullName());            // logs 'foo bar'
doctor.diagnose();                         // logs 'Diagnosing'

// let professor = extend(new Professor('foo', 'bar', 21, 'gender', 'Systems Engineering'), Professional);
// console.log(professor instanceof Person);     // logs true
// console.log(professor instanceof Professor);  // logs true
// professor.eat();                              // logs 'Eating'
// professor.communicate();                      // logs 'Communicating'
// professor.sleep();                            // logs 'Sleeping'
// console.log(professor.fullName());            // logs 'foo bar'
// professor.teach();                            // logs 'Teaching'

doctor.invoice();                          // logs 'foo bar is Billing customer'
doctor.payTax();                           // logs 'foo bar Paying taxes'

Professional.invoice = function() {
  console.log(this.fullName() + ' is Asking customer to pay');
};

doctor.invoice();                          // logs 'foo bar is Asking customer to pay'
// professor.invoice();                       // logs 'foo bar is Asking customer to pay'
// professor.payTax();                        // logs 'foo bar Paying taxes'