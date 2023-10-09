import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const scripts = sqliteTable("scripts", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	user_id: integer("user")
		.notNull()
		.references(() => users.user_id),
	seq: real("seq").unique(),
	content: text("content"),
	createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
	adjustedAt: text("adjusted_at").default("CURRENT_TIMESTAMP"),
});

export const users = sqliteTable("users", {
	user_id: integer("id").primaryKey(),
	name: text("name").notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
