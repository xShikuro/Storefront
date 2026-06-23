import type { FormEvent } from 'react'
import type {
  CartItem,
  Overlay,
  ProductEngagement,
  ProductSlide,
} from '../../types/storefront'
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

type OverlayLayerProps = {
  activeProduct: ProductSlide
  addToCart: (product?: ProductSlide) => void
  cartItems: CartItem[]
  cartQuantity: number
  chatText: string
  closeOverlay: () => void
  decreaseCartItem: (productId: string) => void
  engagement: ProductEngagement
  increaseCartItem: (productId: string) => void
  overlay: Exclude<Overlay, 'analysis' | null>
  reviewText: string
  setChatText: (value: string) => void
  setLiked: (value: boolean) => void
  setReviewText: (value: string) => void
  submitChat: (event: FormEvent<HTMLFormElement>) => void
  submitReview: (event: FormEvent<HTMLFormElement>) => void
}

export function OverlayLayer({
  activeProduct,
  addToCart,
  cartItems,
  cartQuantity,
  chatText,
  closeOverlay,
  decreaseCartItem,
  engagement,
  increaseCartItem,
  overlay,
  reviewText,
  setChatText,
  setLiked,
  setReviewText,
  submitChat,
  submitReview,
}: OverlayLayerProps) {
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
              ДОБАВИТЬ
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

  return (
    <div className="drawer-layer">
      <section className="drawer cart-drawer">
        <DrawerHeader
          closeOverlay={closeOverlay}
          icon="bag"
          title="КОРЗИНА"
          meta={`${cartQuantity} товаров`}
        />
        {cartQuantity === 0 ? (
          <div className="cart-empty">
            <div>
              <Icon name="bag" />
            </div>
            <strong>ВАША КОРЗИНА ПУСТА.</strong>
            <button type="button" onClick={closeOverlay}>
              Смотреть товары
            </button>
          </div>
        ) : (
          <div className="cart-filled">
            <div className="cart-items">
              {cartItems.map((item) => (
                <article key={item.product.id}>
                  <img src={item.product.media.poster} alt="" />
                  <div>
                    <strong>{item.product.title}</strong>
                    <span>
                      {item.product.price ? `${item.product.price} USD` : 'Tatcha product'}
                    </span>
                  </div>
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
            <button type="button">Оформить</button>
          </div>
        )}
      </section>
    </div>
  )
}
