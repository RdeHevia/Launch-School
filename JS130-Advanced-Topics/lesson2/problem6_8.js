/*
INPUT: function, argument for function
OUTPUT: function that calls the input function with the provided argument
*/
"use strict";
function later (func, argument) {
  return () => func(argument);
}
const logger = message => console.log(message);
let logWarning = later(logger, "The system is shutting down!");
logWarning(); // The system is shutting down!
