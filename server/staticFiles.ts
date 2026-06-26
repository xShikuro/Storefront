import fs from 'node:fs/promises'
import path from 'node:path'
import type { ServerResponse } from 'node:http'
import { serverConfig } from './config.js'

const mimeTypes: Record<string, string> = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

function getSafeStaticPath(urlPathname: string) {
  const requestedPath = urlPathname === '/' ? '/index.html' : urlPathname
  const resolvedPath = path.resolve(serverConfig.clientDistDir, `.${requestedPath}`)
  const relativePath = path.relative(serverConfig.clientDistDir, resolvedPath)

  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    return null
  }

  return resolvedPath
}

export async function serveStaticFile(urlPathname: string, response: ServerResponse) {
  const filePath = getSafeStaticPath(urlPathname)

  if (!filePath) {
    response.writeHead(403)
    response.end('Forbidden')
    return
  }

  try {
    const file = await fs.readFile(filePath)
    response.writeHead(200, {
      'Cache-Control': filePath.endsWith('index.html')
        ? 'no-cache'
        : 'public, max-age=31536000, immutable',
      'Content-Type': mimeTypes[path.extname(filePath)] ?? 'application/octet-stream',
    })
    response.end(file)
  } catch {
    const indexPath = path.join(serverConfig.clientDistDir, 'index.html')
    const indexFile = await fs.readFile(indexPath)
    response.writeHead(200, {
      'Cache-Control': 'no-cache',
      'Content-Type': mimeTypes['.html'],
    })
    response.end(indexFile)
  }
}
