import { useState } from 'react';
import { motion } from 'framer-motion';
import { FormattedMessage } from 'react-intl';
import { useLanguage } from '../contexts/LanguageContext';
import { events } from '../data/events';
import EventCard from '../components/EventCard';
import { showToast, validatePhone } from '../utils/helpers';
import { X } from 'lucide-react';

const Events = () => {
  const { locale } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', isAnonymous: false });

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    return event.type === filter;
  });

  const handleJoinEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.isAnonymous && (!formData.name || !formData.phone)) {
      showToast(
        locale === 'uz' ? 'Ism va telefon kiriting' :
        locale === 'ru' ? 'Введите имя и телефон' :
        'Enter name and phone',
        'error'
      );
      return;
    }

    if (!formData.isAnonymous && !validatePhone(formData.phone)) {
      showToast(
        locale === 'uz' ? 'Telefon raqami noto\'g\'ri' :
        locale === 'ru' ? 'Неверный номер телефона' :
        'Invalid phone number',
        'error'
      );
      return;
    }

    showToast(
      locale === 'uz' ? `${selectedEvent.title[locale]} uchun ro'yxatdan o'tdingiz!` :
      locale === 'ru' ? `Вы зарегистрировались на ${selectedEvent.title[locale]}!` :
      `You registered for ${selectedEvent.title[locale]}!`,
      'success'
    );

    setShowModal(false);
    setFormData({ name: '', phone: '', isAnonymous: false });
  };

  return (
    <div className="min-h-screen bg-primary-light dark:bg-gray-900 transition-colors py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <FormattedMessage id="nav.events" />
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {locale === 'uz' ? 'Yaqinlashayotgan uchrashuvlar va tadbirlar' :
             locale === 'ru' ? 'Предстоящие встречи и мероприятия' :
             'Upcoming meetups and events'}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-primary-purple text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {locale === 'uz' ? 'Barchasi' : locale === 'ru' ? 'Все' : 'All'}
          </button>
          <button
            onClick={() => setFilter('offline')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'offline'
                ? 'bg-primary-purple text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            📍 Offline
          </button>
          <button
            onClick={() => setFilter('online')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'online'
                ? 'bg-primary-purple text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            🌐 Online
          </button>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <EventCard event={event} onJoin={handleJoinEvent} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      {showModal && selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {locale === 'uz' ? 'Ro\'yxatdan o\'tish' :
                 locale === 'ru' ? 'Регистрация' :
                 'Registration'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {selectedEvent.title[locale]}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {selectedEvent.date} - {selectedEvent.time}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="eventAnon"
                  checked={formData.isAnonymous}
                  onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                  className="w-4 h-4 text-primary-purple border-gray-300 rounded"
                />
                <label htmlFor="eventAnon" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  <FormattedMessage id="meetup.anonymous" />
                </label>
              </div>

              {!formData.isAnonymous && (
                <>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={locale === 'uz' ? 'Ism' : locale === 'ru' ? 'Имя' : 'Name'}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+998 90 123 45 67"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <FormattedMessage id="common.cancel" />
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-pink to-primary-purple text-white rounded-lg hover:opacity-90"
                >
                  <FormattedMessage id="common.submit" />
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Events;
