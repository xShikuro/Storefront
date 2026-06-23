import type { ProductSlide } from '../types/storefront'

const faceAiDetails = [
  'The AI Skin Analysis tool utilizes deep learning technology to provide users with real-time skin care analysis in HD & SD along with treatment recommendations through accurate detection of wrinkles, spots, skin texture, dark circles, tear trough and up to 15 other skin concerns.',
  'Generative AI advancements simulate skin healing results, giving users emulations of the progress they can expect to see over time.',
  "Powered by Face AI deep learning technology, AI Face Analyzer is an ultra-personalization engine that provides a highly accurate AI face mapping face analysis and product recommendations based on the user's unique facial features and shades.",
  'The powerful Face AI was trained using over 100,000 faces across different genders & ethnic backgrounds, and is capable of delivering an instant and accurate detection of 70+ facial traits and 5 types of personal color palettes.',
]

export const dewyFullSlide: ProductSlide = {
  cta: 'add',
  description:
    'Rich Line-Plumping Moisturizer Recommended for Dry, Combo to Dry, Hydrating, Plumping, Healthy Aging...',
  details: [
    'Rich Line-Plumping Moisturizer Recommended for Dry, Combo to Dry, Hydrating, Plumping, Healthy Aging.',
    'Formulated without mineral oil, synthetic fragrances, sulfate detergents, parabens, urea, DEA, TEA, or phthalates.',
    'Dermatologist Tested, Non-Comedogenic, Cruelty-free.',
  ],
  id: 'dewy-full',
  kind: 'product',
  media: {
    poster: '/dewy-full-thumb.webp',
    src: '/dewy-full-video.mp4',
    type: 'video',
  },
  title: 'FULL. THE DEWY SKIN CREAM',
}

const dewySkinCreamDescription =
  'Recommended for Dry, Combo to Dry, Hydrating, Plumping, Healthy Aging. Formulated without Mineral oil,...'

const dewySkinCreamDetails = [
  'Recommended for Dry, Combo to Dry, Hydrating, Plumping, Healthy Aging.',
  'Formulated without mineral oil, synthetic fragrances, sulfate detergents, parabens, urea, DEA, TEA, or phthalates.',
  'Dermatologist Tested, Non-Comedogenic, Cruelty-free.',
]

