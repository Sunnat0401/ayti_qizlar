import { useState } from 'react';
import { motion } from 'framer-motion';
import { FormattedMessage } from 'react-intl';
import { Search, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { courses } from '../data/courses';
import MasterclassCard from '../components/MasterclassCard';

const Learn = () => {
  const { locale } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');

  // Get all unique tags
  const allTags = [...new Set(courses.flatMap(course => course.tags))];

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title[locale].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description[locale].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    const matchesTag = tagFilter === 'all' || course.tags.includes(tagFilter);
    
    return matchesSearch && matchesLevel && matchesTag;
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <FormattedMessage id="learn.title" />
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            <FormattedMessage id="learn.subtitle" />
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={locale === 'uz' ? 'Kurs qidirish...' : locale === 'ru' ? 'Искать курс...' : 'Search course...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Level Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Filter className="inline w-4 h-4 mr-1" />
                {locale === 'uz' ? 'Daraja' : locale === 'ru' ? 'Уровень' : 'Level'}
              </label>
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-purple transition-colors"
              >
                <option value="all">{locale === 'uz' ? 'Barchasi' : locale === 'ru' ? 'Все' : 'All'}</option>
                <option value="beginner"><FormattedMessage id="learn.level.beginner" /></option>
                <option value="intermediate"><FormattedMessage id="learn.level.intermediate" /></option>
                <option value="advanced"><FormattedMessage id="learn.level.advanced" /></option>
              </select>
            </div>

            {/* Tag Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Filter className="inline w-4 h-4 mr-1" />
                {locale === 'uz' ? 'Yo\'nalish' : locale === 'ru' ? 'Направление' : 'Category'}
              </label>
              <select
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-purple transition-colors"
              >
                <option value="all">{locale === 'uz' ? 'Barchasi' : locale === 'ru' ? 'Все' : 'All'}</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6 text-gray-600 dark:text-gray-300">
          {filteredCourses.length} {locale === 'uz' ? 'ta kurs topildi' : locale === 'ru' ? 'курсов найдено' : 'courses found'}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <MasterclassCard course={course} />
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {locale === 'uz' ? 'Kurs topilmadi' : locale === 'ru' ? 'Курс не найден' : 'No courses found'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {locale === 'uz' ? 'Boshqa so\'rovni kiriting yoki filtrlarni o\'zgartiring' :
               locale === 'ru' ? 'Попробуйте другой запрос или измените фильтры' :
               'Try a different search or change filters'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Learn;
