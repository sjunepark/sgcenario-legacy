import { sqliteTable, AnySQLiteColumn, uniqueIndex, foreignKey, integer, real, text } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"


export const scripts = sqliteTable("scripts", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	user: integer("user").notNull().references(() => users.id),
	seq: real("seq"),
	content: text("content"),
	createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
	adjustedAt: text("adjusted_at").default("CURRENT_TIMESTAMP"),
},
(table) => {
	return {
		seqUnique: uniqueIndex("scripts_seq_unique").on(table.seq),
	}
});

export const users = sqliteTable("users", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
});