export const dewySkinCreamSlide: ProductSlide = {
  cta: 'add',
  description: dewySkinCreamDescription,
  details: dewySkinCreamDetails,
  id: 'dewy',
  kind: 'product',
  media: {
    poster: '/dewy-thumb.webp',
    src: '/dewy-video.mp4',
    type: 'video',
  },
  title: 'THE DEWY SKIN CREAM',
  variants: [
    {
      chip: 'Dewy',
      description: dewySkinCreamDescription,
      details: dewySkinCreamDetails,
      id: 'original',
      media: {
        poster: '/dewy-thumb.webp',
        src: '/dewy-video.mp4',
        type: 'video',
      },
      title: 'THE DEWY SKIN CREAM',
    },
    {
      chip: 'Dewy',
      description: dewySkinCreamDescription,
      details: dewySkinCreamDetails,
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
      description: dewySkinCreamDescription,
      details: dewySkinCreamDetails,
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
}

export const longevityMemorySlide: ProductSlide = {
  cta: 'add',
  chips: ['Full', 'Mini'],
  description:
    'Youth-Restoring Moisturizer Recommended for All Skin Types, Hydrating, Plumping Formulated...',
  details: [
    'Youth-Restoring Moisturizer.',
    'Recommended for All Skin Types, Hydrating, Plumping.',
    'Non-Comedogenic, Dermatologist Tested, Cruelty-free.',
  ],
  id: 'longevity-memory',
  kind: 'product',
  media: {
    poster: '/longevity-thumb.webp',
    src: '/longevity-video.mp4',
    type: 'video',
  },
  title: 'THE LONGEVITY MEMORY CREAM',
}

export const silkSerumSlide: ProductSlide = {
  cta: 'add',
  chips: ['Mini', 'Full.'],
  description:
    'Wrinkle-Smoothing Retinol Alternative Recommended for Hydrating, Healthy Aging, Firming,...',
  details: [
    'Wrinkle-Smoothing Retinol Alternative.',
    'Recommended for Hydrating, Healthy Aging, Firming, Even Skin Tone.',
    'Dermatologist tested, Cruelty free.',
  ],
  id: 'silk',
  kind: 'product',
  media: {
    poster: '/silk-thumb.webp',
    src: '/silk-video.mp4',
    type: 'video',
  },
  price: 99,
  title: 'THE SILK SERUM',
}

export const waterCreamSlide: ProductSlide = {
  addIcon: 'external',
  cta: 'add',
  chips: ['Full', 'Grat', 'Refill', 'Mini'],
  description:
    'Lightweight Pore-Refining Moisturizer Recommended for Combo to Oily, Hydrating, Smoothing, Pore...',
  details: [
    'Lightweight Pore-Refining Moisturizer.',
    'Recommended for Combo to Oily, Hydrating, Smoothing, Pore Minimizing, Even Skin Tone.',
    'Dermatologist Tested, Non-Comedogenic, Cruelty-free.',
  ],
  id: 'water',
  kind: 'product',
  media: {
    poster: '/water-thumb.webp',
    src: '/water-video.mp4',
    type: 'video',
  },
  title: 'THE WATER CREAM',
  variants: [
    {
      addIcon: 'external',
      chip: 'Full',
      description:
        'Lightweight Pore-Refining Moisturizer Recommended for Combo to Oily, Hydrating, Smoothing, Pore...',
      details: [
        'Lightweight Pore-Refining Moisturizer.',
        'Recommended for Combo to Oily, Hydrating, Smoothing, Pore Minimizing, Even Skin Tone.',
        'Dermatologist Tested, Non-Comedogenic, Cruelty-free.',
      ],
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
      description:
        'Lightweight Pore-Refining Moisturizer Recommended for Combo to Oily, Hydrating, Smoothing, Pore...',
      details: [
        'Gift-size format of The Water Cream.',
        'Recommended for Combo to Oily, Hydrating, Smoothing, Pore Minimizing, Even Skin Tone.',
      ],
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
      description:
        'Lightweight Pore-Refining Moisturizer Recommended for Combo to Oily, Hydrating, Smoothing, Pore...',
      details: [
        'Refill format for The Water Cream.',
        'Recommended for Combo to Oily, Hydrating, Smoothing, Pore Minimizing, Even Skin Tone.',
      ],
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
      description:
        'Lightweight Pore-Refining Moisturizer Recommended for Combo to Oily, Hydrating, Smoothing, Pore...',
      details: [
        'Mini format of The Water Cream.',
        'Recommended for Combo to Oily, Hydrating, Smoothing, Pore Minimizing, Even Skin Tone.',
      ],
      id: 'mini',
      media: {
        poster: '/water-mini.png',
        type: 'image',
      },
      price: 25,
      title: 'MINI THE WATER CREAM',
    },
  ],
}

export const waterRefillSlide: ProductSlide = {
  addIcon: 'external',
  cta: 'add',
  chips: ['Full', 'Grat', 'Refill', 'Mini'],
  description:
    'Lightweight Pore-Refining Moisturizer Recommended for Combo to Oily, Hydrating, Smoothing, Pore...',
  details: [
    'Refill format for The Water Cream.',
    'Recommended for Combo to Oily, Hydrating, Smoothing, Pore Minimizing, Even Skin Tone.',
  ],
  id: 'water-refill',
  initialVariantIndex: 2,
  kind: 'product',
  media: {
    poster: '/water-refill.png',
    type: 'image',
  },
  price: 68,
  title: 'REFILL THE WATER CREAM',
  variants: waterCreamSlide.variants,
}

export const faceAiSlide: ProductSlide = {
  cta: 'analysis',
  description:
    'The AI Skin Analysis tool utilizes deep learning technology to provide users with real-time skin care analysis in HD & SD along with treatment...',
  details: faceAiDetails,
  id: 'face-ai',
  kind: 'product',
  media: {
    poster: '/face-ai-thumb.webp',
    src: '/face-ai-video.mp4',
    type: 'video',
  },
  title: 'FACE AI SKIN TECHNOLOGY',
}

export const productSlides = [
  dewyFullSlide,
  dewySkinCreamSlide,
  longevityMemorySlide,
  silkSerumSlide,
  waterCreamSlide,
  waterRefillSlide,
  faceAiSlide,
]
