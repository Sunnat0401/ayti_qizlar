import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FormattedMessage } from 'react-intl';
import { Send, ThumbsUp, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { generatePseudonym, showToast } from '../utils/helpers';

const Community = () => {
  const { locale } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ayti_qizlar_community');
    if (saved) {
      setPosts(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim()) {
      showToast(
        locale === 'uz' ? 'Xabar kiriting' : locale === 'ru' ? 'Введите сообщение' : 'Enter a message',
        'error'
      );
      return;
    }

    const post = {
      id: Date.now(),
      user: isAnonymous ? generatePseudonym() : 'You',
      text: newPost,
      likes: 0,
      timestamp: new Date().toISOString()
    };

    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('ayti_qizlar_community', JSON.stringify(updatedPosts));
    setNewPost('');
    showToast(
      locale === 'uz' ? 'Xabar yuborildi' : locale === 'ru' ? 'Сообщение отправлено' : 'Message sent',
      'success'
    );
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map(p => 
      p.id === postId ? { ...p, likes: p.likes + 1 } : p
    );
    setPosts(updatedPosts);
    localStorage.setItem('ayti_qizlar_community', JSON.stringify(updatedPosts));
  };

  return (
    <div className="min-h-screen bg-primary-light dark:bg-gray-900 transition-colors py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <FormattedMessage id="community.title" />
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            <FormattedMessage id="community.subtitle" />
          </p>
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6 flex items-start"
        >
          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <FormattedMessage id="community.warning" />
          </p>
        </motion.div>

        {/* Post Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
        >
          <form onSubmit={handleSubmit}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder={
                locale === 'uz' ? 'Fikr va savollaringizni yozing...' :
                locale === 'ru' ? 'Напишите свои мысли и вопросы...' :
                'Write your thoughts and questions...'
              }
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-700 dark:text-white mb-4 resize-none"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anon"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 text-primary-purple border-gray-300 rounded focus:ring-primary-purple"
                />
                <label htmlFor="anon" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  <FormattedMessage id="meetup.anonymous" />
                </label>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-gradient-to-r from-primary-pink to-primary-purple text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center"
              >
                <Send className="w-4 h-4 mr-2" />
                <FormattedMessage id="community.post" />
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Posts List */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {locale === 'uz' ? 'Hali xabar yo\'q' :
                 locale === 'ru' ? 'Пока нет сообщений' :
                 'No messages yet'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {locale === 'uz' ? 'Birinchi bo\'lib fikr bildiring!' :
                 locale === 'ru' ? 'Будьте первым, кто выскажется!' :
                 'Be the first to share your thoughts!'}
              </p>
            </motion.div>
          ) : (
            posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="font-semibold text-primary-purple">
                      {post.user}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                      {new Date(post.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {post.text}
                </p>
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-purple transition-colors"
                >
                  <ThumbsUp className="w-5 h-5 mr-2" />
                  <span>{post.likes}</span>
                </button>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
