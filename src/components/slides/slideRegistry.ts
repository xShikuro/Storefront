import {
  dewyFullSlide,
  dewySkinCreamSlide,
  faceAiSlide,
  longevityMemorySlide,
  productSlides,
  silkSerumSlide,
  waterCreamSlide,
  waterRefillSlide,
} from '../../data/productSlides'
import type { ProductSlide } from '../../types/storefront'
import type { FeedSlideEntry } from './types'
import { DynamicProductSlide } from './DynamicProductSlide/DynamicProductSlide'
import { Slide01Intro } from './Slide01Intro/Slide01Intro'
import { Slide02DewyFull } from './Slide02DewyFull/Slide02DewyFull'
import { Slide03DewySkinCream } from './Slide03DewySkinCream/Slide03DewySkinCream'
import { Slide04LongevityMemory } from './Slide04LongevityMemory/Slide04LongevityMemory'
import { Slide05SilkSerum } from './Slide05SilkSerum/Slide05SilkSerum'
import { Slide06WaterCream } from './Slide06WaterCream/Slide06WaterCream'
import { Slide07WaterRefill } from './Slide07WaterRefill/Slide07WaterRefill'
import { Slide08FaceAi } from './Slide08FaceAi/Slide08FaceAi'
import { Slide09End } from './Slide09End/Slide09End'

export function createDynamicFeedSlides(products: ProductSlide[]): FeedSlideEntry[] {
  return [
    { Component: Slide01Intro, id: 'intro', kind: 'intro' },
    ...products.map((product) => ({
      Component: DynamicProductSlide,
      id: product.id,
      kind: 'product' as const,
      product,
    })),
    { Component: Slide09End, id: 'end', kind: 'end' },
  ]
}

export const feedSlides: FeedSlideEntry[] = [
  { Component: Slide01Intro, id: 'intro', kind: 'intro' },
  {
    Component: Slide02DewyFull,
    id: dewyFullSlide.id,
    kind: 'product',
    product: dewyFullSlide,
  },
  {
    Component: Slide03DewySkinCream,
    id: dewySkinCreamSlide.id,
    kind: 'product',
    product: dewySkinCreamSlide,
  },
  {
    Component: Slide04LongevityMemory,
    id: longevityMemorySlide.id,
    kind: 'product',
    product: longevityMemorySlide,
  },
  {
    Component: Slide05SilkSerum,
    id: silkSerumSlide.id,
    kind: 'product',
    product: silkSerumSlide,
  },
  {
    Component: Slide06WaterCream,
    id: waterCreamSlide.id,
    kind: 'product',
    product: waterCreamSlide,
  },
  {
    Component: Slide07WaterRefill,
    id: waterRefillSlide.id,
    kind: 'product',
    product: waterRefillSlide,
  },
  {
    Component: Slide08FaceAi,
    id: faceAiSlide.id,
    kind: 'product',
    product: faceAiSlide,
  },
  { Component: Slide09End, id: 'end', kind: 'end' },
]

export { productSlides }
