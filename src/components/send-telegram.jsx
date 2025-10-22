// Next.js API route: /api/meetup/send-telegram
// This file runs on the server and reads TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID from process.env
// Put your secrets into .env.local (see provided .env.local file) and restart Next.js.

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      const { name, phone, date, time } = req.body || {};
  
      if (!name || !phone) {
        return res.status(400).json({ error: 'Missing name or phone' });
      }
  
      const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
      const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  
      if (!BOT_TOKEN || !CHAT_ID) {
        console.error('Telegram credentials missing in env');
        return res.status(500).json({ error: 'Telegram credentials not configured' });
      }
  
      const message = `New meetup registration:\nName: ${escapeHtml(name)}\nPhone: ${escapeHtml(phone)}\nDate: ${escapeHtml(date || '-')}\nTime: ${escapeHtml(time || '-')}`;
  
      // Use global fetch (available in Next.js runtime) to call Telegram API
      const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message
        })
      });
  
      const json = await tgRes.json();
      if (!tgRes.ok || !json.ok) {
        console.error('Telegram API error', json);
        return res.status(500).json({ error: 'Telegram API error', details: json });
      }
  
      return res.status(200).json({ ok: true, result: json.result });
    } catch (err) {
      console.error('send-telegram error', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  function escapeHtml(str = '') {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }