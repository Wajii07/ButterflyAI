import { useState, useRef, useCallback } from 'react'
import { Upload, X, AlertCircle, CheckCircle, Loader2, Info, ChevronRight } from 'lucide-react'
import { predictSpecies } from '../api/butterflyApi'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB

export default function IdentifyPage() {
  const [file, setFile]           = useState(null)
  const [preview, setPreview]     = useState(null)
  const [dragging, setDragging]   = useState(false)
  const [loading, setLoading]     = useState(false)
  const [result, setResult]       = useState(null)
  const [error, setError]         = useState(null)
  const fileInputRef              = useRef(null)

  const reset = () => {
    setFile(null)
    setPreview(null)
    setResult(null)
    setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const validateAndSet = useCallback((f) => {
    if (!f) return
    if (!ACCEPTED_TYPES.includes(f.type)) {
      setError('Please upload a JPEG, PNG, or WebP image.')
      return
    }
    if (f.size > MAX_SIZE_BYTES) {
      setError('Image must be smaller than 5 MB.')
      return
    }
    setError(null)
    setResult(null)
    setFile(f)
    const url = URL.createObjectURL(f)
    setPreview(url)
  }, [])

  const handleFileChange = (e) => validateAndSet(e.target.files?.[0])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    validateAndSet(e.dataTransfer.files?.[0])
  }, [validateAndSet])

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true) }
  const handleDragLeave = () => setDragging(false)

  const handleSubmit = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await predictSpecies(file)
      setResult(data)
    } catch (err) {
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        setError('Cannot reach the backend. Make sure the FastAPI server is running on port 8000.')
      } else {
        setError(err.message || 'An unexpected error occurred.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 fade-up">
          <p className="text-emerald-400/60 text-xs font-display tracking-[0.2em] uppercase mb-3">Neural Identification</p>
          <h1 className="font-serif text-5xl sm:text-6xl gradient-text mb-4">Identify a Butterfly</h1>
          <p className="text-emerald-300/65 text-base max-w-xl mx-auto">
            Upload a clear photo of a butterfly wing. The ANN will analyse it and return
            the top predicted species from its 15 trained classes.
          </p>
        </div>

        {/* Disclaimer banner */}
        <div className="flex items-start gap-3 glass-card p-4 mb-8 fade-up fade-up-delay-1"
             style={{ borderColor: 'rgba(251,191,36,0.2)', background: 'rgba(251,191,36,0.05)' }}>
          <Info size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
          <p className="text-yellow-300/70 text-sm leading-relaxed">
            This model recognises <strong className="text-yellow-300">only 15 trained species</strong>.
            Any image will receive a prediction — confidence scores are <em>not</em> guarantees of correctness.
            Use results as a reference, not a definitive identification.
          </p>
        </div>

        {/* Upload zone */}
        <div className="fade-up fade-up-delay-2">
          {!preview ? (
            <div
              id="upload-drop-zone"
              role="button"
              tabIndex={0}
              className={`drop-zone flex flex-col items-center justify-center gap-4 py-16 px-8 text-center ${dragging ? 'dragging' : ''}`}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click() }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              aria-label="Upload butterfly image"
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}
              >
                <Upload size={36} className="text-emerald-400 opacity-80" />
              </div>
              <div>
                <p className="text-emerald-300 font-medium text-lg mb-1">Drop your image here</p>
                <p className="text-emerald-300/50 text-sm">or click to browse files</p>
                <p className="text-emerald-300/35 text-xs mt-2">JPEG · PNG · WebP · max 5 MB</p>
              </div>
              <input
                ref={fileInputRef}
                id="file-input"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="glass-card overflow-hidden">
              <div className="relative">
                <img
                  src={preview}
                  alt="Uploaded butterfly preview"
                  className="w-full max-h-80 object-contain bg-forest-900"
                  style={{ background: '#041f0f' }}
                />
                <button
                  onClick={reset}
                  id="remove-image-btn"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(2,13,7,0.85)', border: '1px solid rgba(52,211,153,0.3)' }}
                  aria-label="Remove image"
                >
                  <X size={16} className="text-emerald-400" />
                </button>
              </div>
              <div className="p-5 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-emerald-300 text-sm font-medium">{file?.name}</p>
                  <p className="text-emerald-300/45 text-xs mt-0.5">
                    {(file?.size / 1024).toFixed(1)} KB · {file?.type.split('/')[1].toUpperCase()}
                  </p>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  id="identify-submit-btn"
                  className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Analysing…</> : <><ChevronRight size={16} /> Identify Species</>}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 glass-card p-4 mt-6 fade-up"
               style={{ borderColor: 'rgba(239,68,68,0.25)', background: 'rgba(239,68,68,0.06)' }}>
            <AlertCircle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
            <p className="text-red-300/85 text-sm leading-relaxed">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="mt-10 flex flex-col items-center gap-5 fade-up">
            <div className="spinner" />
            <div className="text-center">
              <p className="text-emerald-300 font-medium">Consulting the neural network…</p>
              <p className="text-emerald-300/45 text-sm mt-1">Running inference on 15 species</p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && !loading && <PredictionResults result={result} />}
      </div>
    </div>
  )
}

function PredictionResults({ result }) {
  const { predicted_species, confidence, top_predictions } = result
  const isHighConfidence = confidence >= 70

  return (
    <div className="mt-10 fade-up" id="prediction-results" aria-live="polite">
      {/* Top result */}
      <div className="glass-card p-8 mb-5 text-center"
           style={{ borderColor: 'rgba(52,211,153,0.3)', background: 'rgba(10,61,30,0.5)' }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle size={20} className="text-emerald-400" />
          <p className="text-emerald-400/70 text-sm font-display tracking-wide uppercase">Predicted Species</p>
        </div>
        <h2 className="font-serif text-4xl gradient-text mb-3 capitalize">{predicted_species.toLowerCase()}</h2>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
             style={{
               background: isHighConfidence ? 'rgba(5,150,105,0.2)' : 'rgba(245,158,11,0.15)',
               border: `1px solid ${isHighConfidence ? 'rgba(5,150,105,0.4)' : 'rgba(245,158,11,0.3)'}`,
               color: isHighConfidence ? '#34d399' : '#fbbf24',
             }}>
          {confidence.toFixed(2)}% confidence
        </div>
      </div>

      {/* Top 3 */}
      <div className="glass-card p-6" aria-label="Top predictions">
        <h3 className="text-emerald-400/70 text-xs font-display tracking-[0.15em] uppercase mb-5">
          Top Predictions
        </h3>
        <div className="flex flex-col gap-5">
          {top_predictions.map((p, idx) => (
            <div key={p.species}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-300/35 text-xs font-mono w-4">#{idx + 1}</span>
                  <span className="text-emerald-300 text-sm font-medium capitalize">{p.species.toLowerCase()}</span>
                </div>
                <span className="text-emerald-400 text-sm font-display font-semibold">
                  {p.confidence.toFixed(2)}%
                </span>
              </div>
              <div className="confidence-bar">
                <div
                  className="confidence-fill"
                  style={{ width: `${Math.min(p.confidence, 100)}%` }}
                  role="meter"
                  aria-valuenow={p.confidence}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${p.species} confidence`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fine print */}
      <p className="text-emerald-300/35 text-xs text-center mt-4">
        Predictions are drawn only from the 15 trained classes. High confidence does not guarantee correct identification.
      </p>
    </div>
  )
}
