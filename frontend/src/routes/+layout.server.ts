import type { LayoutServerLoad } from "./$types";

// noinspection JSUnusedGlobalSymbols
export const load: LayoutServerLoad = ({ url }) => {
	return { pathname: url.pathname };
};
