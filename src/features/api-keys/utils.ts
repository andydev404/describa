import { createHash, randomBytes } from 'crypto'

export function generateApiKey(prefix: string = 'dk'): string {
  const bytes = randomBytes(32)
  const hash = createHash('sha256').update(bytes).digest('hex')
  return `${prefix}_${hash}`
}
