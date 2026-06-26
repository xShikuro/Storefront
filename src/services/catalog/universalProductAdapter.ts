import type { CatalogProduct, CatalogVariant } from '../../types/catalog'

type ApiRecord = Record<string, unknown>

export type FieldAccessor =
  | string
  | readonly string[]
  | ((item: ApiRecord) => unknown)

export type UniversalVariantMapping = {
  chip?: FieldAccessor
  description?: FieldAccessor
  id?: FieldAccessor
  image?: FieldAccessor
  price?: FieldAccessor
  title?: FieldAccessor
}

export type UniversalProductMapping = {
  collectionPath?: FieldAccessor
  defaults?: {
    description?: string
    image?: string
    sellerId?: string
  }
  fields: {
    brand?: FieldAccessor
    category?: FieldAccessor
    description?: FieldAccessor
    details?: FieldAccessor
    id?: FieldAccessor
    image?: FieldAccessor
    price?: FieldAccessor
    sourceUrl?: FieldAccessor
    tags?: FieldAccessor
    title?: FieldAccessor
    variants?: FieldAccessor
  }
  variant?: UniversalVariantMapping
}

function isRecord(value: unknown): value is ApiRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function getByPath(value: unknown, path: string) {
  return path.split('.').reduce<unknown>((current, part) => {
    if (current === undefined || current === null) {
      return undefined
    }

    if (Array.isArray(current)) {
      const index = Number(part)
      return Number.isInteger(index) ? current[index] : undefined
    }

    if (isRecord(current)) {
      return current[part]
    }

    return undefined
  }, value)
}

function readField(item: ApiRecord, accessor?: FieldAccessor) {
  if (!accessor) {
    return undefined
  }

  if (typeof accessor === 'function') {
    return accessor(item)
  }

  if (typeof accessor === 'string') {
    return getByPath(item, accessor)
  }

  if (Array.isArray(accessor)) {
    for (const path of accessor) {
      const value = getByPath(item, path)

      if (value !== undefined && value !== null && value !== '') {
        return value
      }
    }

    return undefined
  }
}

function toText(value: unknown) {
  if (typeof value === 'string') {
    return value.trim()
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  return ''
}

function toNumber(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string') {
    const normalized = value.replace(/[^\d.,-]/g, '').replace(',', '.')
    const parsed = Number(normalized)
    return Number.isFinite(parsed) ? parsed : undefined
  }

  return undefined
}

function toTextList(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (isRecord(item)) {
          return toText(item.name ?? item.label ?? item.title ?? item.value)
        }

        return toText(item)
      })
      .filter(Boolean)
  }

  const text = toText(value)
  return text ? [text] : []
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-+|-+$/g, '')
}

function readImage(item: ApiRecord, mapping: UniversalProductMapping) {
  const image = readField(item, mapping.fields.image)

  if (Array.isArray(image)) {
    const firstImage = image.find(Boolean)

    if (isRecord(firstImage)) {
      return toText(firstImage.url ?? firstImage.src ?? firstImage.image)
    }

    return toText(firstImage)
  }

  if (isRecord(image)) {
    return toText(image.url ?? image.src ?? image.image)
  }

  return toText(image) || mapping.defaults?.image || ''
}

function getCommonDetails(item: ApiRecord, mapping: UniversalProductMapping) {
  const details = toTextList(readField(item, mapping.fields.details))
  const brand = toText(readField(item, mapping.fields.brand))
  const category = toText(readField(item, mapping.fields.category))
  const tags = toTextList(readField(item, mapping.fields.tags))

  return {
    chips: [category, ...tags].filter(Boolean).slice(0, 4),
    details: [
      ...details,
      category ? `Category: ${category}` : '',
      brand ? `Brand: ${brand}` : '',
      tags.length ? `Tags: ${tags.join(', ')}` : '',
    ].filter(Boolean),
  }
}

function mapVariants(
  product: ApiRecord,
  mapping: UniversalProductMapping,
  productDetails: string[],
): CatalogVariant[] | undefined {
  const variants = readField(product, mapping.fields.variants)

  if (!Array.isArray(variants)) {
    return undefined
  }

  const variantMapping = mapping.variant ?? {}
  const mappedVariants = variants
    .filter(isRecord)
    .map((variant, index): CatalogVariant | null => {
      const id = toText(readField(variant, variantMapping.id)) || String(index + 1)
      const title =
        toText(readField(variant, variantMapping.title)) ||
        toText(readField(variant, variantMapping.chip))
      const chip = toText(readField(variant, variantMapping.chip)) || title || id
      const image = toText(readField(variant, variantMapping.image))
      const price = toNumber(readField(variant, variantMapping.price))
      const description = toText(readField(variant, variantMapping.description))

      if (!chip) {
        return null
      }

      return {
        chip,
        description: description || undefined,
        details: description ? [description, ...productDetails] : productDetails,
        id: slugify(id) || String(index + 1),
        media: image
          ? {
              poster: image,
              type: 'image',
            }
          : undefined,
        price,
        title: title || undefined,
      }
    })
    .filter((variant): variant is CatalogVariant => Boolean(variant))

  return mappedVariants.length ? mappedVariants : undefined
}

function getProductCollection(payload: unknown, mapping: UniversalProductMapping) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!isRecord(payload)) {
    return []
  }

  const mappedCollection = readField(payload, mapping.collectionPath)

  if (Array.isArray(mappedCollection)) {
    return mappedCollection
  }

  for (const path of ['products', 'data.products', 'data', 'items', 'results']) {
    const value = getByPath(payload, path)

    if (Array.isArray(value)) {
      return value
    }
  }

  return []
}

export function mapApiPayloadToCatalogProducts(
  payload: unknown,
  mapping: UniversalProductMapping,
): CatalogProduct[] {
  const sellerId = mapping.defaults?.sellerId ?? 'external-seller'

  return getProductCollection(payload, mapping)
    .filter(isRecord)
    .map((item, index): CatalogProduct | null => {
      const externalId =
        toText(readField(item, mapping.fields.id)) || `product-${index + 1}`
      const title = toText(readField(item, mapping.fields.title))
      const description =
        toText(readField(item, mapping.fields.description)) ||
        mapping.defaults?.description ||
        title
      const image = readImage(item, mapping)
      const price = toNumber(readField(item, mapping.fields.price))
      const sourceUrl = toText(readField(item, mapping.fields.sourceUrl))
      const commonDetails = getCommonDetails(item, mapping)

      if (!title || !description || !image) {
        return null
      }

      const details = [description, ...commonDetails.details]
      const variants = mapVariants(item, mapping, details)

      return {
        addIcon: 'bag',
        chips: commonDetails.chips.length ? commonDetails.chips : undefined,
        cta: 'add',
        description,
        details,
        externalId,
        id: `${sellerId}-${slugify(externalId) || index + 1}`,
        media: {
          poster: image,
          type: 'image',
        },
        price,
        sellerId,
        sourceUrl: sourceUrl || undefined,
        title,
        variants,
      }
    })
    .filter((product): product is CatalogProduct => Boolean(product))
}
