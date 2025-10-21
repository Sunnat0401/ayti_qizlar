import { useState } from 'react';
import { motion } from 'framer-motion';
import { FormattedMessage } from 'react-intl';
import { User, Mail, MapPin, Award, Calendar, Edit2, Save } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import { showToast } from '../utils/helpers';

const Profile = () => {
  const { locale } = useLanguage();
  const { user, updateUser, progress } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
    showToast(
      locale === 'uz' ? 'Profil saqlandi' :
      locale === 'ru' ? 'Профиль сохранен' :
      'Profile saved',
      'success'
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen bg-primary-light dark:bg-gray-900 transition-colors py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            <FormattedMessage id="profile.title" />
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-primary-purple text-white rounded-lg font-semibold hover:opacity-90"
          >
            {isEditing ? (
              <>
                <Save className="w-5 h-5 mr-2" />
                <FormattedMessage id="profile.save" />
              </>
            ) : (
              <>
                <Edit2 className="w-5 h-5 mr-2" />
                <FormattedMessage id="profile.edit" />
              </>
            )}
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              {/* Profile Image */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  {formData.profileImage ? (
                    <img
                      src={formData.profileImage}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-primary-pink"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-pink to-primary-purple flex items-center justify-center mx-auto">
                      <User className="w-16 h-16 text-white" />
                    </div>
                  )}
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-primary-purple text-white p-2 rounded-full cursor-pointer hover:opacity-90">
                      <Edit2 className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* User Info */}
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={locale === 'uz' ? 'Ism' : locale === 'ru' ? 'Имя' : 'Name'}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder={locale === 'uz' ? 'Yosh' : locale === 'ru' ? 'Возраст' : 'Age'}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder={locale === 'uz' ? 'Shahar' : locale === 'ru' ? 'Город' : 'City'}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </>
                ) : (
                  <>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <User className="w-5 h-5 mr-3 text-primary-purple" />
                      <span>{formData.name || locale === 'uz' ? 'Ism kiritilmagan' : locale === 'ru' ? 'Имя не указано' : 'Name not set'}</span>
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Mail className="w-5 h-5 mr-3 text-primary-purple" />
                      <span>{formData.email || 'Email'}</span>
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <MapPin className="w-5 h-5 mr-3 text-primary-purple" />
                      <span>{formData.city || locale === 'uz' ? 'Shahar' : locale === 'ru' ? 'Город' : 'City'}</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Progress & Badges */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-primary-purple" />
                <FormattedMessage id="profile.progress" />
              </h2>
              
              {/* Overall Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {locale === 'uz' ? 'Umumiy o\'zlashtirish' :
                     locale === 'ru' ? 'Общий прогресс' :
                     'Overall Progress'}
                  </span>
                  <span className="text-2xl font-bold text-primary-purple">
                    {progress.overallProgress}%
                  </span>
                </div>
                <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-pink to-primary-purple"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress.overallProgress}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>

              {/* Course Progress */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {locale === 'uz' ? 'Kurslar' : locale === 'ru' ? 'Курсы' : 'Courses'}
                </h3>
                {Object.keys(progress.watchedVideos).length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    {locale === 'uz' ? 'Hali kurs boshlamadingiz' :
                     locale === 'ru' ? 'Вы еще не начали курсы' :
                     'You haven\'t started any courses yet'}
                  </p>
                ) : (
                  Object.entries(progress.watchedVideos).map(([courseId, percentage]) => (
                    <div key={courseId} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {courseId}
                        </span>
                        <span className="text-sm font-bold text-primary-purple">
                          {percentage}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-purple"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Award className="w-6 h-6 mr-2 text-primary-purple" />
                <FormattedMessage id="profile.badges" />
              </h2>
              
              {progress.badges.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  {locale === 'uz' ? 'Hali badge yo\'q. Kurslarni tugallab badge oling!' :
                   locale === 'ru' ? 'Пока нет значков. Завершите курсы, чтобы получить значки!' :
                   'No badges yet. Complete courses to earn badges!'}
                </p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {progress.badges.map((badge, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-primary-pink to-primary-purple rounded-lg p-4 text-center"
                    >
                      <Award className="w-12 h-12 text-white mx-auto mb-2" />
                      <p className="text-white font-semibold text-sm">
                        {badge}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
