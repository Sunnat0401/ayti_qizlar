// import { useState, useRef } from 'react';
// import { useLanguage } from '../contexts/LanguageContext';
// import { 
//   User, Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, 
//   Award, Languages, Plus, Trash2, Download, Eye, Linkedin, 
//   Send, Github, Twitter, Instagram, Facebook 
// } from 'lucide-react';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import CVPreview from '../components/CVPreview';

// export default function CVBuilder() {
//   const { t } = useLanguage();
//   const cvPreviewRef = useRef(null);
  
//   const [personalInfo, setPersonalInfo] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     location: '',
//     website: ''
//   });
  
//   const [summary, setSummary] = useState('');
  
//   const [experiences, setExperiences] = useState([]);
//   const [educations, setEducations] = useState([]);
//   const [skills, setSkills] = useState([]);
//   const [languages, setLanguages] = useState([]);
//   const [socialLinks, setSocialLinks] = useState([]);
  
//   const [showPreview, setShowPreview] = useState(false);

//   const addExperience = () => {
//     setExperiences([...experiences, {
//       id: Date.now(),
//       jobTitle: '',
//       company: '',
//       startDate: '',
//       endDate: '',
//       current: false,
//       description: ''
//     }]);
//   };

//   const updateExperience = (id, field, value) => {
//     setExperiences(experiences.map(exp => 
//       exp.id === id ? { ...exp, [field]: value } : exp
//     ));
//   };

//   const removeExperience = (id) => {
//     setExperiences(experiences.filter(exp => exp.id !== id));
//   };

//   const addEducation = () => {
//     setEducations([...educations, {
//       id: Date.now(),
//       degree: '',
//       institution: '',
//       startDate: '',
//       endDate: ''
//     }]);
//   };

//   const updateEducation = (id, field, value) => {
//     setEducations(educations.map(edu => 
//       edu.id === id ? { ...edu, [field]: value } : edu
//     ));
//   };

//   const removeEducation = (id) => {
//     setEducations(educations.filter(edu => edu.id !== id));
//   };

//   const addSkill = () => {
//     setSkills([...skills, {
//       id: Date.now(),
//       name: '',
//       level: 'intermediate'
//     }]);
//   };

//   const updateSkill = (id, field, value) => {
//     setSkills(skills.map(skill => 
//       skill.id === id ? { ...skill, [field]: value } : skill
//     ));
//   };

//   const removeSkill = (id) => {
//     setSkills(skills.filter(skill => skill.id !== id));
//   };

//   const addLanguage = () => {
//     setLanguages([...languages, {
//       id: Date.now(),
//       name: '',
//       proficiency: 'intermediate'
//     }]);
//   };

//   const updateLanguage = (id, field, value) => {
//     setLanguages(languages.map(lang => 
//       lang.id === id ? { ...lang, [field]: value } : lang
//     ));
//   };

//   const removeLanguage = (id) => {
//     setLanguages(languages.filter(lang => lang.id !== id));
//   };

//   const addSocialLink = () => {
//     setSocialLinks([...socialLinks, {
//       id: Date.now(),
//       platform: 'linkedin',
//       url: ''
//     }]);
//   };

//   const updateSocialLink = (id, field, value) => {
//     setSocialLinks(socialLinks.map(link => 
//       link.id === id ? { ...link, [field]: value } : link
//     ));
//   };

//   const removeSocialLink = (id) => {
//     setSocialLinks(socialLinks.filter(link => link.id !== id));
//   };

//   const getSocialIcon = (platform) => {
//     const icons = {
//       linkedin: <Linkedin className="w-4 h-4" />,
//       telegram: <Send className="w-4 h-4" />,
//       github: <Github className="w-4 h-4" />,
//       twitter: <Twitter className="w-4 h-4" />,
//       instagram: <Instagram className="w-4 h-4" />,
//       facebook: <Facebook className="w-4 h-4" />
//     };
//     return icons[platform] || <Globe className="w-4 h-4" />;
//   };

//   const downloadPDF = async () => {
//     if (!personalInfo.fullName || !personalInfo.email) {
//       alert(t('cv.fillAllFields'));
//       return;
//     }

//     const wasPreviewShown = showPreview;
//     setShowPreview(true);
    
