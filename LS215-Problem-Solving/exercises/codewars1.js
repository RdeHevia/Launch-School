/* eslint-disable max-len */
// /*
// You volunteered to help out teaching a preschool in your area! You were given 
// an array of all students and some important data about them, grouped by their 
// teacher. Create a function that will ungroup every student so you can look at 
// their details individually.
// [ 
//   { teacher: 'a', data: [{name: 'b', prop: 'd'}, {name: 'z', newprop: 'y' }},
//   { teacher: 'e', data: [{name: 'f', diffprop1: 'g', diffprop2: 'l'} ] }  
// ]
// ==>  [ 
//        { teacher: 'a', name: 'b', prop: 'd' }, 
//        { teacher: 'a', name: 'z', newprop: 'y' }, 
//        { teacher: 'e', name: 'f', diffprop1: 'g', diffprop2: 'l'}  
//      ]
// */
/*
INPUT: array of students grouped by teacher
  - [obj1, obj2, obj3...]
  - obj {
    teacher: string, (ALWAYS)
    data: [student1, student2...] (ALWAYS)
  }
  - student {
    name: string, ALWAYS
    prop1: , any data type
    prop2: , any data type
  }
OUTPUT: array of students:
  [studentData1, studentData2...]
  studentData: {
    teacher: string,
    name: string,
    the rest of the properties: ?
  }
RULES:
  - student objects: they have a name property and 0 or more other properties
  - input: assume always an array
  - array of students: [] -> []
  - [{}, {}] -> [] empty objects should be ignored
  - [{...}, {}, {...}] -> [...] empty objects should be ignored
  - obj.data = [] -> obj should be ignored
  - keys can be uppercase -> return them in lowercase
  - don't mutate the input
  - return array: order alphabetically by teachers name
*/

function deepCopy(object) {
  return JSON.parse(JSON.stringify(object));
}

/*
DATA STRUCTURE:
  - ungroupedData: [studentData1, studentData2...]
    - studentData: {teacher, name, prop1, prop2...}
ALGORITHM:
  - if the input array is [] -> []
  - ungroupedData = []
  - studentsCopy: create a deep copy of the input
  - iterate over the objects of studentsCopy. for each object:
    if the object is NOT empty AND data is NOT EMPTY:
      - map the array data with elements of the type studentData
        data.map(ungroupStudent(student, teachersName))
      - add the elements to ungroupedData array
  - return ungroupedData sorted by teachers name;
*/

function ungroupData(studentsGroup) {
  if (studentsGroup.length === 0) return [];
  let ungroupedData = [];
  let studentsGroupCopy = deepCopy(studentsGroup);

  studentsGroupCopy.forEach(group => {
    if (JSON.stringify(group) !== '{}') {
      for (let key in group) {
        if (key !== key.toLowerCase()) group[key.toLowerCase()] = group[key];
      }
      let students = group.data.map(student => ungroupStudent(student, group.teacher));
      ungroupedData.push(...students);
    }
  });
  return ungroupedData;
  // return ungroupedData.sort((a, b) => a.teacher.charCodeAt(0) - b.teacher.charCodeAt(0));
}

/*
ungroupStudent
I: student {}, teachersName: string
ALGORITHM:
  - declare an empty object
  - add 'teacher: teachersName' to the empty object
  - iterate over the keys of the object. For each key:
    - add the key as lowercase and its corresponding value to the empty object
  - return the resultant object
*/

function ungroupStudent(student, teachersName) {
  let ungroupedStudent = {teacher: teachersName};

  Object.keys(student).forEach(key => {
    let lowerCaseKey = key.toLowerCase();
    let value = student[key];
    ungroupedStudent[lowerCaseKey] = value;
  });

  return ungroupedStudent;
}

// console.log(ungroupStudent({name:'hi', PROP: 'hey'}, 'Paco'));

// // // TEST CASES
// // // - array of students: [] -> []
// console.log(ungroupData([])); // []
// // // - [{}, {}] -> [] empty objects should be ignored
// console.log(ungroupData([{}, {}])); // []

// // - [{...}, {}, {...}] -> [...] empty objects should be ignored
// let obj1 = { teacher: 'a', data: [{name: 'b', prop: 'd'}, {name: 'z', newprop: 'y' }]};
// let obj2 = { teacher: 'e', data: [{name: 'f', diffprop1: 'g', diffprop2: 'l'} ]};
// console.log(ungroupData([obj1, {}, obj2, {}]));
// // ==>  [ 
// //        { teacher: 'a', name: 'b', prop: 'd' }, 
// //        { teacher: 'a', name: 'z', newprop: 'y' }, 
// //        { teacher: 'e', name: 'f', diffprop1: 'g', diffprop2: 'l'}  
// //      ]


// // - obj.data = [] -> obj should be ignored
// let obj3 = { teacher: 'a', data: []};
// let obj4 = { teacher: 'e', data: [{name: 'f', diffprop1: 'g', diffprop2: 'l'} ]};
// console.log(ungroupData([obj3, obj4]));
// // ==>  [ 
// //        { teacher: 'e', name: 'f', diffprop1: 'g', diffprop2: 'l'}  
// //      ]

// // order doesn't matter
// let obj5 = { teacher: 'a', data: [{name: 'b', prop: 'd'}, {name: 'z', newprop: 'y' }]};
// let obj6 = { teacher: 'e', data: [{name: 'f', diffprop1: 'g', diffprop2: 'l'} ]};
// console.log(ungroupData([obj5, obj6]));
// console.log(ungroupData([obj6, obj5]));
// // ==>  [ 
// //        { teacher: 'a', name: 'b', prop: 'd' }, 
// //        { teacher: 'a', name: 'z', newprop: 'y' }, 
// //        { teacher: 'e', name: 'f', diffprop1: 'g', diffprop2: 'l'}  
// //      ]


// // - keys can be uppercase -> return them in lowercase
let obj7 = { TEACHER: 'a', data: [{NAME: 'b', PROP: 'd'}, {NAME: 'z', newprop: 'y' }]};
let obj8 = { teacher: 'e', DATA: [{name: 'f', diffprop1: 'g', DIFFPROP2: 'l'} ]};
console.log(ungroupData([obj7, obj8]));
console.log(ungroupData([obj8, obj7]));
// // ==>  [ 
// //        { teacher: 'a', name: 'b', prop: 'd' }, 
// //        { teacher: 'a', name: 'z', newprop: 'y' }, 
// //        { teacher: 'e', name: 'f', diffprop1: 'g', diffprop2: 'l'}  
// //      ]

// // - don't mutate the input
let obj9 = { teacher: 'a', data: [{name: 'b', prop: 'd'}, {name: 'z', newprop: 'y' }]};
let obj10 = { teacher: 'e', data: [{name: 'f', diffprop1: 'g', diffprop2: 'l'} ]};
console.log(ungroupData([obj9, {}, obj10, {}]));
// // ==>  [ 
// //        { teacher: 'a', name: 'b', prop: 'd' }, 
// //        { teacher: 'a', name: 'z', newprop: 'y' }, 
// //        { teacher: 'e', name: 'f', diffprop1: 'g', diffprop2: 'l'}  
// //      ]
console.log(obj9);
console.log(obj10);

// student optional properties: any data type
let obj11 = { 
  teacher: 'e',
  data: [
    {
      name: 'f',
      num: 1,
      boolean: true,
      n: null,
      undef: undefined,
      arr: [[1], {foo: [7]}, true],
      obj: {foo: [1,23], bar: (x) => x},
      func: (y) => y,
      regex: /abc/gi
    }
  ]
};
console.log(ungroupData([obj11])); // everything should be included
