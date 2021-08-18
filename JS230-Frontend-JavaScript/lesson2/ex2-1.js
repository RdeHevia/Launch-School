function startCounting() {
  let number = 1;
  let id = setInterval(() => {
    console.log(number);
    number += 1;
  },1000);

  return id;
}

function stopCounting(id) {
  clearInterval(id);
}

let id = startCounting();
// stopCounting(id);