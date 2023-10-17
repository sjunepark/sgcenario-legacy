import type { DeepPartial } from "$lib/types";
import type { Options } from "overlayscrollbars";

export const scrollbarStyle: DeepPartial<Options> = {
	scrollbars: {
		theme: "os-theme-dark",
		autoHide: "scroll",
		autoHideSuspend: true,
		autoHideDelay: 500,
	},
};
