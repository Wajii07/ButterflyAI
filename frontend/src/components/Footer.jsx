import { NavLink } from 'react-router-dom'
import ButterflyMark from './ButterflyMark'

export default function Footer() {
  return (
    <footer className="content-layer border-t border-emerald-500/10 mt-24 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <ButterflyMark size={22} />
              <span className="font-display font-bold text-lg text-emerald-400">
                Butterfly<span className="text-teal-400">AI</span>
              </span>
            </div>
            <p className="text-emerald-300/45 text-xs leading-relaxed">
              A university artificial neural network research project for butterfly and moth species classification.
              Predictions are experimental and limited to 15 trained classes.
            </p>
          </div>
          <div>
            <p className="text-emerald-400/60 text-xs font-display tracking-widest uppercase mb-3">Navigate</p>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-1.5">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/identify', label: 'Identify a Species' },
                  { to: '/species', label: 'Species Explorer' },
                  { to: '/model-lab', label: 'AI Model Lab' },
                  { to: '/about', label: 'About' },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <NavLink to={to} className="text-emerald-300/55 text-xs hover:text-emerald-300 transition-colors">
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div>
            <p className="text-emerald-400/60 text-xs font-display tracking-widest uppercase mb-3">Project Facts</p>
            <ul className="flex flex-col gap-1.5">
              {[
                '15 trained species classes',
                '2,260 training images',
                'Single-layer ANN: 70.67% val. accuracy',
                'Multi-layer ANN: 48.00% val. accuracy',
                'Built with TensorFlow, FastAPI & React',
              ].map((f) => (
                <li key={f} className="text-emerald-300/45 text-xs flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">›</span>{f}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="section-divider" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
          <p className="text-emerald-300/30 text-xs">
            Educational purposes only · Results are experimental · Confidence scores do not guarantee correct identification
          </p>
          <p className="text-emerald-300/25 text-xs">{new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
