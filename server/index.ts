import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import { serverConfig } from './config.js'
import { readOrders, saveOrder } from './orderStore.js'
import { serveStaticFile } from './staticFiles.js'
import { validateCheckoutOrderPayload } from './validation.js'

function getAllowedOrigin(request: IncomingMessage) {
  const origin = request.headers.origin

  if (!origin) {
    return ''
  }

  if (!serverConfig.allowedOrigins.length || serverConfig.allowedOrigins.includes(origin)) {
    return origin
  }

  return ''
}

function writeJson(
  request: IncomingMessage,
  response: ServerResponse,
  statusCode: number,
  payload: unknown,
) {
  const allowedOrigin = getAllowedOrigin(request)

  response.writeHead(statusCode, {
    ...(allowedOrigin ? { 'Access-Control-Allow-Origin': allowedOrigin } : {}),
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json; charset=utf-8',
    Vary: 'Origin',
  })
  response.end(JSON.stringify(payload))
}

function getClientIp(request: IncomingMessage) {
  const forwardedFor = request.headers['x-forwarded-for']

  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0].trim()
  }

  return request.socket.remoteAddress ?? ''
}

async function readJsonBody(request: IncomingMessage) {
  const chunks: Buffer[] = []
  let totalBytes = 0

  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    totalBytes += buffer.byteLength

    if (totalBytes > serverConfig.maxBodyBytes) {
      throw new Error('Request body is too large.')
    }

    chunks.push(buffer)
  }

  if (!chunks.length) {
    return null
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown
}

async function handleApiRequest(
  request: IncomingMessage,
  response: ServerResponse,
  pathname: string,
) {
  if (request.method === 'OPTIONS') {
    writeJson(request, response, 204, null)
    return
  }

  if (request.method === 'GET' && pathname === '/api/health') {
    writeJson(request, response, 200, {
      ok: true,
      service: 'storefront-api',
      time: new Date().toISOString(),
    })
    return
  }

  if (request.method === 'POST' && pathname === '/api/orders') {
    try {
      const payload = await readJsonBody(request)
      const validation = validateCheckoutOrderPayload(payload)

      if (!validation.ok) {
        writeJson(request, response, 400, {
          message: validation.message,
          ok: false,
        })
        return
      }

      const order = await saveOrder(validation.order, {
        ip: getClientIp(request),
        userAgent: request.headers['user-agent'] ?? '',
      })

      writeJson(request, response, 201, {
        ok: true,
        order,
      })
    } catch (error) {
      writeJson(request, response, 400, {
        message: error instanceof Error ? error.message : 'Invalid order request.',
        ok: false,
      })
    }
    return
  }

  if (request.method === 'GET' && pathname === '/api/orders') {
    if (!serverConfig.adminToken) {
      writeJson(request, response, 404, {
        message: 'Not found.',
        ok: false,
      })
      return
    }

    if (request.headers['x-admin-token'] !== serverConfig.adminToken) {
      writeJson(request, response, 401, {
        message: 'Unauthorized.',
        ok: false,
      })
      return
    }

    writeJson(request, response, 200, {
      ok: true,
      orders: await readOrders(),
    })
    return
  }

  writeJson(request, response, 404, {
    message: 'Not found.',
    ok: false,
  })
}

const server = createServer((request, response) => {
  void (async () => {
    const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`)

    if (url.pathname.startsWith('/api/')) {
      await handleApiRequest(request, response, url.pathname)
      return
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405)
      response.end('Method Not Allowed')
      return
    }

    await serveStaticFile(url.pathname, response)
  })().catch((error: unknown) => {
    writeJson(request, response, 500, {
      message: error instanceof Error ? error.message : 'Server error.',
      ok: false,
    })
  })
})

server.listen(serverConfig.port, serverConfig.host, () => {
  console.log(
    `Storefront server is running at http://${serverConfig.host}:${serverConfig.port}`,
  )
})
