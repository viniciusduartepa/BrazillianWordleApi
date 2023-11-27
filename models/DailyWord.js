const DbConnection = require("../models/DbConnection");

class DailyWord {
  static async getDailyWord() {
    const dailyWordResult = await DbConnection.query("SELECT * FROM daily_word");
    return dailyWordResult.rows.length > 0
      ? dailyWordResult.rows[0].word
      : null;
  }
  static async updateDailyWord(word) {
    try {
      await DbConnection.query(
        "UPDATE daily_word SET word = $1;",
        [word]
      );
    } catch (err) {
      console.error("Error while reseting daily word:", err);
    }
  }
}

module.exports = DailyWord;
