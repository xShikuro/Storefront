import { faceAiSlide } from '../../../data/productSlides'
import { ProductSlideBase } from '../ProductSlideBase/ProductSlideBase'
import type { SlideRendererProps } from '../types'
import './Slide08FaceAi.css'

export function Slide08FaceAi(props: SlideRendererProps) {
  return <ProductSlideBase {...props} slide={faceAiSlide} />
}
