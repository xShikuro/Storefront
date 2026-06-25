import { media } from './assets'

export const storefrontConfig = {
  brand: {
    displayName: 'T A T C H A',
    feedLabel: 'Tatcha product feed',
    homeLabel: 'Tatcha home',
    logo: media.logo,
    name: 'Tatcha',
  },
  commerce: {
    currency: 'USD',
    fallbackProductLabel: 'Tatcha product',
  },
  intro: {
    categories: [
      { label: 'SHOP DRY', target: 1 },
      { label: 'SHOP OILY', target: 5 },
      { label: 'SHOP SENSITIVE', target: 2 },
      { label: 'SHOP MATURE', target: 4 },
    ],
    swipeHint: 'СВАЙП К ТОВАРАМ',
    swipeSymbol: '⌃',
    swipeTarget: 1,
  },
  labels: {
    addToCart: 'ДОБАВИТЬ',
    facialAnalysis: '✨ Facial analysis',
  },
  links: {
    instagram: {
      label: 'Instagram',
      url: 'https://www.instagram.com/tatcha/',
    },
    poweredBy: {
      label: 'POWERED BY',
      name: 'SHOP.VIBEVOX.PRO',
      url: 'https://shop.vibevox.pro/',
    },
  },
  qr: {
    ariaLabel: 'Mobile app QR',
    description: 'Scan to experience our mobile version.',
    footer: 'VIBEADD',
    headline: ['Unlock the', 'full potential.'],
    title: 'SCAN FOR MOBILE APP',
  },
} as const