//     setTimeout(async () => {
//       const element = cvPreviewRef.current;
//       const canvas = await html2canvas(element, {
//         scale: 2,
//         useCORS: true,
//         logging: false,
//         backgroundColor: '#ffffff'
//       });
      
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
//       const imgWidth = canvas.width;
//       const imgHeight = canvas.height;
//       const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
//       const imgX = (pdfWidth - imgWidth * ratio) / 2;
//       const imgY = 0;

//       pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
//       pdf.save(`${personalInfo.fullName}_CV.pdf`);
      
//       if (!wasPreviewShown) {
//         setShowPreview(false);
//       }
//     }, 500);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12 animate-fade-in">
//           <h1 className="text-5xl font-bold mb-4 gradient-text">
//             {t('cv.title')}
//           </h1>
//           <p className="text-gray-600 dark:text-gray-300 text-lg">
//             {t('cv.subtitle')}
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Form Section */}
//           <div className="space-y-6">
//             {/* Personal Info */}
//             <div className="glass-card p-6 animate-slide-up">
//               <div className="flex items-center gap-3 mb-6">
//                 <User className="w-6 h-6 text-primary" />
//                 <h2 className="text-2xl font-semibold">{t('cv.personalInfo')}</h2>
//               </div>
              
//               <div className="space-y-4">
//                 <input
//                   type="text"
//                   placeholder={t('cv.fullName')}
//                   value={personalInfo.fullName}
//                   onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
//                   className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none transition-colors"
//                 />
                
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <input
//                     type="email"
//                     placeholder={t('cv.email')}
//                     value={personalInfo.email}
//                     onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
//                     className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none transition-colors"
//                   />
                  
//                   <input
//                     type="tel"
//                     placeholder={t('cv.phone')}
//                     value={personalInfo.phone}
//                     onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
//                     className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none transition-colors"
//                   />
//                 </div>
                
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <input
//                     type="text"
//                     placeholder={t('cv.location')}
//                     value={personalInfo.location}
//                     onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
//                     className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none transition-colors"
//                   />
                  
//                   <input
//                     type="url"
//                     placeholder={t('cv.website')}
//                     value={personalInfo.website}
//                     onChange={(e) => setPersonalInfo({...personalInfo, website: e.target.value})}
//                     className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none transition-colors"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Summary */}
//             <div className="glass-card p-6 animate-slide-up">
//               <h2 className="text-2xl font-semibold mb-4">{t('cv.summary')}</h2>
//               <textarea
//                 placeholder={t('cv.summaryPlaceholder')}
//                 value={summary}
//                 onChange={(e) => setSummary(e.target.value)}
//                 rows={4}
//                 className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none transition-colors resize-none"
//               />
//             </div>

//             {/* Social Links */}
//             <div className="glass-card p-6 animate-slide-up">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-semibold">{t('cv.socialLinks')}</h2>
//                 <button
//                   onClick={addSocialLink}
//                   className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
//                 >
//                   <Plus className="w-4 h-4" />
//                   {t('cv.addSocialLink')}
//                 </button>
//               </div>
              
//               <div className="space-y-4">
//                 {socialLinks.map((link) => (
//                   <div key={link.id} className="flex gap-3">
//                     <select
//                       value={link.platform}
//                       onChange={(e) => updateSocialLink(link.id, 'platform', e.target.value)}
//                       className="px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
//                     >
//                       <option value="linkedin">{t('cv.linkedin')}</option>
//                       <option value="telegram">{t('cv.telegram')}</option>
//                       <option value="github">{t('cv.github')}</option>
//                       <option value="twitter">{t('cv.twitter')}</option>
//                       <option value="instagram">{t('cv.instagram')}</option>
//                       <option value="facebook">{t('cv.facebook')}</option>
//                     </select>
                    
//                     <input
//                       type="url"
//                       placeholder="https://..."
//                       value={link.url}
//                       onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
//                       className="flex-1 px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
//                     />
                    
//                     <button
//                       onClick={() => removeSocialLink(link.id)}
//                       className="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Experience */}
//             <div className="glass-card p-6 animate-slide-up">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center gap-3">
//                   <Briefcase className="w-6 h-6 text-primary" />
//                   <h2 className="text-2xl font-semibold">{t('cv.experience')}</h2>
//                 </div>
//                 <button
//                   onClick={addExperience}
//                   className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
//                 >
//                   <Plus className="w-4 h-4" />
//                   {t('cv.addExperience')}
//                 </button>
//               </div>
              
