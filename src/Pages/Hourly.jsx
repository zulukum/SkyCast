import React, { useState } from 'react'
import { geocodeLocation, getHourlyForecast } from '../utils/weatherAPI'
import translations from '../i18n/translations'

function Hourly({ language = 'en' }) {
  const t = translations[language] || translations.en;
  const [location, setLocation] = useState('Karachi')
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [placeName, setPlaceName] = useState('Karachi, PK')

  const loadForecast = async (e) => {
    if (e) e.preventDefault()
    if (!location.trim()) {
      setError('Please enter a location')
      return
    }
    setLoading(true)
    setError('')
    try {
      const geo = await geocodeLocation(location)
      const data = await getHourlyForecast(geo.lat, geo.lon, 12)
      setForecast(data)
      setPlaceName(`${geo.name}${geo.country ? ', ' + geo.country : ''}`)
    } catch (err) {
      setError(err.message || 'Failed to load forecast')
      setForecast([])
    } finally {
      setLoading(false)
    }
  }

  // Auto load on mount for default
  React.useEffect(() => {
    loadForecast()
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black text-white">Hourly Forecast</h1>
          <p className="text-white/60 mt-1">{t.hourlyNext12Hours}</p>
        </div>
        <form onSubmit={loadForecast} className="flex gap-2">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={t.hourlyPlaceholder}
            className="rounded-3xl border border-white/10 bg-white/5 px-5 py-3 text-white placeholder-white/40 focus:border-cyan-400 focus:outline-none w-64"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="rounded-3xl bg-cyan-400 px-8 py-3 text-sm font-black text-slate-950 hover:bg-cyan-300 disabled:opacity-60"
          >
            {loading ? 'Loading...' : t.hourlyUpdateButton}
          </button>
        </form>
      </div>

      {placeName && <p className="text-cyan-400 text-sm mb-4">📍 {placeName}</p>}

      {error && <div className="mb-6 rounded-2xl bg-red-500/10 border border-red-500/30 p-4 text-red-300">{error}</div>}

      {forecast.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {forecast.map((h, idx) => (
            <div key={idx} className="bg-white/5 hover:bg-white/10 transition rounded-3xl p-5 text-center border border-white/10">
              <div className="text-sm text-white/50">{h.time}</div>
              <div className="text-5xl my-3">{h.icon}</div>
              <div className="text-3xl font-black text-white">{h.temp}°C</div>
              <div className="text-xs text-white/60 mt-1">Feels like ~{h.temp - 1}°C</div>
              <div className="mt-3 text-[10px] uppercase tracking-widest text-white/40">{h.description}</div>
              <div className="mt-2 text-xs text-white/50">💧 {h.humidity}% • 🌬️ {h.wind} km/h</div>
            </div>
          ))}
        </div>
      ) : !loading && (
        <div className="text-center py-12 text-white/50">{t.hourlyEnterPrompt}</div>
      )}

      {loading && <div className="text-center py-8 text-white/60">{t.hourlyFetching}</div>}
    </div>
  )
}

export default Hourly
