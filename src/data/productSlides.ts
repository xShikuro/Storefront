import { catalogProducts } from './catalogProducts'
import { productsToSlides } from '../services/catalog/productToSlide'
import type { ProductSlide } from '../types/storefront'

export const productSlides = productsToSlides(catalogProducts)

function getProductSlide(index: number): ProductSlide {
  const slide = productSlides[index]

  if (!slide) {
    throw new Error(`Missing product slide at index ${index}`)
  }

  return slide
}

export const dewyFullSlide = getProductSlide(0)
export const dewySkinCreamSlide = getProductSlide(1)
export const longevityMemorySlide = getProductSlide(2)
export const silkSerumSlide = getProductSlide(3)
export const waterCreamSlide = getProductSlide(4)
export const waterRefillSlide = getProductSlide(5)
export const faceAiSlide = getProductSlide(6)
