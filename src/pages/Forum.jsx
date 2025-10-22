import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FormattedMessage } from 'react-intl';
import { Plus, ThumbsUp, ThumbsDown, MessageCircle, Send, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { showToast, generatePseudonym } from '../utils/helpers';

const Forum = () => {
  const { locale } = useLanguage();
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState({ question: '', details: '', isAnonymous: false });
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    // Load from localStorage or use default
    const saved = localStorage.getItem('ayti_qizlar_forum');
    if (saved) {
      setQuestions(JSON.parse(saved));
    } else {
      setQuestions(getDefaultQuestions());
    }
  }, []);

  const getDefaultQuestions = () => [
    {
      id: 'q1',
      question: locale === 'uz' ? 'Frontend qayerdan boshlash kerak?' : locale === 'ru' ? 'С чего начать Frontend?' : 'Where to start Frontend?',
      details: locale === 'uz' ? 'HTML va CSS dan boshlamanmi yoki to\'g\'ridan-to\'g\'ri React o\'rganaman?' : locale === 'ru' ? 'Начать с HTML и CSS или сразу учить React?' : 'Should I start with HTML and CSS or learn React directly?',
      user: 'Zarina#102',
      likes: 12,
      dislikes: 2,
      comments: [
        { user: 'Malika#205', text: locale === 'uz' ? 'HTML va CSS dan boshla. Fundamentallar muhim!' : locale === 'ru' ? 'Начни с HTML и CSS. Основы важны!' : 'Start with HTML and CSS. Fundamentals are important!' }
      ]
    }
  ];

  const handleAddQuestion = () => {
    if (!newQuestion.question.trim()) {
      showToast(
        locale === 'uz' ? 'Savol kiriting' : locale === 'ru' ? 'Введите вопрос' : 'Enter a question',
        'error'
      );
      return;
    }

    const question = {
      id: `q${Date.now()}`,
      question: newQuestion.question,
      details: newQuestion.details,
      user: newQuestion.isAnonymous ? generatePseudonym() : 'You',
      likes: 0,
      dislikes: 0,
      comments: []
    };

    const updatedQuestions = [question, ...questions];
    setQuestions(updatedQuestions);
    localStorage.setItem('ayti_qizlar_forum', JSON.stringify(updatedQuestions));

    showToast(
      locale === 'uz' ? 'Savol qo\'shildi' : locale === 'ru' ? 'Вопрос добавлен' : 'Question added',
      'success'
    );

    setNewQuestion({ question: '', details: '', isAnonymous: false });
    setShowModal(false);
  };

  const handleLike = (questionId, isLike) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          likes: isLike ? q.likes + 1 : q.likes,
          dislikes: !isLike ? q.dislikes + 1 : q.dislikes
        };
      }
      return q;
    });
    setQuestions(updatedQuestions);
    localStorage.setItem('ayti_qizlar_forum', JSON.stringify(updatedQuestions));
  };

  const handleAddComment = (questionId) => {
    if (!commentText.trim()) return;

    const updatedQuestions = questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          comments: [...q.comments, { user: 'You', text: commentText }]
        };
      }
      return q;
    });
    setQuestions(updatedQuestions);
    localStorage.setItem('ayti_qizlar_forum', JSON.stringify(updatedQuestions));
    setCommentText('');
    showToast(locale === 'uz' ? 'Izoh qo\'shildi' : locale === 'ru' ? 'Комментарий добавлен' : 'Comment added', 'success');
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
            <FormattedMessage id="forum.title" />
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            <FormattedMessage id="forum.subtitle" />
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-primary-pink to-primary-purple text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity inline-flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            <FormattedMessage id="forum.ask" />
          </motion.button>
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

        {/* Questions List */}
        <div className="space-y-4">
          {questions.map((q, index) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              {/* Question Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  {/* Make title able to shrink on small screens to avoid overflow */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex-1 min-w-0">
                    {q.question}
                  </h3>
                  {/* Keep username from shrinking too small */}
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-4 flex-shrink-0">
                    {q.user}
                  </span>
                </div>
                {q.details && (
                  <p className="text-gray-600 dark:text-gray-300">
                    {q.details}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={() => handleLike(q.id, true)}
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors"
                >
                  <ThumbsUp className="w-5 h-5 mr-1" />
                  <span>{q.likes}</span>
                </button>
                <button
                  onClick={() => handleLike(q.id, false)}
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
                >
                  <ThumbsDown className="w-5 h-5 mr-1" />
                  <span>{q.dislikes}</span>
                </button>
                <button
                  onClick={() => setActiveQuestion(activeQuestion === q.id ? null : q.id)}
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-purple transition-colors"
                >
                  <MessageCircle className="w-5 h-5 mr-1" />
                  <span>{q.comments.length}</span>
                </button>
              </div>

              {/* Comments */}
              {activeQuestion === q.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="border-t border-gray-200 dark:border-gray-700 pt-4 overflow-hidden"
                >
                  {/* Comments list — limit height on very small screens and allow scrolling */}
                  <div className="space-y-3 max-h-48 overflow-auto pr-2">
                    {q.comments.map((comment, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <span className="text-sm font-semibold text-primary-purple">{comment.user}: </span>
                        <span className="text-sm text-gray-700 dark:text-gray-300 break-words">{comment.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Input row — stack vertically on small screens (<= 640px default sm breakpoint is 640px).
                      To make it friendly even for very narrow screens (320px), we set column layout by default
                      and row layout at sm and above. Using min-w-0 on the input prevents flex overflow. */}
                  <div className="flex flex-col sm:flex-row gap-2 mt-3">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder={locale === 'uz' ? 'Izoh yozish...' : locale === 'ru' ? 'Написать комментарий...' : 'Write a comment...'}
                      className="flex-1 min-w-0 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-purple dark:bg-gray-600 dark:text-white"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddComment(q.id)}
                    />
                   <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => handleAddComment(q.id)}
  className="flex items-center justify-center sm:justify-start bg-primary-purple text-white p-2 rounded-lg hover:opacity-90 sm:flex-shrink-0 w-full sm:w-auto"
>
  <Send className="w-5 h-5" />
</motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add Question Modal */}
      {showModal && (
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              <FormattedMessage id="forum.ask" />
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FormattedMessage id="forum.question" />
                </label>
                <input
                  type="text"
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-purple dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FormattedMessage id="forum.details" />
                </label>
                <textarea
                  value={newQuestion.details}
                  onChange={(e) => setNewQuestion({ ...newQuestion, details: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-purple dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anon"
                  checked={newQuestion.isAnonymous}
                  onChange={(e) => setNewQuestion({ ...newQuestion, isAnonymous: e.target.checked })}
                  className="w-4 h-4 text-primary-purple border-gray-300 rounded focus:ring-primary-purple"
                />
                <label htmlFor="anon" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  <FormattedMessage id="meetup.anonymous" />
                </label>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <FormattedMessage id="common.cancel" />
                </button>
                <button
                  onClick={handleAddQuestion}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-pink to-primary-purple text-white rounded-lg hover:opacity-90"
                >
                  <FormattedMessage id="common.submit" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Forum;