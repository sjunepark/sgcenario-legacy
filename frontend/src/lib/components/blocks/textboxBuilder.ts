import type { TextboxProps, TextboxTag } from "$lib/types";
import type { Action } from "svelte/action";
import { writable } from "svelte/store";

export function textBoxBuilder(tag: TextboxTag, action: Action): TextboxProps {
	const textContent = writable("");
	const textboxIsFocused = writable(false);

	function handleTextboxFocus() {
		textboxIsFocused.set(true);
	}

	// noinspection JSUnusedLocalSymbols
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function handleTextboxBlur() {
		textboxIsFocused.set(false);
	}

	return {
		tag,
		state: {
			textContent,
			textboxIsFocused,
		},
		action,
		handlers: {
			handleTextboxFocus,
			handleTextboxBlur,
		},
	};
}