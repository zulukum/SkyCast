import React, { useMemo, useState, useEffect } from 'react'
import newsData from '../data/newsData' // Fallback data agar API fail ho jaye
import translations from '../i18n/translations'

function News({ language = 'en' }) {
  const [news, setNews] = useState([]) // Live news state
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [expanded, setExpanded] = useState({})
  const [visibleCount, setVisibleCount] = useState(4) // Default display thoda badha diya hai

  const t = translations[language] || translations.en

  // Live API Fetch Effect
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      setError(null)
      try {
        // Aap yahan koi bhi free API key use kar sakte hain (e.g., GNews, NewsAPI).
        // Filhal yeh ek reliable public mirror use kar raha hai taake CORS ka issue na aaye.
        const response = await fetch(
          `https://saurav.tech/NewsAPI/top-headlines/category/science/in.json`
        )
        
        if (!response.ok) throw new Error('Network response was not ok')
        
        const data = await response.json()
        
        // Data ko hum apne purane format ke sath map/match kar lete hain
        const mappedNews = data.articles.map((article, index) => ({
          id: article.url || index,
          title: article.title,
          summary: article.description || 'No description available.',
          content: article.content || article.description,
          date: new Date(article.publishedAt).toLocaleDateString() || 'Recent',
          category: 'Weather & Science', // Default live category
          link: article.url
        }))

        // Agar API successfully data dede
        setNews(mappedNews.length > 0 ? mappedNews : newsData)
      } catch (err) {
        console.error("API Fetch Error, falling back to local data:", err)
        // Agar internet band ho ya API fail ho, toh chupke se local data load ho jaye
        setNews(newsData)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  // Categories extraction based on current news array
  const categories = useMemo(() => {
    return ['All', ...new Set(news.map((n) => n.category))].filter(Boolean)
  }, [news])

  // Filter local search and drop-down category over live news array
  const filtered = news.filter((n) => {
    const matchesCat = category === 'All' || n.category === category
    const contentToSearch = `${n.title || ''} ${n.summary || ''} ${n.content || ''}`.toLowerCase()
    const matchesQuery = contentToSearch.includes(query.toLowerCase())
    return matchesCat && matchesQuery
  })

  function toggleExpand(id) {
    setExpanded((s) => ({ ...s, [id]: !s[id] }))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">{t.weatherNews}</h1>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder || "Search news..."}
            className="rounded-full px-4 py-2 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
          />
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            className="rounded-full px-4 py-2 bg-white/5 border border-white/10 text-white focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="text-black">
                {c === 'All' ? (t.all || 'All') : c}
              </option>
            ))}
          </select>
        </div>

        <p className="text-white/60">
          {t.showingResults 
            ? t.showingResults.replace('{{count}}', filtered.length) 
            : `Showing ${filtered.length} results`}
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-cyan-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="text-white/60 mt-4 text-sm tracking-wider">Intercepting weather satellite feeds...</p>
        </div>
      ) : (
        /* News Grid Layout */
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.slice(0, visibleCount).map((item) => (
            <article 
              key={item.id} 
              className="bg-white/5 border border-white/5 p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-white/10"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-lg font-bold text-white leading-snug">{item.title}</h2>
                  <button 
                    onClick={() => toggleExpand(item.id)} 
                    className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors"
                  >
                    {expanded[item.id] ? (t.showLess || 'Show Less') : (t.readMore || 'Read More')}
                  </button>
                </div>
                <p className="text-xs text-white/40 mt-1">
                  {item.date} • <span className="text-cyan-400/70">{item.category}</span>
                </p>
                
                <p className="text-white/70 text-sm mt-4 line-clamp-3 leading-relaxed">{item.summary}</p>
              </div>

              {/* Collapsible Content */}
              {expanded[item.id] && (
                <div className="mt-4 pt-4 border-t border-white/5 text-white/90 text-sm animate-fadeIn">
                  <p className="leading-relaxed">{item.content}</p>
                  {item.link && (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-cyan-400 hover:underline text-xs mt-3 inline-block font-medium"
                    >
                      {t.originalSource || "Read original article →"}
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      {/* Load More Trigger */}
      {!loading && visibleCount < filtered.length && (
        <div className="mt-8 text-center">
          <button 
            onClick={() => setVisibleCount((c) => c + 2)} 
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-200 transform active:scale-95"
          >
            {t.loadMore || "Load More"}
          </button>
        </div>
      )}
    </div>
  )
}

export default News