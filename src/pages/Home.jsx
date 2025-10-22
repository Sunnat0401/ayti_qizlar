import { motion } from 'framer-motion';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, BookOpen, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { courses } from '../data/courses';
import { events } from '../data/events';
import MasterclassCard from '../components/MasterclassCard';
import EventCard from '../components/EventCard';
import { useState } from 'react';

const Home = () => {
  const { locale } = useLanguage();
  const [showMeetupModal, setShowMeetupModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const latestCourses = courses.slice(0, 3);
  const upcomingEvents = events.slice(0, 3);

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: { uz: 'Bepul Kurslar', ru: 'Бесплатные курсы', en: 'Free Courses' },
      desc: { uz: '10 ta professional video kurs', ru: '10 профессиональных видео-курсов', en: '10 professional video courses' }
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: { uz: 'Jamiyat', ru: 'Сообщество', en: 'Community' },
      desc: { uz: 'Qizlar bilan fikr almashish', ru: 'Обмен мнениями с девушками', en: 'Exchange opinions with girls' }
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: { uz: 'Meetuplar', ru: 'Встречи', en: 'Meetups' },
      desc: { uz: 'Offline va online tadbirlar', ru: 'Оффлайн и онлайн мероприятия', en: 'Offline and online events' }
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: { uz: 'Xavfsizlik', ru: 'Безопасность', en: 'Safety' },
      desc: { uz: 'Raqamli xavfsizlik maslahatlar', ru: 'Советы по цифровой безопасности', en: 'Digital safety tips' }
    }
  ];

  const handleJoinEvent = (event) => {
    setSelectedEvent(event);
    setShowMeetupModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-500 dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-500  bg-gradient-to-r from-primary-pink to-primary-purple text-white home-bg">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <FormattedMessage id="hero.title" />
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              <FormattedMessage id="hero.subtitle" />
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center no-underline hover:no-underline ">
              <Link to="/learn" className='no-underline hover:no-underline'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-primary-purple rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center hero-buttons no-underline hover:no-underline "
                >
                  <FormattedMessage id="hero.cta" />
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
              </Link>
              <Link to="/events">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-purple transition-all"
                >
                  <FormattedMessage id="hero.cta2" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-pink to-primary-purple rounded-full text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title[locale]}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.desc[locale]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Masterclasses */}
      <section className="py-16 bg-primary-light dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              <FormattedMessage id="home.latest" />
            </h2>
            <Link to="/learn">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="text-primary-purple font-semibold flex items-center max-[500px]:justify-center hero-buttons"
              >
                <FormattedMessage id="hero.cta2" />
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestCourses.map((course) => (
              <MasterclassCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              <FormattedMessage id="home.upcoming" />
            </h2>
            <Link to="/events">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="text-primary-purple font-semibold flex items-center"
              >
                <FormattedMessage id="hero.cta2" />
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} onJoin={handleJoinEvent} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-pink to-primary-purple">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {locale === 'uz' ? 'IT sohasida kelajagingizni bugun boshlang!' :
             locale === 'ru' ? 'Начните свое будущее в IT сегодня!' :
             'Start your IT future today!'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {locale === 'uz' ? 'Minglab qizlar bilan birga o\'rganing va rivojlaning' :
             locale === 'ru' ? 'Учитесь и развивайтесь вместе с тысячами девушек' :
             'Learn and grow with thousands of girls'}
          </p>
          <Link to="/learn">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-primary-purple rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <FormattedMessage id="hero.cta" />
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
