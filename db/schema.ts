import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const vaults = sqliteTable('vaults',{owner:text('owner').primaryKey(),data:text('data').notNull(),revision:integer('revision').notNull().default(1),updated:text('updated').notNull()});
