# 🩷 Aytı Qizlar - IT Girls Platform

A modern, multilingual platform designed for girls to learn IT, participate in masterclasses, connect with community, and access safety resources.

## 🚀 Features

### 1. **Learn IT Section (Aytini o'rganaman)**
- 10 professional video courses covering HTML, CSS, JavaScript, React, Python, Git, UI/UX, SQL, Figma, and Freelancing
- Progress tracking with percentage-based completion
- Badge system - earn badges upon completing courses
- Filter by level (Beginner, Intermediate, Advanced) and category
- Video player with progress bar

### 2. **Meetups & Events**
- Register for offline and online events
- Anonymous participation option with auto-generated pseudonyms
- Telegram notification integration (mock)
- Filter events by type (Online/Offline)
- Countdown for upcoming events

### 3. **Q&A Forum**
- Ask questions and get answers from the community
- Like/Dislike system
- Comment on questions
- Anonymous posting option
- LocalStorage-based (data persists until page refresh)

### 4. **Inspiration Section**
- Success stories from girls in IT
- Like and share functionality
- Stories from various companies (Google, Yandex, Uzbekistan Airways, EPAM, etc.)

### 5. **Safety Center**
- Digital safety topics covering:
  - Card security
  - Telegram safety
  - Phishing protection
  - Strong passwords
  - Two-factor authentication
  - Public Wi-Fi safety
- Search and filter by category
- Problem-Solution format

### 6. **Community**
- Share thoughts and questions
- Like posts
- Anonymous posting with pseudonyms
- Real-time updates (LocalStorage-based)

### 7. **Profile**
- User information management
- Profile picture upload (Base64)
- Learning progress visualization
- Badge collection display
- Course completion tracking

### 8. **Multilingual Support**
- 3 languages: 🇺🇿 Uzbek, 🇷🇺 Russian, 🇬🇧 English
- Seamless language switching without page refresh
- Full translation coverage

### 9. **Dark/Light Mode**
- Theme toggle
- Persists preference in localStorage
- Smooth transitions

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: TailwindCSS + Custom CSS
- **State Management**: React Context API
- **Storage**: localStorage (no backend)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Internationalization**: React Intl
- **Routing**: React Router DOM

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## 🎨 Design System

### Color Palette
- **Primary Pink**: #FFB6C1
- **Primary Purple**: #7C3AED
- **Light Background**: #F9F9FB
- **Dark Background**: #1A1A1D

### Responsive Design
- Fully responsive from 320px to 1440px
- Mobile-first approach
- Adaptive layouts for all screen sizes

### Animation Philosophy
- Smooth and subtle animations
- Framer Motion for complex transitions
- CSS transitions for simple effects
- Hover states for interactive elements

## 📁 Project Structure

```
ayti-qizlar/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── MasterclassCard.jsx
│   │   └── EventCard.jsx
│   ├── contexts/
│   │   ├── ThemeContext.jsx
│   │   ├── LanguageContext.jsx
│   │   └── UserContext.jsx
│   ├── data/
│   │   ├── courses.js
│   │   ├── events.js
│   │   ├── inspirations.js
│   │   └── safety.js
│   ├── locales/
│   │   ├── uz.json
│   │   ├── ru.json
│   │   └── en.json
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Learn.jsx
│   │   ├── VideoPlayer.jsx
│   │   ├── Meetups.jsx
│   │   ├── Forum.jsx
│   │   ├── Inspiration.jsx
│   │   ├── Safety.jsx
│   │   ├── Community.jsx
│   │   ├── Events.jsx
│   │   └── Profile.jsx
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 💾 Data Storage

All data is stored in browser's localStorage with the following keys:
- `ayti_qizlar_theme` - Theme preference (dark/light)
- `ayti_qizlar_locale` - Selected language
- `ayti_qizlar_user` - User profile data
- `ayti_qizlar_progress` - Course progress and badges
- `ayti_qizlar_meetups` - Meetup registrations
- `ayti_qizlar_forum` - Forum questions and answers
- `ayti_qizlar_community` - Community posts

⚠️ **Note**: Data will be lost on page refresh for forum and community sections (as per requirements).

## 🌟 Key Features Explained

### Progress Tracking
- Automatically tracks video watch progress
- Updates every 10% completion
- Syncs with localStorage
- Visual progress bars

### Badge System
- Awarded upon 100% course completion
- Displayed in profile
- Each course has unique badge
- Motivational feedback

### Anonymous Mode
- Generates unique pseudonyms (e.g., "SmartCoder#123")
- Available in meetups, forum, and community
- Privacy-first approach

### Telegram Integration (Mock)
- Simulated notification system
- Logs to console for development
- Can be connected to real Telegram bot

## 📱 Responsive Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Large Desktop: 1440px+

## 🎯 Future Enhancements

- Real backend integration
- Real-time chat functionality
- Video upload capability
- Certificate generation
- Payment integration for paid courses
- Email notifications
- Social media integration

## 👩‍💻 Developer Notes

This is a frontend-only application designed to demonstrate a complete platform without backend dependencies. All interactions are client-side and data persists in localStorage.

---

**Built with ❤️ for IT Girls in Uzbekistan**
