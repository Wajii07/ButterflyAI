export default function ButterflyMark({ size = 24 }) {
  const id = `wing-${size}`
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      <ellipse cx="30" cy="38" rx="22" ry="16" fill={`url(#${id})`} opacity="0.9" transform="rotate(-20 30 38)" />
      <ellipse cx="28" cy="62" rx="16" ry="11" fill={`url(#${id})`} opacity="0.7" transform="rotate(15 28 62)" />
      <ellipse cx="70" cy="38" rx="22" ry="16" fill={`url(#${id})`} opacity="0.9" transform="rotate(20 70 38)" />
      <ellipse cx="72" cy="62" rx="16" ry="11" fill={`url(#${id})`} opacity="0.7" transform="rotate(-15 72 62)" />
      <ellipse cx="50" cy="50" rx="4" ry="22" fill="#064e3b" />
      <line x1="50" y1="28" x2="40" y2="16" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="28" x2="60" y2="16" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
      <circle cx="40" cy="15" r="2.5" fill="#6ee7b7" />
      <circle cx="60" cy="15" r="2.5" fill="#6ee7b7" />
    </svg>
  )
}
