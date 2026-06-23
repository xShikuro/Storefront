import type { FormEvent, RefObject } from 'react'
import type {
  CartItem,
  Overlay,
  ProductEngagement,
  ProductSlide,
} from '../../types/storefront'
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
  closeOverlay: () => void
  engagement: ProductEngagement
  engagementByProduct: Record<string, ProductEngagement>
  feedRef: RefObject<HTMLDivElement | null>
  muted: boolean
  openOverlay: (overlay: Overlay) => void
  overlay: Overlay
  productSlides: ProductSlide[]
  reviewText: string
  scrollToSlide: (index: number) => void
  setActiveIndex: (index: number) => void
  setChatText: (value: string) => void
  decreaseCartItem: (productId: string) => void
  increaseCartItem: (productId: string) => void
  setLiked: (value: boolean) => void
  setMuted: (updater: (value: boolean) => boolean) => void
  setOverlay: (overlay: Overlay) => void
  setReviewText: (value: string) => void
  share: (product?: ProductSlide) => void
  slides: FeedSlideEntry[]
  submitChat: (event: FormEvent<HTMLFormElement>) => void
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
  closeOverlay,
  engagement,
  engagementByProduct,
  feedRef,
  muted,
  openOverlay,
  overlay,
  productSlides,
  reviewText,
  scrollToSlide,
  setActiveIndex,
  setChatText,
  decreaseCartItem,
  increaseCartItem,
  setLiked,
  setMuted,
  setOverlay,
  setReviewText,
  share,
  slides,
  submitChat,
  submitReview,
  toast,
}: FeedProps) {
  return (
    <section className="feed" aria-label="Tatcha product feed">
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
        {slides.map(({ Component, id }, index) => (
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
          />
        ))}
      </div>

      <header className="feed-top">
        <button
          className="brand-button"
          type="button"
          aria-label="Tatcha home"
          onClick={() => scrollToSlide(0)}
        >
          <LogoMark />
          <span>T A T C H A</span>
        </button>
        <a
          className="circle-link"
          href="https://www.instagram.com/tatcha/"
          aria-label="Instagram"
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
          closeOverlay={closeOverlay}
          decreaseCartItem={decreaseCartItem}
          increaseCartItem={increaseCartItem}
          engagement={engagement}
          overlay={overlay}
          reviewText={reviewText}
          setChatText={setChatText}
          setLiked={setLiked}
          setReviewText={setReviewText}
          submitChat={submitChat}
          submitReview={submitReview}
        />
      )}

      {toast && <div className="toast">{toast}</div>}
    </section>
  )
}
