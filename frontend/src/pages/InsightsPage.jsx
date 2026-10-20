import { BarChart2, Layers, Database, Award, AlertTriangle, Info } from 'lucide-react'

const MODEL_DATA = {
  classes: 15,
  trainImages: 2260,
  valImages: 75,
  testImages: 75,
  imgSize: '64 × 64 px',
  models: [
    {
      name: 'Single-Layer ANN',
      valAccuracy: 70.67,
      description: 'One hidden layer feedforward network. Achieved the higher validation accuracy of the two architectures.',
      colour: '#34d399',
    },
    {
      name: 'Multilayer ANN',
      valAccuracy: 48.00,
      description: 'Deeper feedforward network with multiple hidden layers. Showed signs of overfitting on this dataset size.',
      colour: '#2dd4bf',
    },
  ],
}

export default function InsightsPage() {
  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 fade-up">
          <p className="text-emerald-400/60 text-xs font-display tracking-[0.2em] uppercase mb-3">
            Experimental Results
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl gradient-text mb-4">Model Insights</h1>
          <p className="text-emerald-300/65 text-base max-w-2xl mx-auto">
            Honest, unembellished metrics from our university ANN experiments.
            These are <strong className="text-emerald-400">validation results</strong>, not production benchmarks.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-3 glass-card p-4 mb-10 fade-up fade-up-delay-1"
             style={{ borderColor: 'rgba(251,191,36,0.2)', background: 'rgba(251,191,36,0.05)' }}>
          <AlertTriangle size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
          <p className="text-yellow-300/70 text-sm leading-relaxed">
            These accuracies were measured on a <strong className="text-yellow-300">75-image validation set</strong>.
            They reflect the model's performance during training experiments, not real-world deployment reliability.
            Treat these numbers as a research reference.
          </p>
        </div>

        {/* Dataset stats */}
        <section className="mb-10 fade-up fade-up-delay-1" aria-labelledby="dataset-heading">
          <h2 id="dataset-heading" className="text-emerald-400 font-display font-semibold text-lg mb-5 flex items-center gap-2">
            <Database size={18} /> Dataset Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Species Classes', value: MODEL_DATA.classes, icon: Layers },
              { label: 'Training Images', value: MODEL_DATA.trainImages.toLocaleString(), icon: BarChart2 },
              { label: 'Validation Images', value: MODEL_DATA.valImages, icon: BarChart2 },
              { label: 'Test Images', value: MODEL_DATA.testImages, icon: BarChart2 },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="stat-card">
                <Icon size={20} className="text-emerald-400/60 mx-auto mb-3" />
                <div className="font-serif text-3xl gradient-text mb-1">{value}</div>
                <div className="text-emerald-300/50 text-xs">{label}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 glass-card p-4 flex items-center gap-3 text-sm">
            <Info size={15} className="text-emerald-400/60 flex-shrink-0" />
            <p className="text-emerald-300/60">
              Images resized to <strong className="text-emerald-300">{MODEL_DATA.imgSize}</strong> ·
              Pixel values normalised to [0, 1] via a Rescaling layer in the model
            </p>
          </div>
        </section>

        {/* Model comparison */}
        <section className="mb-10 fade-up fade-up-delay-2" aria-labelledby="models-heading">
          <h2 id="models-heading" className="text-emerald-400 font-display font-semibold text-lg mb-5 flex items-center gap-2">
            <Award size={18} /> Validation Accuracy Comparison
          </h2>
          <div className="flex flex-col gap-5">
            {MODEL_DATA.models.map((m) => (
              <div key={m.name} className="glass-card p-6">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h3 className="font-display font-semibold text-emerald-300 text-base">{m.name}</h3>
                  <span
                    className="text-2xl font-serif font-bold"
                    style={{ color: m.colour }}
                  >
                    {m.valAccuracy.toFixed(2)}%
                  </span>
                </div>
                <div className="confidence-bar mb-4" style={{ height: '8px' }}>
                  <div
                    className="confidence-fill"
                    style={{ width: `${m.valAccuracy}%`, background: `linear-gradient(90deg, #059669, ${m.colour})` }}
                    role="meter"
                    aria-valuenow={m.valAccuracy}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${m.name} validation accuracy`}
                  />
                </div>
                <p className="text-emerald-300/55 text-sm leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interpretation section */}
        <section className="fade-up fade-up-delay-3" aria-labelledby="interpretation-heading">
          <h2 id="interpretation-heading" className="text-emerald-400 font-display font-semibold text-lg mb-5 flex items-center gap-2">
            <Info size={18} /> How to Read These Results
          </h2>
          <div className="glass-card p-6">
            <div className="flex flex-col gap-5">
              {INTERPRETATION.map(({ heading, body }) => (
                <div key={heading}>
                  <p className="text-emerald-300 font-medium text-sm mb-1">{heading}</p>
                  <p className="text-emerald-300/55 text-sm leading-relaxed">{body}</p>
                  <div className="section-divider mt-4" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

const INTERPRETATION = [
  {
    heading: 'Why are these validation accuracies?',
    body: 'Validation accuracy is measured on a held-out set never seen during training. It gives a more honest picture of generalisation than training accuracy, which typically inflates.',
  },
  {
    heading: 'Why did the multilayer ANN score lower?',
    body: 'With only ~2,260 training images spread across 15 classes, a deeper network is prone to overfitting. The simpler single-layer model generalised better under these data constraints.',
  },
  {
    heading: 'Should I trust a prediction from this model?',
    body: 'No — this is a university research experiment, not a field guide. Confidence scores reflect the model\'s internal distribution, not verified biological accuracy. Use it as a demonstration, not a definitive identification tool.',
  },
  {
    heading: 'What happens if I upload an unsupported species?',
    body: 'The model will still return a prediction — it forces every image into one of its 15 known classes. A high confidence score for an incorrect species is possible and expected.',
  },
]
