type Greetings = {
  message: string,
  greeter: (name: string) => void,
}

let morning: Greetings = {
  message: 'Good morning',
  greeter(this: Greetings, name) {
    console.log(`${this.message}, ${name}`);
  }
}

morning.greeter('Raul');
let outerGreeter = morning.greeter;
outerGreeter('Raul');
