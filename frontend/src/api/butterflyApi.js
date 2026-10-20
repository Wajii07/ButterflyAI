/**
 * ButterflyAI API client
 * Base URL is read from VITE_API_URL env var; falls back to localhost:8000.
 */
const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

/**
 * Check backend health.
 * @returns {{ message: string, status: string, total_species: number }}
 */
export async function fetchStatus() {
  const res = await fetch(`${BASE_URL}/`)
  if (!res.ok) throw new Error(`Backend returned ${res.status}`)
  return res.json()
}

/**
 * Fetch all supported species.
 * @returns {{ species: string[], total: number }}
 */
export async function fetchSpecies() {
  const res = await fetch(`${BASE_URL}/species`)
  if (!res.ok) throw new Error(`Failed to fetch species: ${res.status}`)
  return res.json()
}

/**
 * Submit an image for species prediction.
 * Uses FormData with field name 'file' — browser sets Content-Type automatically.
 * @param {File} file
 * @returns {{ predicted_species: string, confidence: number, top_predictions: Array<{species:string,confidence:number}> }}
 */
export async function predictSpecies(file) {
  const formData = new FormData()
  formData.append('file', file) // field name must be 'file'

  const res = await fetch(`${BASE_URL}/predict`, {
    method: 'POST',
    body: formData,
    // Do NOT set Content-Type header — browser adds boundary automatically
  })

  if (!res.ok) {
    let detail = `Prediction failed (HTTP ${res.status})`
    try {
      const body = await res.json()
      if (body.detail) detail = body.detail
    } catch { /* ignore parse errors */ }
    throw new Error(detail)
  }

  return res.json()
}
