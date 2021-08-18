class test {
  #price
  constructor (price) {
    this.#price = price
  }
}

let a = new test(1);
console.log(a.#price);