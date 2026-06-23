import { LogoMark } from '../../shared/LogoMark'
import type { SlideRendererProps } from '../types'
import './Slide09End.css'

export function Slide09End({ scrollToSlide }: SlideRendererProps) {
  return (
    <section className="slide end-slide">
      <LogoMark />
      <h2>ВЫ ПОСМОТРЕЛИ ВСЕ ТОВАРЫ</h2>
      <p>Нажмите кнопку чтобы вернуться на главную</p>
      <button type="button" onClick={() => scrollToSlide(0)}>
        ← На главную
      </button>
    </section>
  )
}
