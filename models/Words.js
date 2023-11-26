const { Client } = require("pg");
const config = require("../config");

var conString = config.urlConnection;
var client = new Client(conString);
client.connect(function (err) {
 if (err) {
    return console.error("Unable to connect to DB.", err);
 }
 client.query("SELECT NOW()", function (err, result) {
    if (err) {
      return console.error("Error executing the query.", err);
    }
    console.log(result.rows[0]);
 });
});

class Words {
 static async validate(word) {
    const validWord = await client.query(
      "SELECT * FROM words WHERE word = $1",
      [word]
    );
    return validWord.rows.length > 0;
 }
}

module.exports = Words;