

const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const genCode = require("./generation");


const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());

app.use(express.static("public"));
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')))

app.get("/favicon.ico", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "assets", "images", "icons", "favicons", "favicon.ico"));
  });

app.post("/production", (req, res) => {
    res.json({ prod: process.env.IS_PRODUCTION });
});
app.get("/start", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "start.html"));
});
app.post("/generate", async (req, res) => {
    console.log("Generating code...");
    let time = new Date();
    const code = req.body.code;
    const selection = req.body.selection;

    const generatedCode = await genCode.StartGeneration(code, selection);
    let time2 = new Date();
    console.log("Code Comment Generation is Done with time: " + (time2 - time) / 1000) + " seconds.";
    res.json({ code: generatedCode });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
