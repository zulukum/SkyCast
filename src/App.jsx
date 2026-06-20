import React, { useMemo, useState } from 'react'
import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import BackgroundAudio from './components/BackgroundAudio';
import Home from './Pages/Home';
import Radar from './Pages/Radar';
import Hourly from './Pages/Hourly';
import History from './Pages/History';
import News from './Pages/News';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ForgotPassword from './Pages/ForgotPassword';
import { getAuthUser, clearAuthUser } from './utils/auth';

function App() {
  const [user, setUser] = useState(getAuthUser());
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'dark'
    } catch (e) {
      return 'dark'
    }
  })

  React.useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') root.classList.add('light')
    else root.classList.remove('light')
    try { localStorage.setItem('theme', theme) } catch (e) {}
  }, [theme])
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('lang') || 'en' } catch (e) { return 'en' }
  })

  React.useEffect(() => {
    try { localStorage.setItem('lang', lang) } catch (e) {}
  }, [lang])

  // RTL support for Urdu
  React.useEffect(() => {
    const root = document.documentElement
    const isRTL = lang === 'ur'
    root.dir = isRTL ? 'rtl' : 'ltr'
    root.lang = lang
    // Optional: add a class for extra RTL styling
    if (isRTL) {
      root.classList.add('rtl')
    } else {
      root.classList.remove('rtl')
    }
  }, [lang])

  const location = useLocation();

  const hideLayout = useMemo(
    () => location.pathname === '/login' || location.pathname === '/register',
    [location.pathname]
  );

  const handleLogout = () => {
    clearAuthUser();
    setUser(null);
  };

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  const PublicRoute = ({ children }) => {
    return user ? <Navigate to="/" replace /> : children;
  };

  const toggleTheme = (t) => setTheme(t || (theme === 'dark' ? 'light' : 'dark'))
  const setLanguage = (l) => setLang(l)

  return (
    <div className={`app-bg min-h-screen flex flex-col ${theme === 'light' ? 'text-slate-950' : 'text-white'}`}>
      <BackgroundAudio />
      {!hideLayout && <Header user={user} onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} lang={lang} setLanguage={setLanguage} />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home theme={theme} language={lang} /></ProtectedRoute>} />
          <Route path="/radar" element={<ProtectedRoute><Radar theme={theme} language={lang} /></ProtectedRoute>} />
          <Route path="/hourly" element={<ProtectedRoute><Hourly language={lang} /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History language={lang} /></ProtectedRoute>} />
          <Route path="/news" element={<ProtectedRoute><News language={lang} theme={theme} /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact language={lang} theme={theme} /></ProtectedRoute>} />
          <Route path="/login" element={<PublicRoute><Login setUser={setUser} /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register setUser={setUser} /></PublicRoute>} />
          <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
          <Route path="*" element={<Navigate to={user ? '/' : '/login'} replace />} />
        </Routes>
      </main>

      {!hideLayout && <Footer theme={theme} />}
    </div>
  )
}

export default App