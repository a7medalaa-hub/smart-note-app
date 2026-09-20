const {
    GoogleGenerativeAI
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const summarizeText = async (content) => {
    const model = genAI.getGenerativeModel({
        model: "gemini-3.6-flash"
    });

    const result = await model.generateContent(
        `Summarize the following note clearly and concisely.
Return only the summary.

Note:
${content}`
    );

    return result.response.text();
};

module.exports = {
    summarizeText
};