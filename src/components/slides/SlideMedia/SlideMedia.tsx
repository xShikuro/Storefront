import type { ProductSlide } from '../../../types/storefront'
import './SlideMedia.css'

type SlideMediaProps = {
  active: boolean
  muted: boolean
  slide: ProductSlide
}

export function SlideMedia({ active, muted, slide }: SlideMediaProps) {
  if (slide.media.type === 'video' && slide.media.src && active) {
    return (
      <video
        className="feed-video"
        src={slide.media.src}
        poster={slide.media.poster}
        muted={muted}
        autoPlay
        loop
        playsInline
      />
    )
  }

  return <img className="feed-video" src={slide.media.poster} alt="" />
}
