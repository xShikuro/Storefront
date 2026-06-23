import { silkSerumSlide } from '../../../data/productSlides'
import { ProductSlideBase } from '../ProductSlideBase/ProductSlideBase'
import type { SlideRendererProps } from '../types'
import './Slide05SilkSerum.css'

export function Slide05SilkSerum(props: SlideRendererProps) {
  return <ProductSlideBase {...props} slide={silkSerumSlide} />
}
