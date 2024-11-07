import { revalidateTag, unstable_cache } from 'next/cache'
import { cache } from 'react'

export type ValidTags =
  | ReturnType<typeof getGlobalTag>
  | ReturnType<typeof getUserTag>
  | ReturnType<typeof getProductTag>
  | ReturnType<typeof getUserProductsBetweenDatesTag>
  | ReturnType<typeof getUserLastProductsTag>
  | ReturnType<typeof getCatalogTag>
  | ReturnType<typeof getBillingTag>
  | ReturnType<typeof getIdTag>

export const CACHE_TAGS = {
  products: 'products',
  catalogs: 'catalogs',
  user: 'user',
  billing: 'billing'
} as const

export function getGlobalTag(tag: keyof typeof CACHE_TAGS) {
  return `global:${CACHE_TAGS[tag]}` as const
}

export function getUserTag(userId: string, tag: keyof typeof CACHE_TAGS) {
  return `user:${userId}-${CACHE_TAGS[tag]}` as const
}

export function getUserProductsBetweenDatesTag(
  userId: string,
  startOfWeekISO: string,
  endOfWeekISO: string
) {
  return `user:${userId}-products-${startOfWeekISO}-${endOfWeekISO}` as const
}

export function getUserLastProductsTag(
  userId: string,
  location: 'Dashboard' | 'Billing'
) {
  return `user:${userId}-products-${location}` as const
}

export function getBillingTag(userId: string, tag: keyof typeof CACHE_TAGS) {
  return `billing:${userId}-${CACHE_TAGS[tag]}` as const
}

export function getProductTag(productId: string, tag: keyof typeof CACHE_TAGS) {
  return `product:${productId}-${CACHE_TAGS[tag]}` as const
}

export function getCatalogTag(catalogId: string, tag: keyof typeof CACHE_TAGS) {
  return `catalog:${catalogId}-${CACHE_TAGS[tag]}` as const
}

export function getIdTag(id: string, tag: keyof typeof CACHE_TAGS) {
  return `id:${id}-${CACHE_TAGS[tag]}` as const
}

export function clearFullCache() {
  revalidateTag('*')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dbCache<T extends (...args: any[]) => Promise<any>>(
  cb: Parameters<typeof unstable_cache<T>>[0],
  { tags }: { tags: ValidTags[] }
) {
  return cache(unstable_cache<T>(cb, undefined, { tags: [...tags, '*'] }))
}

export function revalidateDbCache({
  tag,
  userId,
  id
}: {
  tag: keyof typeof CACHE_TAGS
  userId?: string
  id?: string
}) {
  revalidateTag(getGlobalTag(tag))
  if (userId != null) {
    revalidateTag(getUserTag(userId, tag))
  }
  if (id != null) {
    revalidateTag(getIdTag(id, tag))
  }
}
