import { useState, useEffect, useMemo } from 'react'
import { Search, Loader2, AlertCircle, Wifi } from 'lucide-react'
import { fetchSpecies } from '../api/butterflyApi'

// Generates a deterministic gradient hue from a species name string
function speciesHue(name) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360
  return (120 + (h % 80)) // constrained to green-teal range
}

export default function SpeciesPage() {
  const [species, setSpecies]   = useState([])
  const [total, setTotal]       = useState(0)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [query, setQuery]       = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchSpecies()
      .then(({ species: s, total: t }) => {
        if (!cancelled) { setSpecies(s); setTotal(t); setLoading(false) }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || 'Failed to load species from backend.')
          setLoading(false)
        }
      })
    return () => { cancelled = true }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? species.filter(s => s.toLowerCase().includes(q)) : species
  }, [species, query])

  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 fade-up">
          <p className="text-emerald-400/60 text-xs font-display tracking-[0.2em] uppercase mb-3">
            Supported Classes
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl gradient-text mb-4">Species Explorer</h1>
          <p className="text-emerald-300/65 text-base max-w-xl mx-auto">
            Browse the {total || 15} butterfly species this ANN model was trained to identify.
            Species names are loaded directly from the backend.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative max-w-md mx-auto mb-10 fade-up fade-up-delay-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400/50" />
          <input
            id="species-search"
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search species…"
            aria-label="Search butterfly species"
            className="w-full pl-11 pr-4 py-3 rounded-xl text-emerald-200 text-sm placeholder-emerald-300/30
                       focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            style={{
              background: 'rgba(10,61,30,0.5)',
              border: '1px solid rgba(52,211,153,0.2)',
              fontFamily: 'inherit',
            }}
          />
          {query && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400/50 text-xs">
              {filtered.length} match{filtered.length !== 1 ? 'es' : ''}
            </span>
          )}
        </div>

        {/* States */}
        {loading && (
          <div className="flex flex-col items-center gap-4 py-20 fade-up">
            <Loader2 size={36} className="text-emerald-400 animate-spin" />
            <p className="text-emerald-300/60 text-sm">Loading species from backend…</p>
          </div>
        )}

        {error && !loading && (
          <div className="flex items-start gap-3 glass-card p-5 mb-8 max-w-lg mx-auto"
               style={{ borderColor: 'rgba(239,68,68,0.25)', background: 'rgba(239,68,68,0.06)' }}>
            <AlertCircle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-300 text-sm font-medium mb-1">Could not reach backend</p>
              <p className="text-red-300/65 text-sm">{error}</p>
              <p className="text-red-300/45 text-xs mt-2 flex items-center gap-1.5">
                <Wifi size={12} /> Make sure FastAPI is running on port 8000
              </p>
            </div>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <>
            {filtered.length === 0 ? (
              <p className="text-center text-emerald-300/45 text-sm py-16">
                No species matching "{query}".
              </p>
            ) : (
              <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                role="list"
                aria-label="Butterfly species grid"
              >
                {filtered.map((name, idx) => {
                  const hue = speciesHue(name)
                  return (
                    <SpeciesCard key={name} name={name} index={idx} hue={hue} />
                  )
                })}
              </div>
            )}
            <p className="text-emerald-300/35 text-xs text-center mt-8">
              {filtered.length} of {total} species shown · Loaded live from the backend
            </p>
          </>
        )}
      </div>
    </div>
  )
}

function SpeciesCard({ name, index, hue }) {
  const displayName = name
    .split(' ')
    .map(w => w.charAt(0) + w.slice(1).toLowerCase())
    .join(' ')

  const initials = name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')

  return (
    <div
      role="listitem"
      className="species-card flex flex-col items-center gap-3 text-center fade-up"
      style={{ animationDelay: `${Math.min(index * 0.04, 0.5)}s` }}
      id={`species-${name.replace(/\s+/g, '-').toLowerCase()}`}
      aria-label={displayName}
    >
      {/* Abstract wing badge */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-sm"
        style={{
          background: `radial-gradient(circle at 40% 40%, hsl(${hue},60%,30%) 0%, hsl(${hue},40%,14%) 100%)`,
          border: `1px solid hsl(${hue},50%,35%)`,
          color: `hsl(${hue},70%,70%)`,
          boxShadow: `0 4px 14px hsl(${hue},50%,10%)`,
        }}
        aria-hidden="true"
      >
        {initials}
      </div>
      <p className="text-emerald-300 text-xs font-medium leading-snug">{displayName}</p>
    </div>
  )
}
