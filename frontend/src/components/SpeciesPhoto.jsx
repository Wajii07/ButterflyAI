import { useState } from 'react'
import { speciesImagePath } from '../utils/format'

export default function SpeciesPhoto({
  className,
  alt,
  classNameExtra = '',
  imgClassName = 'w-full h-full object-cover',
}) {
  const [failed, setFailed] = useState(false)
  const src = speciesImagePath(className)

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-forest-900 text-emerald-400/40 text-xs ${classNameExtra}`}
        aria-hidden="true"
      >
        No local photo
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`${imgClassName} ${classNameExtra}`}
      onError={() => setFailed(true)}
    />
  )
}
