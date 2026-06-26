import type { Dispatch, FormEvent, RefObject, SetStateAction } from 'react'
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
import { storefrontConfig } from '../../data/storefrontConfig'
import type { FeedSlideEntry } from '../slides/types'
import { Icon } from '../shared/Icon'
import { LogoMark } from '../shared/LogoMark'
import { OverlayLayer } from '../overlays/OverlayLayer'
import './Feed.css'

type FeedProps = {
  activeIndex: number
  activeProduct: ProductSlide
  addToCart: (product?: ProductSlide) => void
  cartItems: CartItem[]
  cartQuantity: number
  chatText: string
  checkoutError: CheckoutValidationError | null
  checkoutOrder: CheckoutOrder
  clearCheckoutError: () => void
  closeOverlay: () => void
  engagement: ProductEngagement
  engagementByProduct: Record<string, ProductEngagement>
  feedRef: RefObject<HTMLDivElement | null>
  isSubmittingOrder: boolean
  muted: boolean
  openOverlay: (overlay: Overlay) => void
  overlay: Overlay
  orderDraft: OrderDraft
  productSlides: ProductSlide[]
  reviewText: string
  removeCartItem: (productId: string) => void
  scrollToSlide: (index: number) => void
  setActiveIndex: (index: number) => void
  setChatText: (value: string) => void
  decreaseCartItem: (productId: string) => void
  increaseCartItem: (productId: string) => void
  setLiked: (value: boolean) => void
  setMuted: (updater: (value: boolean) => boolean) => void
  setOverlay: (overlay: Overlay) => void
  setOrderDraft: Dispatch<SetStateAction<OrderDraft>>
  setReviewText: (value: string) => void
  share: (product?: ProductSlide) => void
  slides: FeedSlideEntry[]
  submittedOrder: SubmittedOrder | null
  submitChat: (event: FormEvent<HTMLFormElement>) => void
  submitOrder: () => void
  submitReview: (event: FormEvent<HTMLFormElement>) => void
  toast: string
}

export function Feed({
  activeIndex,
  activeProduct,
  addToCart,
  cartItems,
  cartQuantity,
  chatText,
  checkoutError,
  checkoutOrder,
  clearCheckoutError,
  closeOverlay,
  engagement,
  engagementByProduct,
  feedRef,
  isSubmittingOrder,
  muted,
  openOverlay,
  overlay,
  orderDraft,
  productSlides,
  reviewText,
  removeCartItem,
  scrollToSlide,
  setActiveIndex,
  setChatText,
  decreaseCartItem,
  increaseCartItem,
  setLiked,
  setMuted,
  setOverlay,
  setOrderDraft,
  setReviewText,
  share,
  slides,
  submittedOrder,
  submitChat,
  submitOrder,
  submitReview,
  toast,
}: FeedProps) {
  const { brand, links } = storefrontConfig

  return (
    <section className="feed" aria-label={brand.feedLabel}>
      <div
        className="feed-track"
        ref={feedRef}
        onScroll={(event) => {
          const next = Math.round(
            event.currentTarget.scrollTop / event.currentTarget.clientHeight,
          )

          if (next !== activeIndex) {
            setActiveIndex(Math.max(0, Math.min(slides.length - 1, next)))
            setOverlay(null)
          }
        }}
      >
        {slides.map((entry, index) => {
          const { Component, id } = entry

          return (
            <Component
              active={activeIndex === index}
              addToCart={addToCart}
              cartQuantity={cartQuantity}
              engagementByProduct={engagementByProduct}
              key={id}
              muted={muted}
              openOverlay={openOverlay}
              overlay={overlay}
              progressSlides={productSlides}
              scrollToSlide={scrollToSlide}
              setMuted={setMuted}
              share={share}
              slide={entry.kind === 'product' ? entry.product : undefined}
            />
          )
        })}
      </div>

      <header className="feed-top">
        <button
          className="brand-button"
          type="button"
          aria-label={brand.homeLabel}
          onClick={() => scrollToSlide(0)}
        >
          <LogoMark />
          <span>{brand.displayName}</span>
        </button>
        <a
          className="circle-link"
          href={links.instagram.url}
          aria-label={links.instagram.label}
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="instagram" />
        </a>
      </header>

      {overlay && overlay !== 'analysis' && (
        <OverlayLayer
          activeProduct={activeProduct}
          addToCart={addToCart}
          cartItems={cartItems}
          cartQuantity={cartQuantity}
          chatText={chatText}
          checkoutError={checkoutError}
          checkoutOrder={checkoutOrder}
          clearCheckoutError={clearCheckoutError}
          closeOverlay={closeOverlay}
          decreaseCartItem={decreaseCartItem}
          increaseCartItem={increaseCartItem}
          isSubmittingOrder={isSubmittingOrder}
          removeCartItem={removeCartItem}
          engagement={engagement}
          orderDraft={orderDraft}
          overlay={overlay}
          reviewText={reviewText}
          setChatText={setChatText}
          setLiked={setLiked}
          setOrderDraft={setOrderDraft}
          setReviewText={setReviewText}
          submittedOrder={submittedOrder}
          submitChat={submitChat}
          submitOrder={submitOrder}
          submitReview={submitReview}
        />
      )}

      {toast && <div className="toast">{toast}</div>}
    </section>
  )
}
