import { storefrontConfig } from '../../../data/storefrontConfig'
import type { SlideRendererProps } from '../types'
import './Slide01Intro.css'

export function Slide01Intro({ scrollToSlide }: SlideRendererProps) {
  const { categories, swipeHint, swipeSymbol, swipeTarget } = storefrontConfig.intro

  return (
    <section className="slide intro-slide">
      <div className="intro-buttons">
        {categories.map((button, buttonIndex) => (
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
      <button
        className="swipe-hint"
        type="button"
        onClick={() => scrollToSlide(swipeTarget)}
      >
        <span>{swipeSymbol}</span>
        {swipeHint}
      </button>
    </section>
  )
}
