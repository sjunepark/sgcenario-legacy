import { compareValueWithId, type ValueWithId } from "$lib/types";
import { writable, type Readable } from "svelte/store";

type WritableList<T> = {
	addElement: (element: T) => void;
	addElements: (elements: Iterable<T>) => void;
	deleteElement: (element: T) => void;
	clearElements: () => void;
} & Readable<T[]>;

export function createSortedListStore<T extends ValueWithId>(
	initialElements: T[],
): WritableList<T> {
	const sortedInitialElements = [...new Set(initialElements)].sort(compareValueWithId);
	const { subscribe, set, update } = writable<T[]>(sortedInitialElements);

	function addElement(element: T) {
		update((elements) => {
			if (elements.includes(element)) {
				return elements;
			}
			return [...elements, element].sort(compareValueWithId);
		});
	}

	function addElements(elements: Iterable<T>) {
		update((oldElements) => {
			const newElements = [...new Set(elements)];
			const mergedElements = [...oldElements, ...newElements];
			return mergedElements.sort(compareValueWithId);
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
		addElements,
		deleteElement,
		clearElements,
	};
}
