/*
1. Determine the length of the message
2. Number of characters per line = messagelength + 4
3. Print the different lines
*/

class Banner {
  constructor(message = '') {
    this.message = message;
    this.messageLength = this.numberOfCharsInMessage();
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    return `+-${'-'.repeat(this.messageLength)}-+`;
  }

  emptyLine() {
    return `| ${' '.repeat(this.messageLength)} |`;
  }

  messageLine() {
    return `| ${this.message} |`;
  }

  numberOfCharsInMessage() {
    return this.message.length;
  }
}

let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();

let banner2 = new Banner('');
banner2.displayBanner();