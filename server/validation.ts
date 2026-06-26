import type { CheckoutOrder, OrderLineItem } from './types.js'

type ValidationResult =
  | {
      ok: true
      order: CheckoutOrder
    }
  | {
      message: string
      ok: false
    }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isText(value: unknown, maxLength = 500): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength
}

function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, ' ')
}

function roundMoney(value: number) {
  return Math.round(value * 100) / 100
}

function parseOrderItem(value: unknown): OrderLineItem | null {
  if (!isRecord(value)) {
    return null
  }

  const quantity = Number(value.quantity)
  const unitPrice = Number(value.unitPrice)

  if (
    !isText(value.productId, 120) ||
    !isText(value.title, 240) ||
    !isText(value.currency, 8) ||
    typeof value.image !== 'string' ||
    !Number.isInteger(quantity) ||
    quantity <= 0 ||
    quantity > 999 ||
    !Number.isFinite(unitPrice) ||
    unitPrice < 0 ||
    unitPrice > 1_000_000
  ) {
    return null
  }

  return {
    currency: normalizeText(value.currency),
    image: value.image.trim(),
    productId: normalizeText(value.productId),
    quantity,
    title: normalizeText(value.title),
    totalPrice: roundMoney(unitPrice * quantity),
    unitPrice: roundMoney(unitPrice),
  }
}

export function validateCheckoutOrderPayload(payload: unknown): ValidationResult {
  if (!isRecord(payload)) {
    return { message: 'Order payload must be an object.', ok: false }
  }

  const customer = isRecord(payload.customer) ? payload.customer : null
  const delivery = isRecord(payload.delivery) ? payload.delivery : null
  const payment = isRecord(payload.payment) ? payload.payment : null
  const items = Array.isArray(payload.items)
    ? payload.items.map(parseOrderItem).filter((item): item is OrderLineItem => Boolean(item))
    : []

  const customerName = customer && typeof customer.name === 'string'
    ? normalizeText(customer.name)
    : ''
  const customerPhone = customer && typeof customer.phone === 'string'
    ? normalizeText(customer.phone)
    : ''
  const deliveryAddress = delivery && typeof delivery.address === 'string'
    ? normalizeText(delivery.address)
    : ''
  const phoneDigits = customerPhone.replace(/\D/g, '')

  if (!items.length) {
    return { message: 'Cart is empty.', ok: false }
  }

  if (!customerName) {
    return { message: 'Customer name is required.', ok: false }
  }

  if (!customerPhone || phoneDigits.length < 7 || phoneDigits.length > 15) {
    return { message: 'Valid customer phone is required.', ok: false }
  }

  if (!deliveryAddress || deliveryAddress.length < 8 || !/[\p{L}\p{N}]/u.test(deliveryAddress)) {
    return { message: 'Delivery address is required.', ok: false }
  }

  if (!delivery || delivery.method !== 'courier') {
    return { message: 'Unsupported delivery method.', ok: false }
  }

  if (!payment || payment.method !== 'cashOnDelivery') {
    return { message: 'Unsupported payment method.', ok: false }
  }

  const currency =
    typeof payload.currency === 'string' && payload.currency.trim()
      ? normalizeText(payload.currency).slice(0, 8)
      : items[0].currency
  const subtotal = roundMoney(items.reduce((total, item) => total + item.totalPrice, 0))
  const quantity = items.reduce((total, item) => total + item.quantity, 0)

  return {
    ok: true,
    order: {
      comment: typeof payload.comment === 'string' ? payload.comment.trim().slice(0, 1000) : '',
      currency,
      customer: {
        name: customerName,
        phone: customerPhone,
      },
      delivery: {
        address: deliveryAddress,
        method: 'courier',
      },
      items: items.map((item) => ({
        ...item,
        currency,
      })),
      payment: {
        method: 'cashOnDelivery',
      },
      quantity,
      subtotal,
      total: subtotal,
    },
  }
}
