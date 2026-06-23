import { dewySkinCreamSlide } from '../../../data/productSlides'
import { ProductSlideBase } from '../ProductSlideBase/ProductSlideBase'
import type { SlideRendererProps } from '../types'
import './Slide03DewySkinCream.css'

export function Slide03DewySkinCream(props: SlideRendererProps) {
  return <ProductSlideBase {...props} slide={dewySkinCreamSlide} />
}
