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
    if (validWord.rows.length == 0) res.status(404).json({ exists: false });
    else res.status(200).json({ exists: true });
  } catch (error) {
    console.log(error);
  }
});

app.get("/check/:word", async (req, res) => {
    try {
      const word = req.params.word;
      console.log("Rota: check/" + word);
      const result = await client.query(
        "SELECT * FROM daily_word"
      );
      let dailyWord = null;
      if (result.rows.length > 0) {
        dailyWord = result.rows[0].word;
      }
      console.log (dailyWord);

      let results = [];
      for (let i = 0; i < word.length; i++) {
        const charWord = word[i];
        const charDailyWord = dailyWord[i];
        console.log(charWord + "-" + charDailyWord)
    
        if (charWord === charDailyWord) {
          results.push('verde');
        } else if (dailyWord.includes(charWord)) {
          results.push('amarelo');
        } else {
          results.push('branco');
        }
      } 
      res.status(200).json({ results });

    } catch (error) {
      console.log(error);
    }
  });

app.listen(config.port, () =>
  console.log("Servidor funcionando na porta " + config.port)
);

module.exports = app;
