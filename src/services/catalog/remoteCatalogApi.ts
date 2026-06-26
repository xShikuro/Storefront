import { catalogSourceConfig } from '../../data/catalogSourceConfig'
import { mapApiPayloadToCatalogProducts } from './universalProductAdapter'

export async function fetchRemoteCatalogProducts(signal?: AbortSignal) {
  const { api } = catalogSourceConfig

  if (!api.url) {
    return []
  }

  const response = await fetch(api.url, {
    headers: {
      Accept: 'application/json',
    },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Products API request failed: ${response.status}`)
  }

  const payload = (await response.json()) as unknown
  const products = mapApiPayloadToCatalogProducts(payload, api.mapping)

  if (!products.length) {
    throw new Error('Products API returned no compatible products.')
  }

  return products
}
