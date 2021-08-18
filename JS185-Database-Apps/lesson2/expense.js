const { Client } = require('pg'); //ExpenseData
const PROCESS = require('process');
let client = new Client({database: 'expenses'}); //ExpenseData

// CLI class: handle everything related to the Command Line Interface
//  - process arguments
//  - determine action to perform based on the arguments.
//  - execute the action by calling an instance of ExpenseData
// ExpenseData: Perform the actions
//  - Communicate with the database
//  - Format and display results

function printHelp() {
  console.log(
    `An expense recording system

Commands:

add AMOUNT MEMO [DATE] - record a new expense
clear - delete all expenses
list - list all expenses
delete NUMBER - remove expense with id NUMBER
search QUERY - list expenses with a matching memo field`
  );
}

// ExpenseData
async function listExpenses() {
  await client.connect().catch(err => logAndExit(err));

  let res = await client
    .query("SELECT * FROM expenses ORDER BY created_on ASC")
    .catch(err => logAndExit(err));

  res.rows.forEach(tuple => {
    let columns = [
      String(tuple.id).padStart(3),
      tuple.created_on.toDateString().padStart(10),
      tuple.amount.padStart(12),
      tuple.memo
    ];

    console.log(columns.join(' | '));
  });

  await client.end().catch(err => logAndExit(err));
}

// ExpenseData
async function addExpense(amount ,memo) {
  await client.connect().catch(err => logAndExit(err));
  let date = (new Date()).toLocaleDateString();
  let queryText = `INSERT INTO expenses (amount, memo, created_on)
    VALUES ($1, $2, $3)`;
  let values = [amount, memo, date];
  await client.query(queryText, values).catch(err => logAndExit(err));

  await client.end().catch(err => logAndExit(err));
}

// ExpenseData
function logAndExit(err) {
  console.log(err);
  PROCESS.exit(1);
}

// CLI ->
let args = PROCESS.argv;
let command = args[2];

if (command === 'list') {
  listExpenses();
} else if (command === 'add') {
  let [amount, memo] = args.slice(3);

  if (amount && memo) {
    addExpense(amount, memo);
  } else {
    console.log(`You must provide an amount and memo.`);
  }
} else {
  printHelp();
}
// <- CLI
