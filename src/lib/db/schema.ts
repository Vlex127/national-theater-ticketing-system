import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, index, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('email_verified'),
  password: text('password'),
  image: text('image'),
}, (table) => ({
  emailIdx: index('email_idx').on(table.email),
}));

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
}, (table) => ({
  providerProviderAccountIdIdx: index('provider_provider_account_id_idx').on(
    table.provider,
    table.providerAccountId
  ),
  userIdIdx: index('user_id_idx').on(table.userId),
}));

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  sessionToken: text('session_token').notNull().unique(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires').notNull(),
}, (table) => ({
  sessionTokenIdx: index('session_token_idx').on(table.sessionToken),
  userIdIdx: index('user_id_session_idx').on(table.userId),
}));

export const verificationTokens = pgTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: timestamp('expires').notNull(),
}, (table) => ({
  identifierTokenIdx: index('identifier_token_idx').on(
    table.identifier,
    table.token
  ),
}));
