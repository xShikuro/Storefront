import { ProductSlideBase } from '../ProductSlideBase/ProductSlideBase'
import type { SlideRendererProps } from '../types'

export function DynamicProductSlide({ slide, ...props }: SlideRendererProps) {
  if (!slide) {
    return null
  }

  return <ProductSlideBase {...props} slide={slide} />
}
