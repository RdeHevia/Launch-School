/*
Write a function that takes a floating point number representing an angle 
between 0 and 360 degrees and returns a string representing that angle in 
degrees, minutes, and seconds. You should use a degree symbol (˚) to represent 
degrees, a single quote (') to represent minutes, and a double quote (") to 
represent seconds. There are 60 minutes in a degree, and 60 seconds in a minute.
*/

/*
INPUT: degrees
  - floating point number
  - 0 to 360 degrees
OUTPUT: degrees˚minutes'seconds"
RULES:
  - always return deg, min, secs
  - degree ˚; 60min in 1 dregree
  - minute '; 60s in 1 minute
  - seconds ""
  - assume degrees will always between 0 a 360
  - '123.23' (number in string format) -> valid input
    - empty string -> treat as 0
  - wrong data types: assume not
  - empty input -> treat as 0 degrees
  - seconds precision: no decimals
EXAMPLE:
123.5 degrees -> 123deg 30min 0secs
123 deg -> 123deg 0' 0"
260.47:
  260, 0.47: 260 deg
  0.47 * 60 -> 28.2
  28, 0.2: 28min
  0.2 * 60 -> 12: 12 seconds
DATA STRUCTURE:
  - MIN_IN_A_DEG: 60 (number)
  - SEC_IN_A_MIN: 60
  - deg, minutes, seconds: numbers
ALGORITHM:
  - set default input: 0
  - input is an string -> coerce into number
  - separate int from decimal part **separateIntegerFromDecimal**
  - int -> degrees
  - decimal * 60 **unitConversion(number, conversionRate)
  - separate int from decimal for (decmial * 60)
  - int -> minutes
  - decimal * 60 and round it -> seconds
  - log with appropiate symbols
=========
**separateIntegerFromDecimal**
 - parse the integer part of the number
 - decimal part = number - integer part
 - return [integer, decimal]
=========
unitConversion
  - return number * conversionRate
*/

function separateIntegerFromDecimal(number) {
  let integer = Number.parseInt(number, 10);
  let decimal = number - integer;
  return [integer, decimal];
}

function convertToUnit(value, conversionRate) {
  return value * conversionRate;
}

function toDegreesMinutesSeconds(degreesFloat = 0) {
  if (typeof degreesFloat === 'string') degreesFloat = +degreesFloat;
  
  const MIN_IN_A_DEG = 60;
    const SEC_IN_A_MIN = 60;
  
  let [degrees, degreesDecimalPart] = separateIntegerFromDecimal(degreesFloat);
  let minutesFloat = convertToUnit(degreesDecimalPart, MIN_IN_A_DEG);
  
  let [minutes, minutesDecimalPart] = separateIntegerFromDecimal(minutesFloat);
  
  let seconds = Math.round(convertToUnit(minutesDecimalPart, SEC_IN_A_MIN));
  return `${degrees}˚ ${minutes}' ${seconds}"`;
}

// TEST CASES
// no input
console.log(toDegreesMinutesSeconds()); // 0 0 0

// 0 deg
console.log(toDegreesMinutesSeconds('')); // 0 0 0
console.log(toDegreesMinutesSeconds('0')); // 0 0 0
console.log(toDegreesMinutesSeconds(0)); // 0 0 0
console.log(toDegreesMinutesSeconds(0.000)); // 0 0 0
// 360 deg
console.log(toDegreesMinutesSeconds('360')); // 360 0 0
console.log(toDegreesMinutesSeconds('360')); // 360 0 0
console.log(toDegreesMinutesSeconds(360)); // 360 0 0
// intermediate cases
console.log(toDegreesMinutesSeconds(260.47)); // 260 28 12 
console.log(toDegreesMinutesSeconds('260.47')); // 260 28 12 
console.log(toDegreesMinutesSeconds(123.5)); // 123 30 0
console.log(toDegreesMinutesSeconds(123)); // 123 0 0
console.log(toDegreesMinutesSeconds(.5)); // 0 30 0
console.log(toDegreesMinutesSeconds(.01)); // 0 0 36
console.log(toDegreesMinutesSeconds(.001)); // 0 0 4


