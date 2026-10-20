import { NavLink } from 'react-router-dom'
import { Sparkles, Search, FlaskConical, Info, ChevronRight, Cpu, Database, Activity } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

/* ── Animated counter hook ─────────────────────────────────── */
function useCountUp(target, duration = 1400, start = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      setValue(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return value
}

/* ── Stats observer ────────────────────────────────────────── */
function AnimatedStat({ value, suffix = '', label, duration }) {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)
  const count = useCountUp(value, duration, inView)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="stat-card">
      <div className="font-serif text-4xl gradient-text mb-2">
        {inView ? count : 0}{suffix}
      </div>
      <div className="text-emerald-300/55 text-sm">{label}</div>
    </div>
  )
}

/* ── Workflow step ─────────────────────────────────────────── */
function WorkflowStep({ number, title, desc }) {
  return (
    <div className="flex gap-5 items-start">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 font-display"
        style={{
          background: 'linear-gradient(135deg,rgba(5,150,105,0.3),rgba(13,148,136,0.2))',
          border: '1px solid rgba(52,211,153,0.3)',
          color: '#34d399',
        }}
      >
        {number}
      </div>
      <div>
        <p className="text-emerald-300 font-medium text-sm mb-0.5">{title}</p>
        <p className="text-emerald-300/50 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
        aria-label="Hero"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 90% 65% at 50% 38%, rgba(5,150,105,0.13) 0%, transparent 70%)',
          }}
        />

        {/* Animated butterfly */}
        <div className="butterfly-art mx-auto mb-10 fade-up" aria-hidden="true">
          <div className="butterfly-wing wing-tl" />
          <div className="butterfly-wing wing-tr" />
          <div className="butterfly-wing wing-bl" />
          <div className="butterfly-wing wing-br" />
          <div className="butterfly-body" />
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <p className="text-emerald-400/75 text-xs font-display font-semibold tracking-[0.22em] uppercase mb-4 fade-up">
            University ANN Research Project
          </p>
          <h1 className="font-serif leading-none mb-5 fade-up fade-up-delay-1">
            <span className="block text-6xl sm:text-7xl md:text-8xl gradient-text">Butterfly</span>
            <span className="block text-5xl sm:text-6xl md:text-7xl text-emerald-300/80 -mt-2">
              &amp; Moth Identification
            </span>
          </h1>
          <p className="text-emerald-300/70 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-2 fade-up fade-up-delay-2">
            Discover butterfly and moth species through artificial neural networks.
            15 trained species, real data, honest results.
          </p>
          <p className="text-emerald-400/45 text-sm mb-10 fade-up fade-up-delay-2">
            Powered by TensorFlow · FastAPI · React
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 fade-up fade-up-delay-3">
            <NavLink to="/identify" className="btn-primary text-base px-8 py-3.5" id="hero-cta-identify">
              <Sparkles size={18} />
              Identify a Species
            </NavLink>
            <NavLink to="/model-lab" className="btn-secondary text-base" id="hero-cta-lab">
              <FlaskConical size={18} />
              Explore Our AI
            </NavLink>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-35">
          <div className="w-px h-8 bg-emerald-400 rounded animate-bounce" />
          <span className="text-emerald-400 text-xs font-display tracking-widest uppercase">Scroll</span>
        </div>
      </section>

      {/* ── Feature cards ──────────────────────────────────────── */}
      <section className="px-6 pb-24" aria-label="Features">
        <div className="max-w-5xl mx-auto">
          <div className="section-divider" />
          <p className="text-center text-emerald-400/50 text-xs font-display tracking-[0.18em] uppercase my-8">
            What ButterflyAI can do
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <NavLink
                key={f.title}
                to={f.to}
                className={`glass-card p-6 flex flex-col gap-4 hover:border-emerald-400/35 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl fade-up fade-up-delay-${Math.min(i + 1, 4)}`}
                id={`feature-card-${f.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${f.bg1}, ${f.bg2})`,
                    border: `1px solid ${f.border}`,
                  }}
                >
                  <f.Icon size={20} style={{ color: f.iconColor }} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-emerald-300 text-sm mb-1.5">{f.title}</h3>
                  <p className="text-emerald-300/50 text-xs leading-relaxed">{f.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-emerald-400/50 text-xs font-medium mt-auto">
                  <span>Explore</span>
                  <ChevronRight size={12} />
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────── */}
      <section className="px-6 pb-24" aria-label="How identification works">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-emerald-400/60 text-xs font-display tracking-[0.18em] uppercase mb-4">
                Identification workflow
              </p>
              <h2 className="font-serif text-4xl gradient-text mb-6">How it works</h2>
              <div className="flex flex-col gap-6">
                <WorkflowStep
                  number="1"
                  title="Upload an image"
                  desc="Drag-and-drop or browse for a JPEG, PNG, or WebP image of a butterfly or moth (max 5 MB)."
                />
                <WorkflowStep
                  number="2"
                  title="ANN inference"
                  desc="The FastAPI backend resizes your image to 64×64 px, normalises pixel values, and runs forward-pass inference through the trained single-layer ANN."
                />
                <WorkflowStep
                  number="3"
                  title="Read the results"
                  desc="The model outputs a Softmax probability distribution over 15 classes. The top three candidates are shown with their confidence percentages."
                />
              </div>
            </div>
            <div className="glass-card p-6">
              <p className="text-emerald-400/60 text-xs font-display tracking-[0.18em] uppercase mb-5">
                Important limitations
              </p>
              <ul className="flex flex-col gap-4">
                {LIMITATIONS.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <Icon size={16} className="text-yellow-400/70 mt-0.5 flex-shrink-0" />
                    <p className="text-emerald-300/60 text-sm leading-relaxed">{text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Animated stats ─────────────────────────────────────── */}
      <section className="px-6 pb-28" aria-label="Project statistics">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-emerald-400/55 text-xs font-display tracking-[0.18em] uppercase mb-8">
            Project at a glance
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnimatedStat value={15}   suffix=""     label="Species Classes"          duration={800}  />
            <AnimatedStat value={2260} suffix=""     label="Training Images"          duration={1400} />
            <AnimatedStat value={70}   suffix=".67%" label="Single-layer Val. Acc."   duration={1000} />
            <AnimatedStat value={64}   suffix="px"   label="Input Resolution"         duration={600}  />
          </div>
          <p className="mt-5 text-center text-emerald-300/30 text-xs">
            Validation set: 75 images (5 per class) · Test set: 75 images (5 per class) ·
            Metrics from actual experiments — not estimated
          </p>
        </div>
      </section>
    </div>
  )
}

