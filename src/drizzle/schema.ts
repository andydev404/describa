import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  check,
  decimal,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar
} from 'drizzle-orm/pg-core'

import { Feature, IProductDetails } from '@/features/products/types'

const commonColumns = {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
}

export const UsersTable = pgTable(
  'users',
  {
    ...commonColumns,
    clerkUserId: text('clerk_user_id').notNull().unique(),
    currentCredits: integer('current_credits').notNull().default(0)
  },
  table => ({
    clerkUserIdIndex: index('user_subscriptions.clerk_user_id_index').on(
      table.clerkUserId
    )
  })
)

export const ProductsTable = pgTable(
  'products',
  {
    ...commonColumns,
    tone: varchar('tone', { length: 60 }).notNull(),
    language: varchar('language', { length: 50 }).notNull(),
    features: jsonb('features').$type<Feature[]>().notNull().default([]),
    images: jsonb('images').$type<{ url: string; type: string }[]>().notNull(),
    title: text('title').notNull(),
    catalogId: uuid('catalog_id').references(() => CatalogsTable.id, {
      onDelete: 'set null'
    }),
    shortDescription: text('short_description').notNull(),
    clerkUserId: text('clerk_user_id')
      .notNull()
      .references(() => UsersTable.clerkUserId, { onDelete: 'cascade' }),
    isActive: boolean('is_active').default(true).notNull()
  },
  table => ({
    clerkUserIdIndex: index('products.clerk_user_id_index').on(
      table.clerkUserId
    )
  })
)

export const ProductDescriptionsTable = pgTable(
  'product_descriptions',
  {
    ...commonColumns,
    productId: uuid('product_id')
      .notNull()
      .references(() => ProductsTable.id, { onDelete: 'cascade' })
      .unique(),
    description: jsonb('description')
      .$type<IProductDetails | Record<string, IProductDetails>>()
      .notNull(),
    creditsCost: integer('credits_cost').notNull(),
    inputTokens: integer('input_tokens').notNull(),
    outputTokens: integer('output_tokens').notNull()
  },
  table => ({
    creditsCheck: check('credits_positive', sql`${table.creditsCost} > 0`)
  })
)

export const CatalogsTable = pgTable(
  'catalogs',
  {
    ...commonColumns,
    title: varchar('title', { length: 50 }).notNull(),
    clerkUserId: text('clerk_user_id')
      .notNull()
      .references(() => UsersTable.clerkUserId, { onDelete: 'cascade' })
  },
  table => ({
    clerkUserIdIndex: index('catalogs.clerk_user_id_index').on(
      table.clerkUserId
    )
  })
)

export const BillingHistoryTable = pgTable('billing_history', {
  ...commonColumns,
  clerkUserId: text('clerk_user_id')
    .notNull()
    .references(() => UsersTable.clerkUserId, { onDelete: 'cascade' }),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  credits: integer('credits').notNull(),
  paddleTransactionId: varchar('paddle_transaction_id').notNull(),
  status: varchar('status').notNull()
})

export const ApiKeysTable = pgTable(
  'api_keys',
  {
    ...commonColumns,
    clerkUserId: text('clerk_user_id')
      .notNull()
      .references(() => UsersTable.clerkUserId, { onDelete: 'cascade' }),
    apiKey: text('api_key').notNull().unique(),
    name: varchar('name', { length: 100 }),
    lastUsed: timestamp('last_used', { withTimezone: true }),
    isActive: boolean('is_active').default(true).notNull()
  },
  table => ({
    clerkUserIdIndex: index('api_keys.clerk_user_id_index').on(
      table.clerkUserId
    )
  })
)

// Relations

export const productsRelations = relations(ProductsTable, ({ one }) => ({
  productDescription: one(ProductDescriptionsTable, {
    fields: [ProductsTable.id],
    references: [ProductDescriptionsTable.productId]
  }),
  user: one(UsersTable, {
    fields: [ProductsTable.clerkUserId],
    references: [UsersTable.clerkUserId]
  }),
  catalog: one(CatalogsTable, {
    fields: [ProductsTable.catalogId],
    references: [CatalogsTable.id]
  })
}))

export const productDescriptionsRelations = relations(
  ProductDescriptionsTable,
  ({ one }) => ({
    product: one(ProductsTable, {
      fields: [ProductDescriptionsTable.productId],
      references: [ProductsTable.id]
    })
  })
)

export const catalogsRelations = relations(CatalogsTable, ({ many }) => ({
  products: many(ProductsTable)
}))

export const apiKeysRelations = relations(ApiKeysTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [ApiKeysTable.clerkUserId],
    references: [UsersTable.clerkUserId]
  })
}))

// Types

export type Users = typeof UsersTable.$inferSelect
export type NewUser = typeof UsersTable.$inferInsert

export type Product = typeof ProductsTable.$inferSelect
export type NewProduct = typeof ProductsTable.$inferInsert

export type ProductDescription = typeof ProductDescriptionsTable.$inferSelect
export type NewProductDescription = typeof ProductDescriptionsTable.$inferInsert

export type Catalog = typeof CatalogsTable.$inferSelect
export type NewCatalog = typeof CatalogsTable.$inferInsert

export type BillingHistory = typeof BillingHistoryTable.$inferInsert
export type NewBillingHistory = typeof BillingHistoryTable.$inferInsert

export type ApiKey = typeof ApiKeysTable.$inferSelect
export type NewApiKey = typeof ApiKeysTable.$inferInsert
