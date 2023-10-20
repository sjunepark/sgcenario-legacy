import { logger } from "$lib/utils/logger";
import { writable, type Readable } from "svelte/store";

type WritableList<T> = {
	addElement: (element: T) => void;
	addElements: (elements: T[]) => void;
	removeElement: (element: T) => void;
	removeElements: (elements: T[]) => void;
	clearElements: () => void;
} & Readable<T[]>;

export type WritableSortedList<T> = WritableList<T>;

export function createSortedListStore<T, K extends keyof T>(
	initialElements: T[],
	idKey?: K,
	sortKey?: K,
): WritableSortedList<T> {
	const compare = (a: T, b: T) => {
		const customLocaleCompare = (a: unknown, b: unknown) => {
			return String(a).localeCompare(String(b), "ko-KR", { sensitivity: "base" });
		};

		if (sortKey) {
			return customLocaleCompare(a[sortKey], b[sortKey]);
		}
		return customLocaleCompare(a, b);
	};

	const ids = new Set<T[K] | T>();
	for (const element of initialElements) {
		if (idKey) ids.add(element[idKey]);
		else ids.add(element);
	}

	const elementExists = (element: T) => {
		if (idKey) return ids.has(element[idKey]);
		else return ids.has(element);
	};

	const allElementsExist = (elements: T[]) => {
		return elements.every(elementExists);
	};

	const sortedInitialElements = [...initialElements].sort(compare);
	const { subscribe, set, update } = writable<T[]>(sortedInitialElements);

	const addElement = (elementToAdd: T) => {
		if (elementExists(elementToAdd)) {
			logger.error("Element already exists");
			return;
		}

		update((originalElements) => {
			let exists: boolean;

			if (idKey) {
				exists = originalElements.some((e) => e[idKey] === elementToAdd[idKey]);
			} else {
				exists = originalElements.includes(elementToAdd);
			}

			if (!exists) {
				originalElements.push(elementToAdd);
				originalElements.sort(compare);
			}
			return originalElements;
		});
	};

	const addElements = (elementsToAdd: T[]) => {
		if (allElementsExist(elementsToAdd)) {
			logger.error("Elements already exist");
			return;
		}

		update((originalElements) => {
			originalElements.push(...elementsToAdd);
			originalElements.sort(compare);
			return originalElements;
		});
	};

	const removeElement = (element: T) => {
		if (!elementExists(element)) {
			logger.info("Element does not exist");
			return;
		}

		update((originalElements) =>
			originalElements.filter((originalElement) => {
				return compare(originalElement, element) === 0;
			}),
		);
	};

	const removeElements = (elements: T[]) => {
		for (const element of elements) {
			removeElement(element);
		}
	};

	const clearElements = () => {
		set([]);
	};

	return {
		subscribe,
		addElement,
		addElements,
		removeElement,
		removeElements,
		clearElements,
	};
}
