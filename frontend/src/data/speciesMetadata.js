/**
 * Curated metadata for the 15 ButterflyAI class names.
 * Keys MUST match models/class_names.json exactly (uppercase).
 *
 * Sources are listed per species. Fields are omitted when they cannot
 * be verified. This is a field-guide overlay — it is NOT model explainability.
 */

export const SPECIES_METADATA = {
  'ARCIGERA FLOWER MOTH': {
    commonName: 'Arcigera Flower Moth',
    scientificName: 'Schinia arcigera',
    type: 'moth',
    family: 'Noctuidae',
    distribution: 'North America, from Nova Scotia to Florida, west to Arizona and Idaho, and north to Saskatchewan',
    habitat: 'Open habitats including meadows, roadsides, and areas where aster host plants grow',
    identifyingFeatures: [
      'Forewings pale yellowish-brown with a dark brown blotch pattern',
      'Hindwings paler, typically whitish-grey',
      'Compact body typical of flower moths in the genus Schinia',
    ],
    lookFor: [
      { label: 'Wing colours', detail: 'Pale yellowish-brown forewings contrasting with paler hindwings' },
      { label: 'Wing patterns', detail: 'A distinctive dark brown blotch on the forewing' },
      { label: 'Shape', detail: 'Stout, relatively compact noctuid moth silhouette' },
    ],
    facts: [
      'First described by Achille Guenée in 1852.',
      'Belong to the flower moths (Schinia), many of which are associated with composite flowers.',
    ],
    sources: [
      { label: 'Wikipedia — Schinia arcigera', href: 'https://en.wikipedia.org/wiki/Schinia_arcigera' },
    ],
    imageCredit: 'Wikimedia Commons — Schinia arcigera',
    imageHref: 'https://commons.wikimedia.org/wiki/File:Schinia_arcigera.jpg',
  },

  ATALA: {
    commonName: 'Atala',
    scientificName: 'Eumaeus atala',
    type: 'butterfly',
    family: 'Lycaenidae',
    distribution: 'Southeastern Florida, Cuba, the Bahamas, and the Cayman Islands',
    habitat: 'Coastal hammocks and pine rockland where coontie (Zamia integrifolia) grows',
    identifyingFeatures: [
      'Dark, nearly black wings with iridescent blue-green spots',
      'Bright red-orange abdomen — a distinctive field mark',
      'Underwing also dark, with iridescent blue spotting',
    ],
    lookFor: [
      { label: 'Wing colours', detail: 'Nearly black wings with metallic blue-green spots' },
      { label: 'Body colour', detail: 'Bright red-orange abdomen' },
      { label: 'Markings', detail: 'Iridescent spots on both upper- and undersides' },
    ],
    facts: [
      'Also called the coontie hairstreak.',
      'Its coloration and habits are unusual among butterflies in its range.',
    ],
    sources: [
      { label: 'Wikipedia — Eumaeus atala', href: 'https://en.wikipedia.org/wiki/Eumaeus_atala' },
    ],
    imageCredit: 'Wikimedia Commons — Eumaeus atala',
    imageHref: 'https://commons.wikimedia.org/wiki/File:Eumaeus_atalaPCCA20040418-1454A.jpg',
  },

  'BANDED ORANGE HELICONIAN': {
    commonName: 'Banded Orange Heliconian',
    scientificName: 'Dryadula phaetusa',
    type: 'butterfly',
    family: 'Nymphalidae',
    distribution: 'Native from Brazil to central Mexico; rarely recorded as far north as central Florida in summer',
    habitat: 'Tropical and subtropical forests, forest edges, and open sunny areas',
    identifyingFeatures: [
      'Bright orange wings with thick black bands in males',
      'Females are a duller orange with fuzzier black stripes',
      'Long, relatively narrow forewings typical of heliconians',
    ],
    lookFor: [
      { label: 'Wing colours', detail: 'Bright orange with bold black banding' },
      { label: 'Wing patterns', detail: 'Thick transverse black stripes across both wings' },
      { label: 'Shape', detail: 'Elongated heliconian wing outline' },
    ],
    facts: [
      'Also known as the banded orange or orange tiger.',
      'It is the sole species in the genus Dryadula.',
    ],
    sources: [
      { label: 'Wikipedia — Dryadula phaetusa', href: 'https://en.wikipedia.org/wiki/Dryadula_phaetusa' },
    ],
    imageCredit: 'Wikimedia Commons — Dryadula phaetusa male',
    imageHref: 'https://commons.wikimedia.org/wiki/File:Banded_orange_heliconian_(Dryadula_phaetusa)_male.jpg',
  },

  'BROOKES BIRDWING': {
    commonName: "Rajah Brooke's Birdwing",
    scientificName: 'Trogonoptera brookiana',
    type: 'butterfly',
    family: 'Papilionidae',
    distribution: 'Rainforests of the Thai-Malay Peninsula, Borneo, Natuna, Sumatra, and nearby islands west of Sumatra',
    habitat: 'Lowland tropical rainforest',
    identifyingFeatures: [
      'Males: velvety black wings with an iridescent green diagonal band on the forewing',
      'A prominent red collar on the thorax of males',
      'Very large birdwing size compared with most butterflies',
    ],
    lookFor: [
      { label: 'Wing colours', detail: 'Velvety black with a vivid iridescent green band (males)' },
      { label: 'Body markings', detail: 'Red thoracic collar' },
      { label: 'Size', detail: 'Large birdwing silhouette' },
    ],
    facts: [
      'Named by Alfred Russel Wallace in 1855 after James Brooke, the Rajah of Sarawak.',
      'Listed on CITES Appendix II; it is the national butterfly of Malaysia.',
    ],
    sources: [
      { label: "Wikipedia — Trogonoptera brookiana", href: 'https://en.wikipedia.org/wiki/Trogonoptera_brookiana' },
    ],
    imageCredit: 'Wikimedia Commons — Trogonoptera brookiana albescens',
    imageHref: 'https://commons.wikimedia.org/wiki/File:Trogonoptera_brookiana_albescens_197993570.jpg',
    datasetNote: 'The trained class label is spelled BROOKES BIRDWING.',
  },

  'BROWN ARGUS': {
    commonName: 'Brown Argus',
    scientificName: 'Aricia agestis',
    type: 'butterfly',
    family: 'Lycaenidae',
    distribution: 'Across the Palearctic, west to coastal Wales and east to Siberia and the Tian Shan',
    habitat: 'Grassland, chalk and limestone hills, heathland, and coastal dunes',
    identifyingFeatures: [
      'Upperwings brown with a row of orange spots along the hindwing margin',
      'Underside grey-brown with black spots ringed white and orange marginal spots',
      'Lacks the blue upperwing colour of many related “blue” butterflies',
    ],
    lookFor: [
      { label: 'Wing colours', detail: 'Plain brown upperside rather than blue' },
      { label: 'Wing patterns', detail: 'Orange spots along the hindwing margin' },
      { label: 'Underside', detail: 'Black spots ringed with white' },
    ],
    facts: [
      'A small lycaenid butterfly found throughout much of the Palearctic realm.',
    ],
    sources: [
      { label: 'Wikipedia — Aricia agestis', href: 'https://en.wikipedia.org/wiki/Aricia_agestis' },
    ],
    imageCredit: 'Wikimedia Commons — Brown argus male',
    imageHref: 'https://commons.wikimedia.org/wiki/File:Brown_argus_(Aricia_agestis)_male_2.jpg',
  },

  'BROWN SIPROETA': {
    commonName: 'Brown Siproeta (Rusty-tipped Page)',
    scientificName: 'Siproeta epaphus',
    type: 'butterfly',
    family: 'Nymphalidae',
    distribution: 'Southern North America through Central America to northern and central South America, including south Texas and rarely southern New Mexico',
    habitat: 'Tropical habitats; common throughout Central America',
    identifyingFeatures: [
      'Inner upperwing dark, with a bold white band across both wings',
      'Outer forewing rusty orange in the widespread subspecies S. epaphus epaphus',
      'Underside brown with the same white transverse stripe',
    ],
    lookFor: [
      { label: 'Wing colours', detail: 'Dark inner wings with rusty-orange forewing tips' },
      { label: 'Wing patterns', detail: 'A bold white band crossing both wings' },
      { label: 'Shape', detail: 'Large page-butterfly outline' },
    ],
    facts: [
      'Also called the rusty-tipped page.',
      'Wings average about 7.0–7.5 cm.',
    ],
    sources: [
      { label: 'Wikipedia — Siproeta epaphus', href: 'https://en.wikipedia.org/wiki/Siproeta_epaphus' },
    ],
    imageCredit: 'Wikimedia Commons — Siproeta epaphus',
    imageHref: 'https://commons.wikimedia.org/wiki/File:Siproeta_epaphus.jpg',
  },

  'CHALK HILL BLUE': {
    commonName: 'Chalkhill Blue',
    scientificName: 'Lysandra coridon',
    type: 'butterfly',
    family: 'Lycaenidae',
    distribution: 'Throughout much of the Palearctic, primarily where chalk-rich grassland occurs',
    habitat: 'Chalk and limestone grassland',
    identifyingFeatures: [
      'Males pale silvery blue; females brown',
      'Both sexes have chequered wing fringes',
      'Small lycaenid size',
    ],
    lookFor: [
      { label: 'Wing colours', detail: 'Pale silvery blue in males; brown in females' },
      { label: 'Wing edges', detail: 'Chequered fringes around the wings' },
      { label: 'Habitat cue', detail: 'Typically associated with chalk grassland' },
    ],
    facts: [
      'A small Palearctic butterfly strongly associated with chalk grasslands.',
      'Also treated in some literature as Polyommatus coridon.',
    ],
    sources: [
      { label: 'Wikipedia — Chalkhill blue', href: 'https://en.wikipedia.org/wiki/Chalkhill_blue' },
    ],
    imageCredit: 'Wikimedia Commons — Lysandra coridon male',
    imageHref: 'https://commons.wikimedia.org/wiki/File:Lysandra_coridon._male_-_Flickr_-_gailhampshire.jpg',
  },

  CRECENT: {
    commonName: 'Pearl Crescent',
    scientificName: 'Phyciodes tharos',
    type: 'butterfly',
    family: 'Nymphalidae',
    distribution: 'Most of the United States except the west coast, throughout Mexico, and parts of southern Canada (especially Ontario)',
    habitat: 'Open areas such as pastures, road edges, vacant lots, fields, and open pine woods',
    identifyingFeatures: [
      'Upperside orange with black borders and fine black marks across the outer wing',
      'Underside of the hindwing has a dark marginal patch containing a light crescent',
      'Small, compact brush-footed butterfly',
    ],
    lookFor: [
      { label: 'Wing colours', detail: 'Orange upperside with black borders' },
      { label: 'Wing patterns', detail: 'Fine black marks across the outer wing' },
      { label: 'Diagnostic mark', detail: 'Pale crescent in a dark patch on the hindwing underside' },
    ],
    facts: [
      'The pattern is quite variable across individuals.',
      'Males usually have black antenna knobs.',
    ],
    sources: [
      { label: 'Wikipedia — Pearl crescent', href: 'https://en.wikipedia.org/wiki/Pearl_crescent' },
    ],
    imageCredit: 'Wikimedia Commons — Pearl crescent',
    imageHref: 'https://commons.wikimedia.org/wiki/File:Pearl_crescent_(30350).jpg',
    datasetNote: 'The trained class label is spelled CRECENT, matching the original dataset folder name.',
  },

  'GREEN HAIRSTREAK': {
    commonName: 'Green Hairstreak',
    scientificName: 'Callophrys rubi',
    type: 'butterfly',
    family: 'Lycaenidae',
    distribution: 'Widespread across Europe and temperate Asia',
    habitat: 'Heathland, moorland, chalk grassland, woodland edges, and scrub',
    identifyingFeatures: [
      'Vivid green underside — the most useful field character at rest',
      'Upperside brown and usually hidden when the wings are closed',
      'May show a faint broken white “hairstreak” line on the underside',
    ],
    lookFor: [
      { label: 'Wing colours', detail: 'Iridescent green underside; brown upperside' },
      { label: 'Wing patterns', detail: 'A faint broken white hairstreak line may be present' },
      { label: 'Resting pose', detail: 'Usually sits with wings closed, showing the green underside' },
    ],
    facts: [
      'A small lycaenid butterfly; the green colour is a classic identification character.',
    ],
    sources: [
      { label: 'Wikipedia — Green hairstreak', href: 'https://en.wikipedia.org/wiki/Green_hairstreak' },
    ],
    imageCredit: 'Wikimedia Commons — Callophrys rubi',
    imageHref: 'https://commons.wikimedia.org/wiki/File:Green_hairstreak_(Callophrys_rubi)_3.jpg',
  },

  'HERCULES MOTH': {
    commonName: 'Hercules Moth',
    scientificName: 'Coscinocera hercules',
    type: 'moth',
    family: 'Saturniidae',
    distribution: 'New Guinea and northern Australia',
    habitat: 'Tropical rainforest',
    identifyingFeatures: [
      'Very large saturniid moth; size is immediately distinctive',
      'Brown wings with transparent “window” patches and complex cream and dark markings',
      'Males have long, swept-back hindwing tails',
    ],
    lookFor: [
      { label: 'Size', detail: 'Among the largest moths; enormous wing area' },
      { label: 'Wing patterns', detail: 'Transparent wing windows and intricate brown patterning' },
      { label: 'Shape', detail: 'Long hindwing tails in males' },
    ],
    facts: [
      'Endemic to New Guinea and northern Australia; described by William Henry Miskin in 1876.',
    ],
    sources: [
      { label: 'Wikipedia — Coscinocera hercules', href: 'https://en.wikipedia.org/wiki/Coscinocera_hercules' },
    ],
    imageCredit: 'Wikimedia Commons — Coscinocera hercules male',
    imageHref: 'https://commons.wikimedia.org/wiki/File:Coscinocera_hercules_male_from_Arfak.jpg',
  },

  'HUMMING BIRD HAWK MOTH': {
    commonName: 'Hummingbird Hawk-moth',
    scientificName: 'Macroglossum stellatarum',
    type: 'moth',
    family: 'Sphingidae',
    distribution: 'Temperate regions of Eurasia',
    habitat: 'Gardens, meadows, and other open sunny places with nectar flowers',
    identifyingFeatures: [
      'Hovers in front of flowers while feeding, resembling a hummingbird',
      'Olive-brown forewings; orange hindwings often visible in flight',
      'Long proboscis; stout body with a fan-shaped tail of hairs',
    ],
    lookFor: [
      { label: 'Behaviour', detail: 'Hovering flight in front of tubular flowers' },
      { label: 'Wing colours', detail: 'Olive-brown forewings and orange hindwings' },
      { label: 'Body shape', detail: 'Cigar-shaped hawk-moth body with a fan-like tail' },
    ],
    facts: [
      'Named for its resemblance to hummingbirds — an example of convergent evolution.',
      'Uses a long proboscis to take nectar while hovering.',
    ],
    sources: [
      { label: 'Wikipedia — Hummingbird hawk-moth', href: 'https://en.wikipedia.org/wiki/Hummingbird_hawk-moth' },
    ],
    imageCredit: 'Wikimedia Commons — Macroglossum stellatarum in flight',
    imageHref: 'https://commons.wikimedia.org/wiki/File:Hummingbird_hawk_moth_(Macroglossum_stellatarum)_in_flight.jpg',
    datasetNote: 'The trained class label is spelled HUMMING BIRD HAWK MOTH.',
  },

  'MOURNING CLOAK': {
    commonName: 'Mourning Cloak',
    scientificName: 'Nymphalis antiopa',
    type: 'butterfly',
    family: 'Nymphalidae',
    distribution: 'Eurasia and North America',
    habitat: 'Woodland edges, river corridors, parks, and gardens',
    identifyingFeatures: [
      'Dark maroon to chocolate-brown upperwings with a pale yellow or cream border',
      'A row of iridescent blue spots along the inner edge of the pale border',
      'Underside dark with a pale scalloped border, resembling bark',
    ],
    lookFor: [
      { label: 'Wing colours', detail: 'Dark maroon-brown wings' },
      { label: 'Wing borders', detail: 'Pale yellow or cream margins' },
      { label: 'Markings', detail: 'Blue spots near the wing edges, inside the pale border' },
    ],
    facts: [
      'Known as the Camberwell beauty in Britain.',
      'A powerful flier that is sometimes found far from its usual range during migration.',
    ],
    sources: [
      { label: 'Wikipedia — Nymphalis antiopa', href: 'https://en.wikipedia.org/wiki/Nymphalis_antiopa' },
    ],
    imageCredit: 'Wikimedia Commons — Mourning Cloak',
    imageHref: 'https://commons.wikimedia.org/wiki/File:The_Mourning_Cloak_(23369139485).jpg',
  },

  'SCARCE SWALLOW': {
    commonName: 'Scarce Swallowtail',
    scientificName: 'Iphiclides podalirius',
    type: 'butterfly',
    family: 'Papilionidae',
    distribution: 'Europe and parts of Asia; uncommon as a British species, which is the origin of the English name “scarce”',
    habitat: 'Warm hillsides, scrub, orchards, and similar open country',
    identifyingFeatures: [
      'Long swallowtail streamers on the hindwings',
      'Pale cream or yellowish wings with black longitudinal stripes',
      'Blue and reddish markings near the hindwing tails',
    ],
    lookFor: [
      { label: 'Shape', detail: 'Long hindwing tails' },
      { label: 'Wing colours', detail: 'Cream to pale yellow ground colour' },
      { label: 'Wing patterns', detail: 'Black stripes across the wings, with coloured tail spots' },
    ],
    facts: [
      'Also called the sail swallowtail or pear-tree swallowtail.',
    ],
    sources: [
      { label: 'Wikipedia — Scarce swallowtail', href: 'https://en.wikipedia.org/wiki/Scarce_swallowtail' },
    ],
    imageCredit: 'Wikimedia Commons — Iphiclides podalirius',
    imageHref: 'https://commons.wikimedia.org/wiki/File:Iphiclides_podalirius.jpg',
    datasetNote: 'The trained class label is spelled SCARCE SWALLOW.',
  },

  'SLEEPY ORANGE': {
    commonName: 'Sleepy Orange',
    scientificName: 'Eurema nicippe',
    type: 'butterfly',
    family: 'Pieridae',
    distribution: 'Central America north along the United States–Mexico border, often ranging into non-mountainous parts of the southeastern United States',
    habitat: 'Open areas including fields, roadsides, and woodland edges',
    identifyingFeatures: [
      'Bright orange upperwings with black borders',
      'A dark marking near the forewing apex',
      'Typical sulphur/white family wing shape',
    ],
    lookFor: [
      { label: 'Wing colours', detail: 'Bright orange with a black border' },
      { label: 'Markings', detail: 'Dark forewing apex mark' },
      { label: 'Family look', detail: 'Sulphur butterfly outline rather than a swallowtail or nymphalid' },
    ],
    facts: [
      'A North American pierid; some checklists place it in the genus Abaeis.',
    ],
    sources: [
      { label: 'Wikipedia — Eurema nicippe', href: 'https://en.wikipedia.org/wiki/Eurema_nicippe' },
    ],
    imageCredit: 'Wikimedia Commons — Sleepy Orange',
    imageHref: 'https://commons.wikimedia.org/wiki/File:Sleepy_Orange,_Megan_McCarty47.jpg',
  },

  'WHITE LINED SPHINX MOTH': {
    commonName: 'White-lined Sphinx',
    scientificName: 'Hyles lineata',
    type: 'moth',
    family: 'Sphingidae',
    distribution: 'Widespread in the Americas; frequently encountered across North America',
    habitat: 'A wide range of open and semi-open habitats, including gardens and arid country',
    identifyingFeatures: [
      'White lines along the veins of the olive-brown forewing',
      'Pink or rose-red hindwings with a dark border',
      'Thick, streamlined hawk-moth body',
    ],
    lookFor: [
      { label: 'Wing patterns', detail: 'White lining along the forewing veins' },
      { label: 'Wing colours', detail: 'Pink hindwings contrasting with darker forewings' },
      { label: 'Shape', detail: 'Powerful hawk-moth body; often hovers at flowers' },
    ],
    facts: [
      'Sometimes called a “hummingbird moth” because of its hovering flight, but it is a different species from the hummingbird hawk-moth.',
    ],
    sources: [
      { label: 'Wikipedia — Hyles lineata', href: 'https://en.wikipedia.org/wiki/Hyles_lineata' },
    ],
    imageCredit: 'Wikimedia Commons — White-lined sphinx moth',
    imageHref: 'https://commons.wikimedia.org/wiki/File:White-Lined_Sphinx_Moth-_Wings_extended.JPG',
  },
}

export function getSpeciesMeta(className) {
  if (!className) return null
  return SPECIES_METADATA[className.toUpperCase()] ?? null
}
