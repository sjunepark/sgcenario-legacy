import type { Action } from "svelte/action";
import type { Writable } from "svelte/store";

export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends Record<string, unknown> ? DeepPartial<T[P]> : T[P];
};

export type ValueWithId = {
	id: number;
	value: string;
};

export function compareValueWithId(a: ValueWithId, b: ValueWithId): number {
	return a.value.localeCompare(b.value, "ko-KR", { sensitivity: "base" });
}

export type TextboxTag = "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type TextboxProps = {
	tag: TextboxTag;
	state: {
		textContent: Writable<string>;
		textboxIsFocused: Writable<boolean>;
	};
	action: Action;
	handlers: {
		handleTextboxFocus: () => void;
		handleTextboxBlur: () => void;
	};
};
