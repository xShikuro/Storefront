import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from 'react'
import type {
  CartItem,
  CheckoutOrder,
  CheckoutValidationError,
  OrderDraft,
  Overlay,
  ProductEngagement,
  ProductSlide,
  SubmittedOrder,
} from '../../types/storefront'
import { checkoutConfig } from '../../data/checkoutConfig'
import { storefrontConfig } from '../../data/storefrontConfig'
import { Icon } from '../shared/Icon'
import { DrawerHeader } from './DrawerHeader'
import { LoginDialog } from './LoginDialog'
import './OverlayLayer.css'

function formatReplies(count: number) {
  if (count % 10 === 1 && count % 100 !== 11) {
    return `${count} ответ`
  }

  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return `${count} ответа`
  }

  return `${count} ответов`
}

function formatCartItems(count: number) {
  const { itemForms } = checkoutConfig.cart

  if (count % 10 === 1 && count % 100 !== 11) {
    return `${count} ${itemForms.one}`
  }

  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return `${count} ${itemForms.few}`
  }

  return `${count} ${itemForms.many}`
}

function formatTemplate(template: string, values: Record<string, string | number>) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.split(`{${key}}`).join(String(value)),
    template,
  )
}

type OverlayLayerProps = {
  activeProduct: ProductSlide
  addToCart: (product?: ProductSlide) => void
  cartItems: CartItem[]
  cartQuantity: number
  chatText: string
  checkoutError: CheckoutValidationError | null
  checkoutOrder: CheckoutOrder
  clearCheckoutError: () => void
  closeOverlay: () => void
  decreaseCartItem: (productId: string) => void
  engagement: ProductEngagement
  increaseCartItem: (productId: string) => void
  isSubmittingOrder: boolean
  orderDraft: OrderDraft
  overlay: Exclude<Overlay, 'analysis' | null>
  reviewText: string
  removeCartItem: (productId: string) => void
  setChatText: (value: string) => void
  setLiked: (value: boolean) => void
  setOrderDraft: Dispatch<SetStateAction<OrderDraft>>
  setReviewText: (value: string) => void
  submittedOrder: SubmittedOrder | null
  submitChat: (event: FormEvent<HTMLFormElement>) => void
  submitOrder: () => void
  submitReview: (event: FormEvent<HTMLFormElement>) => void
}

