const DbConnection = require("../models/DbConnection")

class Words {
 static async validate(word) {
    const validWord = await DbConnection.query(
      "SELECT * FROM words WHERE word = $1",
      [word]
    );
    return validWord.rows.length > 0;
 }
}

module.exports = Words;