//               <div className="space-y-6">
//                 {experiences.map((exp) => (
//                   <div key={exp.id} className="p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl space-y-3">
//                     <div className="grid md:grid-cols-2 gap-3">
//                       <input
//                         type="text"
//                         placeholder={t('cv.jobTitle')}
//                         value={exp.jobTitle}
//                         onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
//                         className="px-4 py-2 rounded-lg border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
//                       />
//                       <input
//                         type="text"
//                         placeholder={t('cv.company')}
//                         value={exp.company}
//                         onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
//                         className="px-4 py-2 rounded-lg border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
//                       />
//                     </div>
                    
//                     <div className="grid md:grid-cols-2 gap-3">
//                       <input
//                         type="text"
//                         placeholder={t('cv.startDate')}
//                         value={exp.startDate}
//                         onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
//                         className="px-4 py-2 rounded-lg border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
//                       />
//                       <input
//                         type="text"
//                         placeholder={t('cv.endDate')}
//                         value={exp.endDate}
//                         onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
//                         disabled={exp.current}
//                         className="px-4 py-2 rounded-lg border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none disabled:opacity-50"
//                       />
//                     </div>
                    
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={exp.current}
//                         onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
//                         className="w-4 h-4 text-primary rounded"
//                       />
//                       <span className="text-sm">{t('cv.current')}</span>
//                     </label>
                    
//                     <textarea
//                       placeholder={t('cv.description')}
//                       value={exp.description}
//                       onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
//                       rows={3}
//                       className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none resize-none"
//                     />
                    
//                     <button
//                       onClick={() => removeExperience(exp.id)}
//                       className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                       {t('cv.remove')}
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Education */}
//             <div className="glass-card p-6 animate-slide-up">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center gap-3">
//                   <GraduationCap className="w-6 h-6 text-primary" />
//                   <h2 className="text-2xl font-semibold">{t('cv.education')}</h2>
//                 </div>
//                 <button
//                   onClick={addEducation}
//                   className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
//                 >
//                   <Plus className="w-4 h-4" />
//                   {t('cv.addEducation')}
//                 </button>
//               </div>
              
//               <div className="space-y-6">
//                 {educations.map((edu) => (
//                   <div key={edu.id} className="p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl space-y-3">
//                     <div className="grid md:grid-cols-2 gap-3">
//                       <input
//                         type="text"
//                         placeholder={t('cv.degree')}
//                         value={edu.degree}
//                         onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
//                         className="px-4 py-2 rounded-lg border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
//                       />
//                       <input
//                         type="text"
//                         placeholder={t('cv.institution')}
//                         value={edu.institution}
//                         onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
//                         className="px-4 py-2 rounded-lg border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
//                       />
//                     </div>
                    
//                     <div className="grid md:grid-cols-2 gap-3">
//                       <input
//                         type="text"
//                         placeholder={t('cv.startDate')}
//                         value={edu.startDate}
//                         onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
//                         className="px-4 py-2 rounded-lg border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
//                       />
//                       <input
//                         type="text"
//                         placeholder={t('cv.endDate')}
//                         value={edu.endDate}
//                         onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
//                         className="px-4 py-2 rounded-lg border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
//                       />
//                     </div>
                    
//                     <button
//                       onClick={() => removeEducation(edu.id)}
//                       className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                       {t('cv.remove')}
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Skills */}
//             <div className="glass-card p-6 animate-slide-up">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center gap-3">
//                   <Award className="w-6 h-6 text-primary" />
//                   <h2 className="text-2xl font-semibold">{t('cv.skills')}</h2>
//                 </div>
//                 <button
//                   onClick={addSkill}
//                   className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
//                 >
//                   <Plus className="w-4 h-4" />
//                   {t('cv.addSkill')}
//                 </button>
//               </div>
              
//               <div className="space-y-4">
//                 {skills.map((skill) => (
//                   <div key={skill.id} className="flex gap-3">
//                     <input
//                       type="text"
//                       placeholder={t('cv.skillName')}
//                       value={skill.name}
//                       onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
//                       className="flex-1 px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
//                     />
                    
