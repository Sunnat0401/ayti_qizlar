import { motion } from 'framer-motion';
import { Clock, User, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

const MasterclassCard = ({ course }) => {
  const { locale } = useLanguage();
  const { progress } = useUser();
  
  const videoProgress = progress.watchedVideos[course.id] || 0;
  const isCompleted = videoProgress === 100;
  const isStarted = videoProgress > 0 && videoProgress < 100;

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title[locale]}
          className="w-full h-full object-cover"
        />
        {isCompleted && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
            <Award className="w-4 h-4 mr-1" />
            <FormattedMessage id="learn.completed" />
          </div>
        )}
        {isStarted && !isCompleted && (
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200">
            <div
              className="h-full bg-primary-purple transition-all"
              style={{ width: `${videoProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {course.title[locale]}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {course.description[locale]}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
            <FormattedMessage id={`learn.level.${course.level}`} />
          </span>
          {course.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span>{course.teacher}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Progress Bar */}
        {isStarted && !isCompleted && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
              <span>Progress</span>
              <span>{videoProgress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-pink to-primary-purple transition-all"
                style={{ width: `${videoProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <Link to={`/learn/${course.id}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-2 rounded-lg font-semibold transition-colors ${
              isCompleted
                ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                : isStarted
                ? 'bg-primary-purple text-white hover:bg-opacity-90'
                : 'bg-gradient-to-r from-primary-pink to-primary-purple text-white hover:opacity-90'
            }`}
          >
            {isCompleted ? (
              <FormattedMessage id="learn.completed" />
            ) : isStarted ? (
              <FormattedMessage id="learn.continue" />
            ) : (
              <FormattedMessage id="learn.start" />
            )}
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default MasterclassCard;
