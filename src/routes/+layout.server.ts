import { db } from "$lib/server/db/neon";
import { sql } from "drizzle-orm";
import type { LayoutServerLoad } from "./$types";

// noinspection JSUnusedGlobalSymbols
export const load: LayoutServerLoad = async ({ url, locals }) => {
	const searchPath = await db.execute(sql`SHOW search_path`);
	console.log(searchPath);
	const session = await locals.auth.validate();
	return { pathname: url.pathname, user: session?.user };
};
