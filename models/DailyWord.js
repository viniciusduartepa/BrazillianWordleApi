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

class DailyWord {
  static async getDailyWord() {
    const dailyWordResult = await client.query("SELECT * FROM daily_word");
    return dailyWordResult.rows.length > 0
      ? dailyWordResult.rows[0].word
      : null;
  }
  static async deleteDailyWord() {
    try {
      await client.query("DELETE FROM daily_word");
    } catch (error) {
      console.error("Error while deleting daily word: ", error);
    }
  }
  static async setDailyWord(word) {
    try {
      const insertResult = await client.query(
        "INSERT INTO daily_word(word) VALUES($1)",
        [word]
      );
    } catch (err) {
      console.error("Error while inserting daily word:", err);
    }
  }
}

module.exports = DailyWord;
