import { TURSO_SCRIPTS_AUTH, TURSO_SCRIPTS_URL } from "$env/static/private";
import { createClient } from "@libsql/client/http";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

function getLibsqlClient() {
	const url = TURSO_SCRIPTS_URL;
	if (url === undefined) {
		throw new Error("TURSO_SCRIPTS_URL is undefined");
	}

	const authToken = TURSO_SCRIPTS_AUTH;
	if (authToken === undefined && !url.startsWith("file:")) {
		new Error("TURSO_SCRIPTS_AUTH is undefined");
	}

	return createClient({
		url,
		authToken,
	});
}

export const libsqlClient = getLibsqlClient();
export const db = drizzle(libsqlClient, { logger: true, schema });
