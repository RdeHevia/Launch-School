/* eslint-disable max-len */
/*
INPUT: studentData
  - {student1, student2...}
    - student: {
      id: integer (number),
      scores: {
        exams: [],
        exercises: []
      }.
    }
OUTPUT: summary
  - {
    studentGrades: [grade1, grade2...],
    exams: [exam1, exam2,...]
  }
    - grade: string (e.g. 87 (B))
    - exam: {
      average: number, (round to 1 decimal)
      minimum: number,
      maximum: number
    }
RULES:
  - DONT MUTATE ORIGINAL INPUT
  - finalScore: 0.65Exams + 0.35Exercises; [0-100]
    - rounded to 0 decimals
  - finalGrade: A,B,C...F based on the finalScore
  - exercises:
    - 1 or more
    - total exercise score = sum of exercise score <= 100
  - exams:
    - 4 exams
    - score: 0 to 100
    - total exam score = average score of the 4 exams

  - INPUT:
    - assume always an object
    - no argument passed: return null
    - {} -> return {}
  - student objects:
    - assume always objects
    - assume not empty
    - assume not additional properties
    - property name: case insensitive (could be uppercase)
    - id: assume always positive integer and always number type
    - scores:
      - assume always object
      - {} -> ignore that student
      - exams and exercises:
        - always array
        - elements of array always numbers
      
  
EXAMPLE (calculate finalScoreAndGrade for a student)
  1 student:
    exercises: 20, 15, 40
    exams: 90, 80, 95, 71
    
    exerciseScore = 20 + 30 + 50 = 100
    examScore = 75
    finalScore = 0.65*84 + 0.35*75 = 80.85 -> 81
    81:
     81 < 93
     81 < 85
     81 > 77 -> C
    finalScoreAndGrade: '81 (C)'
EXAMPLE (average student scores for a exam)
    - exam2:
      -student1: 80
      - student2: 60
      - student3: 100
    - avg: 80.0
    - min: 60
    - max: 100
*/

/*
DATA STRUCTURE:
  - studentGrades; [grade1, grade2...]; grade: string
  - exams: {exam1...exam4}; exam: {avg, max, min} (numbers)
ALGORITHM:
  - make default input {}
  - if no input provided or {} -> return {}
  - studentGrades: find the student grades of every student
  - find the avg, min and max grades of the each of the 4 exams. getStats
  - return the object {studentGrades [finalGrade1,...], exams:{exam1,...}}}
*/

function generateClassRecordSummary(studentsData = {}) {
  if (JSON.stringify(studentsData) === '{}') return {};
  let copyOfStudentData = lowerCaseProperties(studentData);
  let studentGrades = findStudentGrades(studentsData);
  let examStats = getExamStats(studentsData) || {};
  return {
    studentGrades,
    exams: examStats
  };
}

function lowerCaseProperties(object) {
  let objectStringified = JSON.stringify(object);
  let lowerCasedProperties = objectStringified.replace(/[a-z]+/gi, (key) => {
    return key.toLowerCase();
  });

  return JSON.parse(lowerCasedProperties);
}

let obj = {
  Foo: 1,
  bAr: [2, {qUx: 3}],
  hey: {PQ: [7]}
};

console.log(lowerCaseProperties(obj));
console.log(obj);

/*
findStudentGrades:
ALGORITHM:
  - Create an array with the keys of studentScore (student1...)
  - Map the array of keys. For each student
    - find the grade of the student in studentScores: findStudentGrade(student)
  - return the resultant array
*/

function findStudentGrades(studentsData) {
  console.log(studentsData);
  let finalGrades = Object.keys(studentsData).map(student => {
    return findStudentGrade(studentsData[student].scores);
  });

  return finalGrades;
}

/*findStudentGrade:
ALGO:
  - calc the avg exam score
  - sum the total exercise score
  - sum both with -.65 and 0..35 weights
  - round up score
  - find its respective grade *findGrade(score)
  - concatenate everything into a string
  - return the string
*/

function findStudentGrade(scores) {
  let avgExamScore = scores.exams.reduce((sum, exam) => sum + exam) / scores.exams.length;
  let totalExercisesScore = scores.exercises.reduce((sum, exercise) => sum + exercise);
  let totalScore = Math.round((0.65 * avgExamScore) + (0.35 * totalExercisesScore));
  let grade = findGrade(totalScore);
  return `${totalScore} (${grade})`;
}

