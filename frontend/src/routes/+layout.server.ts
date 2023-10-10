import { db } from "$lib/server/db/turso";
import type { LayoutServerLoad } from "./$types";

// noinspection JSUnusedGlobalSymbols
export const load: LayoutServerLoad = ({ url }) => {
	console.log(db);
	console.log("load from src/routes/+layout.ts with url: ", JSON.stringify(url));
	return {
		url: url,
	};
};
