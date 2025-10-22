import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

/* Minimal helper functions (if you already have your own, replace these) */
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

/*
  This file includes a small toast system (no external libs).
  Toasts auto-dismiss after `duration` ms and support types: success, error, info.
*/

const TOAST_DURATION = 4000;

const Toast = ({ toast, onClose }) => {
  const { id, type, message } = toast;
  const bg =
    type === 'success'
      ? 'bg-green-500'
      : type === 'error'
      ? 'bg-red-500'
      : 'bg-blue-500';
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.18 }}
      className={`max-w-sm w-full ${bg} text-white rounded-lg shadow-lg p-3 flex items-start space-x-3`}
    >
      <div className="flex-1 text-sm leading-tight">{message}</div>
      <button
        onClick={() => onClose(id)}
        className="text-white/90 hover:text-white ml-2 text-xs"
        aria-label="close toast"
      >
        ✕
      </button>
    </motion.div>
  );
};

const Meetups = () => {
  const locale = (typeof navigator !== 'undefined' && navigator.language?.startsWith('ru')) ? 'ru' : 'en';
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    isAnonymous: false
  });
  const [sending, setSending] = useState(false);

  // Toasts state: array of {id, type, message}
  const [toasts, setToasts] = useState([]);

  // showToast pushes a new toast and auto-removes it after duration
  const showToast = (message, type = 'info', duration = TOAST_DURATION) => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2, 8);
    setToasts((t) => [{ id, type, message }, ...t]);

    // auto remove
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const sendTelegramNotification = async (payload) => {
    try {
      const res = await fetch('/api/meetup/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (!res.ok) {
        console.error('Telegram send failed', json);
        showToast(
          locale === 'uz' ? 'Telegramga xabar yuborilmadi' :
          locale === 'ru' ? 'Не удалось отправить сообщение в Telegram' :
          'Failed to send Telegram message',
          'error'
        );
        return false;
      }
      showToast(
        locale === 'uz' ? 'Telegramga xabar yuborildi' :
        locale === 'ru' ? 'Сообщение отправлено в Telegram' :
        'Telegram message sent',
        'success'
      );
      return true;
    } catch (err) {
      console.error('sendTelegramNotification error', err);
      showToast(
        locale === 'uz' ? 'Telegramga xabar yuborishda xatolik' :
        locale === 'ru' ? 'Ошибка при отправке в Telegram' :
        'Error sending Telegram message',
        'error'
      );
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation — use showToast (no alerts)
    if (!formData.isAnonymous) {
      if (!formData.name.trim()) {
        showToast(
          locale === 'uz' ? 'Iltimos, ism kiriting' :
          locale === 'ru' ? 'Пожалуйста, введите имя' :
          'Please enter your name',
          'error'
        );
        return;
      }
      if (!validatePhone(formData.phone)) {
        showToast(
          locale === 'uz' ? 'Iltimos, telefon raqamini to\'g\'ri kiriting' :
          locale === 'ru' ? 'Пожалуйста, введите правильный номер телефона' :
          'Please enter a valid phone number',
          'error'
        );
        return;
      }
    }

    setSending(true);

    const displayName = formData.isAnonymous ? generatePseudonym() : formData.name.trim();
    const stored = JSON.parse(localStorage.getItem('ayti_qizlar_meetups') || '[]');
    const newMeetup = {
      id: Date.now(),
      name: displayName,
      phone: formData.isAnonymous ? 'Anonymous' : formData.phone,
      isAnonymous: formData.isAnonymous,
      createdAt: new Date().toISOString()
    };
    stored.push(newMeetup);
    localStorage.setItem('ayti_qizlar_meetups', JSON.stringify(stored));

    showToast(
      locale === 'uz' ? 'Muvaffaqiyatli ro\'yxatdan o\'tdingiz!' :
      locale === 'ru' ? 'Вы успешно зарегистрировались!' :
      'Successfully registered!',
      'success'
    );

    // Send notification to Telegram (only when phone provided and not anonymous)
    if (newMeetup.phone && newMeetup.phone !== 'Anonymous') {
      await sendTelegramNotification({
        name: newMeetup.name,
        phone: newMeetup.phone
      });
    } else {
      // If you want to notify even anonymous registrations, call sendTelegramNotification here.
      console.log('Anonymous or no phone — skipping Telegram notify by default.');
    }

    setFormData({
      name: '',
      phone: '',
      isAnonymous: false
    });
    setSending(false);
  };

  return (
    <>
      {/* Toast container (top-right) */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <Toast key={t.id} toast={t} onClose={removeToast} />
          ))}
        </AnimatePresence>
      </div>

      <div className="min-h-screen bg-primary-light dark:bg-gray-900 transition-colors py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              <FormattedMessage id="meetup.title">Meetup registration</FormattedMessage>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {locale === 'uz' ? 'Offline va online uchrashuvlarga qo\'shiling' : locale === 'ru' ? 'Присоединяйтесь к офлайн и онлайн встречам' : 'Join offline and online meetups'}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center">
                <input type="checkbox" id="isAnonymous" name="isAnonymous" checked={formData.isAnonymous} onChange={handleChange} className="w-4 h-4 text-primary-purple border-gray-300 rounded focus:ring-primary-purple" />
                <label htmlFor="isAnonymous" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <FormattedMessage id="meetup.anonymous">Register anonymously</FormattedMessage>
                </label>
              </div>

              {!formData.isAnonymous && (
                <>
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <User className="inline w-4 h-4 mr-1" />
                      <FormattedMessage id="meetup.name">Name</FormattedMessage>
                    </label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={locale === 'uz' ? 'Ismingiz' : locale === 'ru' ? 'Ваше имя' : 'Your name'} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors" />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Phone className="inline w-4 h-4 mr-1" />
                      <FormattedMessage id="meetup.phone">Phone</FormattedMessage>
                    </label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+998901234567" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors" />
                  </motion.div>
                </>
              )}

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={sending} className={`w-full ${sending ? 'opacity-60 cursor-not-allowed' : ''} bg-gradient-to-r from-primary-pink to-primary-purple text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity`}>
                {sending ? (locale === 'uz' ? 'Yuborilmoqda...' : locale === 'ru' ? 'Отправка...' : 'Sending...') : <FormattedMessage id="meetup.submit">Register</FormattedMessage>}
              </motion.button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {locale === 'uz' ? 'Anonim ishtirok etsangiz, avtomatik taxallus yaratiladi. Telefon raqami kiritilsa, Telegram orqali eslatma yuboriladi.' :
                 locale === 'ru' ? 'Если участвуете анонимно, будет создан автоматический псевдоним. Если введете номер телефона, напоминание будет отправлено через Telegram.' :
                 'If participating anonymously, an automatic pseudonym will be created. If you enter a phone number, a reminder will be sent via Telegram.'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Meetups;