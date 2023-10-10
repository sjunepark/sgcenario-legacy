import type { LayoutServerLoad } from "./$types";

// noinspection JSUnusedGlobalSymbols
export const load: LayoutServerLoad = ({ url }) => {
	console.log("load from src/routes/+layout.ts with url: ", url.toString());
	return { pathname: url.pathname };
};
