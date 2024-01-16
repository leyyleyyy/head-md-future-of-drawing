const OpenAI = require("openai");
const axios = require("axios");

// OpenAI API Key
const apiKey = OPENAI_API_KEY;

const openai = new OpenAI({ apiKey });

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiKey}`,
};

async function analyze(base64Image) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Give me a description of is on this drawing in max 70 characters. On this description, ignore the fact that this is a drawing.",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
      },
      { headers: headers }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error in analyze function:", error);
    throw error;
  }
}

async function generateImage(descriptionText) {
  const fullDescription = descriptionText + "Make it impressive";
  try {
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: fullDescription,
      n: 1,
      size: "1024x1024",
    });
    return response.data[0].url; // Retourne l'URL de l'image générée
  } catch (error) {
    console.error("Error in generation function:", error);
    throw error;
  }
}

module.exports = { analyze, generateImage };
