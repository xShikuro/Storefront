import { waterCreamSlide } from '../../../data/productSlides'
import { ProductSlideBase } from '../ProductSlideBase/ProductSlideBase'
import type { SlideRendererProps } from '../types'
import './Slide06WaterCream.css'

export function Slide06WaterCream(props: SlideRendererProps) {
  return <ProductSlideBase {...props} slide={waterCreamSlide} />
}
