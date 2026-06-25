import type { CatalogProduct, CatalogVariant } from '../types/catalog'

const sellerId = 'tatcha'
const sourceUrl = 'https://shop.vibevox.pro/tatcha/p/face-ai-skin-technology'

const faceAiDetails = [
  'The AI Skin Analysis tool utilizes deep learning technology to provide users with real-time skin care analysis in HD & SD along with treatment recommendations through accurate detection of wrinkles, spots, skin texture, dark circles, tear trough and up to 15 other skin concerns.',
  'Generative AI advancements simulate skin healing results, giving users emulations of the progress they can expect to see over time.',
  "Powered by Face AI deep learning technology, AI Face Analyzer is an ultra-personalization engine that provides a highly accurate AI face mapping face analysis and product recommendations based on the user's unique facial features and shades.",
  'The powerful Face AI was trained using over 100,000 faces across different genders & ethnic backgrounds, and is capable of delivering an instant and accurate detection of 70+ facial traits and 5 types of personal color palettes.',
]

const dewySkinCreamDescription =
  'Recommended for Dry, Combo to Dry, Hydrating, Plumping, Healthy Aging. Formulated without Mineral oil,...'

const dewySkinCreamDetails = [
  'Recommended for Dry, Combo to Dry, Hydrating, Plumping, Healthy Aging.',
  'Formulated without mineral oil, synthetic fragrances, sulfate detergents, parabens, urea, DEA, TEA, or phthalates.',
  'Dermatologist Tested, Non-Comedogenic, Cruelty-free.',
]

const longevityMemoryDescription =
  'Youth-Restoring Moisturizer Recommended for All Skin Types, Hydrating, Plumping Formulated...'

const longevityMemoryDetails = [
  'Youth-Restoring Moisturizer.',
  'Recommended for All Skin Types, Hydrating, Plumping.',
  'Non-Comedogenic, Dermatologist Tested, Cruelty-free.',
]

const silkSerumDescription =
  'Wrinkle-Smoothing Retinol Alternative Recommended for Hydrating, Healthy Aging, Firming,...'

const silkSerumDetails = [
  'Wrinkle-Smoothing Retinol Alternative.',
  'Recommended for Hydrating, Healthy Aging, Firming, Even Skin Tone.',
  'Dermatologist tested, Cruelty free.',
]

const waterCreamDescription =
  'Lightweight Pore-Refining Moisturizer Recommended for Combo to Oily, Hydrating, Smoothing, Pore...'

const waterCreamDetails = [
  'Lightweight Pore-Refining Moisturizer.',
  'Recommended for Combo to Oily, Hydrating, Smoothing, Pore Minimizing, Even Skin Tone.',
  'Dermatologist Tested, Non-Comedogenic, Cruelty-free.',
]

const waterCreamVariants: CatalogVariant[] = [
  {
    addIcon: 'external',
    chip: 'Full',
    description: waterCreamDescription,
    details: waterCreamDetails,
    externalId: 'water-full',
    id: 'full',
    media: {
      poster: '/water-thumb.webp',
      src: '/water-video.mp4',
      type: 'video',
    },
    title: 'THE WATER CREAM',
  },
  {
    addIcon: 'external',
    chip: 'Grat',
    description: waterCreamDescription,
    details: [
      'Gift-size format of The Water Cream.',
      'Recommended for Combo to Oily, Hydrating, Smoothing, Pore Minimizing, Even Skin Tone.',
    ],
    externalId: 'water-grat',
    id: 'grat',
    media: {
      poster: '/water-grat.png',
      type: 'image',
    },
    title: 'GRAT THE WATER CREAM',
  },
  {
    addIcon: 'external',
    chip: 'Refill',
    description: waterCreamDescription,
    details: [
      'Refill format for The Water Cream.',
      'Recommended for Combo to Oily, Hydrating, Smoothing, Pore Minimizing, Even Skin Tone.',
    ],
    externalId: 'water-refill',
    id: 'refill',
    media: {
      poster: '/water-refill.png',
      type: 'image',
    },
    price: 68,
    title: 'REFILL THE WATER CREAM',
  },
  {
    addIcon: 'external',
    chip: 'Mini',
    description: waterCreamDescription,
    details: [
      'Mini format of The Water Cream.',
      'Recommended for Combo to Oily, Hydrating, Smoothing, Pore Minimizing, Even Skin Tone.',
    ],
    externalId: 'water-mini',
    id: 'mini',
    media: {
      poster: '/water-mini.png',
      type: 'image',
    },
    price: 25,
    title: 'MINI THE WATER CREAM',
  },
]

