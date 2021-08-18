/*
After Midnight (Part 1)

The time of day can be represented as the number of minutes before or after 
midnight. If the number of minutes is positive, the time is after midnight. 
If the number of minutes is negative, the time is before midnight.

Write a function that takes a time using this minute-based format and returns 
the time of day in 24 hour format (hh:mm). Your function should work with any 
integer input.

You may not use javascript's Date class methods.
*/

/*
INPUT: number of minutes
  - positive, 0, negative integers
OUTPUT: time in 24h format ('hh:mm')
  - string
RULES:
  - assume input always an integer
  - no limit for the number of minutes
  - minutes in a day: 1440 min
EXAMPLES:
0 -> 00:00
80 -> 01:20
-80 -> 22:40
1440 -> 00:00
-1440 -> 00:00
2881 -> 00:01
2881 / 1440 = 2 day + 0.000694 days
0.000694 * 24 = 0h + 0....
0.... * 60  = 1min
-2881 / 1440 = - (2 day - 0....)
1440 - 0....*1440 = 920
...
*/

/*
DATA STRUCTURE:
  - hours, numbers: number
  - return value of formatHour: string
ALGORITHM:
- if minutes === 0 -> nbrH = 0; nbrMin = 0;
* if minutes > 0: [hours, minutes] = getHoursMinutesPositive(minutes)
* if minutes < 0: [hours, minutes] = getHoursMinutesNegative(minutes)
* format hours minutes correctly into a string: formatHour(hours, minutes)
- return the string
*/

/*
getHoursMinutesPositive
DS:
ALGORITHM:
  - let decimalHours = 
*/

// TEST CASES
// 0
console.log(timeOfDay(0)); // 00:00
console.log(timeOfDay(-0)); // 00:00
// positive
// 0
console.log(timeOfDay(80)); // 01:20
console.log(timeOfDay(920)); // 15:20
console.log(timeOfDay(1440)); // 00:00
console.log(timeOfDay(2881)); // 00:01
// negative
console.log(timeOfDay(-80)); // 22:40
console.log(timeOfDay(-1440)); // 00:00
console.log(timeOfDay(-2881)); // 23:59
console.log(timeOfDay(-520)); // 15:20