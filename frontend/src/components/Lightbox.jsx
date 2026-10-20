import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function Lightbox({ src, alt, caption, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!src) return null

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <button
        className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(2,13,7,0.85)', border: '1px solid rgba(52,211,153,0.3)' }}
        onClick={onClose}
        aria-label="Close image"
      >
        <X size={18} className="text-emerald-300" />
      </button>
      <figure className="max-w-6xl w-full px-4" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} className="w-full max-h-[82vh] object-contain rounded-xl" />
        {caption && (
          <figcaption className="text-center text-emerald-300/70 text-sm mt-3">{caption}</figcaption>
        )}
      </figure>
    </div>
  )
}
