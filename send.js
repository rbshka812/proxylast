const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = '7958372133:AAF9v8LZKOJiYf5XkQzES3VgSU4WkVTA5hg';
const CHAT_ID = '-1002803266367'; // ID твоего телеграм чата или группы

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Proxy is working');
});

app.post('/', async (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ ok: false, error: 'Missing name or phone' });
  }
  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: `👤 ФИО: ${name}\n📱 Номер: ${phone}`
      }),
    });
    const data = await tgRes.json();
    if (data.ok) {
      res.json({ ok: true });
    } else {
      res.status(500).json({ ok: false, error: data.description });
    }
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
