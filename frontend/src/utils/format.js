/** Title-case a model class name without changing its identity. */
export function displayName(className = '') {
  return className
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function speciesSlug(className = '') {
  return className.replace(/\s+/g, '-')
}

export function speciesImagePath(className = '') {
  return `/species/${speciesSlug(className)}.jpg`
}

export function pct(value, digits = 2) {
  if (value == null || Number.isNaN(value)) return '—'
  const n = value <= 1 ? value * 100 : value
  return `${n.toFixed(digits)}%`
}

export function formatMetric(value, digits = 4) {
  if (value == null || Number.isNaN(value)) return '—'
  return Number(value).toFixed(digits)
}
