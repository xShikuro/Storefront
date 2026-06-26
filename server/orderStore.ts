import { randomBytes } from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { serverConfig } from './config.js'
import type { CheckoutOrder, StoredOrder, SubmittedOrder } from './types.js'

const ordersFilePath = path.join(serverConfig.dataDir, 'orders.jsonl')

function createOrderNumber() {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '')
  const suffix = randomBytes(3).toString('hex').toUpperCase()
  return `#${date}-${suffix}`
}

async function ensureStorage() {
  await fs.mkdir(serverConfig.dataDir, { recursive: true })
}

export async function saveOrder(
  order: CheckoutOrder,
  meta: Pick<StoredOrder, 'ip' | 'userAgent'>,
): Promise<SubmittedOrder> {
  await ensureStorage()

  const submittedOrder: SubmittedOrder = {
    ...order,
    createdAt: new Date().toISOString(),
    orderNumber: createOrderNumber(),
  }
  const storedOrder: StoredOrder = {
    ...submittedOrder,
    ip: meta.ip,
    source: 'storefront',
    status: 'new',
    userAgent: meta.userAgent,
  }

  await fs.appendFile(ordersFilePath, `${JSON.stringify(storedOrder)}\n`, 'utf8')
  return submittedOrder
}

export async function readOrders(): Promise<StoredOrder[]> {
  try {
    const file = await fs.readFile(ordersFilePath, 'utf8')
    return file
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line) as StoredOrder)
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return []
    }

    throw error
  }
}
