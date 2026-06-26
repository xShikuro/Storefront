import { useEffect, useMemo, useState } from 'react'
import { catalogSourceConfig } from '../data/catalogSourceConfig'
import { productSlides as fallbackProductSlides } from '../data/productSlides'
import { fetchRemoteCatalogProducts } from '../services/catalog/remoteCatalogApi'
import { productsToSlides } from '../services/catalog/productToSlide'
import type { ProductSlide } from '../types/storefront'
import {
  createDynamicFeedSlides,
  feedSlides as staticFeedSlides,
} from '../components/slides/slideRegistry'

type CatalogSlidesSource = 'api' | 'static'
type CatalogSlidesStatus = 'fallback' | 'loading' | 'ready' | 'static'

type CatalogSlidesState = {
  error: string | null
  productSlides: ProductSlide[]
  source: CatalogSlidesSource
  status: CatalogSlidesStatus
}

const initialState: CatalogSlidesState = {
  error: null,
  productSlides: fallbackProductSlides,
  source: 'static',
  status: catalogSourceConfig.mode === 'api' ? 'loading' : 'static',
}

export function useCatalogSlides() {
  const [state, setState] = useState<CatalogSlidesState>(initialState)

  useEffect(() => {
    if (catalogSourceConfig.mode !== 'api') {
      return
    }

    const controller = new AbortController()

    fetchRemoteCatalogProducts(controller.signal)
      .then((products) => {
        setState({
          error: null,
          productSlides: productsToSlides(products),
          source: 'api',
          status: 'ready',
        })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return
        }

        setState({
          error:
            error instanceof Error
              ? error.message
              : 'Products API request failed.',
          productSlides: fallbackProductSlides,
          source: 'static',
          status: 'fallback',
        })
      })

    return () => controller.abort()
  }, [])

  const feedSlides = useMemo(
    () =>
      state.source === 'api'
        ? createDynamicFeedSlides(state.productSlides)
        : staticFeedSlides,
    [state.productSlides, state.source],
  )

  return {
    ...state,
    feedSlides,
  }
}
