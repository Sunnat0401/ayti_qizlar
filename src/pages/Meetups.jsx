import { useState } from 'react';
import { motion } from 'framer-motion';
import { FormattedMessage } from 'react-intl';
import { Calendar, Clock, User, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { generatePseudonym, validatePhone, showToast } from '../utils/helpers';

const Meetups = () => {
  const { locale } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    isAnonymous: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.isAnonymous) {
      if (!formData.name.trim()) {
        showToast(
          locale === 'uz' ? 'Ismingizni kiriting' :
          locale === 'ru' ? 'Введите ваше имя' :
          'Enter your name',
          'error'
        );
        return;
      }

      if (!validatePhone(formData.phone)) {
        showToast(
          locale === 'uz' ? 'Telefon raqamini to\'g\'ri kiriting' :
          locale === 'ru' ? 'Введите правильный номер телефона' :
          'Enter valid phone number',
          'error'
        );
        return;
      }
    }

    if (!formData.date || !formData.time) {
      showToast(
        locale === 'uz' ? 'Sana va vaqtni tanlang' :
        locale === 'ru' ? 'Выберите дату и время' :
        'Select date and time',
        'error'
      );
      return;
    }

    // Generate pseudonym if anonymous
    const displayName = formData.isAnonymous ? generatePseudonym() : formData.name;

    // Save to localStorage
    const meetups = JSON.parse(localStorage.getItem('ayti_qizlar_meetups') || '[]');
    const newMeetup = {
      id: Date.now(),
      name: displayName,
      phone: formData.isAnonymous ? 'Anonymous' : formData.phone,
      date: formData.date,
      time: formData.time,
      isAnonymous: formData.isAnonymous,
      createdAt: new Date().toISOString()
    };
    meetups.push(newMeetup);
    localStorage.setItem('ayti_qizlar_meetups', JSON.stringify(meetups));

    showToast(
      locale === 'uz' ? 'Muvaffaqiyatli ro\'yxatdan o\'tdingiz!' :
      locale === 'ru' ? 'Вы успешно зарегистрировались!' :
      'Successfully registered!',
      'success'
    );

    // Mock Telegram notification
    if (!formData.isAnonymous && formData.phone) {
      console.log(`Telegram notification sent to ${formData.phone}: ${displayName} registered for meetup on ${formData.date} at ${formData.time}`);
    }

    // Reset form
    setFormData({
      name: '',
      phone: '',
      date: '',
      time: '',
      isAnonymous: false
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-primary-light dark:bg-gray-900 transition-colors py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <FormattedMessage id="meetup.title" />
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {locale === 'uz' ? 'Offline va online uchrashuvlarga qo\'shiling' :
             locale === 'ru' ? 'Присоединяйтесь к офлайн и онлайн встречам' :
             'Join offline and online meetups'}
          </p>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Anonymous Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isAnonymous"
                name="isAnonymous"
                checked={formData.isAnonymous}
                onChange={handleChange}
                className="w-4 h-4 text-primary-purple border-gray-300 rounded focus:ring-primary-purple"
              />
              <label htmlFor="isAnonymous" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <FormattedMessage id="meetup.anonymous" />
              </label>
            </div>

            {/* Name Input */}
            {!formData.isAnonymous && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  <FormattedMessage id="meetup.name" />
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={locale === 'uz' ? 'Ismingiz' : locale === 'ru' ? 'Ваше имя' : 'Your name'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                />
              </motion.div>
            )}

            {/* Phone Input */}
            {!formData.isAnonymous && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Phone className="inline w-4 h-4 mr-1" />
                  <FormattedMessage id="meetup.phone" />
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+998 90 123 45 67"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                />
              </motion.div>
            )}

            {/* Date Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                <FormattedMessage id="meetup.date" />
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
              />
            </div>

            {/* Time Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Clock className="inline w-4 h-4 mr-1" />
                <FormattedMessage id="meetup.time" />
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-primary-pink to-primary-purple text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <FormattedMessage id="meetup.submit" />
            </motion.button>
          </form>

          {/* Info Box */}
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
  );
};

export default Meetups;
