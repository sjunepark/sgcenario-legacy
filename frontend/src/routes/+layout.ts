import type { LayoutLoad } from "./$types";

// noinspection JSUnusedGlobalSymbols
export const load: LayoutLoad = ({ url }) => {
	console.log("load from src/routes/+layout.ts with url: ", JSON.stringify(url));
	return {
		url: url,
	};
};
