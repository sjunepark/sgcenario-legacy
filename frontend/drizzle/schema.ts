import { integer, real, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const scripts = sqliteTable(
	"scripts",
	{
		id: integer("id").primaryKey().notNull(),
		user: text("user")
			.notNull()
			.references(() => users.id),
		index: real("index"),
		content: text("content"),
		createdAt: integer("created_at").notNull(),
		adjustedAt: integer("adjusted_at").notNull(),
	},
	(table) => {
		return {
			indexUnique: uniqueIndex("scripts_index_unique").on(table.index),
		};
	},
);

export const users = sqliteTable("users", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
});
