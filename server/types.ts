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
  customer: {
    name: string
    phone: string
  }
  delivery: {
    address: string
    method: 'courier'
  }
  items: OrderLineItem[]
  payment: {
    method: 'cashOnDelivery'
  }
  quantity: number
  subtotal: number
  total: number
}

export type SubmittedOrder = CheckoutOrder & {
  createdAt: string
  orderNumber: string
}

export type StoredOrder = SubmittedOrder & {
  ip: string
  source: 'storefront'
  status: 'new'
  userAgent: string
}
