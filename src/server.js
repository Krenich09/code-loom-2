

const express = require('express');
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();


const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());

app.use(express.static("public"));
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')))

app.get('/favicon.ico', (req, res) => res.status(204));

app.get("/start", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "start.html"));
});
app.post("/generate", async (req, res) => {
    setTimeout( async () => {
        console.log("Generating code...");
        const code = req.body.code;
        const selection = req.body.selection;
        const codeInput = code;
        const commentedCode = codeInput + " // Commented code with selection: " + selection;
        res.json({ code: commentedCode });
    }, 1000);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
