import { useState } from 'react';
import { motion } from 'framer-motion';
import { FormattedMessage } from 'react-intl';
import { Heart, Share2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { inspirations } from '../data/inspirations';
import { showToast } from '../utils/helpers';

const Inspiration = () => {
  const { locale } = useLanguage();
  const [likedStories, setLikedStories] = useState([]);

  const handleLike = (id) => {
    if (likedStories.includes(id)) {
      setLikedStories(likedStories.filter(storyId => storyId !== id));
    } else {
      setLikedStories([...likedStories, id]);
      showToast(
        locale === 'uz' ? 'Yoqdi!' : locale === 'ru' ? 'Нравится!' : 'Liked!',
        'success'
      );
    }
  };

  const handleShare = (story) => {
    showToast(
      locale === 'uz' ? 'Ulashish funksiyasi tez orada...' :
      locale === 'ru' ? 'Функция обмена скоро...' :
      'Share feature coming soon...',
      'info'
    );
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
            <FormattedMessage id="inspiration.title" />
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            <FormattedMessage id="inspiration.subtitle" />
          </p>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inspirations.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {story.name}
                  </h3>
                  <p className="text-sm text-white/90">
                    {story.position[locale]}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start mb-4">
                  <span className="text-3xl mr-3">💬</span>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "{story.quote[locale]}"
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleLike(story.id)}
                    className={`flex items-center space-x-2 ${
                      likedStories.includes(story.id)
                        ? 'text-red-500'
                        : 'text-gray-500 dark:text-gray-400'
                    } hover:text-red-500 transition-colors`}
                  >
                    <Heart
                      className="w-6 h-6"
                      fill={likedStories.includes(story.id) ? 'currentColor' : 'none'}
                    />
                    <span className="text-sm font-medium">
                      {story.likes + (likedStories.includes(story.id) ? 1 : 0)}
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleShare(story)}
                    className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-primary-purple transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      <FormattedMessage id="common.share" />
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-primary-pink to-primary-purple rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            {locale === 'uz' ? 'Sizning hikoyangiz ham ilhomlantirishi mumkin!' :
             locale === 'ru' ? 'Ваша история тоже может вдохновить!' :
             'Your story can inspire too!'}
          </h2>
          <p className="text-xl mb-6 opacity-90">
            {locale === 'uz' ? 'IT sohasidagi muvaffaqiyatingiz haqida bizga yozing' :
             locale === 'ru' ? 'Напишите нам о своем успехе в IT' :
             'Write to us about your success in IT'}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => showToast(
              locale === 'uz' ? 'Tez orada qo\'shiladi!' :
              locale === 'ru' ? 'Скоро будет добавлено!' :
              'Coming soon!',
              'info'
            )}
            className="px-8 py-3 bg-white text-primary-purple rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            {locale === 'uz' ? 'Hikoya yuborish' :
             locale === 'ru' ? 'Отправить историю' :
             'Submit Story'}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Inspiration;
