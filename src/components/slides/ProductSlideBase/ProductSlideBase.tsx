import { useState } from 'react'
import type { Overlay, ProductEngagement, ProductSlide } from '../../../types/storefront'
import { ActionRail } from '../../feed/ActionRail'
import { Icon } from '../../shared/Icon'
import { SlideMedia } from '../SlideMedia/SlideMedia'
import { StoryProgress } from '../StoryProgress/StoryProgress'
import './ProductSlideBase.css'

const emptyEngagement: ProductEngagement = {
  liked: false,
  reviews: [],
}

type ProductSlideBaseProps = {
  active: boolean
  addToCart: (product?: ProductSlide) => void
  cartQuantity: number
  engagementByProduct: Record<string, ProductEngagement>
  muted: boolean
  openOverlay: (overlay: Overlay) => void
  overlay: Overlay
  progressSlides: ProductSlide[]
  setMuted: (updater: (value: boolean) => boolean) => void
  share: (product?: ProductSlide) => void
  slide: ProductSlide
}

export function ProductSlideBase({
  active,
  addToCart,
  cartQuantity,
  engagementByProduct,
  muted,
  openOverlay,
  overlay,
  progressSlides,
  setMuted,
  share,
  slide,
}: ProductSlideBaseProps) {
  const [expanded, setExpanded] = useState(false)
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(
    slide.initialVariantIndex ?? 0,
  )
  const [variantAnimationKey, setVariantAnimationKey] = useState(0)

  const toggleExpanded = () => setExpanded((value) => !value)
  const selectedVariant = slide.variants?.[selectedVariantIndex]
  const showVariantChips = Boolean(slide.chips || (slide.variants && !slide.variantTiles))
  const engagement = engagementByProduct[slide.id] ?? emptyEngagement
  const visibleSlide: ProductSlide = selectedVariant
    ? {
        ...slide,
        addIcon: selectedVariant.addIcon ?? slide.addIcon,
        description: selectedVariant.description,
        details: selectedVariant.details,
        id: `${slide.id}-${selectedVariant.id}`,
        media: selectedVariant.media,
        price: selectedVariant.price,
        title: selectedVariant.title,
      }
    : slide

  const selectVariant = (index: number) => {
    if (index === selectedVariantIndex) {
      return
    }

    setSelectedVariantIndex(index)
    setExpanded(false)
    setVariantAnimationKey((value) => value + 1)
  }

  return (
    <section
      className={`slide product-slide product-${slide.id}`}
      data-variant={selectedVariant?.id ?? 'default'}
    >
      <div className="variant-slide-motion" key={variantAnimationKey}>
        <SlideMedia active={active} muted={muted} slide={visibleSlide} />
      </div>
      <div className="slide-shade" />
      <ActionRail
        activeProduct={slide}
        cartQuantity={cartQuantity}
        engagement={engagement}
        muted={muted}
        overlay={overlay}
        openOverlay={openOverlay}
        setMuted={setMuted}
        share={() => share(slide)}
      />

      {slide.variantTiles && (
        <div className="variant-stack" aria-label="Variants">
          {slide.variantTiles.map((tile, tileIndex) => (
            <button
              aria-label={`Show variant ${tileIndex + 1}`}
              aria-pressed={tileIndex === selectedVariantIndex}
              className={tileIndex === selectedVariantIndex ? 'is-selected' : ''}
              type="button"
              key={tile.image}
              onClick={() => {
                if (slide.variants?.[tileIndex]) {
                  selectVariant(tileIndex)
                }
              }}
            >
              <img src={tile.image} alt="" />
              {tile.label && <span>{tile.label}</span>}
            </button>
          ))}
        </div>
      )}

      <section
        className={`feed-copy ${expanded ? 'is-expanded' : ''}`}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onClick={toggleExpanded}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            toggleExpanded()
          }
        }}
      >
        <h1>{visibleSlide.title}</h1>
        {showVariantChips && (
          <div className="chip-row">
            {(slide.variants?.map((variant) => variant.chip) ?? slide.chips ?? []).map((chip, chipIndex) => (
              <button
                className={chipIndex === selectedVariantIndex ? 'is-active' : ''}
                type="button"
                key={`${chip}-${chipIndex}`}
                onClick={(event) => {
                  event.stopPropagation()
                  if (slide.variants) {
                    selectVariant(chipIndex)
                  }
                }}
              >
                {chip}
              </button>
            ))}
          </div>
        )}
        <p>{expanded ? visibleSlide.details[0] : visibleSlide.description}</p>
        {expanded && (
          <div className="expanded-details">
            {visibleSlide.details.slice(1).map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
          </div>
        )}
        {visibleSlide.cta === 'analysis' && !expanded && (
          <button
            className="read-more"
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              openOverlay('details')
            }}
          >
            ЧИТАТЬ ДАЛЕЕ <span>›</span>
          </button>
        )}
      </section>

      <a className="powered" href="https://shop.vibevox.pro/" aria-label="Powered by">
        <span>POWERED BY</span>
        <strong>SHOP.VIBEVOX.PRO</strong>
      </a>

      {visibleSlide.price && (
        <div className="slide-price">
          <strong>{visibleSlide.price}</strong>
          <span>USD</span>
        </div>
      )}

      <button
        className={visibleSlide.cta === 'analysis' ? 'blue-cta' : 'add-cta'}
        type="button"
        onClick={() =>
          visibleSlide.cta === 'analysis' ? openOverlay('analysis') : addToCart(visibleSlide)
        }
      >
        {visibleSlide.cta === 'analysis' ? (
          '✨ Facial analysis'
        ) : (
          <>
            <Icon name={visibleSlide.addIcon ?? 'bag'} />
            ДОБАВИТЬ
          </>
        )}
      </button>

      <StoryProgress
        activeSlideId={slide.id}
        activeVariantIndex={selectedVariantIndex}
        slides={progressSlides}
        variantCount={slide.variants?.length}
      />
    </section>
  )
}
