const { Client } = require("pg");
const config = require("../config");

var conString = config.urlConnection;
var DbConnection = new Client(conString);
DbConnection.connect(function (err) {
  if (err) {
    return console.error("Unable to connect to DB.", err);
  }
  DbConnection.query("SELECT NOW()",function (err, result) {
    if (err) {
      return console.error("Error executing the query.", err);
    }
    console.log(result.rows[0]);
  });
});

module.exports = DbConnection;