const express = require("express");
const { Client } = require("pg");
const bodyparser = require("body-parser");
const config = require("./config");

const app = express();
app.use(express.json());
app.use(bodyparser.json());

var conString = config.urlConnection;
var client = new Client(conString);
client.connect(function (err) {
  if (err) {
    return console.error("Não foi possível conectar ao banco.", err);
  }
  client.query("SELECT NOW()", function (err, result) {
    if (err) {
      return console.error("Erro ao executar a query.", err);
    }
    console.log(result.rows[0]);
  });
});

app.get("/", (req, res) => {
  console.log("Response ok.");
  res.send("Ok - Servidor disponível.");
});

app.get("/valid/:word", async (req, res) => {
  try {
    const word = req.params.word;
    console.log("Rota: valid/" + word);
    const validWord = await client.query(
      "SELECT * FROM words WHERE word = $1",
      [word]
    );
    if (validWord.rows.length == 0)
      res.status(404).json({ error: "Word not found in dictionary" });
    res.status(200).json({ word: validWord.rows[0].word });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/check/:word", async (req, res) => {
  try {
    const word = req.params.word;
    console.log("Rota: check/" + word);
    const dailyWordResult = await client.query("SELECT * FROM daily_word");
    let dailyWord = null;
    if (dailyWordResult.rows.length > 0) {
      dailyWord = dailyWordResult.rows[0].word;
    }

    let results = {};
    for (let i = 0; i < word.length; i++) {
      const charWord = word[i];
      const charDailyWord = dailyWord[i];
      if (charWord === charDailyWord) {
        results[i] = "correct";
        dailyWord = dailyWord.substring(0, i) + dailyWord.substring(i + 1);
      } else if(!dailyWord.includes(charWord)){
        results[i] = "wrong";
      }else results[i] = null;
    }
    for (let i = 0; i < word.length; i++) {
      const charWord = word[i];
      if (results[i] === null) {
        if(dailyWord.includes(charWord)){
          results[i] = "misplaced";
          charIndex = dailyWord.indexOf(charWord);
          dailyWord = dailyWord.substring(0, charIndex) + dailyWord.substring(charIndex + 1);
        }else results[i] = "wrong";
      }
    }

    res.status(200).json({results });
  } catch (error) {
    console.log(error);
  }
});

app.listen(config.port, () =>
  console.log("Servidor funcionando na porta " + config.port)
);

module.exports = app;
