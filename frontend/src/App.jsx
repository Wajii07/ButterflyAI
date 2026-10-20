import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import IdentifyPage from './pages/IdentifyPage'
import SpeciesPage from './pages/SpeciesPage'
import ModelLabPage from './pages/InsightsPage'
import AboutPage from './pages/AboutPage'
import BackgroundOrbs from './components/BackgroundOrbs'
import Footer from './components/Footer'
import ButterflyMark from './components/ButterflyMark'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <BackgroundOrbs />
      <Navbar />
      <main className="content-layer">
        <Routes>
          <Route path="/"           element={<HomePage />} />
          <Route path="/identify"   element={<IdentifyPage />} />
          <Route path="/species"    element={<SpeciesPage />} />
          <Route path="/model-lab"  element={<ModelLabPage />} />
          <Route path="/about"      element={<AboutPage />} />
          {/* Legacy redirect alias */}
          <Route path="/insights"   element={<ModelLabPage />} />
          <Route path="*"           element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24">
      <ButterflyLogoLarge />
      <h1 className="font-serif text-5xl gradient-text mb-4 mt-6">Page Not Found</h1>
      <p className="text-emerald-300/70 mb-8">This wing doesn&apos;t lead anywhere.</p>
      <NavLink to="/" className="btn-primary">Return Home</NavLink>
    </div>
  )
}

function ButterflyLogoLarge() {
  return (
    <div className="butterfly-art mx-auto" aria-hidden="true">
      <div className="butterfly-wing wing-tl" />
      <div className="butterfly-wing wing-tr" />
      <div className="butterfly-wing wing-bl" />
      <div className="butterfly-wing wing-br" />
      <div className="butterfly-body" />
    </div>
  )
}

export function ButterflyIconSVG({ size = 24 }) {
  return <ButterflyMark size={size} />
}
