import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

const defaultUser = {
  name: '',
  email: '',
  age: '',
  city: '',
  interests: [],
  profileImage: '',
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ayti_qizlar_user');
    return saved ? JSON.parse(saved) : defaultUser;
  });

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('ayti_qizlar_progress');
    return saved ? JSON.parse(saved) : {
      watchedVideos: {},
      overallProgress: 0,
      badges: []
    };
  });

  useEffect(() => {
    localStorage.setItem('ayti_qizlar_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ayti_qizlar_progress', JSON.stringify(progress));
  }, [progress]);

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const updateProgress = (videoId, percentage) => {
    setProgress(prev => {
      const newWatchedVideos = {
        ...prev.watchedVideos,
        [videoId]: percentage
      };
      
      const totalVideos = Object.keys(newWatchedVideos).length;
      const totalProgress = Object.values(newWatchedVideos).reduce((sum, val) => sum + val, 0);
      const overallProgress = totalVideos > 0 ? Math.round(totalProgress / 10) : 0;
      
      return {
        ...prev,
        watchedVideos: newWatchedVideos,
        overallProgress
      };
    });
  };

  const addBadge = (badge) => {
    setProgress(prev => ({
      ...prev,
      badges: prev.badges.includes(badge) ? prev.badges : [...prev.badges, badge]
    }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser, progress, updateProgress, addBadge }}>
      {children}
    </UserContext.Provider>
  );
};