export const catalogProducts: CatalogProduct[] = [
  {
    cta: 'add',
    description:
      'Rich Line-Plumping Moisturizer Recommended for Dry, Combo to Dry, Hydrating, Plumping, Healthy Aging...',
    details: [
      'Rich Line-Plumping Moisturizer Recommended for Dry, Combo to Dry, Hydrating, Plumping, Healthy Aging.',
      'Formulated without mineral oil, synthetic fragrances, sulfate detergents, parabens, urea, DEA, TEA, or phthalates.',
      'Dermatologist Tested, Non-Comedogenic, Cruelty-free.',
    ],
    externalId: 'dewy-full',
    id: 'dewy-full',
    media: {
      poster: '/dewy-full-thumb.webp',
      src: '/dewy-full-video.mp4',
      type: 'video',
    },
    sellerId,
    sourceUrl,
    title: 'FULL. THE DEWY SKIN CREAM',
  },
  {
    cta: 'add',
    description: dewySkinCreamDescription,
    details: dewySkinCreamDetails,
    externalId: 'dewy',
    id: 'dewy',
    media: {
      poster: '/dewy-thumb.webp',
      src: '/dewy-video.mp4',
      type: 'video',
    },
    sellerId,
    sourceUrl,
    title: 'THE DEWY SKIN CREAM',
    variants: [
      {
        chip: 'Dewy',
        externalId: 'dewy-original',
        id: 'original',
        media: {
          poster: '/dewy-thumb.webp',
          src: '/dewy-video.mp4',
          type: 'video',
        },
      },
      {
        chip: 'Dewy',
        externalId: 'dewy-50-ml',
        id: '50-ml',
        media: {
          poster: '/dewy-50.png',
          type: 'image',
        },
        price: 79,
        title: 'THE DEWY SKIN CREAM 50 ML',
      },
      {
        chip: 'Dewy',
        externalId: 'dewy-30-ml',
        id: '30-ml',
        media: {
          poster: '/dewy-30.png',
          type: 'image',
        },
        price: 89,
        title: 'THE DEWY SKIN CREAM 30 ML',
      },
      {
        chip: 'Rice',
        description:
          'Recommended for Dry, Combo to Dry, Hydrating, Plumping, Healthy Aging Formulated without Mineral oil,...',
        details: [
          'The Rice Polish: Gentle.',
          'Recommended for Dry, Combo to Dry, Hydrating, Plumping, Healthy Aging.',
          'Formulated without mineral oil, synthetic fragrances, sulfate detergents, parabens, urea, DEA, TEA, or phthalates.',
        ],
        externalId: 'rice-polish',
        id: 'rice-polish',
        media: {
          poster: '/rice-polish.png',
          type: 'image',
        },
        price: 69,
        title: 'THE RICE POLISH: GENTLE',
      },
    ],
    variantTiles: [
      { image: '/dewy-thumb.webp', label: '' },
      { image: '/dewy-50.png', label: 'Dewy' },
      { image: '/dewy-30.png', label: 'Dewy' },
      { image: '/rice-polish.png', label: 'Rice' },
    ],
  },
  {
    cta: 'add',
    description: longevityMemoryDescription,
    details: longevityMemoryDetails,
    externalId: 'longevity-memory',
    id: 'longevity-memory',
    media: {
      poster: '/longevity-thumb.webp',
      src: '/longevity-video.mp4',
      type: 'video',
    },
    sellerId,
    sourceUrl,
    startWithBaseMedia: true,
    title: 'THE LONGEVITY MEMORY CREAM',
    variants: [
      {
        chip: 'Full',
        externalId: 'longevity-full',
        id: 'full',
        media: {
          poster: '/longevity-full-variant.png',
          type: 'image',
        },
        price: 92,
      },
      {
        chip: 'Mini',
        externalId: 'longevity-mini',
        id: 'mini',
        media: {
          poster: '/longevity-mini-variant.png',
          type: 'image',
        },
        price: 32,
        title: 'MINI THE LONGEVITY MEMORY CREAM',
      },
    ],
  },
  {
    cta: 'add',
    description: silkSerumDescription,
    details: silkSerumDetails,
    externalId: 'silk',
    id: 'silk',
    media: {
      poster: '/silk-thumb.webp',
      src: '/silk-video.mp4',
      type: 'video',
    },
    price: 99,
    sellerId,
    sourceUrl,
    startWithBaseMedia: true,
    title: 'THE SILK SERUM',
    variants: [
      {
        chip: 'Mini',
        externalId: 'silk-mini',
        id: 'mini',
        media: {
          poster: '/silk-mini-variant.png',
          type: 'image',
        },
        price: 39,
      },
      {
        chip: 'Full.',
        externalId: 'silk-full',
        id: 'full',
        media: {
          poster: '/silk-full-variant.png',
          type: 'image',
        },
        price: 99,
      },
    ],
  },
  {
    addIcon: 'external',
    chips: ['Full', 'Grat', 'Refill', 'Mini'],
    cta: 'add',
    description: waterCreamDescription,
    details: waterCreamDetails,
    externalId: 'water',
    id: 'water',
    media: {
      poster: '/water-thumb.webp',
      src: '/water-video.mp4',
      type: 'video',
    },
    sellerId,
    sourceUrl,
    title: 'THE WATER CREAM',
    variants: waterCreamVariants,
  },
  {
    addIcon: 'external',
    chips: ['Full', 'Grat', 'Refill', 'Mini'],
    cta: 'add',
    description: waterCreamDescription,
    details: [
      'Refill format for The Water Cream.',
      'Recommended for Combo to Oily, Hydrating, Smoothing, Pore Minimizing, Even Skin Tone.',
    ],
    externalId: 'water-refill',
    id: 'water-refill',
    initialVariantIndex: 2,
    media: {
      poster: '/water-refill.png',
      type: 'image',
    },
    price: 68,
    sellerId,
    sourceUrl,
    title: 'REFILL THE WATER CREAM',
    variants: waterCreamVariants,
  },
  {
    cta: 'analysis',
    description:
      'The AI Skin Analysis tool utilizes deep learning technology to provide users with real-time skin care analysis in HD & SD along with treatment...',
    details: faceAiDetails,
    externalId: 'face-ai',
    id: 'face-ai',
    media: {
      poster: '/face-ai-thumb.webp',
      src: '/face-ai-video.mp4',
      type: 'video',
    },
    sellerId,
    sourceUrl,
    title: 'FACE AI SKIN TECHNOLOGY',
  },
]
