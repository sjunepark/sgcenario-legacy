import type { DeepPartial } from "$lib/types";
import { OverlayScrollbars, type Options } from "overlayscrollbars";
import type { Action } from "svelte/action";
export const setScrollbar: Action<HTMLElement, DeepPartial<Options>> = (node, scrollbarStyle) => {
	const osInstance = OverlayScrollbars(node, scrollbarStyle);
	return {
		destroy() {
			osInstance.destroy();
		},
	};
};
