const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

// Твой токен и chat ID
const TOKEN = "7958372133:AAF9v8LZKOJiYf5XkQzES3VgSU4WkVTA5hg";
const CHAT_ID = "-1002803266367";

app.use(bodyParser.json());

app.post("/api/send", async (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) return res.status(400).send("Missing data");

  const message = `🎉 Новая заявка:\n\n👤 ФИО: ${name}\n📱 Телефон: ${phone}`;
  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: CHAT_ID,
      text: message,
    });
    res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send");
  }
});

app.get("/", (_, res) => res.send("👋 Прокси работает"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