//                     <select
//                       value={skill.level}
//                       onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
//                       className="px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
//                     >
//                       <option value="beginner">{t('cv.beginner')}</option>
//                       <option value="intermediate">{t('cv.intermediate')}</option>
//                       <option value="advanced">{t('cv.advanced')}</option>
//                       <option value="expert">{t('cv.expert')}</option>
//                     </select>
                    
//                     <button
//                       onClick={() => removeSkill(skill.id)}
//                       className="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Languages */}
//             <div className="glass-card p-6 animate-slide-up">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center gap-3">
//                   <Languages className="w-6 h-6 text-primary" />
//                   <h2 className="text-2xl font-semibold">{t('cv.languages')}</h2>
//                 </div>
//                 <button
//                   onClick={addLanguage}
//                   className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
//                 >
//                   <Plus className="w-4 h-4" />
//                   {t('cv.addLanguage')}
//                 </button>
//               </div>
              
//               <div className="space-y-4">
//                 {languages.map((lang) => (
//                   <div key={lang.id} className="flex gap-3">
//                     <input
//                       type="text"
//                       placeholder={t('cv.language')}
//                       value={lang.name}
//                       onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
//                       className="flex-1 px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
//                     />
                    
//                     <select
//                       value={lang.proficiency}
//                       onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
//                       className="px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
//                     >
//                       <option value="beginner">{t('cv.beginner')}</option>
//                       <option value="intermediate">{t('cv.intermediate')}</option>
//                       <option value="advanced">{t('cv.advanced')}</option>
//                       <option value="expert">{t('cv.expert')}</option>
//                     </select>
                    
//                     <button
//                       onClick={() => removeLanguage(lang.id)}
//                       className="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-4">
//               <button
//                 onClick={() => setShowPreview(!showPreview)}
//                 className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
//               >
//                 <Eye className="w-5 h-5" />
//                 {t('cv.preview')}
//               </button>
              
//               <button
//                 onClick={downloadPDF}
//                 className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary to-pink-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
//               >
//                 <Download className="w-5 h-5" />
//                 {t('cv.download')}
//               </button>
//             </div>
//           </div>

//           {/* Preview Section */}
//           {showPreview && (
//             <div className="lg:sticky lg:top-24 h-fit">
//               <CVPreview
//                 ref={cvPreviewRef}
//                 personalInfo={personalInfo}
//                 summary={summary}
//                 experiences={experiences}
//                 educations={educations}
//                 skills={skills}
//                 languages={languages}
//                 socialLinks={socialLinks}
//                 t={t}
//                 getSocialIcon={getSocialIcon}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  User, Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, 
  Award, Languages, Plus, Trash2, Download, Eye, Linkedin, 
  Send, Github, Twitter, Instagram, Facebook 
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import CVPreview from '../components/CVPreview';

