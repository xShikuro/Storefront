import type { SlideRendererProps } from '../types'
import './Slide01Intro.css'

const categoryButtons = [
  { label: 'SHOP DRY', target: 1 },
  { label: 'SHOP OILY', target: 5 },
  { label: 'SHOP SENSITIVE', target: 2 },
  { label: 'SHOP MATURE', target: 4 },
]

export function Slide01Intro({ scrollToSlide }: SlideRendererProps) {
  return (
    <section className="slide intro-slide">
      <div className="intro-buttons">
        {categoryButtons.map((button, buttonIndex) => (
          <button
            className={`intro-shop intro-shop-${buttonIndex + 1}`}
            type="button"
            key={button.label}
            onClick={() => scrollToSlide(button.target)}
          >
            {button.label}
          </button>
        ))}
      </div>
      <button className="swipe-hint" type="button" onClick={() => scrollToSlide(1)}>
        <span>⌃</span>
        СВАЙП К ТОВАРАМ
      </button>
    </section>
  )
}
