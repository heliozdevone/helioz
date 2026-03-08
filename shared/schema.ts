import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

export const agents = pgTable('agents', {
  id: serial('id').primaryKey(),
  user_id: serial('user_id').notNull(),
  name: text('name').notNull(),
  config: text('config').notNull(),
  status: varchar('status', { length: 32 }).notNull().default('inactive'),
  created_at: timestamp('created_at').defaultNow().notNull(),
});
