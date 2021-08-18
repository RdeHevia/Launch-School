/*
later2:
  INPUT: func, text
  OUTPUT: new func
  new func:
    INPUT: text
    OUTPUT: call func
*/

function later2 (func, message) {
  return (when) => func(message, when);
}

const notify = function(message, when) {
  console.log(`${message} in ${when} minutes!`);
};

let shutdownWarning = later2(notify, "The system is shutting down");
shutdownWarning(30); // The system is shutting down in 30 minutes!