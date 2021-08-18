#!/usr/bin/env node
/* eslint-disable max-lines-per-function */

const PROCESS = require('process');
const READLINE = require('readline');
const { Client } = require('pg');

function logAndExit(err) {
  console.log(err);
  PROCESS.exit(1);
}

class ExpenseData {
  constructor() {
    this.client = new Client({ database: 'expenses' });
  }

  async listExpenses() {
    await this.client.connect().catch(err => logAndExit(err));
    await this.setupSchema().catch(err => logAndExit(err));

    let res = await this.client
      .query("SELECT * FROM expenses ORDER BY created_on ASC")
      .catch(err => logAndExit(err));

    this.displayExpensesCount(res.rowCount);
    this.displayExpenses(res.rows);
    this.displayTotal(res.rows);

    await this.client.end().catch(err => logAndExit(err));
  }

  async searchExpenses(memo) {
    await this.client.connect().catch(err => logAndExit(err));
    await this.setupSchema().catch(err => logAndExit(err));

    let queryText = `SELECT * FROM expenses WHERE memo ~* $1`;
    let queryValues = [memo];
    let res = await this.client
      .query(queryText, queryValues)
      .catch(err => logAndExit(err));

    this.displayExpensesCount(res.rowCount);
    this.displayExpenses(res.rows);
    this.displayTotal(res.rows);

    await this.client.end().catch(err => logAndExit(err));
  }

  displayExpenses(expenses) {
    expenses.forEach(tuple => {
      let columns = [
        `${tuple.id}`.padStart(3),
        tuple.created_on.toDateString().padStart(10),
        tuple.amount.padStart(12),
        tuple.memo
      ];

      console.log(columns.join(' | '));
    });
  }

  displayExpensesCount(numberOfExpenses) {
    if (numberOfExpenses) {
      let verb = numberOfExpenses > 1 ? 'expenses' : 'expense';
      let countableNoun = numberOfExpenses > 1 ? 'expenses' : 'expense';
      console.log(`There ${verb} ${numberOfExpenses} ${countableNoun}.`);
    } else {
      console.log(`There are no expenses.`);
    }
  }

  displayTotal(expenses) {
    if (expenses.length) {
      let total = expenses
        .reduce((sum, tuple) => sum + Number(tuple.amount),0)
        .toFixed(2);
      console.log('-'.repeat(50));
      let columns = ['Total', String(total).padStart(31)];
      console.log(columns.join(''));
    }
  }

  async addExpense(amount, memo) {
    await this.client.connect().catch(err => logAndExit(err));
    await this.setupSchema().catch(err => logAndExit(err));

    let date = new Date();
    date = date.toLocaleDateString();
    let queryText = 'INSERT INTO expenses (amount, memo, created_on) VALUES ($1, $2, $3)';
    let queryValues = [amount, memo, date];

    // eslint-disable-next-line max-len
    await this.client.query(queryText, queryValues).catch(err => logAndExit(err));

    await this.client.end().catch(err => logAndExit(err));
  }

  async deleteExpense(id) {
    await this.client.connect().catch(err => logAndExit(err));
    await this.setupSchema().catch(err => logAndExit(err));

    let searchText = `SELECT * FROM expenses WHERE id = $1`;

    // eslint-disable-next-line max-len
    let searchResult = await this.client.query(searchText, [id]).catch(err => logAndExit(err));

    if (searchResult.rows.length) {
      let deleteText = `DELETE FROM expenses WHERE id = $1`;
      await this.client.query(deleteText, [id]).catch(err => logAndExit(err));
      console.log(`The following expense has been deleted:`);
      this.displayExpenses(searchResult.rows);
    } else {
      console.log(`There is no expense with the id '#${id}'`);
    }

    await this.client.end().catch(err => logAndExit(err));
  }

  async deleteAllExpenses() {
    await this.client.connect().catch(err => logAndExit(err));
    await this.setupSchema().catch(err => logAndExit(err));

    let queryText = `DELETE FROM expenses`;
    await this.client.query(queryText).catch(err => logAndExit(err));
    console.log(`All expenses have been deleted.`);

    await this.client.end().catch(err => logAndExit(err));
  }

  async setupSchema() {
    let tableExistsQuery = `SELECT COUNT(*) FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'expenses';`;

    let tableCreationQuery = `CREATE TABLE expenses(
      id serial PRIMARY KEY,
      amount numeric(6,2) NOT NULL,
      memo text NOT NULL,
      created_on date NOT NULL
    )`;

    let res = await this.client
      .query(tableExistsQuery)
      .catch(err => logAndExit(err));

    if (res.rows[0].count === '0') {
      await this.client.query(tableCreationQuery).catch(err => logAndExit(err));
    }
  }
}

class CLI {
  constructor() {
    this.application = new ExpenseData();
  }

  static HELP() {
    return `An expense recording system

Commands:

add AMOUNT MEMO [DATE] - record a new expense
clear - delete all expenses
list - list all expenses
delete NUMBER - remove expense with id NUMBER
search QUERY - list expenses with a matching memo field`;
  }

  displayHelp() {
    console.log(CLI.HELP());
  }

  // eslint-disable-next-line max-statements
  run(args) {
    let command = args[2];

    if (command === 'list') {
      this.application.listExpenses();
    } else if (command === 'add') {
      let amount = args[3];
      let memo = args[4];
      if (amount && memo) {
        this.application.addExpense(amount, memo);
      } else {
        console.log('You must provide an amount and memo.')
      }
    } else if (command === 'search') {
      let memo = args[3];
      if (memo) {
        this.application.searchExpenses(memo);
      } else {
        console.log('You must provide a memo');
      }
    } else if (command === 'delete') {
      let id = args[3];
      this.application.deleteExpense(id);
    } else if (command === 'clear') {
      let rl = READLINE.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      let questionText = 'This will remove all expenses. Are you sure? (y/n) ';
      rl.question(questionText, answer => {
        if (answer === 'y') {
          this.application.deleteAllExpenses();
        }
        rl.close();
      });
    } else {
      this.displayHelp();
    }
  }
}

let cli = new CLI();
cli.run(PROCESS.argv);