const express = require("express");
const bodyParser = require("body-parser");
const { analyze, generateImage } = require("./public/image-analyze.js");

const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.static("public"));
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

let base64Data = "";

app.post("/analyze", async (req, res) => {
  try {
    base64Data = req.body.image.replace(/^data:image\/[a-z]+;base64,/, "");
    const analysis = await analyze(base64Data);
    res.json({ description: analysis }); // Envoyer la description au front-end
  } catch (err) {
    console.error("Error analyzing image:", err);
    res.status(500).send("Error analyzing image");
  }
});

app.post("/generate-image", async (req, res) => {
  try {
    const descriptionText = req.body.description;
    const imageUrl = await generateImage(descriptionText);
    console.log("Generated Image URL:", imageUrl);
    console.log("description", descriptionText);
    res.json({ imageUrl: imageUrl }); // Envoyer l'URL de l'image générée au front-end
  } catch (err) {
    console.error("Error generating image:", err);
    res.status(500).send("Error generating image");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
