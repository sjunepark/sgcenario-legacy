import type { ValueWithId } from "$lib/types";
import type { Writable } from "svelte/store";

export type SelectedOption = Writable<ValueWithId | undefined> & {
	setWithElement: (e: HTMLElement) => void;
};
