import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*
  Meetups.jsx
  - Sends {name, phone} to Telegram directly using VITE_TELEGRAM_BOT_TOKEN & VITE_TELEGRAM_CHAT_ID.
  - Saves entries to localStorage.
  - Shows toast notifications via react-toastify.
  - UI: name, phone, anonymous checkbox, submit button.
*/

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

function generatePseudonym() {
  const adjectives = ['Shinam', 'Ochiq', 'Do‘stona', 'Sirli', 'Quvnoq'];
  const animals = ['Yulduz', 'Bulut', 'Oy', 'Qush', 'To‘fon'];
  const a = adjectives[Math.floor(Math.random() * adjectives.length)];
  const b = animals[Math.floor(Math.random() * animals.length)];
  const num = Math.floor(Math.random() * 900) + 100;
  return `${a}-${b}-${num}`;
}

function validatePhone(phone) {
  if (!phone) return false;
  const cleaned = phone.replace(/\s+/g, '');
  return /^\+?\d{9,16}$/.test(cleaned);
}

const Meetups = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    isAnonymous: false
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const sendToTelegram = async ({ name, phone }) => {
    if (!BOT_TOKEN || !CHAT_ID) {
      throw new Error('Telegram token/chat_id not configured (check .env)');
    }

    const text = `New meetup registration:\nName: ${name}\nPhone: ${phone}`;

    const resp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text
      })
    });

    const json = await resp.json();
    if (!resp.ok || !json.ok) {
      const err = json.description || 'Telegram API error';
      throw new Error(err);
    }
    return json;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.isAnonymous) {
      if (!formData.name.trim()) {
        toast.error("Iltimos, ism kiriting");
        return;
      }
      if (!validatePhone(formData.phone)) {
        toast.error("Iltimos, telefon raqamini to'g'ri kiriting (misol: +998901234567)");
        return;
      }
    }

    setSending(true);

    const displayName = formData.isAnonymous ? generatePseudonym() : formData.name.trim();
    const phoneValue = formData.isAnonymous ? 'Anonymous' : formData.phone.trim();

    // Save locally
    try {
      const store = JSON.parse(localStorage.getItem('ayti_qizlar_meetups') || '[]');
      const item = {
        id: Date.now(),
        name: displayName,
        phone: phoneValue,
        isAnonymous: formData.isAnonymous,
        createdAt: new Date().toISOString()
      };
      store.push(item);
      localStorage.setItem('ayti_qizlar_meetups', JSON.stringify(store));
    } catch (err) {
      console.error('localStorage error', err);
    }

    // Send to Telegram (only if phone provided OR you can choose to always notify)
    if (phoneValue && phoneValue !== 'Anonymous') {
      try {
        await sendToTelegram({ name: displayName, phone: phoneValue });
        toast.success("Telegramga xabar yuborildi — rahmat!");
      } catch (err) {
        console.error('Telegram send error', err);
        toast.error("Telegramga xabar yuborilmadi: " + err.message);
      }
    } else {
      // if you want to notify admins about anonymous registration, call sendToTelegram here
      toast.info("Ro‘yxatdan o‘tildi (anonim), Telegram xabari yuborilmadi.");
    }

    setFormData({ name: '', phone: '', isAnonymous: false });
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-primary-light dark:bg-gray-900 transition-colors py-8">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Meetup registration</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Join offline and online meetups</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center">
              <input type="checkbox" id="isAnonymous" name="isAnonymous" checked={formData.isAnonymous} onChange={handleChange} className="w-4 h-4 text-primary-purple border-gray-300 rounded focus:ring-primary-purple" />
              <label htmlFor="isAnonymous" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Register anonymously</label>
            </div>

            {!formData.isAnonymous && (
              <>
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <User className="inline w-4 h-4 mr-1" />
                    Name
                  </label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors" />
                </motion.div>

                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Phone className="inline w-4 h-4 mr-1" />
                    Phone
                  </label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+998901234567" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors" />
                </motion.div>
              </>
            )}

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={sending} className={`w-full ${sending ? 'opacity-60 cursor-not-allowed' : ''} bg-gradient-to-r from-primary-pink to-primary-purple text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity`}>
              {sending ? 'Yuborilmoqda...' : 'Register'}
            </motion.button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              If participating anonymously, an automatic pseudonym will be created. If you enter a phone number, a reminder will be sent via Telegram.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Meetups;