import { longevityMemorySlide } from '../../../data/productSlides'
import { ProductSlideBase } from '../ProductSlideBase/ProductSlideBase'
import type { SlideRendererProps } from '../types'
import './Slide04LongevityMemory.css'

export function Slide04LongevityMemory(props: SlideRendererProps) {
  return <ProductSlideBase {...props} slide={longevityMemorySlide} />
}
