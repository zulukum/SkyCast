import React, { useState } from 'react'
import { geocodeLocation, getDailyForecast } from '../utils/weatherAPI'
import translations from '../i18n/translations'

function History({ language = 'en' }) {
  const t = translations[language] || translations.en;
  const [location, setLocation] = useState('Karachi')
  const [days, setDays] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [placeName, setPlaceName] = useState('Karachi, PK')

  const loadHistory = async (e) => {
    if (e) e.preventDefault()
    if (!location.trim()) return
    setLoading(true)
    setError('')
    try {
      const geo = await geocodeLocation(location)
      const data = await getDailyForecast(geo.lat, geo.lon, 7)
      setDays(data)
      setPlaceName(`${geo.name}${geo.country ? ', ' + geo.country : ''}`)
    } catch (err) {
      setError(err.message || 'Failed to load forecast')
      setDays([])
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    loadHistory()
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black text-white">7-Day Forecast</h1>
          <p className="text-white/60 mt-1">{t.historyExtended}</p>
        </div>
        <form onSubmit={loadHistory} className="flex gap-2">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={t.historyPlaceholder}
            className="rounded-3xl border border-white/10 bg-white/5 px-5 py-3 text-white placeholder-white/40 focus:border-cyan-400 focus:outline-none w-64"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="rounded-3xl bg-cyan-400 px-8 py-3 text-sm font-black text-slate-950 hover:bg-cyan-300 disabled:opacity-60"
          >
            {loading ? 'Loading...' : t.historyRefresh}
          </button>
        </form>
      </div>

      {placeName && <p className="text-cyan-400 text-sm mb-4">📍 {placeName}</p>}

      {error && <div className="mb-6 rounded-2xl bg-red-500/10 border border-red-500/30 p-4 text-red-300">{error}</div>}

      {days.length > 0 ? (
        <div className="overflow-x-auto bg-white/5 rounded-3xl p-2 border border-white/10">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-sm text-white/60 px-6 py-4">{t.historyTableDate}</th>
                <th className="text-sm text-white/60 px-6 py-4">{t.historyTableCondition}</th>
                <th className="text-sm text-white/60 px-6 py-4 text-right">{t.historyTableHigh}</th>
                <th className="text-sm text-white/60 px-6 py-4 text-right">{t.historyTableLow}</th>
                <th className="text-sm text-white/60 px-6 py-4 text-right">{t.historyTableRainChance}</th>
              </tr>
            </thead>
            <tbody>
              {days.map((row, idx) => (
                <tr key={idx} className="border-t border-white/5 hover:bg-white/5 transition">
                  <td className="px-6 py-5 text-white font-medium">{row.date}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{row.icon}</span>
                      <span className="text-white/80 text-sm capitalize">{row.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="text-2xl font-black text-white">{row.high}</span>
                    <span className="text-white/50">°C</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="text-xl font-semibold text-white/80">{row.low}</span>
                    <span className="text-white/40">°C</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-sm">
                      <span>💧</span>
                      <span className="font-medium text-white">{row.precip}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !loading && (
        <div className="text-center py-12 text-white/50">{t.historyLoading}</div>
      )}

      {loading && <div className="text-center py-8 text-white/60">{t.historyFetching}</div>}

      <p className="text-white/40 text-xs mt-6 text-center">{t.historyDataNote}</p>
    </div>
  )
}

export default History
