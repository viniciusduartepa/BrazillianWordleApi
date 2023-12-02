const express = require("express");
const wordRouter = require("./routes/word");
const config = require("./config");
var cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", wordRouter);


app.listen(config.port, () => {
 console.log(`Server running on port ${config.port}`);
});