export default function CVBuilder() {
    const { t } = useLanguage();
  const cvPreviewRef = useRef(null);
  const importInputRef = useRef(null);
  const autosaveTimerRef = useRef(null);

  const LOCAL_STORAGE_KEY = 'cv_builder_data_v1';

  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: ''
  });

  const [summary, setSummary] = useState('');

  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);

  const [showPreview, setShowPreview] = useState(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        // Basic validation and fallback to existing initial states if missing
        if (data.personalInfo) setPersonalInfo(data.personalInfo);
        if (typeof data.summary === 'string') setSummary(data.summary);
        if (Array.isArray(data.experiences)) setExperiences(data.experiences);
        if (Array.isArray(data.educations)) setEducations(data.educations);
        if (Array.isArray(data.skills)) setSkills(data.skills);
        if (Array.isArray(data.languages)) setLanguages(data.languages);
        if (Array.isArray(data.socialLinks)) setSocialLinks(data.socialLinks);
      }
    } catch (err) {
      // If parse fails, ignore and don't block the app
      console.warn('Failed to load saved CV data:', err);
    }
  }, []);

  // Auto-save to localStorage with debounce
  useEffect(() => {
    // Clear previous timer
    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);
    }
    autosaveTimerRef.current = setTimeout(() => {
      saveToLocalStorage();
    }, 800); // save 800ms after last change

    return () => {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personalInfo, summary, experiences, educations, skills, languages, socialLinks]);

  const saveToLocalStorage = () => {
    try {
      const payload = {
        personalInfo,
        summary,
        experiences,
        educations,
        skills,
        languages,
        socialLinks,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
      // You can replace alert with a gentler UI notification if available
      // alert(t('cv.savedLocal')); // optional
    } catch (err) {
      console.error('Failed to save CV data:', err);
      alert(t('cv.saveFailed') || 'Failed to save locally');
    }
  };

  const clearSavedData = (alsoResetForm = false) => {
    if (!confirm(t('cv.confirmClear') || 'Clear saved data?')) return;
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    if (alsoResetForm) {
      // Reset all states to initial values
      setPersonalInfo({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        website: ''
      });
      setSummary('');
      setExperiences([]);
      setEducations([]);
      setSkills([]);
      setLanguages([]);
      setSocialLinks([]);
    }
    alert(t('cv.cleared') || 'Saved data cleared');
  };

  const exportJSON = () => {
    const payload = {
      personalInfo,
      summary,
      experiences,
      educations,
      skills,
      languages,
      socialLinks,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const filenameBase = personalInfo.fullName ? personalInfo.fullName.replace(/\s+/g, '_') : 'my_cv';
    a.download = `${filenameBase}_cv_data.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        // Basic validation/shape check - apply only known keys
        if (parsed.personalInfo) setPersonalInfo(parsed.personalInfo);
        if (typeof parsed.summary === 'string') setSummary(parsed.summary);
        if (Array.isArray(parsed.experiences)) setExperiences(parsed.experiences);
        if (Array.isArray(parsed.educations)) setEducations(parsed.educations);
        if (Array.isArray(parsed.skills)) setSkills(parsed.skills);
        if (Array.isArray(parsed.languages)) setLanguages(parsed.languages);
        if (Array.isArray(parsed.socialLinks)) setSocialLinks(parsed.socialLinks);
        // Save imported data to localStorage too
        saveToLocalStorage();
        alert(t('cv.importSuccess') || 'Imported successfully');
      } catch (err) {
        console.error('Import failed:', err);
        alert(t('cv.importFailed') || 'Failed to import file. Is it a valid CV JSON?');
      }
    };
    reader.readAsText(file);
  };

  const openImportDialog = () => {
    if (importInputRef.current) importInputRef.current.click();
  };

  const onFileInputChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (!confirm(t('cv.confirmImport') || 'Importing will replace current data. Continue?')) {
        e.target.value = '';
        return;
      }
      handleImportFile(file);
    }
    // reset so same file can be selected again later
    e.target.value = '';
  };

  // --- existing CRUD helpers for experiences, educations, skills, languages, socialLinks ---
  const addExperience = () => {
    setExperiences([...experiences, {
      id: Date.now(),
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }]);
  };

  const updateExperience = (id, field, value) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const addEducation = () => {
    setEducations([...educations, {
      id: Date.now(),
      degree: '',
      institution: '',
      startDate: '',
      endDate: ''
    }]);
  };

  const updateEducation = (id, field, value) => {
    setEducations(educations.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id) => {
    setEducations(educations.filter(edu => edu.id !== id));
  };

  const addSkill = () => {
    setSkills([...skills, {
      id: Date.now(),
      name: '',
      level: 'intermediate'
    }]);
  };

  const updateSkill = (id, field, value) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const removeSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const addLanguage = () => {
    setLanguages([...languages, {
      id: Date.now(),
      name: '',
      proficiency: 'intermediate'
    }]);
  };

  const updateLanguage = (id, field, value) => {
    setLanguages(languages.map(lang => 
      lang.id === id ? { ...lang, [field]: value } : lang
    ));
  };

  const removeLanguage = (id) => {
    setLanguages(languages.filter(lang => lang.id !== id));
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, {
      id: Date.now(),
      platform: 'linkedin',
      url: ''
    }]);
  };

  const updateSocialLink = (id, field, value) => {
    setSocialLinks(socialLinks.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const removeSocialLink = (id) => {
    setSocialLinks(socialLinks.filter(link => link.id !== id));
  };

  const getSocialIcon = (platform) => {
    const icons = {
      linkedin: <Linkedin className="w-4 h-4" />,
      telegram: <Send className="w-4 h-4" />,
      github: <Github className="w-4 h-4" />,
      twitter: <Twitter className="w-4 h-4" />,
      instagram: <Instagram className="w-4 h-4" />,
      facebook: <Facebook className="w-4 h-4" />
    };
    return icons[platform] || <Globe className="w-4 h-4" />;
  };

  const downloadPDF = async () => {
    if (!personalInfo.fullName || !personalInfo.email) {
      alert(t('cv.fillAllFields'));
      return;
    }

    const wasPreviewShown = showPreview;
    setShowPreview(true);
    
    setTimeout(async () => {
      // CVPreview should support forwarding ref. If not, the ref will point to the wrapper element.
      const element = cvPreviewRef.current;
      if (!element) {
        alert(t('cv.previewMissing') || 'Preview not available for PDF generation.');
        return;
      }
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${personalInfo.fullName}_CV.pdf`);
      
      if (!wasPreviewShown) {
        setShowPreview(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 gradient-text">
            {t('cv.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {t('cv.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Local save / import / export controls */}
            <div className="glass-card p-4 animate-slide-up flex flex-wrap items-center gap-3">
              <button
                onClick={saveToLocalStorage}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-xl hover:shadow-lg transition-all"
                title={t('cv.saveLocal') || 'Save locally'}
              >
                💾 {t('cv.saveLocal') || 'Save'}
              </button>

              <button
                onClick={exportJSON}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl hover:shadow-lg transition-all"
                title={t('cv.export') || 'Export JSON'}
              >
                ⤓ {t('cv.export') || 'Export JSON'}
              </button>

              <button
                onClick={openImportDialog}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-xl hover:shadow-lg transition-all"
                title={t('cv.import') || 'Import JSON'}
              >
                ⤒ {t('cv.import') || 'Import JSON'}
              </button>

              <button
                onClick={() => clearSavedData(false)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:shadow-lg transition-all"
                title={t('cv.clearSaved') || 'Clear saved data'}
              >
                ✖ {t('cv.clearSaved') || 'Clear saved'}
              </button>

              <button
                onClick={() => clearSavedData(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-700 text-white rounded-xl hover:shadow-lg transition-all"
                title={t('cv.resetForm') || 'Clear saved and reset form'}
              >
                ♻ {t('cv.resetForm') || 'Reset form'}
              </button>

              <input
                ref={importInputRef}
                type="file"
                accept="application/json"
                onChange={onFileInputChange}
                style={{ display: 'none' }}
              />

              <div className="ml-auto text-sm text-gray-500">
                {t('cv.autoSaved') || 'Changes are auto-saved locally.'}
              </div>
            </div>

            {/* Personal Info */}
            <div className="glass-card p-6 animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">{t('cv.personalInfo')}</h2>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder={t('cv.fullName')}
                  value={personalInfo.fullName}
                  onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none transition-colors"
                />
                
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder={t('cv.email')}
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none transition-colors"
                  />
                  
                  <input
                    type="tel"
                    placeholder={t('cv.phone')}
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={t('cv.location')}
                    value={personalInfo.location}
                    onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none transition-colors"
                  />
                  
                  <input
                    type="url"
                    placeholder={t('cv.website')}
                    value={personalInfo.website}
                    onChange={(e) => setPersonalInfo({...personalInfo, website: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="glass-card p-6 animate-slide-up">
              <h2 className="text-2xl font-semibold mb-4">{t('cv.summary')}</h2>
              <textarea
                placeholder={t('cv.summaryPlaceholder')}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Social Links */}
            <div className="glass-card p-6 animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">{t('cv.socialLinks')}</h2>
                <button
                  onClick={addSocialLink}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  {t('cv.addSocialLink')}
                </button>
              </div>
              
              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <div key={link.id} className="flex gap-3">
                    <select
                      value={link.platform}
                      onChange={(e) => updateSocialLink(link.id, 'platform', e.target.value)}
                      className="px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
                    >
                      <option value="linkedin">{t('cv.linkedin')}</option>
                      <option value="telegram">{t('cv.telegram')}</option>
                      <option value="github">{t('cv.github')}</option>
                      <option value="twitter">{t('cv.twitter')}</option>
                      <option value="instagram">{t('cv.instagram')}</option>
                      <option value="facebook">{t('cv.facebook')}</option>
                    </select>
                    
                    <input
                      type="url"
                      placeholder="https://..."
                      value={link.url}
                      onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
                    />
                    
                    <button
                      onClick={() => removeSocialLink(link.id)}
                      className="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="glass-card p-6 animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold">{t('cv.experience')}</h2>
                </div>
                <button
                  onClick={addExperience}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  {t('cv.addExperience')}
                </button>
              </div>
              
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder={t('cv.jobTitle')}
                        value={exp.jobTitle}
                        onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                        className="px-4 py-2 rounded-lg border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder={t('cv.company')}
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        className="px-4 py-2 rounded-lg border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder={t('cv.startDate')}
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        className="px-4 py-2 rounded-lg border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder={t('cv.endDate')}
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        disabled={exp.current}
                        className="px-4 py-2 rounded-lg border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none disabled:opacity-50"
                      />
                    </div>
                    
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-sm">{t('cv.current')}</span>
                    </label>
                    
                    <textarea
                      placeholder={t('cv.description')}
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none resize-none"
                    />
                    
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      {t('cv.remove')}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="glass-card p-6 animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold">{t('cv.education')}</h2>
                </div>
                <button
                  onClick={addEducation}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  {t('cv.addEducation')}
                </button>
              </div>
              
              <div className="space-y-6">
                {educations.map((edu) => (
                  <div key={edu.id} className="p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder={t('cv.degree')}
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        className="px-4 py-2 rounded-lg border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder={t('cv.institution')}
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        className="px-4 py-2 rounded-lg border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder={t('cv.startDate')}
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                        className="px-4 py-2 rounded-lg border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder={t('cv.endDate')}
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                        className="px-4 py-2 rounded-lg border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      {t('cv.remove')}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="glass-card p-6 animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold">{t('cv.skills')}</h2>
                </div>
                <button
                  onClick={addSkill}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  {t('cv.addSkill')}
                </button>
              </div>
              
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex gap-3">
                    <input
                      type="text"
                      placeholder={t('cv.skillName')}
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
                    />
                    
                    <select
                      value={skill.level}
                      onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                      className="px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
                    >
                      <option value="beginner">{t('cv.beginner')}</option>
                      <option value="intermediate">{t('cv.intermediate')}</option>
                      <option value="advanced">{t('cv.advanced')}</option>
                      <option value="expert">{t('cv.expert')}</option>
                    </select>
                    
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="glass-card p-6 animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Languages className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold">{t('cv.languages')}</h2>
                </div>
                <button
                  onClick={addLanguage}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  {t('cv.addLanguage')}
                </button>
              </div>
              
              <div className="space-y-4">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex gap-3">
                    <input
                      type="text"
                      placeholder={t('cv.language')}
                      value={lang.name}
                      onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
                    />
                    
                    <select
                      value={lang.proficiency}
                      onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
                      className="px-4 py-3 rounded-xl border-2 border-pink-200 dark:border-pink-900 bg-white/50 dark:bg-gray-800/50 focus:border-primary focus:outline-none"
                    >
                      <option value="beginner">{t('cv.beginner')}</option>
                      <option value="intermediate">{t('cv.intermediate')}</option>
                      <option value="advanced">{t('cv.advanced')}</option>
                      <option value="expert">{t('cv.expert')}</option>
                    </select>
                    
                    <button
                      onClick={() => removeLanguage(lang.id)}
                      className="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
              >
                <Eye className="w-5 h-5" />
                {t('cv.preview')}
              </button>
              
              <button
                onClick={downloadPDF}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary to-pink-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
              >
                <Download className="w-5 h-5" />
                {t('cv.download')}
              </button>
            </div>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="lg:sticky lg:top-24 h-fit">
              <CVPreview
                ref={cvPreviewRef}
                personalInfo={personalInfo}
                summary={summary}
                experiences={experiences}
                educations={educations}
                skills={skills}
                languages={languages}
                socialLinks={socialLinks}
                t={t}
                getSocialIcon={getSocialIcon}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}