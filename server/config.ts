import fs from 'node:fs'
import path from 'node:path'

function loadDotEnvFile() {
  const envPath = path.resolve('.env')

  if (!fs.existsSync(envPath)) {
    return
  }

  const envFile = fs.readFileSync(envPath, 'utf8')

  for (const line of envFile.split('\n')) {
    const trimmedLine = line.trim()

    if (!trimmedLine || trimmedLine.startsWith('#') || !trimmedLine.includes('=')) {
      continue
    }

    const [key, ...valueParts] = trimmedLine.split('=')
    const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '')

    if (key && process.env[key] === undefined) {
      process.env[key] = value
    }
  }
}

loadDotEnvFile()

function getNumberEnv(name: string, fallback: number) {
  const value = Number(process.env[name])
  return Number.isFinite(value) && value > 0 ? value : fallback
}

function getListEnv(name: string) {
  return (process.env[name] ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export const serverConfig = {
  adminToken: process.env.ADMIN_TOKEN ?? '',
  allowedOrigins: getListEnv('CORS_ORIGIN'),
  clientDistDir: path.resolve(process.env.CLIENT_DIST_DIR ?? 'dist'),
  dataDir: path.resolve(process.env.DATA_DIR ?? 'storage'),
  host: process.env.HOST ?? '0.0.0.0',
  maxBodyBytes: getNumberEnv('MAX_BODY_BYTES', 1024 * 1024),
  port: getNumberEnv('PORT', 3000),
}
