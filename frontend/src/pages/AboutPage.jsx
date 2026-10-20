import { GraduationCap, Cpu, Database, Code2, Layers, Zap } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 fade-up">
          <p className="text-emerald-400/60 text-xs font-display tracking-[0.2em] uppercase mb-3">
            University Research Project
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl gradient-text mb-4">About ButterflyAI</h1>
          <p className="text-emerald-300/65 text-base max-w-2xl mx-auto leading-relaxed">
            A transparent look at how this project was built — from raw data to live predictions.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-8">
          {SECTIONS.map((s, i) => (
            <section
              key={s.heading}
              className={`glass-card p-7 fade-up fade-up-delay-${Math.min(i + 1, 4)}`}
              aria-labelledby={`about-${i}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(52,211,153,0.2)' }}
                >
                  <s.Icon size={18} className="text-emerald-400" />
                </div>
                <h2 id={`about-${i}`} className="font-display font-semibold text-emerald-300 text-lg">
                  {s.heading}
                </h2>
              </div>
              <div className="text-emerald-300/65 text-sm leading-relaxed space-y-3">
                {s.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
              </div>
              {s.items && (
                <ul className="mt-4 flex flex-col gap-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-emerald-300/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Technology stack */}
        <section className="mt-8 glass-card p-7 fade-up fade-up-delay-4" aria-labelledby="tech-stack-heading">
          <h2 id="tech-stack-heading" className="font-display font-semibold text-emerald-300 text-lg mb-5 flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(52,211,153,0.2)' }}
            >
              <Code2 size={18} className="text-emerald-400" />
            </div>
            Technology Stack
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TECH_STACK.map(({ name, role, color }) => (
              <div
                key={name}
                className="rounded-xl p-3 text-center"
                style={{ background: 'rgba(10,61,30,0.5)', border: '1px solid rgba(52,211,153,0.12)' }}
              >
                <p className="font-display font-semibold text-sm" style={{ color }}>{name}</p>
                <p className="text-emerald-300/45 text-xs mt-0.5">{role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

const SECTIONS = [
  {
    Icon: GraduationCap,
    heading: 'Project Overview',
    paragraphs: [
      'ButterflyAI is a university coursework project exploring artificial neural networks (ANNs) for image classification. The goal was to implement, train, and compare feedforward ANN architectures from scratch using TensorFlow/Keras and evaluate their performance on a real butterfly species dataset.',
      'The project covers the entire machine learning pipeline: data collection, preprocessing, model design, training, evaluation, and deployment through a web interface.',
    ],
  },
  {
    Icon: Database,
    heading: 'Dataset & Preparation',
    paragraphs: [
      'The dataset was sourced from publicly available butterfly image collections and organised into 15 species classes. A stratified split was applied to produce training, validation, and test subsets.',
    ],
    items: [
      '15 butterfly species classes',
      '2,260 training images',
      '75 validation images',
      '75 test images',
      'Images resized to 64 × 64 pixels',
      'Pixel values normalised to [0, 1] via a Keras Rescaling layer',
    ],
  },
  {
    Icon: Layers,
    heading: 'Single-Layer ANN',
    paragraphs: [
      'The first architecture is a single hidden-layer feedforward network. The input image is flattened from 64×64×3 to a 12,288-dimensional vector. A single dense hidden layer with ReLU activation is followed by a softmax output layer over 15 classes.',
      'This model achieved 70.67% validation accuracy — the best of the two experimental architectures. Its simplicity helped it generalise better given the limited dataset size.',
    ],
  },
  {
    Icon: Cpu,
    heading: 'Multilayer ANN',
    paragraphs: [
      'The second architecture stacks multiple dense hidden layers with ReLU activations and dropout regularisation. The increased depth was intended to capture more complex feature interactions.',
      'Despite the added capacity, the multilayer ANN achieved only 48.00% validation accuracy, likely due to overfitting on the relatively small training set. This result highlights a common challenge in deep learning: more parameters do not always mean better generalisation.',
    ],
  },
  {
    Icon: Zap,
    heading: 'FastAPI Backend',
    paragraphs: [
      'The trained Keras model is served via a FastAPI application. The /predict endpoint accepts a multipart image upload, preprocesses it identically to the training pipeline, runs inference, and returns the top 3 predicted species with confidence scores.',
      'CORS is configured to allow requests from the Vite development server at localhost:5173.',
    ],
  },
]

const TECH_STACK = [
  { name: 'TensorFlow',  role: 'ANN training',       color: '#f59e0b' },
  { name: 'Keras',       role: 'Model API',           color: '#ef4444' },
  { name: 'FastAPI',     role: 'REST backend',        color: '#34d399' },
  { name: 'Pillow',      role: 'Image processing',    color: '#a78bfa' },
  { name: 'NumPy',       role: 'Array maths',         color: '#60a5fa' },
  { name: 'React 19',    role: 'UI framework',        color: '#38bdf8' },
  { name: 'Vite',        role: 'Build tool',          color: '#fbbf24' },
  { name: 'Tailwind CSS',role: 'Styling',             color: '#2dd4bf' },
  { name: 'Lucide',      role: 'Icons',               color: '#6ee7b7' },
]
