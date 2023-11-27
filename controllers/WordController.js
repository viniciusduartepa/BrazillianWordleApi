const Word = require("../models/Words");
const DailyWord = require("../models/DailyWord");
const RandomWord = require("../models/RandomWords")

class WordController {
 static async validate(req, res) {
    try {
      const word = req.params.word;
      console.log("Execute: valid/" + word);

      const isValidWord = await Word.validate(word);
      if (!isValidWord) {
        return res.status(404).json({ error: "Word not found in dictionary" });
      }

      const dailyWord = await DailyWord.getDailyWord();
      let missingLetters = dailyWord;

      let results = {};
      for (let i = 0; i < word.length; i++) {
        const charWord = word[i];
        const charDailyWord = dailyWord[i];
        if (charWord === charDailyWord) {
          results[i] = "correct";
          missingLetters = missingLetters.substring(0, i) + missingLetters.substring(i + 1);
        } else if (!dailyWord.includes(charWord)) {
          results[i] = "wrong";
        } else results[i] = null;
      }
      for (let i = 0; i < word.length; i++) {
        const charWord = word[i];
        if (results[i] === null) {
          if (missingLetters.includes(charWord)) {
            results[i] = "displaced";
            const charIndex = missingLetters.indexOf(charWord);
            missingLetters =
              missingLetters.substring(0, charIndex) +
              missingLetters.substring(charIndex + 1);
          } else results[i] = "wrong";
        }
      }
      res.status(200).json({ results });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
 }

 static async resetDailyWord(req, res) {
  try {
    console.log("Execute: update-daily-word");
    
    const randomWord = await RandomWord.getRandomWord();
    await DailyWord.updateDailyWord(randomWord);
    res.status(200).json({ newDailyWord: randomWord });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}
}

module.exports = WordController; 