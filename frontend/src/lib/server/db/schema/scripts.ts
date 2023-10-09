import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const scripts = sqliteTable("scripts", {
	id: integer("id").primaryKey(),
	user: text("user")
		.notNull()
		.references(() => users.id),
	index: real("index").unique(),
	content: text("content"),
	createdAt: integer("created_at").notNull(),
	adjustedAt: integer("adjusted_at").notNull(),
});

export const users = sqliteTable("users", {
	id: integer("id").primaryKey(),
	name: text("name").notNull(),
});
