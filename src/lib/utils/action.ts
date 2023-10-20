import { logger } from "$lib/utils/logger";
import type { Action } from "svelte/action";

export const mountLogger: Action = (node) => {
	if (node.dataset) logger.info({ ...node.dataset });

	return {
		destroy() {
			logger.info(node, "Unmounted");
		},
	};
};