export function OverlayLayer({
  activeProduct,
  addToCart,
  cartItems,
  cartQuantity,
  chatText,
  checkoutError,
  checkoutOrder,
  clearCheckoutError,
  closeOverlay,
  decreaseCartItem,
  engagement,
  increaseCartItem,
  isSubmittingOrder,
  orderDraft,
  overlay,
  reviewText,
  removeCartItem,
  setChatText,
  setLiked,
  setOrderDraft,
  setReviewText,
  submittedOrder,
  submitChat,
  submitOrder,
  submitReview,
}: OverlayLayerProps) {
  const { labels } = storefrontConfig
  const { actions, fields, sections } = checkoutConfig.cart
  const [commentOpen, setCommentOpen] = useState(Boolean(orderDraft.comment))
  const cartBodyRef = useRef<HTMLDivElement | null>(null)
  const nameInputRef = useRef<HTMLInputElement | null>(null)
  const phoneInputRef = useRef<HTMLInputElement | null>(null)
  const addressInputRef = useRef<HTMLInputElement | null>(null)
  const formatMoney = (value: number, currency = checkoutOrder.currency) =>
    `${value} ${currency}`
  const cartItemsInvalid = checkoutError?.field === 'cartItems'
  const nameInvalid = checkoutError?.field === 'customerName'
  const phoneInvalid = checkoutError?.field === 'customerPhone'
  const addressInvalid = checkoutError?.field === 'deliveryAddress'

  const updateOrderDraft = (updater: SetStateAction<OrderDraft>) => {
    clearCheckoutError()
    setOrderDraft(updater)
  }

  useEffect(() => {
    if (overlay !== 'cart' || !checkoutError) {
      return
    }

    const focusTarget = {
      cartItems: null,
      customerName: nameInputRef.current,
      customerPhone: phoneInputRef.current,
      deliveryAddress: addressInputRef.current,
    }[checkoutError.field]

    requestAnimationFrame(() => {
      if (focusTarget) {
        focusTarget.focus({ preventScroll: true })
        focusTarget.scrollIntoView({ block: 'center', behavior: 'smooth' })
        return
      }

      cartBodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }, [checkoutError, overlay])

  if (overlay === 'login') {
    return <LoginDialog closeOverlay={closeOverlay} />
  }

  if (overlay === 'search') {
    return (
      <div className="floating-search">
        <Icon name="search" />
        <input autoFocus placeholder="Поиск..." />
        <button type="button" aria-label="Close search" onClick={closeOverlay}>
          <Icon name="x" />
        </button>
      </div>
    )
  }

  if (overlay === 'details') {
    return (
      <div className="drawer-layer">
        <section className="drawer details-drawer">
          <DrawerHeader closeOverlay={closeOverlay} icon="sparkles" title={activeProduct.title} />
          <div className="details-content">
            {activeProduct.details.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <button type="button" onClick={() => addToCart()}>
              {labels.addToCart}
            </button>
          </div>
        </section>
      </div>
    )
  }

  if (overlay === 'reviews') {
    return (
      <div className="drawer-layer">
        <section className="drawer reviews-drawer">
          <div className="drawer-handle" />
          <header className="review-header">
            <Icon name="flag" />
            <button
              className={engagement.liked ? 'is-liked' : ''}
              type="button"
              onClick={() => setLiked(!engagement.liked)}
            >
              <Icon name="star" />
              <strong>{engagement.liked ? '1' : '0'}</strong>
            </button>
            <strong>{formatReplies(engagement.reviews.length)}</strong>
            <button type="button" aria-label="Sort reviews">
              ⇅
            </button>
            <button type="button" aria-label="Close reviews" onClick={closeOverlay}>
              <Icon name="x" />
            </button>
          </header>
          {engagement.reviews.length === 0 ? (
            <div className="reviews-empty">
              <span />
              <p>Пока нет отзывов</p>
            </div>
          ) : (
            <div className="reviews-list">
              {engagement.reviews.map((review, index) => (
                <article key={`${review}-${index}`}>
                  <div className="review-avatar">
                    <Icon name="user" />
                  </div>
                  <div>
                    <strong>Гость {index + 1}</strong>
                    <p>{review}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
          <form className="dark-form" onSubmit={submitReview}>
            <input
              value={reviewText}
              placeholder="Напишите отзыв..."
              onChange={(event) => setReviewText(event.target.value)}
            />
            <button type="submit">
              <Icon name="send" />
            </button>
          </form>
        </section>
      </div>
    )
  }

  if (overlay === 'chat') {
    return (
      <div className="drawer-layer">
        <section className="drawer chat-drawer">
          <DrawerHeader
            closeOverlay={closeOverlay}
            icon="sparkles"
            title="AI Консультант"
            meta="0 сообщений"
          />
          <div className="chat-empty">
            <Icon name="chat" />
            <strong>Задайте вопрос и AI ответит!</strong>
          </div>
          <form className="chat-form" onSubmit={submitChat}>
            <input
              value={chatText}
              placeholder={`Подробнее о ${activeProduct.title}`}
              onChange={(event) => setChatText(event.target.value)}
            />
            <button type="submit">
              <Icon name="send" />
            </button>
          </form>
        </section>
      </div>
    )
  }

  if (overlay === 'orderSuccess') {
    if (!submittedOrder) {
      return null
    }

    return (
      <div className="drawer-layer">
        <section className="drawer order-success-drawer">
          <div className="drawer-handle" />
          <button
            className="order-success-close"
            type="button"
            aria-label="Close order success"
            onClick={closeOverlay}
          >
            <Icon name="x" />
          </button>

          <div className="order-success-content">
            <div className="order-success-mark">
              <Icon name="check" />
            </div>
            <span className="order-success-number">
              {checkoutConfig.success.orderPrefix} {submittedOrder.orderNumber}
            </span>
            <h2>{checkoutConfig.success.title}</h2>
            <p>
              {formatTemplate(checkoutConfig.success.confirmationText, {
                phone: submittedOrder.customer.phone,
              })}
            </p>

            <div className="order-success-summary">
              <div>
                <span>{checkoutConfig.success.summary.customerName}</span>
                <strong>{submittedOrder.customer.name}</strong>
              </div>
              <div>
                <span>{checkoutConfig.success.summary.customerPhone}</span>
                <strong>{submittedOrder.customer.phone}</strong>
              </div>
              <div>
                <span>{checkoutConfig.success.summary.items}</span>
                <strong>{formatCartItems(submittedOrder.quantity)}</strong>
              </div>
              <div>
                <span>{checkoutConfig.success.summary.total}</span>
                <strong>{formatMoney(submittedOrder.total, submittedOrder.currency)}</strong>
              </div>
            </div>

            <button className="order-success-home" type="button" onClick={closeOverlay}>
              {actions.backToProducts}
            </button>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="drawer-layer">
      <section className="drawer cart-drawer">
        <div className="drawer-handle" />
        <header className="cart-checkout-header">
          <div className="cart-header-icon">
            <Icon name="bag" />
          </div>
          <div>
            <strong>{checkoutConfig.cart.title}</strong>
            <span>{formatCartItems(cartQuantity)}</span>
          </div>
          <button type="button" aria-label="Close cart" onClick={closeOverlay}>
            <Icon name="x" />
          </button>
        </header>

        <div className="cart-checkout-body" ref={cartBodyRef}>
          {checkoutError && (
            <div className="checkout-error-banner" role="alert">
              <Icon name="flag" />
              <span>{checkoutError.message}</span>
            </div>
          )}

          {cartItems.length > 0 ? (
            <section className="checkout-section cart-items-section" aria-label="Cart items">
              <div className="cart-items">
                {cartItems.map((item) => (
                  <article className="cart-product-card" key={item.product.id}>
                    <img src={item.product.media.poster} alt="" />
                    <div className="cart-product-info">
                      <strong>{item.product.title}</strong>
                      <span>{formatMoney(item.product.price ?? 0)}</span>
                    </div>
                    <button
                      className="cart-remove"
                      type="button"
                      aria-label={`Remove ${item.product.title}`}
                      onClick={() => removeCartItem(item.product.id)}
                    >
                      <Icon name="x" />
                    </button>
                    <div className="cart-quantity-control" aria-label="Cart quantity">
                      <button
                        type="button"
                        aria-label={`Remove one ${item.product.title}`}
                        onClick={() => decreaseCartItem(item.product.id)}
                      >
                        −
                      </button>
                      <em>{item.quantity}</em>
                      <button
                        type="button"
                        aria-label={`Add one ${item.product.title}`}
                        onClick={() => increaseCartItem(item.product.id)}
                      >
                        +
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : (
            <section
              className={`checkout-section cart-empty-compact ${
                cartItemsInvalid ? 'is-invalid' : ''
              }`}
            >
              <Icon name="bag" />
              <strong>{checkoutConfig.cart.emptyMessage}</strong>
            </section>
          )}

          <section className="checkout-section checkout-contacts">
            <header>
              <h3>{sections.contacts}</h3>
              <button className="checkout-login" type="button">
                <span>↪</span>
                {actions.login}
              </button>
            </header>
            <label className={`checkout-field ${nameInvalid ? 'is-invalid' : ''}`}>
              <input
                aria-invalid={nameInvalid}
                autoComplete="name"
                ref={nameInputRef}
                value={orderDraft.customer.name}
                placeholder={fields.name}
                onChange={(event) =>
                  updateOrderDraft((draft) => ({
                    ...draft,
                    customer: {
                      ...draft.customer,
                      name: event.target.value,
                    },
                  }))
                }
              />
            </label>
            <label className={`checkout-field ${phoneInvalid ? 'is-invalid' : ''}`}>
              <input
                aria-invalid={phoneInvalid}
                autoComplete="tel"
                inputMode="tel"
                ref={phoneInputRef}
                value={orderDraft.customer.phone}
                placeholder={fields.phone}
                type="tel"
                onChange={(event) =>
                  updateOrderDraft((draft) => ({
                    ...draft,
                    customer: {
                      ...draft.customer,
                      phone: event.target.value,
                    },
                  }))
                }
              />
            </label>
          </section>

          <section className="checkout-section checkout-delivery">
            <h3>{sections.delivery}</h3>
            {checkoutConfig.deliveryMethods.map((method) => (
              <button
                className="delivery-method"
                type="button"
                aria-pressed={orderDraft.delivery.method === method.id}
                key={method.id}
                onClick={() =>
                  updateOrderDraft((draft) => ({
                    ...draft,
                    delivery: {
                      ...draft.delivery,
                      method: method.id,
                    },
                  }))
                }
              >
                <Icon name="mapPin" />
                <span>{method.label}</span>
              </button>
            ))}
            <div className={`address-field ${addressInvalid ? 'is-invalid' : ''}`}>
              <input
                aria-invalid={addressInvalid}
                autoComplete="street-address"
                ref={addressInputRef}
                value={orderDraft.delivery.address}
                placeholder={fields.address}
                onChange={(event) =>
                  updateOrderDraft((draft) => ({
                    ...draft,
                    delivery: {
                      ...draft.delivery,
                      address: event.target.value,
                    },
                  }))
                }
              />
              <button type="button" aria-label="Detect location">
                <Icon name="target" />
              </button>
            </div>
          </section>

          <section className="checkout-section checkout-payment">
            <h3>{sections.payment}</h3>
            {checkoutConfig.paymentMethods.map((method) => (
              <button
                className="payment-method"
                type="button"
                aria-pressed={orderDraft.payment.method === method.id}
                key={method.id}
                onClick={() =>
                  updateOrderDraft((draft) => ({
                    ...draft,
                    payment: {
                      method: method.id,
                    },
                  }))
                }
              >
                <span>{method.icon}</span>
                <strong>{method.label}</strong>
                <Icon name="check" />
              </button>
            ))}
          </section>

          <section className={`checkout-section checkout-comment-section ${commentOpen ? 'is-open' : ''}`}>
            <button
              className="checkout-comment"
              type="button"
              aria-expanded={commentOpen}
              onClick={() => setCommentOpen((value) => !value)}
            >
              <span>{sections.comment}</span>
              <span>{commentOpen ? '⌃' : '⌄'}</span>
            </button>
            {commentOpen && (
              <label className="checkout-comment-field">
                <textarea
                  value={orderDraft.comment}
                  placeholder={fields.comment}
                  onChange={(event) =>
                    updateOrderDraft((draft) => ({
                      ...draft,
                      comment: event.target.value,
                    }))
                  }
                />
              </label>
            )}
          </section>

          <section className="checkout-total">
            <span>{sections.total}</span>
            <strong>{formatMoney(checkoutOrder.total)}</strong>
          </section>
        </div>

        <div className="checkout-footer">
          <button
            className="checkout-submit"
            type="button"
            disabled={isSubmittingOrder}
            onClick={submitOrder}
          >
            <Icon name="check" />
            {isSubmittingOrder ? actions.submitting : actions.submit} •{' '}
            {formatMoney(checkoutOrder.total)}
          </button>
        </div>
      </section>
    </div>
  )
}
