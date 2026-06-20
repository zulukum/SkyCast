import React, { useState, useEffect } from 'react';
import { geocodeLocation, getCurrentWeather } from '../utils/weatherAPI';

const stats = [
  { label: 'Realtime updates', value: 'Every 5s' },
  { label: 'Global nodes', value: '1,240+' },
  { label: 'Uptime', value: '99.98%' }
];

const Hero = ({ theme, language, onWeatherUpdate, forcedCity, clearForcedCity }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [liveWeather, setLiveWeather] = useState({
    temp: 26,
    description: 'Clear Skies',
    location: 'Karachi, PK',
    windSpeed: '15 km/h',
    humidity: '65%',
    pressure: '1012 hPa',
    icon: '☀️'
  });
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Jab user niche kisi popular destination par click karega
  useEffect(() => {
    if (forcedCity) {
      triggerFetch(forcedCity);
      clearForcedCity(); // Reset taake dobara click par chale
    }
  }, [forcedCity]);

  const triggerFetch = async (targetCity) => {
    setSearchLoading(true);
    try {
      const geo = await geocodeLocation(targetCity);
      const weather = await getCurrentWeather(geo.lat, geo.lon);
      
      const updated = {
        ...weather,
        location: `${geo.name}${geo.country ? ', ' + geo.country : ''}`
      };
      
      setLiveWeather(updated);
      if (onWeatherUpdate) {
        onWeatherUpdate(updated);
      }
    } catch (err) {
      alert(err.message || 'Location fetch failed.');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    triggerFetch(searchQuery);
    setSearchQuery('');
  };

  const panels = [
    { title: 'Wind Speed', value: liveWeather.windSpeed || '15 km/h', subtitle: 'Steady stream' },
    { title: 'Humidity', value: liveWeather.humidity || '65%', subtitle: 'Comfort index' },
    { title: 'Air Pressure', value: liveWeather.pressure || '1012 hPa', subtitle: 'Atmospheric level' }
  ];

  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-[#0b132b] py-20 md:py-24 text-white">
      <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute right-0 top-16 h-[260px] w-[260px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/70 backdrop-blur-xl shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.35)]"></span>
              <span>Live • {currentTime}</span>
            </div>

            <div className="max-w-3xl space-y-6">
              <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-tight sm:leading-[1.02]">
                Bring your <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-400 bg-clip-text text-transparent">weather dashboard</span> into the future.
              </h1>
              <p className="text-lg text-white/70 max-w-2xl">
                SkyCast combines precision forecasts, atmospheric intelligence and instant alerts in one sleek interface.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1.25fr_auto] items-center">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative flex items-center rounded-full border border-white/10 bg-slate-950/20 p-1.5 shadow-[0_20px_80px_rgba(15,23,42,0.25)] backdrop-blur-xl">
                  <span className="pl-4 text-2xl">🔍</span>
                  <input
                    type="text"
                    placeholder={searchLoading ? "Synchronizing satellite links..." : "Search location, station or node..."}
                    className="w-full bg-transparent border-0 py-3 pl-4 pr-4 text-sm text-white placeholder-white/30 focus:outline-none"
                    value={searchQuery}
                    disabled={searchLoading}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="rounded-full bg-cyan-400 px-6 py-3 text-xs font-black uppercase tracking-[0.22em] text-slate-950 transition hover:bg-cyan-300">
                    {searchLoading ? "..." : "Track"}
                  </button>
                </div>
              </form>
              <button className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                SkyCast Pro
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-xl transition hover:border-cyan-400/40">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/50">{stat.label}</p>
                  <p className="mt-3 text-2xl font-black text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className={`relative overflow-hidden rounded-[40px] border ${theme === 'light' ? 'border-slate-200/70 bg-white/95 text-slate-950' : 'border-white/10 bg-white/10 text-white'} p-8 shadow-2xl backdrop-blur-xl`}>
              <div className="absolute -right-16 top-8 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl"></div>
              <div className="absolute -left-16 bottom-0 h-44 w-44 rounded-full bg-purple-500/10 blur-3xl"></div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/90">Overview</p>
                  <h2 className={`mt-3 text-5xl font-black ${theme === 'light' ? 'text-slate-950' : 'text-white'}`}>
                    {liveWeather.temperature || liveWeather.temp}°
                  </h2>
                  <p className={`mt-2 text-sm ${theme === 'light' ? 'text-slate-600' : 'text-white/60'}`}>
                    {liveWeather.location} • {liveWeather.description}
                  </p>
                </div>
                <div className={`rounded-3xl p-4 text-3xl shadow-inner ${theme === 'light' ? 'bg-slate-100/90 text-slate-950' : 'bg-white/10 text-white'}`}>
                  {liveWeather.icon || '☀️'}
                </div>
              </div>

              <div className="mt-8 grid gap-4">
                {panels.map((panel) => (
                  <div key={panel.title} className="rounded-3xl border border-white/10 bg-black/20 p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/50">{panel.title}</p>
                    <p className="mt-3 text-2xl font-bold text-white">{panel.value}</p>
                    <p className="mt-2 text-sm text-white/50">{panel.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;