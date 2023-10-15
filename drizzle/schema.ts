import { bigint, pgSchema, serial, varchar } from "drizzle-orm/pg-core";

export const script = pgSchema("script");

export const users = script.table("users", {
	id: varchar("id", { length: 15 }).primaryKey().notNull(),
	userName: varchar("user_name", { length: 255 }),
	email: varchar("email", { length: 255 }),
});

export const scripts = script.table("scripts", {
	id: serial("id").primaryKey().notNull(),
	userId: varchar("user_id").references(() => users.id, { onUpdate: "cascade" }),
});

export const userKeys = script.table("user_keys", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	userId: varchar("user_id", { length: 15 })
		.notNull()
		.references(() => users.id, { onUpdate: "cascade" }),
	hashedPassword: varchar("hashed_password", { length: 255 }),
});

export const userSessions = script.table("user_sessions", {
	id: varchar("id", { length: 128 }).primaryKey().notNull(),
	userId: varchar("user_id", { length: 15 })
		.notNull()
		.references(() => users.id, { onUpdate: "cascade" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	activeExpires: bigint("active_expires", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	idleExpires: bigint("idle_expires", { mode: "number" }).notNull(),
});
