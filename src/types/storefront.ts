export type IconName =
  | 'arrowLeft'
  | 'bag'
  | 'camera'
  | 'chat'
  | 'external'
  | 'eye'
  | 'flag'
  | 'google'
  | 'instagram'
  | 'search'
  | 'send'
  | 'share'
  | 'sparkles'
  | 'star'
  | 'user'
  | 'volume'
  | 'volumeX'
  | 'x'

export type Overlay =
  | 'cart'
  | 'reviews'
  | 'search'
  | 'chat'
  | 'login'
  | 'details'
  | 'analysis'
  | null

export type ProductSlide = {
  addIcon?: 'bag' | 'external'
  chips?: string[]
  cta: 'add' | 'analysis'
  description: string
  details: string[]
  id: string
  initialVariantIndex?: number
  kind: 'product'
  media: {
    poster: string
    src?: string
    type: 'image' | 'video'
  }
  price?: number
  startWithBaseMedia?: boolean
  title: string
  variants?: ProductVariant[]
  variantTiles?: {
    image: string
    label: string
  }[]
}

export type ProductVariant = {
  addIcon?: 'bag' | 'external'
  chip: string
  description: string
  details: string[]
  id: string
  media: {
    poster: string
    src?: string
    type: 'image' | 'video'
  }
  price?: number
  title: string
}

export type CartItem = {
  product: ProductSlide
  quantity: number
}

export type ProductEngagement = {
  liked: boolean
  reviews: string[]
}
