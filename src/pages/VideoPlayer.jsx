import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import { courses } from '../data/courses';
import { showToast } from '../utils/helpers';
import { FormattedMessage } from 'react-intl';

const VideoPlayer = () => {
  const { courseId } = useParams();
  const { locale } = useLanguage();
  const { progress, updateProgress, addBadge } = useUser();
  const navigate = useNavigate();
  const [watchedPercentage, setWatchedPercentage] = useState(0);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const intervalRef = useRef(null);

  const course = courses.find(c => c.id === courseId);

  useEffect(() => {
    if (!course) {
      navigate('/learn');
      return;
    }

    // Load existing progress
    const existingProgress = progress.watchedVideos[courseId] || 0;
    setWatchedPercentage(existingProgress);

    // Simulate video watching progress
    intervalRef.current = setInterval(() => {
      setWatchedPercentage(prev => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          return 100;
        }
        const newProgress = prev + 1;
        
        // Update progress every 10%
        if (newProgress % 10 === 0) {
          updateProgress(courseId, newProgress);
          showToast(
            locale === 'uz' ? `${newProgress}% ko'rildi` :
            locale === 'ru' ? `${newProgress}% просмотрено` :
            `${newProgress}% watched`,
            'info'
          );
        }

        // Award badge at 100%
        if (newProgress === 100) {
          addBadge(course.badge);
          setShowBadgeModal(true);
          showToast(
            locale === 'uz' ? 'Tabriklaymiz! Badge olindingiz!' :
            locale === 'ru' ? 'Поздравляем! Вы получили значок!' :
            'Congratulations! You earned a badge!',
            'success'
          );
        }

        return newProgress;
      });
    }, 2000); // Increment every 2 seconds for demo

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [courseId]);

  if (!course) {
    return null;
  }

  return (
    <div className="min-h-screen bg-primary-light dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/learn">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center text-primary-purple font-semibold mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <FormattedMessage id="nav.learn" />
          </motion.button>
        </Link>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6"
        >
          {/* Video Player */}
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={course.videoUrl}
              title={course.title[locale]}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Progress Bar */}
          <div className="p-6">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {locale === 'uz' ? 'Tomosha jarayoni' :
                   locale === 'ru' ? 'Прогресс просмотра' :
                   'Watch Progress'}
                </span>
                <span className="text-sm font-bold text-primary-purple">
                  {watchedPercentage}%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-pink to-primary-purple"
                  initial={{ width: 0 }}
                  animate={{ width: `${watchedPercentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Course Info */}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {course.title[locale]}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {course.description[locale]}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  <FormattedMessage id="learn.teacher" />:
                </span>
                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                  {course.teacher}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  <FormattedMessage id="learn.duration" />:
                </span>
                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                  {course.duration}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Level:</span>
                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                  <FormattedMessage id={`learn.level.${course.level}`} />
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {course.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Completion Status */}
        {watchedPercentage === 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-xl p-6 flex items-center"
          >
            <CheckCircle className="w-12 h-12 text-green-500 mr-4" />
            <div>
              <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-1">
                {locale === 'uz' ? 'Kurs tugallandi!' :
                 locale === 'ru' ? 'Курс завершен!' :
                 'Course Completed!'}
              </h3>
              <p className="text-green-700 dark:text-green-300">
                {locale === 'uz' ? `Siz "${course.badge}" badgeini oldingiz!` :
                 locale === 'ru' ? `Вы получили значок "${course.badge}"!` :
                 `You earned the "${course.badge}" badge!`}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Badge Modal */}
      {showBadgeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowBadgeModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Award className="w-24 h-24 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {locale === 'uz' ? 'Tabriklaymiz!' :
               locale === 'ru' ? 'Поздравляем!' :
               'Congratulations!'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              {locale === 'uz' ? 'Siz yangi badge oldingiz:' :
               locale === 'ru' ? 'Вы получили новый значок:' :
               'You earned a new badge:'}
            </p>
            <div className="bg-gradient-to-r from-primary-pink to-primary-purple text-white px-6 py-3 rounded-lg text-xl font-bold mb-6">
              {course.badge}
            </div>
            <button
              onClick={() => setShowBadgeModal(false)}
              className="px-6 py-2 bg-primary-purple text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              {locale === 'uz' ? 'Yopish' : locale === 'ru' ? 'Закрыть' : 'Close'}
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default VideoPlayer;
