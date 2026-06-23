import type { ComponentType } from 'react'
import type { Overlay, ProductEngagement, ProductSlide } from '../../types/storefront'

export type SlideRendererProps = {
  active: boolean
  addToCart: (product?: ProductSlide) => void
  cartQuantity: number
  engagementByProduct: Record<string, ProductEngagement>
  muted: boolean
  openOverlay: (overlay: Overlay) => void
  overlay: Overlay
  progressSlides: ProductSlide[]
  scrollToSlide: (index: number) => void
  setMuted: (updater: (value: boolean) => boolean) => void
  share: (product?: ProductSlide) => void
}

export type FeedSlideEntry =
  | {
      Component: ComponentType<SlideRendererProps>
      id: 'intro'
      kind: 'intro'
    }
  | {
      Component: ComponentType<SlideRendererProps>
      id: string
      kind: 'product'
      product: ProductSlide
    }
  | {
      Component: ComponentType<SlideRendererProps>
      id: 'end'
      kind: 'end'
    }
