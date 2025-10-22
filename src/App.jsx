import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { UserProvider } from './contexts/UserContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Learn from './pages/Learn';
import VideoPlayer from './pages/VideoPlayer';
import CVBuilder from './pages/CVBuilder';
import Meetups from './pages/Meetups';
import Forum from './pages/Forum';
import Inspiration from './pages/Inspiration';
import Safety from './pages/Safety';
import Community from './pages/Community';
import Events from './pages/Events';
import Profile from './pages/Profile';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <UserProvider>
          <Router>
            <div className="min-h-screen bg-primary-light dark:bg-gray-900 transition-colors">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/learn/:courseId" element={<VideoPlayer />} />
                <Route path="/cv-builder" element={<CVBuilder />} />
                <Route path="/meetups" element={<Meetups />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/inspiration" element={<Inspiration />} />
                <Route path="/safety" element={<Safety />} />
                <Route path="/community" element={<Community />} />
                <Route path="/events" element={<Events />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </Router>
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
