"use strict";
// function delayLog() {
//   for (let idx = 1; idx <= 10; idx += 1) {
//     setTimeout(() => console.log(idx), idx * 1000);
//   }
// }

function delayLog() {
  let count = 1;
  let id = setInterval(() => {
    console.log(count);
    count += 1;
    if (count > 10) clearInterval(id);
  }, count * 1000);
}

delayLog();
