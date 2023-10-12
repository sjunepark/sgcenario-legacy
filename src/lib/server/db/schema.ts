// noinspection DuplicatedCode

import { integer, numeric, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const scripts = sqliteTable("scripts", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	user_id: text("user").notNull(),
	seq: real("seq").unique(),
	content: text("content"),
	createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
	adjustedAt: text("adjusted_at").default("CURRENT_TIMESTAMP"),
});

export const user = sqliteTable("user", {
	id: numeric("id").primaryKey().notNull(),
	userName: text("user_name"),
	email: text("email"),
});

export const userKey = sqliteTable("user_key", {
	id: numeric("id").primaryKey().notNull(),
	userId: numeric("user_id")
		.notNull()
		.references(() => user.id, { onUpdate: "cascade" }),
	hashedPassword: numeric("hashed_password"),
});

export const userSession = sqliteTable("user_session", {
	id: numeric("id").primaryKey().notNull(),
	userId: numeric("user_id")
		.notNull()
		.references(() => user.id, { onUpdate: "cascade" }),
	activeExpires: integer("active_expires").notNull(),
	idleExpires: integer("idle_expires").notNull(),
});
