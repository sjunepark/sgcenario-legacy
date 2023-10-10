import { logger } from "$lib/utils/logger";
import type { LayoutServerLoad } from "./$types";

// noinspection JSUnusedGlobalSymbols
export const load: LayoutServerLoad = ({ url }) => {
	logger.info({ pathname: url.pathname });
	return { pathname: url.pathname };
};
