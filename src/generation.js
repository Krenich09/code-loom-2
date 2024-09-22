require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY_GOOGLE);


async function StartGeneration(code2comment, selection) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    let intensityLevelText = "";
    console.log("Selection: " + selection);
    switch (selection) {
        case 1:
            intensityLevelText = "Make sure you comment the most important parts of the code, like functions, classes, and variables, don't comment everything, just the most important parts";
            break;
        case 2:
            intensityLevelText = "Make sure you not comment everything, but also not too little, just the right amount of comments, like 50% of the code";
            break;
        case 3:
            intensityLevelText = "Make sure you comment every line of code, even if it's not necessary, just comment it, it's good practice";
            break;
    }
    const rules = "Rule 1: Comments should not duplicate the code. Rule 2: Comments should explain the why, not the how. Rule 3: Comments should be clear and concise. Rule 4: Comments should be written in complete sentences. Rule 5: Comments should be written in English. Rule 6: Comments should be written in present tense. Rule 7: Comments should be written in active voice. Rule 8: Comments should be written in a positive tone. Rule 9: Comments should be written in a professional tone. Rule 10: Comments should be written in a respectful tone. Rule 11: Comments should be written in a helpful tone. Rule 12: Comments should be written in a friendly tone. Rule 13: Comments should be written in a supportive tone. Rule 14: Comments should be written in a constructive tone. Rule 15: Comments should be written in a non-judgmental tone. Rule 16: Comments should be written in a non-confrontational tone. Rule 17: Comments should be written in a non-threatening tone. Rule 18: Comments should be written in a non-coercive tone. Rule 19: Comments should be written in a non-manipulative tone. Rule 20: Comments should be written in a non-abusive tone. Rule 21: Comments should be written in a non-offensive tone. Rule 22: Comments should be written in a non-harassing tone. Rule 23: Comments should be written in a non-discriminatory tone. Rule 24: Comments should be written in a non-hateful tone. Rule 25: Comments should be written in a non-violent tone. Rule 26: Comments should be written in a non-threatening tone. Rule 27: Comments should be written in a non-coercive tone. Rule 28: Comments should be written in a non-manipulative tone. Rule 29: Comments should be written in a non-abusive tone. Rule 30: Comments should be written in a non-offensive tone. Rule 31: Comments should be written in a non-harassing tone. Rule 32: Comments should be written in a non-discriminatory tone. Rule 33: Comments should be written in a non-hateful tone. Rule 34: Comments should be written in a non-violent tone. Rule 35: Comments should be written in a non-threatening tone. Rule 36: Comments should be written in a non-coercive tone";
    const initialMessage = "You are a code commenting bot. Return the code and the added comments, dont include the \"```javascript````\" and \"```\" syntac in your response. Take these rules into consideration: \n" + rules;
    const message = initialMessage + "\nTake the following peace of text, if it is a code prompt then add comments to it, if it is a normal text, then tell me by saying 'Invalid Input'. Generate code comments for the following code: \n" + code2comment +
        "\n"
        + intensityLevelText;
    const result = await model.generateContent(message);
    const response = await result.response;
    let generatedResponse = response.text();
    return generatedResponse;

}
module.exports = {
    StartGeneration,
};