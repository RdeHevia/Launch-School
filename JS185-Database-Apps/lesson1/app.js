const { Client } = require('pg');
let client = new Client({ database: 'films'});

async function logQuery(queryText) {
  await client.connect();
  let data = await client.query(queryText);

  console.log(data.rows[2].count);
  client.end();
}

// logQuery('SELECT * FROM directors');

// logQuery(`SELECT * FROM films JOIN directors
// ON films.director_id = directors.id
// // WHERE name = 'Sidney Lumet';`);

// logQuery(`SELECT * FROM films JOIN directors
// ON films.director_id = directors.id
// WHERE name = 'Francis Ford Coppola'
// ORDER BY duration DESC;`);

logQuery(`SELECT count(id) FROM films
WHERE duration < 110
GROUP BY genre;`);