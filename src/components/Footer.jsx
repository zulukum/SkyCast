import { Link } from 'react-router-dom';
import React from 'react';
import { CloudSun, Heart } from 'lucide-react';

const Footer = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';

  return (
    <footer className={`w-full ${isLight ? 'bg-slate-50 border-t border-slate-200/60 text-slate-700' : 'bg-[#0b132b]/40 border-t border-white/5 text-white'} backdrop-blur-md pt-12 pb-24 md:pb-12 relative mt-auto`}>
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[150px] w-[300px] rounded-full ${isLight ? 'bg-cyan-500/5' : 'bg-cyan-500/5'} blur-[80px] pointer-events-none`} />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          <div className="md:col-span-5 space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <CloudSun className="text-cyan-400" size={40} />
              <span className="font-black text-lg tracking-wider bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                SKYCAST
              </span>
            </div>
            <p className={`text-xs max-w-sm mx-auto md:mx-0 leading-relaxed ${isLight ? 'text-slate-500' : 'text-white/40'}`}>
              Next-generation meteorological dashboard delivering hyper-local precision analytics and advanced atmospheric tracking with modern UI setups.
            </p>
          </div>

          <div className="md:col-span-4 text-center md:text-left space-y-3">
            <h4 className={`text-[10px] font-black uppercase tracking-widest ${isLight ? 'text-cyan-600/80' : 'text-cyan-400/70'}`}>
              Platform Matrix
            </h4>
            <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto md:mx-0">
              <Link to="/" className={`text-xs no-underline transition-colors py-0.5 ${isLight ? 'text-slate-600 hover:text-cyan-600' : 'text-white/50 hover:text-cyan-400'}`}>Home</Link>
              <Link to="/radar" className={`text-xs no-underline transition-colors py-0.5 ${isLight ? 'text-slate-600 hover:text-cyan-600' : 'text-white/50 hover:text-cyan-400'}`}>Radar</Link>
              <Link to="/hourly" className={`text-xs no-underline transition-colors py-0.5 ${isLight ? 'text-slate-600 hover:text-cyan-600' : 'text-white/50 hover:text-cyan-400'}`}>Hourly</Link>
              <Link to="/history" className={`text-xs no-underline transition-colors py-0.5 ${isLight ? 'text-slate-600 hover:text-cyan-600' : 'text-white/50 hover:text-cyan-400'}`}>History</Link>
              <Link to="/news" className={`text-xs no-underline transition-colors py-0.5 ${isLight ? 'text-slate-600 hover:text-cyan-600' : 'text-white/50 hover:text-cyan-400'}`}>News</Link>
              <Link to="/contact" className={`text-xs no-underline transition-colors py-0.5 ${isLight ? 'text-slate-600 hover:text-cyan-600' : 'text-white/50 hover:text-cyan-400'}`}>Contact</Link>
            </div>
          </div>

          <div className="md:col-span-3 text-center md:text-right space-y-3">
            <h4 className={`text-[10px] font-black uppercase tracking-widest ${isLight ? 'text-slate-500' : 'text-white/40'}`}>
              Developer Node
            </h4>
            <div className="flex justify-center md:justify-end gap-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className={`transition-all text-lg ${isLight ? 'text-slate-500 hover:text-slate-900' : 'text-white/40 hover:text-white'}`}>
                🐙
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className={`transition-all text-lg ${isLight ? 'text-slate-500 hover:text-cyan-600' : 'text-white/40 hover:text-cyan-400'}`}>
                𝕏
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={`transition-all text-lg ${isLight ? 'text-slate-500 hover:text-indigo-600' : 'text-white/40 hover:text-indigo-400'}`}>
                💼
              </a>
            </div>
            <p className={`text-[10px] font-mono uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-white/30'}`}>
              Sys_Ver: 4.0.0-Live
            </p>
          </div>

        </div>

        <div className={`pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left ${isLight ? 'border-t border-slate-200/60' : 'border-t border-white/5'}`}>
          <p className={`text-[11px] font-medium ${isLight ? 'text-slate-500' : 'text-white/30'}`}>
            © {new Date().getFullYear()} SkyCast Labs. All atmospheric telemetry reserved.
          </p>
          <p className={`text-[11px] flex items-center gap-1 font-medium justify-center ${isLight ? 'text-slate-500' : 'text-white/30'}`}>
            Crafted with <Heart size={10} className="text-red-500/70 fill-red-500/20 animate-pulse" /> for elite web UI performance.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

