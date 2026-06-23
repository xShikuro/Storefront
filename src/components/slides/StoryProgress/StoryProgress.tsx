import type { ProductSlide } from '../../../types/storefront'
import './StoryProgress.css'

type StoryProgressProps = {
  activeSlideId: string
  activeVariantIndex?: number
  slides: ProductSlide[]
  variantCount?: number
}

export function StoryProgress({
  activeSlideId,
  activeVariantIndex = 0,
  slides,
  variantCount,
}: StoryProgressProps) {
  const count = variantCount ?? slides.length

  return (
    <div
      className="story-progress"
      aria-hidden="true"
      style={{ gridTemplateColumns: `repeat(${count}, 1fr)` }}
    >
      {variantCount
        ? Array.from({ length: variantCount }, (_, progressIndex) => (
            <span
              className={progressIndex === activeVariantIndex ? 'is-active' : ''}
              key={progressIndex}
              style={{ animationDelay: `${progressIndex * 40}ms` }}
            />
          ))
        : slides.map((progressSlide, progressIndex) => (
            <span
              className={progressSlide.id === activeSlideId ? 'is-active' : ''}
              key={progressSlide.id}
              style={{ animationDelay: `${progressIndex * 40}ms` }}
            />
          ))}
    </div>
  )
}
