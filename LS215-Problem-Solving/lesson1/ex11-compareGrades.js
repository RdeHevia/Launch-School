let studentGrades = [
  { name: 'StudentA', grade: 90.1 },
  { name: 'StudentB', grade: 92 },
  { name: 'StudentC', grade: 91.8 },
  { name: 'StudentD', grade: 95.23 },
  { name: 'StudentE', grade: 91.81 },
];

function compareGrades2 (a,b) {
  return b.grade - a.grade;
}

function compareGrades (a, b) {
  if (b.grade > a.grade) {
    return 1;
  } else if (b.grade < a.grade) {
    return -1;
  } else {
    return 0;
  }
}

console.log(studentGrades.sort(compareGrades));