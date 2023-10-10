import { dev } from "$app/environment";
import { libsqlClient } from "$lib/server/db/turso";
import { libsql } from "@lucia-auth/adapter-sqlite";
import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";

export const auth = lucia({
	env: dev ? "DEV" : "PROD",
	middleware: sveltekit(),
	adapter: libsql(libsqlClient, {
		user: "users",
		session: "user_sessions",
		key: "user_keys",
	}),
});

export type Auth = typeof auth;
