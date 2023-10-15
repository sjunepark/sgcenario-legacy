import { db } from "$lib/server/db/neon";
import { schema } from "$lib/server/db/schema";
import { logger } from "$lib/utils/logger";
import { sql } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	logger.trace("sandbox/page.server.ts running");
	const userKeys = await db.select().from(schema.userKeys);
	try {
		const results = await db.execute(sql`SELECT * FROM user_keys`);
		logger.trace(results, "Selected results from db");
	} catch (e) {
		logger.trace(e, "Error");
	}

	logger.trace(userKeys, "Selected userKeys from db");
	return {
		userKeys,
	};
};
