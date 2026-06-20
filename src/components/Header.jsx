import { Link } from 'react-router-dom';
import React, { useState } from 'react'
import translations from '../i18n/translations'

function Header({ user, onLogout, theme, toggleTheme, lang, setLanguage }) {
  const [uiState, setUiState] = useState({
    isDropdownOpen: false,
    likes: 1
  });
  const t = translations[lang] || translations.en

  const [formState, setFormState] = useState({
    showFeedback: false,
    name: '',
    email: '',
    message: ''
  });

  const handleIncrement = () => {
    setUiState(prev => ({ ...prev, likes: prev.likes + 1 }));
  };

  const handleDecrement = () => {
    if (uiState.likes > 0) {
      setUiState(prev => ({ ...prev, likes: prev.likes - 1 }));
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formState;
    if (!message.trim() || !name.trim() || !email.trim()) return;
    
    alert(`Thank you ${name}!\nFeedback received from: ${email}\nMessage: "${message}"`);
    
    setFormState({
      showFeedback: false,
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div>
      
      {/* --- DESKTOP NAVBAR --- */}
      <nav className="hidden lg:block bg-[#0b132b]/80 border-b border-white/5 py-4 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 flex justify-between items-center relative">
          
          {/* Logo brand configuration */}
          <a className="text-2xl font-black tracking-tight text-white hover:opacity-90 flex items-center gap-2 no-underline transition-opacity" href="#">
            <span className="text-cyan-400 text-2xl drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">☀️</span> 
            <span>Sky<span className="text-cyan-400">Cast</span></span>
          </a>
          
          <div className="flex items-center grow justify-center">
            <ul className="flex items-center gap-7 list-none m-0 p-0">
              <li>
                {/* Home Link */}
                <Link className="group text-sm font-semibold text-white no-underline flex items-center gap-1.5 transition-all duration-300 hover:text-cyan-400 hover:scale-105" to="/">
                  <span className="transition-transform duration-300 group-hover:rotate-12">🏠</span> <span>{t.home}</span>
                </Link>
              </li>
              <li>
                {/* Live Radar Link */}
                <Link className="group text-sm font-medium text-white/60 no-underline flex items-center gap-1.5 transition-all duration-300 hover:text-cyan-400 hover:scale-105" to="/radar">
                  <span className="transition-transform duration-300 group-hover:animate-pulse">📡</span> <span>{t.radar}</span>
                </Link>
              </li>
              <li>
                {/* Hourly Forecast Link */}
                <Link className="group text-sm font-medium text-white/60 no-underline flex items-center gap-1.5 transition-all duration-300 hover:text-cyan-400 hover:scale-105" to="/hourly">
                  <span className="transition-transform duration-300 group-hover:scale-120">⏰</span> <span>{t.hourly}</span>
                </Link>
              </li>
              <li>
                {/* Contact Link */}
                <Link className="group text-sm font-medium text-white/60 no-underline flex items-center gap-1.5 transition-all duration-300 hover:text-cyan-400 hover:scale-105" to="/contact">
                  <span className="transition-transform duration-300 group-hover:-translate-y-0.5">✉️</span> <span>{t.contact}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Settings Button */}
            <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="hidden sm:inline text-xl text-white/70">Hi, {user.name.split(' ')[0]}</span>
              </>
            ) : (
              <>
                <Link to="/login" className="text-xs font-semibold text-white/90 hover:text-cyan-400 transition">{t.login}</Link>
                <Link to="/register" className="text-xs font-semibold text-white/90 hover:text-cyan-400 transition">{t.register}</Link>
              </>
            )}

            <div className="relative">
            {/* Quick theme toggle icon */}
              <button 
                onClick={() => setUiState(p => ({ ...p, isDropdownOpen: !p.isDropdownOpen }))}
                className="bg-white/5 hover:bg-white/10 text-white/90 border border-white/10 px-4 py-2 rounded-full text-xs font-bold tracking-wide flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                ⚙️ {t.settings} <span className="text-[10px] text-white/40">▼</span>
              </button>

              {uiState.isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-[#1c2541]/95 border border-white/10 rounded-2xl shadow-2xl p-1.5 z-50 backdrop-blur-xl animate-fadeIn flex flex-col gap-0.5">
                  <div className="text-[10px] text-white/40 uppercase font-black px-2.5 py-1 tracking-wider">{t.settings}</div>
                  <button
                    onClick={() => { toggleTheme('light'); setUiState(p => ({ ...p, isDropdownOpen: false })); }}
                    className={"w-full text-left px-2.5 py-2 text-xs font-semibold rounded-xl hover:bg-white/5 text-white/80 border-0 bg-transparent cursor-pointer transition-colors " + (theme === 'light' ? 'text-cyan-400' : '')}
                  >
                    ☀️ {t.lightMode}
                  </button>
                  <button
                    onClick={() => { toggleTheme('dark'); setUiState(p => ({ ...p, isDropdownOpen: false })); }}
                    className={"w-full text-left px-2.5 py-2 text-xs font-bold rounded-xl hover:bg-white/5 border-0 bg-transparent cursor-pointer transition-colors flex items-center justify-between " + (theme === 'dark' ? 'text-cyan-400' : 'text-white/80')}
                  >
                    <span>🌙 {t.darkMode}</span>
                    {theme === 'dark' && <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>}
                  </button>
                  <div className="border-t border-white/5 my-1"></div>
                  <div className="text-[10px] text-white/40 uppercase font-black px-2.5 py-1 tracking-wider">{t.changeLanguage}</div>
                  <div className="px-2.5 py-1 flex gap-2">
                    <button onClick={() => { setLanguage('en'); setUiState(p => ({ ...p, isDropdownOpen: false })); }} className={"px-2 py-1 rounded text-xs " + (lang==='en' ? 'bg-white/10 text-white' : 'text-white/80')}>EN</button>
                    <button onClick={() => { setLanguage('ur'); setUiState(p => ({ ...p, isDropdownOpen: false })); }} className={"px-2 py-1 rounded text-xs " + (lang==='ur' ? 'bg-white/10 text-white' : 'text-white/80')}>اردو</button>
                    <button onClick={() => { setLanguage('roman'); setUiState(p => ({ ...p, isDropdownOpen: false })); }} className={"px-2 py-1 rounded text-xs " + (lang==='roman' ? 'bg-white/10 text-white' : 'text-white/80')}>Roman</button>
                  </div>
                  <div className="border-t border-white/5 my-1"></div>
                  <div className="text-[10px] text-white/40 uppercase font-black px-2.5 py-1 tracking-wider">{t.developerModule}</div>
                  <button
                  onClick={onLogout}
                  className="bg-white/5 hover:bg-white/10 text-white/90 border border-white/10 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer shadow-sm"
                >
                  {t.logout}
                </button>
                  <button onClick={() => alert('Created with ❤️ by Kumail Abbas')} className="w-full text-left px-2.5 py-2 text-xs font-semibold rounded-xl hover:bg-white/5 text-white/80 border-0 bg-transparent cursor-pointer transition-colors">🚀 {t.whoMadeThis}</button>
                  <button 
                    onClick={() => { setFormState(p => ({ ...p, showFeedback: true })); setUiState(p => ({ ...p, isDropdownOpen: false })); }}
                    className="bg-white/5 hover:bg-white/10 text-white/90 border border-white/10 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer shadow-sm"
                  >
                    💬 {t.giveFeedback}
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </nav>

      {/* --- MOBILE TOP HEADER --- */}
      {/* 💡 Mobile background ko bhi exact matching matching bg-[#0b132b]/80 de dia hai */}
      <div className="block lg:hidden border-b border-white/5 bg-[#0b132b]/80 backdrop-blur-xl py-3 px-4 sticky top-0 z-50">
        <div className="flex justify-between items-center relative">
          <h4 className="font-black text-white text-lg tracking-tight m-0">
            ☀️ Sky<span className="text-cyan-400">Cast</span>
          </h4>
          {user ? (
              <>
                <span className="hidden sm:inline text-xl text-white/70">Hi, {user.name.split(' ')[0]}</span>
              </>
            ) : (
              <>
                <Link to="/login" className="text-xs font-semibold text-white/90 hover:text-cyan-400 transition">{t.login}</Link>
                <Link to="/register" className="text-xs font-semibold text-white/90 hover:text-cyan-400 transition">{t.register}</Link>
              </>
            )}
          <div>
            <button 
              onClick={() => setUiState(p => ({ ...p, isDropdownOpen: !p.isDropdownOpen }))}
              className="text-white/80 text-base bg-white/5 p-2.5 rounded-full flex items-center justify-center border border-white/10 cursor-pointer transition-colors hover:bg-white/10"
            >
              ⚙️
            </button>

            {uiState.isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-[#1c2541]/95 border border-white/10 rounded-2xl shadow-2xl p-1.5 z-50 backdrop-blur-xl flex flex-col gap-0.5">
                <div className="text-[10px] text-white/40 uppercase font-black px-2.5 py-1">{t.theme}</div>
                <button onClick={() => { toggleTheme('light'); setUiState(p => ({ ...p, isDropdownOpen: false })); }} className={"w-full text-left px-2.5 py-2 text-xs rounded-xl hover:bg-white/5 border-0 bg-transparent " + (theme === 'light' ? 'text-cyan-400' : 'text-white/80')}>☀️ {t.lightMode}</button>
                <button onClick={() => { toggleTheme('dark'); setUiState(p => ({ ...p, isDropdownOpen: false })); }} className={"w-full text-left px-2.5 py-2 text-xs font-bold rounded-xl hover:bg-white/5 " + (theme === 'dark' ? 'text-cyan-400' : 'text-white/80')}>🌙 {t.darkMode}</button>
                <div className="border-t border-white/5 my-1"></div>
                <div className="text-[10px] text-white/40 uppercase font-black px-2.5 py-1">{t.language}</div>
                <button onClick={() => alert('Language Coming Soon!')} className="w-full text-left px-2.5 py-2 text-xs rounded-xl hover:bg-white/5 text-white/80 border-0 bg-transparent">🌐 {t.changeLanguage}</button>
                <div className="border-t border-white/5 my-1"></div>
                <button
                  onClick={onLogout}
                  className="bg-white/5 hover:bg-white/10 text-white/90 border border-white/10 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer shadow-sm"
                >
                  {t.logout}
                </button>
                <button onClick={() => alert('Created with ❤️ by Kumail Abbas')} className="w-full text-left px-2.5 py-2 text-xs rounded-xl hover:bg-white/5 text-white/80 border-0 bg-transparent">🚀 {t.whoMadeThis}</button>
                <button 
                  onClick={() => { setFormState(p => ({ ...p, showFeedback: true })); setUiState(p => ({ ...p, isDropdownOpen: false })); }}
                  className="bg-white/5 hover:bg-white/10 text-white/90 border border-white/10 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer shadow-sm"
                >
                  💬 {t.giveFeedback}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔥 MODAL FEEDBACK FORM COMPONENT */}
      {formState.showFeedback && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 px-4 animate-fadeIn">
          <div className="bg-[#1c2541] border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
            
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-black text-white flex items-center gap-2 m-0 uppercase tracking-wide">
                <span className="text-lg">💬</span> {t.shareFeedback}
              </h3>
              <button 
                onClick={() => setFormState(p => ({ ...p, showFeedback: false }))}
                className="text-white/40 hover:text-white bg-white/5 hover:bg-white/10 h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer border-0 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-1.5">{t.fullName}</label>
                <input 
                  type="text"
                  required
                  placeholder="Kumail Abbas"
                  className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder-white/20"
                  value={formState.name}
                  onChange={(e) => setFormState(p => ({ ...p, name: e.target.value }))}
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-1.5">{t.emailAddress}</label>
                <input 
                  type="email"
                  required
                  placeholder={t.placeholderEmail}
                  className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder-white/20"
                  value={formState.email}
                  onChange={(e) => setFormState(p => ({ ...p, email: e.target.value }))}
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-1.5">{t.feedbackMessage}</label>
                <textarea 
                  required
                  rows="3"
                  placeholder={t.placeholderMessage}
                  className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder-white/20 resize-none"
                  value={formState.message}
                  onChange={(e) => setFormState(p => ({ ...p, message: e.target.value }))}
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-2">
                <button 
                  type="button"
                  onClick={() => setFormState(p => ({ ...p, showFeedback: false }))}
                  className="px-4 py-2 text-xs font-bold text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer border-0"
                >
                  {t.cancel}
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-xs font-black text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all cursor-pointer shadow-md border-0"
                >
                  {t.submitReview}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}


      {/* --- MOBILE BOTTOM NAVIGATION BAR --- */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0b132b]/80 border-t border-white/5 py-2 backdrop-blur-lg z-50 px-4">
        <div className="flex justify-around items-center">
          
          {/* Mobile Home */}
          <Link to="/" className="flex flex-col items-center gap-1 text-cyan-400 no-underline transition-all duration-300 hover:scale-110 active:scale-95">
            <span className="text-xl drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">🏠</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">{t.home}</span>
          </Link>

          {/* Mobile Radar */}
          <Link to="/radar" className="flex flex-col items-center gap-1 text-white/50 no-underline transition-all duration-300 hover:text-cyan-400 hover:scale-110 active:scale-95 group">
            <span className="text-xl group-hover:animate-pulse">📡</span>
            <span className="text-[10px] font-medium uppercase tracking-wider">{t.radar}</span>
          </Link>

          {/* Mobile Hourly */}
          <Link to="/hourly" className="flex flex-col items-center gap-1 text-white/50 no-underline transition-all duration-300 hover:text-cyan-400 hover:scale-110 active:scale-95 group">
            <span className="text-xl group-hover:scale-110 transition-transform">⏰</span>
            <span className="text-[10px] font-medium uppercase tracking-wider">{t.hourly}</span>
          </Link>

          {/* Mobile History */}
          <Link to="/history" className="flex flex-col items-center gap-1 text-white/50 no-underline transition-all duration-300 hover:text-cyan-400 hover:scale-110 active:scale-95 group">
            <span className="text-xl group-hover:-translate-y-1 transition-transform">📜</span>
            <span className="text-[10px] font-medium uppercase tracking-wider">{t.history || 'History'}</span>
          </Link>

        </div>
      </div>

    </div>
  )
}

export default Header