import { compareDefault, compareValueWithId, isValueWithId } from "$lib/types";
import { writable, type Readable } from "svelte/store";

type WritableList<T> = {
  addElement: (element: T) => void;
  addElements: (elements: Iterable<T>) => void;
  removeElement: (element: T) => void;
  clearElements: () => void;
} & Readable<T[]>;

export type WritableSortedList<T> = WritableList<T>;

export function createSortedListStore<T>(
  initialElements: T[],
): WritableSortedList<T> {
  function compare(a: T, b: T) {
    if (isValueWithId(a) && isValueWithId(b)) {
      return compareValueWithId(a, b);
    }
    return compareDefault(a, b);
  }

  const sortedInitialElements = [...new Set(initialElements)].sort(compare);
  const { subscribe, set, update } = writable<T[]>(sortedInitialElements);

  function addElement(element: T) {
    update((elements) => {
      if (elements.includes(element)) {
        return elements;
      }
      return [...elements, element].sort(compare);
    });
  }

  function addElements(elements: Iterable<T>) {
    update((oldElements) => {
      const newElements = [...new Set(elements)];
      const mergedElements = [...oldElements, ...newElements];
      return mergedElements.sort(compare);
    });
  }

  function removeElement(element: T) {
    function compare(a: T, b: T) {
      if (isValueWithId(a) && isValueWithId(b)) {
        return a.id === b.id;
      }
      return a === b;
    }

    update((elements) =>
      elements.filter((originalElement) => compare(originalElement, element)),
    );
  }

  function clearElements() {
    set([]);
  }

  return {
    subscribe,
    addElement,
    addElements,
    removeElement,
    clearElements,
  };
}
