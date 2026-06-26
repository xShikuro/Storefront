import type { UniversalProductMapping } from '../services/catalog/universalProductAdapter'

const productsApiUrl = import.meta.env.VITE_PRODUCTS_API_URL?.trim() ?? ''
const responsePath = import.meta.env.VITE_PRODUCTS_API_RESPONSE_PATH?.trim()
const sellerId = import.meta.env.VITE_SELLER_ID?.trim() || 'default-seller'

const universalProductMapping: UniversalProductMapping = {
  collectionPath: responsePath || [
    'products',
    'data.products',
    'data',
    'items',
    'results',
  ],
  defaults: {
    sellerId,
  },
  fields: {
    brand: ['brand', 'brand.name', 'vendor', 'manufacturer'],
    category: ['category', 'category.name', 'type', 'collection'],
    description: [
      'description',
      'shortDescription',
      'short_description',
      'summary',
      'body',
    ],
    details: ['details', 'features', 'attributes', 'benefits'],
    id: ['id', 'product_id', 'productId', 'sku', 'slug'],
    image: [
      'image',
      'image.url',
      'image.src',
      'thumbnail',
      'thumbnail.url',
      'thumbnail.src',
      'cover',
      'cover.url',
      'images.0',
      'images.0.url',
      'images.0.src',
      'photos.0',
      'photos.0.url',
      'photos.0.src',
    ],
    price: [
      'price',
      'price.amount',
      'price.value',
      'salePrice',
      'sale_price',
      'regularPrice',
      'regular_price',
    ],
    sourceUrl: ['url', 'link', 'permalink', 'productUrl', 'product_url'],
    tags: ['tags', 'labels', 'skinTypes', 'skin_types'],
    title: ['title', 'name', 'productName', 'product_name'],
    variants: ['variants', 'options'],
  },
  variant: {
    chip: ['chip', 'label', 'name', 'title', 'size'],
    description: ['description', 'summary'],
    id: ['id', 'variant_id', 'sku', 'slug', 'name'],
    image: [
      'image',
      'image.url',
      'image.src',
      'thumbnail',
      'thumbnail.url',
      'images.0',
      'images.0.url',
      'images.0.src',
    ],
    price: ['price', 'price.amount', 'price.value'],
    title: ['title', 'name', 'label'],
  },
}

export const catalogSourceConfig = {
  api: {
    mapping: universalProductMapping,
    url: productsApiUrl,
  },
  mode: productsApiUrl ? 'api' : 'static',
} as const
