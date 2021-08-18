/*
class Clock:
  - at(hours, [minutes])
  - add(minutes)
  - subtract(minutes)
--------------
at()
INPUT: hours, minutes in number format
OUTPUT: clock object with 'HH:MM' in 24h format
EXAMPLE:
(11,9) -> 11:09
(8,0) -> 08:00
ALGORITHM:
1. Transform the hour to string format.
2. If the number in string format has only 1 digit -> add 1 zero at the begg
3. Do the same for the minutes
4. Return hours + ':' + minutes
---------------
add()
INPUT: minutes in number format
OUTPUT: 'HH:MM' in 24h format
EXAMPLE:
(10, 0) + (0,3) -> 10:03
(10,0) + (0,61) -> (10,0) + (1,1) -> (11,1) => if minutes >= 60
(23,30) + (0,60) -> (23,30) + (1,0) -> (24,30) -> (0,30) => if minutes >= 60 AND final hours >=24
ALGORITHM:
0. Go from (hours,minutes) to currentminutes
1. sum minutes + currentMinutes
2. go from minutes to (hours,minutes)
3. If this.hours > 24h -> this.hours -= 24
-------------
minutesToHoursAndMinutes:
ALGORITHM:
1. Number of minutes = minutes % 60
2. Number of hours = (minutes - nbrOfMinutes) / 60
--------------
subtract()
EXAMPLES:
(0,0) - (0,50) -> (23, 60) - (0, 50) -> (23, 10)
(0,0) - (0,50) -> (0,-50) -> (23, 60-50) -> (23,10)
(23,0) - (0,130) -> (23,-130) ->
(10,0) - (0,3061):
600min - 3061min = -2461min
1440min - 2461 % 1440 = 419min
419min -> (6,59)
1. Transform (hours, minutes) to currentMinutes
2. do minutes - currentMinutes
3. go from minutes to (hours,minutes)
*/

class Clock {
  static HOURS_IN_A_DAY = 24;
  static MINUTES_IN_A_HOUR = 60;
  static MINUTES_IN_A_DAY = 1440;

  constructor (hours, minutes) {
    this.hours = hours;
    this.minutes = minutes;
  }

  static at(hours, minutes = 0) {
    return new Clock(hours, minutes);
  }

  add(minutes) {
    let currentMinutes = this.timeToMinutes();
    let updatedMinutes = currentMinutes + minutes;
    [this.hours, this.minutes] = this.minutesToHoursAndMinutes(updatedMinutes);
    return this;
  }

  timeToMinutes() {
    const MINUTES_IN_A_HOUR = Clock.MINUTES_IN_A_HOUR;
    return (this.hours * MINUTES_IN_A_HOUR) + this.minutes;
  }

  minutesToHoursAndMinutes(minutes) {
    const MINUTES_IN_A_DAY = Clock.MINUTES_IN_A_DAY;
    const MINUTES_IN_A_HOUR = Clock.MINUTES_IN_A_HOUR;
    const HOURS_IN_A_DAY = Clock.HOURS_IN_A_DAY;

    if (minutes < 0) {
      minutes = MINUTES_IN_A_DAY + (minutes % MINUTES_IN_A_DAY);
    }

    let remainderMinutes = minutes % MINUTES_IN_A_HOUR;
    let hours = ((minutes - remainderMinutes) / MINUTES_IN_A_HOUR) %
                HOURS_IN_A_DAY;
    return [hours, remainderMinutes];
  }

  subtract(minutes) {
    this.add(-minutes);
    return this;
  }

  format (number) {
    let digits = String(number);

    if (digits.length === 1) {
      digits = '0' + digits;
    }

    return digits;
  }

  formatHours() {
    return this.format(this.hours);
  }

  formatMinutes() {
    return this.format(this.minutes);
  }

  toString() {
    return this.formatHours() + ':' + this.formatMinutes();
  }

  isEqual(otherClock) {
    return this.toString() === otherClock.toString();
  }
}

module.exports = Clock;