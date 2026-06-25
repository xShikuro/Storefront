export type IconName =
  | 'arrowLeft'
  | 'bag'
  | 'camera'
  | 'check'
  | 'chat'
  | 'external'
  | 'eye'
  | 'flag'
  | 'google'
  | 'instagram'
  | 'mapPin'
  | 'search'
  | 'send'
  | 'share'
  | 'sparkles'
  | 'star'
  | 'target'
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
  | 'orderSuccess'
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

export type DeliveryMethod = 'courier'

export type PaymentMethod = 'cashOnDelivery'

export type OrderDraft = {
  comment: string
  customer: {
    name: string
    phone: string
  }
  delivery: {
    address: string
    method: DeliveryMethod
  }
  payment: {
    method: PaymentMethod
  }
}

export type OrderLineItem = {
  currency: string
  image: string
  productId: string
  quantity: number
  title: string
  totalPrice: number
  unitPrice: number
}

export type CheckoutOrder = {
  comment: string
  currency: string
  customer: OrderDraft['customer']
  delivery: OrderDraft['delivery']
  items: OrderLineItem[]
  payment: OrderDraft['payment']
  quantity: number
  subtotal: number
  total: number
}

export type CheckoutValidationField =
  | 'cartItems'
  | 'customerName'
  | 'customerPhone'
  | 'deliveryAddress'

export type CheckoutValidationError = {
  field: CheckoutValidationField
  message: string
}

export type SubmittedOrder = CheckoutOrder & {
  createdAt: string
  orderNumber: string
}

export type ProductEngagement = {
  liked: boolean
  reviews: string[]
}
