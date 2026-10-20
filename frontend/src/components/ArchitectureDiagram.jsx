import { MODEL_RESULTS } from '../data/modelResults'

function LayerChip({ layer, accent }) {
  return (
    <div
      className="arch-chip"
      style={{ borderColor: `${accent}55`, background: `${accent}14` }}
    >
      <p className="text-[11px] font-display font-semibold tracking-wide uppercase" style={{ color: accent }}>
        {layer.label}
      </p>
      <p className="text-emerald-100/80 text-xs mt-0.5">{layer.detail}</p>
    </div>
  )
}

function NetworkSketch({ variant }) {
  const isDeep = variant === 'multi'
  return (
    <svg viewBox="0 0 360 160" className="w-full h-36" aria-hidden="true">
      <defs>
        <linearGradient id={`arch-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={isDeep ? '#2dd4bf' : '#34d399'} />
          <stop offset="100%" stopColor={isDeep ? '#0d9488' : '#059669'} />
        </linearGradient>
      </defs>
      {/* Input grid */}
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={18 + c * 10}
            y={54 + r * 10}
            width={8}
            height={8}
            rx="1"
            fill={`url(#arch-${variant})`}
            opacity={0.35 + r * 0.15}
          />
        )),
      )}
      <text x="18" y="48" fill="#6ee7b7" fontSize="9" opacity="0.7">64×64×3</text>

      {isDeep ? (
        <>
          {[28, 48, 68, 88, 108, 128].map((y, i) => (
            <circle key={y} cx="140" cy={y} r={i === 0 || i === 5 ? 5 : 6} fill="#2dd4bf" opacity="0.85" />
          ))}
          <text x="118" y="22" fill="#99f6e4" fontSize="9">256 ReLU</text>
          {[40, 64, 88, 112].map((y) => (
            <circle key={y} cx="230" cy={y} r="6" fill="#14b8a6" opacity="0.9" />
          ))}
          <text x="208" y="28" fill="#99f6e4" fontSize="9">128 ReLU</text>
          {[46, 66, 86, 106].map((y, i) => (
            <circle key={y} cx="320" cy={y} r="5" fill={i === 0 ? '#fbbf24' : '#5eead4'} />
          ))}
          <text x="292" y="34" fill="#fde68a" fontSize="9">15 Softmax</text>
          <text x="200" y="150" fill="#5eead4" fontSize="9" opacity="0.7">Dropout 0.3 between dense layers</text>
        </>
      ) : (
        <>
          <text x="118" y="48" fill="#6ee7b7" fontSize="9" opacity="0.7">Flatten 12,288</text>
          {[40, 58, 76, 94, 112].map((y) => (
            <circle key={y} cx="160" cy={y} r="4" fill="#34d399" opacity="0.5" />
          ))}
          {[46, 66, 86, 106].map((y, i) => (
            <circle key={y} cx="280" cy={y} r="7" fill={i === 0 ? '#fbbf24' : '#34d399'} />
          ))}
          <text x="248" y="34" fill="#fde68a" fontSize="9">15 Softmax</text>
          <text x="108" y="148" fill="#6ee7b7" fontSize="9" opacity="0.7">No hidden dense layer</text>
        </>
      )}
    </svg>
  )
}

export default function ArchitectureDiagram() {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {MODEL_RESULTS.map((model) => (
        <article key={model.id} className="glass-card p-6">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="font-display font-semibold text-emerald-200">{model.name}</h3>
              <p className="text-emerald-300/50 text-xs mt-1">
                {model.deployed ? 'Selected for deployment' : 'Comparison architecture'}
              </p>
            </div>
            {model.deployed && (
              <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/20">
                Deployed
              </span>
            )}
          </div>
          <NetworkSketch variant={model.id} />
          <div className="flex flex-col gap-2 mt-4">
            {model.layers.map((layer) => (
              <LayerChip key={`${model.id}-${layer.label}-${layer.detail}`} layer={layer} accent={model.colour} />
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}
