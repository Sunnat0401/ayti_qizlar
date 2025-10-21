import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, DollarSign } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { formatDate, daysUntilEvent } from '../utils/helpers';
import { FormattedMessage } from 'react-intl';

const EventCard = ({ event, onJoin }) => {
  const { locale } = useLanguage();
  const daysLeft = daysUntilEvent(event.date);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title[locale]}
          className="w-full h-full object-cover"
        />
        {daysLeft <= 7 && daysLeft > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {daysLeft} {locale === 'uz' ? 'kun qoldi' : locale === 'ru' ? 'дней осталось' : 'days left'}
          </div>
        )}
        {event.isPaid && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            {event.price}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {event.title[locale]}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {event.description[locale]}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-2 text-primary-purple" />
            <span>{formatDate(event.date, locale)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4 mr-2 text-primary-purple" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 mr-2 text-primary-purple" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Type Badge */}
        <div className="mb-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              event.type === 'online'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            }`}
          >
            {event.type === 'online' ? '🌐 Online' : '📍 Offline'}
          </span>
        </div>

        {/* Join Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onJoin(event)}
          className="w-full bg-gradient-to-r from-primary-pink to-primary-purple text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          <FormattedMessage id="home.join" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EventCard;
