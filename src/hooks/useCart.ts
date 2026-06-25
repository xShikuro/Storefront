import { storefrontConfig } from '../data/storefrontConfig'
import type { CartItem, ProductSlide } from '../types/storefront'
import { useLocalStorageState } from './useLocalStorageState'

const storageScope = storefrontConfig.brand.name.toLowerCase().replace(/\s+/g, '-')
const cartStorageKey = `storefront:${storageScope}:cart-items:v1`

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function parseStoredProduct(value: unknown): ProductSlide | null {
  if (!isRecord(value) || value.kind !== 'product') {
    return null
  }

  const media = value.media

  if (
    !isRecord(media) ||
    typeof media.poster !== 'string' ||
    (media.type !== 'image' && media.type !== 'video')
  ) {
    return null
  }

  if (
    typeof value.id !== 'string' ||
    typeof value.title !== 'string' ||
    typeof value.description !== 'string' ||
    !isStringArray(value.details) ||
    (value.cta !== 'add' && value.cta !== 'analysis')
  ) {
    return null
  }

  return value as ProductSlide
}

function parseStoredCartItems(value: unknown): CartItem[] | null {
  if (!Array.isArray(value)) {
    return null
  }

  const items = value.map((item): CartItem | null => {
    if (!isRecord(item) || typeof item.quantity !== 'number') {
      return null
    }

    const product = parseStoredProduct(item.product)

    if (!product || !Number.isFinite(item.quantity) || item.quantity <= 0) {
      return null
    }

    return {
      product,
      quantity: Math.floor(item.quantity),
    }
  })

  return items.every((item): item is CartItem => Boolean(item)) ? items : null
}

export function useCart(fallbackProduct: ProductSlide) {
  const [cartItems, setCartItems] = useLocalStorageState<CartItem[]>(
    cartStorageKey,
    [],
    parseStoredCartItems,
  )
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)

  const addToCart = (product = fallbackProduct) => {
    setCartItems((items) => {
      const currentItem = items.find((item) => item.product.id === product.id)

      if (!currentItem) {
        return [...items, { product, quantity: 1 }]
      }

      return items.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      )
    })
  }

  const increaseCartItem = (productId: string) => {
    setCartItems((items) =>
      items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    )
  }

  const decreaseCartItem = (productId: string) => {
    setCartItems((items) =>
      items.flatMap((item) => {
        if (item.product.id !== productId) {
          return [item]
        }

        const quantity = item.quantity - 1
        return quantity > 0 ? [{ ...item, quantity }] : []
      }),
    )
  }

  const removeCartItem = (productId: string) => {
    setCartItems((items) => items.filter((item) => item.product.id !== productId))
  }

  const clearCart = () => setCartItems([])

  return {
    addToCart,
    cartItems,
    cartQuantity,
    clearCart,
    decreaseCartItem,
    increaseCartItem,
    removeCartItem,
  }
}
