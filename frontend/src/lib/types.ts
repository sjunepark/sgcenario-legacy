import type { Readable } from "svelte/store";

export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends Record<string, unknown> ? DeepPartial<T[P]> : T[P];
};

export type ReadableExtended<T> = Readable<T> & {
	[key: string]: unknown;
};