const FEATURES = [
  {
    to: '/identify',
    title: 'Identify a Species',
    desc: 'Upload a butterfly or moth photo and get an ANN-powered species prediction with confidence scores.',
    Icon: Sparkles,
    bg1: 'rgba(5,150,105,0.2)', bg2: 'rgba(13,148,136,0.1)',
    border: 'rgba(52,211,153,0.25)', iconColor: '#34d399',
  },
  {
    to: '/species',
    title: 'Species Explorer',
    desc: 'Browse all 15 trained species with factual descriptions and identifying characteristics.',
    Icon: Search,
    bg1: 'rgba(45,212,191,0.15)', bg2: 'rgba(20,184,166,0.08)',
    border: 'rgba(45,212,191,0.2)', iconColor: '#2dd4bf',
  },
  {
    to: '/model-lab',
    title: 'AI Model Lab',
    desc: 'Explore ANN architectures, training curves, confusion matrix, and real evaluation metrics.',
    Icon: FlaskConical,
    bg1: 'rgba(96,165,250,0.15)', bg2: 'rgba(59,130,246,0.08)',
    border: 'rgba(96,165,250,0.2)', iconColor: '#60a5fa',
  },
  {
    to: '/about',
    title: 'About the Project',
    desc: 'Dataset source, full methodology, technology stack, limitations, and future directions.',
    Icon: Info,
    bg1: 'rgba(167,139,250,0.15)', bg2: 'rgba(139,92,246,0.08)',
    border: 'rgba(167,139,250,0.2)', iconColor: '#a78bfa',
  },
]

const LIMITATIONS = [
  {
    icon: Database,
    text: 'The model knows only 15 species. Any uploaded image—even of a non-butterfly subject—will be forced into one of these 15 classes.',
  },
  {
    icon: Activity,
    text: 'Confidence percentages are Softmax output probabilities, not reliability guarantees. High confidence can still mean incorrect identification.',
  },
  {
    icon: Cpu,
    text: 'This is a university ANN research experiment. Use it as an educational demonstration, not a field identification guide.',
  },
]
