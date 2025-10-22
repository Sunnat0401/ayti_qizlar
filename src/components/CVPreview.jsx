import { forwardRef } from 'react';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award, Languages } from 'lucide-react';

const CVPreview = forwardRef(({ 
  personalInfo, 
  summary, 
  experiences, 
  educations, 
  skills, 
  languages, 
  socialLinks,
  t,
  getSocialIcon 
}, ref) => {
  const getLevelWidth = (level) => {
    const widths = {
      beginner: '25%',
      intermediate: '50%',
      advanced: '75%',
      expert: '100%'
    };
    return widths[level] || '50%';
  };

  return (
    <div ref={ref} className="bg-white p-10 rounded-2xl shadow-2xl max-w-4xl mx-auto" style={{ minHeight: '1000px' }}>
      {/* Header */}
      <div className="border-b-4 border-pink-500 pb-6 mb-6">
        <h1 className="text-5xl font-bold text-gray-800 mb-3">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mt-4">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-pink-500" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-pink-500" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-pink-500" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-pink-500" />
              <span className="truncate">{personalInfo.website}</span>
            </div>
          )}
        </div>

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {socialLinks.map((link) => link.url && (
              <div key={link.id} className="flex items-center gap-2 text-sm text-pink-600">
                {getSocialIcon(link.platform)}
                <span className="truncate max-w-[150px]">{link.url}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <div className="w-2 h-8 bg-pink-500 rounded"></div>
            {t('cv.summary')}
          </h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-pink-500" />
            {t('cv.experience')}
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="border-l-4 border-pink-300 pl-4">
                <h3 className="text-xl font-semibold text-gray-800">{exp.jobTitle}</h3>
                <p className="text-pink-600 font-medium">{exp.company}</p>
                <p className="text-sm text-gray-500 mb-2">
                  {exp.startDate} - {exp.current ? t('cv.current') : exp.endDate}
                </p>
                {exp.description && (
                  <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {educations.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-pink-500" />
            {t('cv.education')}
          </h2>
          <div className="space-y-4">
            {educations.map((edu) => (
              <div key={edu.id} className="border-l-4 border-pink-300 pl-4">
                <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                <p className="text-pink-600 font-medium">{edu.institution}</p>
                <p className="text-sm text-gray-500">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-pink-500" />
            {t('cv.skills')}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill) => (
              <div key={skill.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                  <span className="text-xs text-gray-500">{t(`cv.${skill.level}`)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all"
                    style={{ width: getLevelWidth(skill.level) }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Languages className="w-6 h-6 text-pink-500" />
            {t('cv.languages')}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {languages.map((lang) => (
              <div key={lang.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{lang.name}</span>
                  <span className="text-xs text-gray-500">{t(`cv.${lang.proficiency}`)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all"
                    style={{ width: getLevelWidth(lang.proficiency) }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

CVPreview.displayName = 'CVPreview';

export default CVPreview;
