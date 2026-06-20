import React from 'react'

const Card = ({ theme = 'dark', activeWeather, onCitySelect }) => {
  const isLight = theme === 'light'
  
  // 1. Live Weather data variables mapping
  const displayTemp = activeWeather ? `${activeWeather.temperature || activeWeather.temp}°C` : "28°C";
  const displayFeels = activeWeather ? `${activeWeather.feelsLike || activeWeather.temp}°C` : "30°C";
  const displayHumidity = activeWeather ? `${activeWeather.humidity}%` : "65%";
  const displayWind = activeWeather ? `${activeWeather.windSpeed} km/h` : "15 km/h";
  const displayPressure = activeWeather ? `${activeWeather.pressure} hPa` : "1012 hPa";
  
  // Agare API data coordinates ya advanced levels deta hai toh use karein, warna standard default value
  const displayVisibility = activeWeather?.visibility ? `${activeWeather.visibility} km` : "10km";
  const displayAQI = activeWeather?.aqi || "32";
  const displaySunrise = activeWeather?.sunrise || "05:12 AM";
  const displaySunset = activeWeather?.sunset || "07:04 PM";

  const topCities = [
    { name: "Skardu", temp: "18°C", condition: "Clear 🏔️", bg: "from-cyan-500/10" },
    { name: "Karachi", temp: "34°C", condition: "Humid 🌊", bg: "from-amber-500/10" },
    { name: "Lahore", temp: "38°C", condition: "Sunny ☀️", bg: "from-orange-500/10" },
    { name: "Islamabad", temp: "26°C", condition: "Rainy 🌧️", bg: "from-emerald-500/10" },
    { name: "London", temp: "16°C", condition: "Cloudy ☁️", bg: "from-indigo-500/10" }
  ];

  return (
    <div className={`container mx-auto px-4 py-8 max-w-5xl ${isLight ? 'text-slate-900' : ''}`}>
      
      {/* SECTION 1: POPULAR CITIES */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          <h3 className={`text-sm font-bold uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-white/50'}`}>
            Popular Destinations
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {topCities.map((city, index) => (
            <div 
              key={index}
              onClick={() => onCitySelect && onCitySelect(city.name)} 
              className={`rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] cursor-pointer group ${isLight ? 'bg-slate-50 border border-slate-200/70 shadow-sm hover:border-slate-300' : `bg-gradient-to-br ${city.bg} to-transparent border border-white/5 hover:border-white/20`}`}
            >
              <div>
                <p className={`text-[10px] font-semibold uppercase tracking-wider transition-colors ${isLight ? 'text-slate-500 group-hover:text-cyan-700' : 'text-white/40 group-hover:text-cyan-400'}`}>
                  Click to Track
                </p>
                <h4 className={`text-base font-bold mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>{city.name}</h4>
              </div>
              <div className="mt-4 flex justify-between items-end">
                <span className={`text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{city.temp}</span>
                <span className={`text-xs font-medium ${isLight ? 'text-slate-600' : 'text-white/60'}`}>{city.condition}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: BENTO GRID MATRIX */}
      <div>
        <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <h2 className={`text-2xl font-black tracking-tight uppercase text-[15px] ${isLight ? 'text-slate-700' : 'text-white/40'}`}>
            {/* 2. Heading automatically changes based on selection */}
            Advanced Weather Matrix {activeWeather ? `(${activeWeather.location})` : '(Default View)'}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 auto-rows-auto md:auto-rows-[140px]">
          
          {/* Main Temperature Card */}
          <div className={`sm:col-span-2 md:row-span-2 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${isLight ? 'bg-slate-100 border border-slate-200/70 shadow-lg hover:border-slate-300' : 'bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-400/20 hover:border-cyan-400/60'}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-xs font-bold uppercase tracking-widest ${isLight ? 'text-cyan-700' : 'text-cyan-400'}`}>Current Metrics</p>
                <h3 className={`text-xl font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>Temperature Overview</h3>
              </div>
              <span className="text-3xl">{activeWeather?.icon || '🌡️'}</span>
            </div>
            <div>
              <p className={`text-5xl md:text-6xl font-black tracking-tighter ${isLight ? 'text-slate-900' : 'text-white'}`}>{displayTemp}</p>
              <p className={`text-sm mt-2 ${isLight ? 'text-slate-600' : 'text-white/50'}`}>
                Condition: <span className="text-cyan-400 font-bold">{activeWeather?.description || 'Stable'}</span> (Feels like {displayFeels})
              </p>
            </div>
          </div>
          
          {/* Humidity Card */}
          <div className={`md:row-span-2 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${isLight ? 'bg-slate-100 border border-slate-200/70 shadow-sm hover:border-slate-300' : 'bg-black/20 border border-white/5 hover:border-emerald-400/40'}`}>
            <div className="flex justify-between items-center">
              <span className={`text-xs font-bold uppercase tracking-widest ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>Moisture</span>
              <span className="text-2xl">💧</span>
            </div>
            <div>
              <p className={`text-5xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>{displayHumidity}</p>
              <h3 className={`text-base font-semibold mt-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>Humidity Layer</h3>
            </div>
          </div>
          
          {/* Wind Speed Card */}
          <div className={`rounded-3xl p-5 flex items-center justify-between transition-all duration-300 ${isLight ? 'bg-slate-100 border border-slate-200/70 shadow-sm hover:border-slate-300' : 'bg-black/20 border border-white/5 hover:border-indigo-400/40'}`}>
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${isLight ? 'text-indigo-700' : 'text-indigo-400'}`}>Velocity</span>
              <h3 className={`text-base font-bold mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>Wind Speed</h3>
            </div>
            <p className={`text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{displayWind}</p>
          </div>

          {/* Pressure Card */}
          <div className={`rounded-3xl p-5 flex items-center justify-between transition-all duration-300 ${isLight ? 'bg-slate-100 border border-slate-200/70 shadow-sm hover:border-slate-300' : 'bg-black/20 border border-white/5 hover:border-purple-400/40'}`}>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">Atmosphere</span>
              <h3 className={`text-base font-bold mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>Pressure</h3>
            </div>
            <p className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{displayPressure}</p>
          </div>

          {/* Sunrise / Sunset Card (Dynamic Data connected) */}
          <div className={`sm:col-span-2 rounded-3xl p-5 flex items-center justify-between ${isLight ? 'bg-slate-100 border border-slate-200/70 shadow-sm' : 'bg-black/20 border border-white/5'}`}>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-2xl flex items-center justify-center text-xl bg-orange-500/10 border border-orange-500/20">🌅</div>
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Sunrise / Sunset</h3>
            </div>
            <div className="text-right">
              <p className={`text-xs ${isLight ? 'text-slate-700' : 'text-white/80'}`}>{displaySunrise} ↑</p>
              <p className="text-xs text-orange-400 mt-0.5">{displaySunset} ↓</p>
            </div>
          </div>

          {/* AQI Card (Dynamic Data connected) */}
          <div className={`rounded-3xl p-5 flex items-center justify-between ${isLight ? 'bg-slate-100 border border-slate-200/70 shadow-sm' : 'bg-black/20 border border-white/5'}`}>
            <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>AQI Index</h3>
            <p className={`text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{displayAQI}</p>
          </div>

          {/* Visibility Card (Dynamic Data connected) */}
          <div className={`rounded-3xl p-5 flex items-center justify-between ${isLight ? 'bg-slate-100 border border-slate-200/70 shadow-sm' : 'bg-black/20 border border-white/5'}`}>
            <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Visibility</h3>
            <p className={`text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{displayVisibility}</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Card