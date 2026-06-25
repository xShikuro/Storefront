import type { CheckoutOrder, SubmittedOrder } from '../../types/storefront'

let orderSequence = 1

function createOrderNumber() {
  const orderNumber = `#${String(orderSequence).padStart(4, '0')}`
  orderSequence += 1
  return orderNumber
}

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
  await new Promise((resolve) => {
    window.setTimeout(resolve, 650)
  })

  const normalizedOrder = normalizeOrder(order)
  const submittedOrder = {
    ...normalizedOrder,
    createdAt: new Date().toISOString(),
    orderNumber: createOrderNumber(),
  }

  console.info('Checkout order', submittedOrder)
  return submittedOrder
}
