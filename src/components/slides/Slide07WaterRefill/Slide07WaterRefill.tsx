import { waterRefillSlide } from '../../../data/productSlides'
import { ProductSlideBase } from '../ProductSlideBase/ProductSlideBase'
import type { SlideRendererProps } from '../types'
import './Slide07WaterRefill.css'

export function Slide07WaterRefill(props: SlideRendererProps) {
  return <ProductSlideBase {...props} slide={waterRefillSlide} />
}
