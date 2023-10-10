import { integer, numeric, real, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const scripts = sqliteTable(
	"scripts",
	{
		id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
		user: text("user").notNull(),
		seq: real("seq"),
		content: text("content"),
		createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
		adjustedAt: text("adjusted_at").default("CURRENT_TIMESTAMP"),
	},
	(table) => {
		return {
			seqUnique: uniqueIndex("scripts_seq_unique").on(table.seq),
		};
	},
);

export const user = sqliteTable("user", {
	id: numeric("id").primaryKey().notNull(),
	userName: text("user_name").notNull(),
});

export const userKey = sqliteTable("user_key", {
	id: numeric("id").primaryKey().notNull(),
	userId: numeric("user_id")
		.notNull()
		.references(() => user.id),
	hashedPassword: numeric("hashed_password"),
});

export const userSession = sqliteTable("user_session", {
	id: numeric("id").primaryKey().notNull(),
	userId: numeric("user_id")
		.notNull()
		.references(() => user.id),
	activeExpires: integer("active_expires").notNull(),
	idleExpires: integer("idle_expires").notNull(),
});
