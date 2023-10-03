import type { ReadableExtended } from "$lib/types";
import { writable } from "svelte/store";

export function createListStore<T>(initialElements: T[]): ReadableExtended<T[]> {
	const sortedInitialElements = [...new Set(initialElements)].sort();
	const { subscribe, set, update } = writable<T[]>(sortedInitialElements);

	function addElement(element: T) {
		update((elements) => {
			if (elements.includes(element)) {
				return elements;
			}
			return [...elements, element].sort();
		});
	}

	function deleteElement(element: T) {
		update((elements) => elements.filter((c) => c !== element));
	}

	function clearElements() {
		set([]);
	}

	return {
		subscribe,
		addElement,
		deleteElement,
		clearElements,
	};
}
