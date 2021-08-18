/*
I: studentScores object {student1, student2,...}
   student object: {id, scores { exams: [], exercises: []}}
O: summary object: {studentGrades: [], exams []}
RULES:
  - Percent grade = 0.65Exam_average + 0.35Exercises
  - exams
    - score: 0-100
    - 4 exams each year
  - exercise
    - any number
    - score: sum of the scores of all the exercises is always 100
ALGORITHM:
  1. Calculate the average score and grade (letter) for each student
  2. Calculate the average, minimum and maximum score for each exam
  3. Return the sumary in the right format
------
calcGradesOfAllStudents
1. For each student:
  1.1. Calc the average score and grade (letter)
2. Return result as an array of strings
---------
calcStudentGrade
1. Calc the average exam score
2. Calc the sum of exercise scores
3. Calc the weighted score, rounded.
4. Find the equivalent grade letter
5. Return 'average_score (gradeLetter)'
-------
getLetterGrade
EXAMPLES:

81: C
  A check: 81 > 93? NO
  B check: 81 > 85? NO
  C check: 81 > 77? YES -> C, stop the iteration
ALGORITHM:
  1. Iterate over the "table of equivalency". For each letter score:
    1.1. Check if numeric score < lowerLimit
      - YES -> stop the iteration and return that letter
      - NO -> continue
----------
examStats
1. Get all the scores of all the students for the exam1.
2. Do the same for exam2, exam3 and exam4.
3. For each exam, calculate: average, minimum, maximum
4. Return results
*/
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

function sum(...numbers) {
  return numbers.reduce((total, number) => total + number);
}

function average(...numbers) {
  let numberCount = numbers.length;
  return sum(...numbers) / numberCount;
}

function calcNumericScore (studentScores) {
  const WEIGHT_EXAMS = 0.65;
  const WEIGHT_EXERCISES = 1 - WEIGHT_EXAMS;

  let examScores = studentScores.scores.exams;
  let exerciseScores = studentScores.scores.exercises;
  let averageExamScore = average(...examScores);
  let totalScoreFromExercises = sum(...exerciseScores);

  return Math.round(
    (averageExamScore * WEIGHT_EXAMS) +
    (totalScoreFromExercises * WEIGHT_EXERCISES)
  );
}

function getLetterGrade(numericScore) {
  const EQUIVALENCY = {
    A: 93,
    B: 85,
    C: 77,
    D: 69,
    E: 60,
    F: 0
  };

  for (let letterGrade in EQUIVALENCY) {
    let lowerLimitScore = EQUIVALENCY[letterGrade];
    if (numericScore >= lowerLimitScore) return letterGrade;
  }
}

function calcStudentGrade(studentScores) {
  let numericScore = calcNumericScore(studentScores);
  let letterGrade = getLetterGrade(numericScore);
  return `${numericScore} (${letterGrade})`;
}

function calcGradesOfAllStudents(scores) {
  return Object.values(scores).map(calcStudentGrade);
}


function groupScoresByExam (scores) {
  const NUMBER_OF_EXAMS = 4;
  let exams = [];

  for (let examIdx = 0; examIdx < NUMBER_OF_EXAMS; examIdx += 1) {
    let exam = [];
    Object.values(scores).forEach(student => {
      exam.push(student.scores.exams[examIdx]);
    });
    exams.push(exam);
  }

  return exams;
}

function examStats (examScores) {
  let averageScore = average(...examScores);
  let minScore = Math.min(...examScores);
  let maxScore = Math.max(...examScores);

  return {
    average: averageScore,
    minimum: minScore,
    maximum: maxScore
  };
}

function statsOfAllExams(scores) {
  let exams = groupScoresByExam(scores);
  return exams.map(examStats);
}

function generateClassRecordSummary(scores) {
  let studentGrades = calcGradesOfAllStudents(scores);
  let exams = statsOfAllExams(scores);
  return {studentGrades, exams};
}

let student1 = {
  id: 123456789,
  scores: {
    exams: [90, 95, 100, 80],
    exercises: [20, 15, 10, 19, 15],
  }
};

// console.log(calcNumericScore(student1));
// console.log(getLetterGrade(69));
console.log(generateClassRecordSummary(studentScores));