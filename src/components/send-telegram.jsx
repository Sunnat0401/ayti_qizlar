// server/send-telegram.js
// Simple Express server: POST /send-telegram
// Expects JSON { name, phone }
// Reads TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID from process.env

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // npm i node-fetch@2
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!BOT_TOKEN || !CHAT_ID) {
  console.warn('Warning: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set in .env');
}

app.post('/send-telegram', async (req, res) => {
  try {
    const { name, phone } = req.body || {};
    if (!name || !phone) {
      return res.status(400).json({ error: 'Missing name or phone' });
    }

    if (!BOT_TOKEN || !CHAT_ID) {
      return res.status(500).json({ error: 'Telegram credentials not configured on server' });
    }

    const message = `New registration:\nName: ${escapeHtml(name)}\nPhone: ${escapeHtml(phone)}`;

    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message
      })
    });

    const tgJson = await tgRes.json();
    if (!tgRes.ok || !tgJson.ok) {
      console.error('Telegram API error:', tgJson);
      return res.status(500).json({ error: 'Telegram API error', details: tgJson });
    }

    return res.status(200).json({ ok: true, result: tgJson.result });
  } catch (err) {
    console.error('send-telegram error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`send-telegram server listening on port ${PORT}`);
});

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}