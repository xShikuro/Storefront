import { useState } from 'react'
import { checkoutConfig } from '../data/checkoutConfig'
import { storefrontConfig } from '../data/storefrontConfig'
import { submitCheckoutOrder } from '../services/checkout/orderApi'
import { validateCheckoutOrder } from '../services/checkout/validateCheckoutOrder'
import type {
  CartItem,
  CheckoutValidationError,
  DeliveryMethod,
  OrderDraft,
  Overlay,
  PaymentMethod,
  SubmittedOrder,
} from '../types/storefront'
import { useLocalStorageState } from './useLocalStorageState'

type UseCheckoutOptions = {
  cartItems: CartItem[]
  cartQuantity: number
  clearCart: () => void
  setOverlay: (overlay: Overlay) => void
  showToast: (message: string) => void
}

const storageScope = storefrontConfig.brand.name.toLowerCase().replace(/\s+/g, '-')
const orderDraftStorageKey = `storefront:${storageScope}:order-draft:v1`

export const initialOrderDraft: OrderDraft = {
  comment: '',
  customer: {
    name: '',
    phone: '',
  },
  delivery: {
    address: '',
    method: checkoutConfig.defaults.deliveryMethod,
  },
  payment: {
    method: checkoutConfig.defaults.paymentMethod,
  },
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isDeliveryMethod(value: unknown): value is DeliveryMethod {
  return (
    typeof value === 'string' &&
    checkoutConfig.deliveryMethods.some((method) => method.id === value)
  )
}

function isPaymentMethod(value: unknown): value is PaymentMethod {
  return (
    typeof value === 'string' &&
    checkoutConfig.paymentMethods.some((method) => method.id === value)
  )
}

function parseStoredOrderDraft(value: unknown): OrderDraft | null {
  if (!isRecord(value)) {
    return null
  }

  const customer = isRecord(value.customer) ? value.customer : {}
  const delivery = isRecord(value.delivery) ? value.delivery : {}
  const payment = isRecord(value.payment) ? value.payment : {}

  return {
    comment: typeof value.comment === 'string' ? value.comment : '',
    customer: {
      name: typeof customer.name === 'string' ? customer.name : '',
      phone: typeof customer.phone === 'string' ? customer.phone : '',
    },
    delivery: {
      address: typeof delivery.address === 'string' ? delivery.address : '',
      method: isDeliveryMethod(delivery.method)
        ? delivery.method
        : checkoutConfig.defaults.deliveryMethod,
    },
    payment: {
      method: isPaymentMethod(payment.method)
        ? payment.method
        : checkoutConfig.defaults.paymentMethod,
    },
  }
}

export function useCheckout({
  cartItems,
  cartQuantity,
  clearCart,
  setOverlay,
  showToast,
}: UseCheckoutOptions) {
  const [orderDraft, setOrderDraft] = useLocalStorageState<OrderDraft>(
    orderDraftStorageKey,
    initialOrderDraft,
    parseStoredOrderDraft,
  )
  const [checkoutError, setCheckoutError] = useState<CheckoutValidationError | null>(
    null,
  )
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false)
  const [submittedOrder, setSubmittedOrder] = useState<SubmittedOrder | null>(null)

  const orderCurrency = storefrontConfig.commerce.currency
  const orderItems = cartItems.map((item) => {
    const unitPrice = item.product.price ?? 0

    return {
      currency: orderCurrency,
      image: item.product.media.poster,
      productId: item.product.id,
      quantity: item.quantity,
      title: item.product.title,
      totalPrice: unitPrice * item.quantity,
      unitPrice,
    }
  })
  const orderTotal = orderItems.reduce((total, item) => total + item.totalPrice, 0)
  const checkoutOrder = {
    comment: orderDraft.comment,
    currency: orderCurrency,
    customer: orderDraft.customer,
    delivery: orderDraft.delivery,
    items: orderItems,
    payment: orderDraft.payment,
    quantity: cartQuantity,
    subtotal: orderTotal,
    total: orderTotal,
  }

  const submitOrder = async () => {
    if (isSubmittingOrder) {
      return
    }

    const error = validateCheckoutOrder(checkoutOrder)

    if (error) {
      setCheckoutError(error)
      showToast(error.message)
      setOverlay('cart')
      return
    }

    setCheckoutError(null)
    setIsSubmittingOrder(true)

    try {
      const submittedOrder = await submitCheckoutOrder(checkoutOrder)
      setSubmittedOrder(submittedOrder)
      clearCart()
      setOrderDraft(initialOrderDraft)
      setCheckoutError(null)
      setOverlay('orderSuccess')
    } catch {
      showToast(checkoutConfig.validation.messages.submitFailed)
    } finally {
      setIsSubmittingOrder(false)
    }
  }

  return {
    checkoutError,
    checkoutOrder,
    clearCheckoutError: () => setCheckoutError(null),
    isSubmittingOrder,
    orderDraft,
    setOrderDraft,
    submittedOrder,
    submitOrder,
  }
}
