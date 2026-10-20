# ButterflyAI — Frontend

A production-quality React frontend for the ButterflyAI university ANN project.
Built with **Vite**, **React 19**, **Tailwind CSS v3**, and **Lucide Icons**.

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 18 |
| npm | ≥ 9 |
| Python | ≥ 3.10 (for backend) |

---

## Installation

```bash
# From the project root (D:\ButterflyAI)
cd frontend
npm install
```

---

## Running the Application

You need **two terminal windows** — one for the backend, one for the frontend.

### Terminal 1 — FastAPI Backend

```bash
# From D:\ButterflyAI (activate your .venv first)
.\.venv\Scripts\activate        # Windows PowerShell
uvicorn backend.main:app --reload --port 8000
```

The backend will be available at: `http://127.0.0.1:8000`

### Terminal 2 — React Frontend

```bash
cd frontend
npm run dev
```

The frontend will be available at: `http://localhost:5173`

---

## Environment Variables

Create or edit `frontend/.env`:

```env
# Optional — defaults to http://127.0.0.1:8000
VITE_API_URL=http://127.0.0.1:8000
```

---

## Production Build

```bash
cd frontend
npm run build
# Output is in frontend/dist/
```

---

## Project Structure

```
frontend/
├── public/
│   └── butterfly-icon.svg    # SVG favicon
├── src/
│   ├── api/
│   │   └── butterflyApi.js   # Fetch wrappers for FastAPI endpoints
│   ├── components/
│   │   ├── BackgroundOrbs.jsx
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── HomePage.jsx      # Hero + feature cards
│   │   ├── IdentifyPage.jsx  # Upload + prediction results
│   │   ├── SpeciesPage.jsx   # Searchable species grid
│   │   ├── InsightsPage.jsx  # Model metrics & dataset info
│   │   └── AboutPage.jsx     # Project documentation
│   ├── App.jsx               # Router + layout
│   ├── index.css             # Global design system
│   └── main.jsx              # React entry point
├── .env                      # API URL config
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## API Endpoints Used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/` | Health check |
| GET | `/species` | Fetch all 15 trained species |
| POST | `/predict` | Submit image for classification |

The `/predict` endpoint receives `multipart/form-data` with field name `file`.
Do **not** set `Content-Type` manually — the browser sets it automatically with the correct boundary.

---

## Notes

- The model supports **only 15 trained butterfly species**. Any image will receive a prediction but confidence does not guarantee accuracy.
- Validation accuracies: Single-layer ANN **70.67%** · Multilayer ANN **48.00%**.
- These are experimental results on a 75-image validation set, not production benchmarks.
