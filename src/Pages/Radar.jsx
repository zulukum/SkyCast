import React, { useState } from 'react'
import { geocodeLocation, getCurrentWeather } from '../utils/weatherAPI'
import translations from '../i18n/translations'

function Radar({ language = 'en' }) {
  const t = translations[language] || translations.en;
  const [location, setLocation] = useState('Skardu')
  const [radius, setRadius] = useState(50)
  const [data, setData] = useState({
    status: 'Ready to scan',
    temperature: '--°C',
    feelsLike: '--°C',
    humidity: '--%',
    wind: '-- km/h',
    description: 'Enter a location and press Start Scan',
    icon: null,
    radarType: 'OpenWeatherMap'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleScan = async (e) => {
    e.preventDefault()
    if (!location.trim()) {
      setError('Please enter a location')
      return
    }

    setLoading(true)
    setError('')
    setData(prev => ({ ...prev, status: `Scanning ${location} within ${radius} km...` }))

    try {
      const geo = await geocodeLocation(location)
      const weather = await getCurrentWeather(geo.lat, geo.lon)

      setData({
        status: `Live data for ${geo.name}${geo.country ? ', ' + geo.country : ''}`,
        temperature: `${weather.temperature}°C`,
        feelsLike: `${weather.feelsLike}°C`,
        humidity: `${weather.humidity}%`,
        wind: `${weather.windSpeed} km/h ${weather.windDirection}`,
        description: weather.description,
        icon: null, // Using emoji in description area instead
        radarType: 'Open-Meteo Live (Keyless)'
      })
    } catch (err) {
      console.error(err)
      setError(err.message || 'Something went wrong while fetching weather.')
      setData(prev => ({ 
        ...prev, 
        status: 'Scan failed',
        description: 'Unable to retrieve live data'
      }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="rounded-[32px] border border-white/10 bg-[#0b132b]/80 p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-white">Live Radar</h1>
            <p className="mt-3 text-white/60 max-w-2xl">
              {t.radarDescriptionNew}
            </p>
            <div className="mt-2 text-xs text-emerald-400/80">✓ {t.radarKeylessBadge}</div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">Radar Mode</p>
              <p className="mt-2 text-lg font-bold text-white">{data.radarType}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">Current Status</p>
              <p className="mt-2 text-lg font-bold text-white">{data.status}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleScan} className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-white">{t.radarLocationLabelNew}</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-3xl border border-white/10 bg-black/20 px-5 py-4 text-white placeholder-white/30 focus:border-cyan-400 focus:outline-none"
              placeholder="e.g. Skardu, Karachi, London, or 35.3,75.6"
              disabled={loading}
            />

            <label className="block text-sm font-semibold text-white">{t.radarRadiusLabel}</label>
            <input
              type="range"
              min="10"
              max="200"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full"
              disabled={loading}
            />
            <p className="text-sm text-white/60">{t.radarRadiusNote.replace('{{km}}', radius)}</p>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-3xl bg-cyan-400 px-8 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {loading ? t.radarScanningStatus.replace('{{location}}', location).replace('{{radius}}', radius) : t.radarStartLiveScan}
            </button>

            {error && (
              <div className="rounded-2xl bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-300">
                {error}
              </div>
            )}
          </div>

          {/* Live Weather Output */}
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black">{t.radarLiveWeatherOutput}</h2>
              <div className="text-4xl">{data.description.includes('Clear') ? '☀️' : data.description.includes('cloud') ? '⛅' : data.description.includes('rain') ? '🌧️' : data.description.includes('thunder') ? '⛈️' : '🌡️'}</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3.5">
                <span className="text-sm text-white/60">{t.radarTemperature || 'Temperature'}</span>
                <span className="font-bold text-2xl text-white">{data.temperature}</span>
              </div>

              <div className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3.5">
                <span className="text-sm text-white/60">{t.radarFeelsLike}</span>
                <span className="font-bold text-white">{data.feelsLike}</span>
              </div>

              <div className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3.5">
                <span className="text-sm text-white/60">{t.radarHumidity || 'Humidity'}</span>
                <span className="font-bold text-white">{data.humidity}</span>
              </div>

              <div className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3.5">
                <span className="text-sm text-white/60">{t.radarWind || 'Wind'}</span>
                <span className="font-bold text-white">{data.wind}</span>
              </div>

              <div className="pt-2 border-t border-white/10">
                <p className="text-xs uppercase tracking-wider text-white/50 mb-1">{t.radarCondition}</p>
                <p className="text-lg font-semibold capitalize text-white/90">{data.description}</p>
              </div>
            </div>

            <p className="mt-6 text-[10px] text-white/40 text-center">
              {t.radarDataProvider}
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Radar
