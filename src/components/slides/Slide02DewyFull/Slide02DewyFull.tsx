import { dewyFullSlide } from '../../../data/productSlides'
import { ProductSlideBase } from '../ProductSlideBase/ProductSlideBase'
import type { SlideRendererProps } from '../types'
import './Slide02DewyFull.css'

export function Slide02DewyFull(props: SlideRendererProps) {
  return <ProductSlideBase {...props} slide={dewyFullSlide} />
}
