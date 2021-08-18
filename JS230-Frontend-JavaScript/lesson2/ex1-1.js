function delayLog() {
  for (let idx = 1; idx <=10; idx += 1) {
    let delay = idx * 1000;

    setTimeout(() => {
      console.log(idx);
    }, delay);
  }
}

delayLog()