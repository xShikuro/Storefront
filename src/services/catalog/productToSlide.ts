import type { CatalogProduct } from '../../types/catalog'
import type { ProductSlide } from '../../types/storefront'

export function productToSlide(product: CatalogProduct): ProductSlide {
  return {
    addIcon: product.addIcon,
    chips: product.chips,
    cta: product.cta ?? 'add',
    description: product.description,
    details: product.details,
    id: product.id,
    initialVariantIndex: product.initialVariantIndex,
    kind: 'product',
    media: product.media,
    price: product.price,
    startWithBaseMedia: product.startWithBaseMedia,
    title: product.title,
    variants: product.variants?.map((variant) => ({
      addIcon: variant.addIcon ?? product.addIcon,
      chip: variant.chip,
      description: variant.description ?? product.description,
      details: variant.details ?? product.details,
      id: variant.id,
      media: variant.media ?? product.media,
      price: variant.price,
      title: variant.title ?? product.title,
    })),
    variantTiles: product.variantTiles,
  }
}

export function productsToSlides(products: CatalogProduct[]) {
  return products.map(productToSlide)
}
