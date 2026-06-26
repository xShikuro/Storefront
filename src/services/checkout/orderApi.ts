import type { CheckoutOrder, SubmittedOrder } from '../../types/storefront'

type SubmitOrderResponse =
  | {
      ok: true
      order: SubmittedOrder
    }
  | {
      message?: string
      ok: false
    }

const orderApiUrl = import.meta.env.VITE_ORDER_API_URL ?? '/api/orders'

function normalizeOrder(order: CheckoutOrder): CheckoutOrder {
  return {
    ...order,
    comment: order.comment.trim(),
    customer: {
      name: order.customer.name.trim(),
      phone: order.customer.phone.trim(),
    },
    delivery: {
      ...order.delivery,
      address: order.delivery.address.trim(),
    },
  }
}

export async function submitCheckoutOrder(order: CheckoutOrder): Promise<SubmittedOrder> {
  const response = await fetch(orderApiUrl, {
    body: JSON.stringify(normalizeOrder(order)),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
  const data = (await response.json()) as SubmitOrderResponse

  if (!response.ok || !data.ok) {
    throw new Error(data.ok ? 'Order request failed.' : data.message)
  }

  return data.order
}
