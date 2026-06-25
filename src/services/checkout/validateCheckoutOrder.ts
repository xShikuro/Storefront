import type { CheckoutOrder, CheckoutValidationError } from '../../types/storefront'
import { checkoutConfig } from '../../data/checkoutConfig'

export function validateCheckoutOrder(order: CheckoutOrder): CheckoutValidationError | null {
  const { messages, requireCartItems, requiredFields, rules } =
    checkoutConfig.validation
  const phoneDigits = order.customer.phone.replace(/\D/g, '')
  const deliveryAddress = order.delivery.address.trim().replace(/\s+/g, ' ')

  if (requireCartItems && order.items.length === 0) {
    return {
      field: 'cartItems',
      message: messages.emptyCart,
    }
  }

  if (requiredFields.customerName && !order.customer.name.trim()) {
    return {
      field: 'customerName',
      message: messages.nameRequired,
    }
  }

  if (requiredFields.customerPhone && !order.customer.phone.trim()) {
    return {
      field: 'customerPhone',
      message: messages.phoneRequired,
    }
  }

  if (
    order.customer.phone.trim() &&
    (phoneDigits.length < rules.phone.minDigits ||
      phoneDigits.length > rules.phone.maxDigits)
  ) {
    return {
      field: 'customerPhone',
      message: messages.phoneInvalid,
    }
  }

  if (requiredFields.deliveryAddress && !deliveryAddress) {
    return {
      field: 'deliveryAddress',
      message: messages.addressRequired,
    }
  }

  if (
    deliveryAddress &&
    (deliveryAddress.length < rules.address.minLength ||
      !/[\p{L}\p{N}]/u.test(deliveryAddress))
  ) {
    return {
      field: 'deliveryAddress',
      message: messages.addressTooShort,
    }
  }

  return null
}
