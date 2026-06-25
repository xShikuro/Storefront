import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnalysisScreen } from '../analysis/AnalysisScreen'
import { Feed } from '../feed/Feed'
import { AppShell } from '../layout/AppShell'
import { PhoneFrame } from '../layout/PhoneFrame'
import { feedSlides, productSlides } from '../slides/slideRegistry'
import { useCart } from '../../hooks/useCart'
import { useCheckout } from '../../hooks/useCheckout'
import type { Overlay, ProductEngagement } from '../../types/storefront'
import { getInitialSlide } from '../../utils/getInitialSlide'
import '../../styles/theme.css'

const emptyEngagement: ProductEngagement = {
  liked: false,
  reviews: [],
}

export function StorefrontExperience() {
  const feedRef = useRef<HTMLDivElement | null>(null)
  const [initialSlide] = useState(() => getInitialSlide(feedSlides.length - 1))
  const [activeIndex, setActiveIndex] = useState(initialSlide)
  const [overlay, setOverlay] = useState<Overlay>(null)
  const [engagementByProduct, setEngagementByProduct] = useState<
    Record<string, ProductEngagement>
  >({})
  const [muted, setMuted] = useState(true)
  const [reviewText, setReviewText] = useState('')
  const [chatText, setChatText] = useState('')
  const [toast, setToast] = useState('')

  const activeSlide = feedSlides[activeIndex]
  const activeProduct =
    activeSlide.kind === 'product' ? activeSlide.product : productSlides[0]
  const {
    addToCart,
    cartItems,
    cartQuantity,
    clearCart,
    decreaseCartItem,
    increaseCartItem,
    removeCartItem,
  } = useCart(activeProduct)

  const showToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 1800)
  }

  const {
    checkoutError,
    checkoutOrder,
    clearCheckoutError,
    isSubmittingOrder,
    orderDraft,
    setOrderDraft,
    submittedOrder,
    submitOrder,
  } = useCheckout({
    cartItems,
    cartQuantity,
    clearCart,
    setOverlay,
    showToast,
  })

  const activeEngagement = engagementByProduct[activeProduct.id] ?? emptyEngagement

  useEffect(() => {
    if (!feedRef.current || initialSlide === 0) {
      return
    }

    const frame = requestAnimationFrame(() => {
      if (!feedRef.current) {
        return
      }

      feedRef.current.scrollTo({
        top: initialSlide * feedRef.current.clientHeight,
        behavior: 'auto',
      })
      setActiveIndex(initialSlide)
    })

    return () => cancelAnimationFrame(frame)
  }, [initialSlide])

  const openOverlay = (next: Overlay) => setOverlay(next)
  const closeOverlay = () => setOverlay(null)

  const scrollToSlide = (index: number) => {
    feedRef.current?.scrollTo({
      top: index * feedRef.current.clientHeight,
      behavior: 'smooth',
    })
    setActiveIndex(index)
    setOverlay(null)
  }

  const updateActiveEngagement = (
    updater: (engagement: ProductEngagement) => ProductEngagement,
  ) => {
    setEngagementByProduct((items) => ({
      ...items,
      [activeProduct.id]: updater(items[activeProduct.id] ?? emptyEngagement),
    }))
  }

  const setActiveProductLiked = (liked: boolean) => {
    updateActiveEngagement((engagement) => ({
      ...engagement,
      liked,
    }))
  }

  const submitReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const review = reviewText.trim()
    if (!review) return
    updateActiveEngagement((engagement) => ({
      ...engagement,
      reviews: [...engagement.reviews, review],
    }))
    setReviewText('')
    showToast('Отзыв отправлен')
  }

  const submitChat = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!chatText.trim()) return
    setChatText('')
    showToast('AI консультант получил вопрос')
  }

  const share = async (product = activeProduct) => {
    const nav = navigator as Navigator & {
      clipboard?: { writeText: (value: string) => Promise<void> }
      share?: (data: { title: string; text: string; url: string }) => Promise<void>
    }

    if (typeof nav.share === 'function') {
      try {
        await nav.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        })
        return
      } catch {
        return
      }
    }

    await nav.clipboard?.writeText(window.location.href)
    showToast('Ссылка скопирована')
  }

  return (
    <AppShell showQr={overlay !== 'analysis'}>
      {overlay === 'analysis' ? (
        <AnalysisScreen
          closeOverlay={closeOverlay}
          muted={muted}
          product={activeProduct}
          setMuted={setMuted}
        />
      ) : (
        <PhoneFrame>
          <Feed
            activeIndex={activeIndex}
            activeProduct={activeProduct}
            addToCart={addToCart}
            cartItems={cartItems}
            cartQuantity={cartQuantity}
            chatText={chatText}
            checkoutError={checkoutError}
            checkoutOrder={checkoutOrder}
            clearCheckoutError={clearCheckoutError}
            closeOverlay={closeOverlay}
            engagement={activeEngagement}
            engagementByProduct={engagementByProduct}
            feedRef={feedRef}
            isSubmittingOrder={isSubmittingOrder}
            muted={muted}
            openOverlay={openOverlay}
            overlay={overlay}
            orderDraft={orderDraft}
            productSlides={productSlides}
            reviewText={reviewText}
            scrollToSlide={scrollToSlide}
            setActiveIndex={setActiveIndex}
            setChatText={setChatText}
            decreaseCartItem={decreaseCartItem}
            increaseCartItem={increaseCartItem}
            removeCartItem={removeCartItem}
            setLiked={setActiveProductLiked}
            setMuted={setMuted}
            setOverlay={setOverlay}
            setOrderDraft={setOrderDraft}
            setReviewText={setReviewText}
            share={share}
            slides={feedSlides}
            submittedOrder={submittedOrder}
            submitChat={submitChat}
            submitOrder={submitOrder}
            submitReview={submitReview}
            toast={toast}
          />
        </PhoneFrame>
      )}
    </AppShell>
  )
}
