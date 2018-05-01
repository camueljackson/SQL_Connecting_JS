const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});



function findPerson(cb) {

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * from famous_people WHERE first_name = $1 OR last_name = $1", [process.argv[2]], (err, result) => {  // AS number means "string title"

    if (err) {
      return console.error("error running query", err);
    }
    // console.log(result.rows);
    cb(result.rows);
    client.end();
  });
});

}


findPerson(makePretty);

function makePretty(result) {
  console.log('Searching...');
  console.log('Found ' + result.length + ' person(s) by the name ' + [process.argv[2]]);
  for (let row of result) {
    let roundedDate = row.birthdate.toISOString().slice(0,10)
    console.log(`${row.id}: ${row.first_name} ${row.last_name}, born ${roundedDate}`)
  }
}





