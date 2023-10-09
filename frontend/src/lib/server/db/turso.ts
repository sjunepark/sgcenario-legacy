import { TURSO_SCRIPTS_AUTH, TURSO_SCRIPTS_URL } from "$env/static/private";
import { createClient } from "@libsql/client/http";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import type { DatabaseSchema } from "./schema";

export function tursoClient(): LibSQLDatabase<DatabaseSchema> {
	const url = TURSO_SCRIPTS_URL;
	if (url === undefined) {
		throw new Error("Turso url is not defined");
	}

	const authToken = TURSO_SCRIPTS_AUTH;
	if (authToken === undefined && !url.startsWith("file:")) {
		new Error("Turso auth token is not defined");
	}

	return drizzle(
		createClient({
			url,
			authToken,
		}),
		{ logger: true },
	);
}
