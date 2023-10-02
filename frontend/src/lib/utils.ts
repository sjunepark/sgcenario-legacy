import type { Action } from "svelte/action";
import type { DeepPartial } from "$lib/types";
import { type Options, OverlayScrollbars } from "overlayscrollbars";

export const setScrollbar: Action<HTMLElement, DeepPartial<Options>> = (node, scrollbarStyle) => {
	const osInstance = OverlayScrollbars(node, scrollbarStyle);
	return {
		destroy() {
			osInstance.destroy();
		},
	};
};
