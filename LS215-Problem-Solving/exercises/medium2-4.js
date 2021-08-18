// Write a function that takes a year as an argument and returns the number of 
// 'Friday the 13ths' in that year. You may assume that the year is greater than 
// 1752 (when the modern Gregorian Calendar was adopted by the United Kingdom). 
// You may also assume that the same calendar will remain in use for the 
// foreseeable future.

/*
INPUT: year
  - number integer
OUTPUT: number of Fridays the 13ths of that year
RULES
  - year > 1752
  - if these conditions are met, count that day:
    - day is 13th
    - day of the week is friday
  input:
    - assume is always an integer > 1752
    - the integer can be either a number or string
ALGORITHM:
  - coerce input into number
  - For each month, find the day of the week for the 13th. Save the results into
    days13th
  - Filter the days that are Friday
  - return the length of the resultant array
EXAMPLE:
2021: return 1
1: Wed
2: Sat
3: Sat
4: Tues
5: Th
6: Sun
7: Tue
8: Fri <-
9: Mon
10: Wed
11: Sat
12: Mon
*/

function fridayThe13ths(year) {
  year = +year;
  let days13th = [];
  let dates = [];
  let fridayNumber = 5;
  for (let month = 0; month < 12; month += 1) {
    dates.push(new Date(year, month, 13));
    let dayOfWeek = new Date(year, month, 13).getDay();
    days13th.push(dayOfWeek);
  }
  // return dates;
  return days13th.filter(dayOfWeek => dayOfWeek === fridayNumber).length;
}

console.log(fridayThe13ths(1986));      // 1
console.log(fridayThe13ths(2015));      // 3
console.log(fridayThe13ths(2017));      // 2
console.log(fridayThe13ths(2021));      // 1