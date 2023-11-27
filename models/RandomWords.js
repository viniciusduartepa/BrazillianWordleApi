const DbConnection = require("../models/DbConnection")

class RamdomWords {
 static async getRandomWord() {
    const randomWordResult = await DbConnection.query("SELECT * FROM random_words ORDER BY RANDOM() LIMIT 1;");
    return randomWordResult.rows.length > 0 ? randomWordResult.rows[0].word : null;
 }
}

module.exports = RamdomWords;