
import { useEffect, useState } from 'react';
import './App.css';
import Chatbot from './components/Chatbot';
import HeroPage from './components/HeroPage';

function App() {
  const [theme, setTheme] = useState('light');
  const [showChatWindow, setShowChatWindow] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(preferDark ? 'dark' : 'light');
    }
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };


  return (
    <div className={`app ${theme}`}>
      <div className="theme-toggle-container">
        <input
          type="checkbox"
          id="theme-toggle"
          className="theme-toggle-checkbox"
          onChange={toggleTheme}
          checked={theme === 'dark'}
        />
        <label htmlFor="theme-toggle" className="theme-toggle-label">
          <span className="theme-toggle-slider">
            {theme === 'light' ? '☀️' : '🌙'}
          </span>
        </label>
      </div>
      <HeroPage theme={theme} setShowChatWindow={setShowChatWindow} />
      <Chatbot showChatWindow={showChatWindow} setShowChatWindow={setShowChatWindow} />
    </div>
  );
}

export default App;