function findGrade(score) {
  if (score >= 93) return 'A';
  if (score >= 85) return 'B';
  if (score >= 77) return 'C';
  if (score >= 69) return 'D';
  if (score >= 60) return 'E';
  return 'F';
}

/*
getStats (studentScore)
ALGO:
  - map the students into an array of exam scores
    [student1, student2...]; studnet: [exam1, exam2, exam3, exam4]
  - iterate from 0 to 3. For each iteration
    - calc the average
    - max
    - min  
*/

function getExamStats(studentsData) {
  return undefined;
}


// TEST CASES

// - no argument passed: return {}
console.log(generateClassRecordSummary()); // {}
// - input {} -> return {}
console.log(generateClassRecordSummary({})); // {}
// - central case (happy path)
let studentScores = {
  student1: {
    id: 123456789,
    scores: {
      exams: [90, 95, 100, 80],
      exercises: [20, 15, 10, 19, 15],
    },
  },
  student2: {
    id: 123456799,
    scores: {
      exams: [50, 70, 90, 100],
      exercises: [0, 15, 20, 15, 15],
    },
  },
  student3: {
    id: 123457789,
    scores: {
      exams: [88, 87, 88, 89],
      exercises: [10, 20, 10, 19, 18],
    },
  },
  student4: {
    id: 112233445,
    scores: {
      exams: [100, 100, 100, 100],
      exercises: [10, 15, 10, 10, 15],
    },
  },
  student5: {
    id: 112233446,
    scores: {
      exams: [50, 80, 60, 90],
      exercises: [10, 0, 10, 10, 0],
    },
  },
};

// console.log(generateClassRecordSummary(studentScores));

// // returns:
// // {
// //   studentGrades: [ '87 (B)', '73 (D)', '84 (C)', '86 (B)', '56 (F)' ],
// //   exams: [
// //     { average: 75.6, minimum: 50, maximum: 100 },
// //     { average: 86.4, minimum: 70, maximum: 100 },
// //     { average: 87.6, minimum: 60, maximum: 100 },
// //     { average: 91.8, minimum: 80, maximum: 100 },
// //   ],
// // }

// // - property name: case insensitive (could be uppercase)
// let studentScores2 = {
//   studENT1: {
//     id: 123456789,
//     sCOREs: {
//       exaMs: [90, 95, 100, 80],
//       exerCisEs: [20, 15, 10, 19, 15],
//     },
//   },
//   student2: {
//     Id: 123456799,
//     scores: {
//       eXams: [50, 70, 90, 100],
//       exercIses: [0, 15, 20, 15, 15],
//     },
//   },
//   student3: {
//     id: 123457789,
//     scores: {
//       exams: [88, 87, 88, 89],
//       exercises: [10, 20, 10, 19, 18],
//     },
//   },
//   Student4: {
//     id: 112233445,
//     SCORES: {
//       eXAMS: [100, 100, 100, 100],
//       exerCIses: [10, 15, 10, 10, 15],
//     },
//   },
//   student5: {
//     id: 112233446,
//     scores: {
//       exams: [50, 80, 60, 90],
//       exercises: [10, 0, 10, 10, 0],
//     },
//   },
// };
// generateClassRecordSummary(studentScores2);

// // returns:
// // {
// //   studentGrades: [ '87 (B)', '73 (D)', '84 (C)', '86 (B)', '56 (F)' ],
// //   exams: [
// //     { average: 75.6, minimum: 50, maximum: 100 },
// //     { average: 86.4, minimum: 70, maximum: 100 },
// //     { average: 87.6, minimum: 60, maximum: 100 },
// //     { average: 91.8, minimum: 80, maximum: 100 },
// //   ],
// // }

// // - scores object {} -> ignore that student
// let studentScores3 = {
//   student1: {
//     id: 123456789,
//     scores: {},
//   },
//   student2: {
//     id: 123456799,
//     scores: {
//       exams: [100, 100, 100, 100],
//       exercises: [10, 10, 10, 10, 10],
//     },
//   }
// };

// generateClassRecordSummary(studentScores3);
// // returns:
// {
//   studentGrades: [ '83 (C)'],
//   exams: [
//     { average: 100, minimum: 100, maximum: 100 },
//     { average: 100, minimum: 100, maximum: 100 },
//     { average: 100, minimum: 100, maximum: 100 },
//     { average: 100, minimum: 100, maximum: 100 },
//   ],
// }

//   - DONT MUTATE ORIGINAL INPUT