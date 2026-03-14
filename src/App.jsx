import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MoodTracking from './pages/MoodTracking';
import AnonymousWall from './pages/AnonymousWall';
import Chatbot from './pages/Chatbot';
import MotivationalStories from './pages/MotivationalStories';
import Resources from './pages/Resources';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <Navbar />

      <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle Theme">
        {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      <div className="page-content" style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mood" element={<MoodTracking />} />
          <Route path="/share" element={<AnonymousWall />} />
          <Route path="/chat" element={<Chatbot />} />
          <Route path="/motivational-stories" element={<MotivationalStories />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;