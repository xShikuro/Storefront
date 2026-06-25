import type { ProductSlide } from './storefront'

export type CatalogMedia = ProductSlide['media']

export type CatalogVariantTile = {
  image: string
  label: string
}

export type CatalogVariant = {
  addIcon?: ProductSlide['addIcon']
  chip: string
  description?: string
  details?: string[]
  externalId?: string
  id: string
  media?: CatalogMedia
  price?: number
  sourceUrl?: string
  title?: string
}

export type CatalogProduct = {
  addIcon?: ProductSlide['addIcon']
  chips?: string[]
  cta?: ProductSlide['cta']
  description: string
  details: string[]
  externalId: string
  id: string
  initialVariantIndex?: number
  media: CatalogMedia
  price?: number
  sellerId: string
  sourceUrl?: string
  startWithBaseMedia?: boolean
  title: string
  variants?: CatalogVariant[]
  variantTiles?: CatalogVariantTile[]
}
