/**
 * ButterflyAI – Actual experimental results
 * Parsed from results/model_comparison.csv and results/dataset_summary.csv
 *
 * model_comparison.csv:
 *   Model, Accuracy, Precision, Recall, F1 Score
 *   Single-Layer ANN, 0.7067, 0.7717, 0.7067, 0.7172
 *   Multi-Layer ANN,  0.5867, 0.6625, 0.5867, 0.5699
 *
 * dataset_summary.csv: 15 species, 5 val + 5 test images each, ~140-187 train each
 */

export const DATASET_STATS = {
  originalClasses: 100,
  originalTrainImages: 12594,
  selectedClasses: 15,
  trainImages: 2260,
  valImages: 75,
  testImages: 75,
  imagesPerClass: { val: 5, test: 5 },
  imgWidth: 64,
  imgHeight: 64,
  imgChannels: 3,
}

/** Per-class training image counts from dataset_summary.csv */
export const CLASS_DISTRIBUTION = [
  { species: 'ARCIGERA FLOWER MOTH',    train: 140 },
  { species: 'ATALA',                   train: 143 },
  { species: 'BANDED ORANGE HELICONIAN',train: 139 },
  { species: 'BROOKES BIRDWING',        train: 165 },
  { species: 'BROWN ARGUS',             train: 169 },
  { species: 'BROWN SIPROETA',          train: 140 },
  { species: 'CHALK HILL BLUE',         train: 149 },
  { species: 'CRECENT',                 train: 138 },
  { species: 'GREEN HAIRSTREAK',        train: 176 },
  { species: 'HERCULES MOTH',           train: 137 },
  { species: 'HUMMING BIRD HAWK MOTH',  train: 143 },
  { species: 'MOURNING CLOAK',          train: 187 },
  { species: 'SCARCE SWALLOW',          train: 139 },
  { species: 'SLEEPY ORANGE',           train: 152 },
  { species: 'WHITE LINED SPHINX MOTH', train: 143 },
]

/**
 * Model comparison — from model_comparison.csv (test set metrics)
 * and training experiments (val accuracy/loss).
 *
 * Values rounded to 4 decimal places as in the CSV.
 * val_accuracy and val_loss are from our training experiment logs.
 */
export const MODEL_RESULTS = [
  {
    id: 'single',
    name: 'Single-Layer ANN',
    shortName: 'Single-Layer',
    deployed: true,
    // Architecture
    layers: [
      { label: 'Input',     detail: '64×64×3 (RGB)' },
      { label: 'Rescaling', detail: '÷ 255' },
      { label: 'Flatten',   detail: '12,288 units' },
      { label: 'Dense',     detail: '15 units · Softmax' },
    ],
    // Training experiment (validation set)
    val_accuracy: 0.7067,
    val_loss: 0.9095,
    // Test set metrics from model_comparison.csv
    test_accuracy:  0.7067,
    test_precision: 0.7717,
    test_recall:    0.7067,
    test_f1:        0.7172,
    colour: '#34d399',
    colourDim: 'rgba(52,211,153,0.15)',
  },
  {
    id: 'multi',
    name: 'Multi-Layer ANN',
    shortName: 'Multi-Layer',
    deployed: false,
    // Architecture
    layers: [
      { label: 'Input',     detail: '64×64×3 (RGB)' },
      { label: 'Rescaling', detail: '÷ 255' },
      { label: 'Flatten',   detail: '12,288 units' },
      { label: 'Dense',     detail: '256 units · ReLU' },
      { label: 'Dropout',   detail: '0.3' },
      { label: 'Dense',     detail: '128 units · ReLU' },
      { label: 'Dropout',   detail: '0.3' },
      { label: 'Dense',     detail: '15 units · Softmax' },
    ],
    // Training experiment (validation set)
    val_accuracy: 0.4800,
    val_loss: 1.3922,
    // Test set metrics from model_comparison.csv
    test_accuracy:  0.5867,
    test_precision: 0.6625,
    test_recall:    0.5867,
    test_f1:        0.5699,
    colour: '#2dd4bf',
    colourDim: 'rgba(45,212,191,0.12)',
  },
]

export const TRAINING_CONFIG = {
  optimizer: 'Adam',
  loss: 'Sparse Categorical Crossentropy',
  batchSize: 32,
  maxEpochs: 20,
  earlyStopping: true,
  framework: 'TensorFlow / Keras',
}
