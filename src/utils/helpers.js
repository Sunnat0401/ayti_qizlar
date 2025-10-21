// Generate anonymous pseudonym
export const generatePseudonym = () => {
  const adjectives = ['Smart', 'Creative', 'Talented', 'Brilliant', 'Skilled', 'Amazing', 'Wonderful', 'Fantastic'];
  const nouns = ['Coder', 'Designer', 'Developer', 'Engineer', 'Creator', 'Builder', 'Maker', 'Programmer'];
  const number = Math.floor(Math.random() * 999) + 1;
  
  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  
  return `${randomAdj}${randomNoun}#${number}`;
};

// Format date
export const formatDate = (dateString, locale = 'uz') => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  
  const localeMap = {
    uz: 'uz-UZ',
    ru: 'ru-RU',
    en: 'en-US'
  };
  
  return date.toLocaleDateString(localeMap[locale] || 'uz-UZ', options);
};

// Save to localStorage with error handling
export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// Get from localStorage with error handling
export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

// Show toast notification
export const showToast = (message, type = 'info') => {
  // Simple toast notification - can be enhanced with a library
  const toast = document.createElement('div');
  toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white z-50 animate-slide-up ${
    type === 'success' ? 'bg-green-500' : 
    type === 'error' ? 'bg-red-500' : 
    'bg-blue-500'
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
};

// Check if event is upcoming
export const isUpcoming = (dateString) => {
  const eventDate = new Date(dateString);
  const now = new Date();
  return eventDate > now;
};

// Calculate days until event
export const daysUntilEvent = (dateString) => {
  const eventDate = new Date(dateString);
  const now = new Date();
  const diffTime = eventDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Validate phone number (Uzbekistan format)
export const validatePhone = (phone) => {
  const phoneRegex = /^(\+998)?[0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Validate email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
