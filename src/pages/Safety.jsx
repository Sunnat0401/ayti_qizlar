import { useState } from 'react';
import { motion } from 'framer-motion';
import { FormattedMessage } from 'react-intl';
import { Search, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { safetyTopics } from '../data/safety';

const Safety = () => {
  const { locale } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: { uz: 'Barchasi', ru: 'Все', en: 'All' } },
    { value: 'finance', label: { uz: 'Moliya', ru: 'Финансы', en: 'Finance' } },
    { value: 'social', label: { uz: 'Ijtimoiy', ru: 'Социальные', en: 'Social' } },
    { value: 'security', label: { uz: 'Xavfsizlik', ru: 'Безопасность', en: 'Security' } },
    { value: 'network', label: { uz: 'Tarmoq', ru: 'Сеть', en: 'Network' } }
  ];

  const filteredTopics = safetyTopics.filter(topic => {
    const matchesSearch = 
      topic.title[locale].toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.problem[locale].toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.solution[locale].toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-primary-light dark:bg-gray-900 transition-colors py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-pink to-primary-purple rounded-full mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <FormattedMessage id="safety.title" />
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            <FormattedMessage id="safety.subtitle" />
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
        >
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={locale === 'uz' ? 'Qidirish...' : locale === 'ru' ? 'Поиск...' : 'Search...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat.value
                    ? 'bg-primary-purple text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {cat.label[locale]}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Topics List */}
        <div className="space-y-6">
          {filteredTopics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
            >
              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Shield className="w-6 h-6 text-primary-purple mr-2" />
                {topic.title[locale]}
              </h3>

              {/* Problem */}
              <div className="mb-4">
                <div className="flex items-start mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-1">
                      {locale === 'uz' ? 'Muammo:' : locale === 'ru' ? 'Проблема:' : 'Problem:'}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {topic.problem[locale]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Solution */}
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-1">
                      {locale === 'uz' ? 'Yechim:' : locale === 'ru' ? 'Решение:' : 'Solution:'}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {topic.solution[locale]}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredTopics.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {locale === 'uz' ? 'Natija topilmadi' : locale === 'ru' ? 'Результат не найден' : 'No results found'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {locale === 'uz' ? 'Boshqa so\'rov kiriting' :
               locale === 'ru' ? 'Попробуйте другой запрос' :
               'Try a different search'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Safety;
