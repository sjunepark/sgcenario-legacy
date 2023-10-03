import { createSortedListStore } from "$lib/store/storeBuilders";
import { sampleCharacters } from "$lib/store/stores";
import type { ValueWithId } from "$lib/types";
import * as Hangul from "hangul-js";
import { createFloatingActions, type ComputeConfig } from "svelte-floating-ui";
import { derived, writable } from "svelte/store";

export function createTextBlock(
	stateConfig: { returnDefaults: boolean },
	floatingConfig: ComputeConfig | undefined,
) {
	// Actions
	const [referenceAction, floatingAction] = createFloatingActions(floatingConfig);

	// States
	const open = writable(false);
	const notFound = writable(false);
	const touched = writable(false);

	// Values
	const textContent = writable("");
	// DEV: For development purposes only
	const autoCompletes = createSortedListStore<ValueWithId>(sampleCharacters);
	// TODO: implement touched state
	const filtered = derived([autoCompletes, textContent], ([$autoCompletes, $textContent]) => {
		const defaultReturns = stateConfig.returnDefaults ? $autoCompletes : [];
		// RETURN1: Empty textContent
		if ($textContent.trim().length === 0) {
			notFound.set(false);
			return defaultReturns;
		}

		// Defined in advance to prevent additional disassembling
		const disassembled = Hangul.disassemble($textContent).join("").trim();

		const filteredAutoCompletes = $autoCompletes.filter((v) => {
			const disassembledV = Hangul.disassemble(v.value).join("").trim();
			return disassembledV.indexOf(disassembled) >= 0;
		});

		// RETURN2: Autocomplete found
		if (filteredAutoCompletes.length > 0) {
			notFound.set(false);
			return filteredAutoCompletes;
			// RETURN3: Autocomplete not found
		} else {
			notFound.set(true);
			return [];
		}
	});

	// Handlers
	function handleIn() {
		open.set(true);
	}
	function handleOut() {
		open.set(false);
	}
	function handleInput() {
		touched.set(true);
	}

	// Without this handler, raw html or contents could be pasted
	function handlePaste(event: ClipboardEvent) {
		const targetElement = event.target;
		if (!(targetElement instanceof HTMLElement)) return;
		const selection = window.getSelection();
		if (!selection) return;
		const clipboardData = event.clipboardData;
		if (!clipboardData) return;

		const mimeTypes = clipboardData.types;

		let textToPaste: string | undefined;

		if (mimeTypes.includes("text/plain")) {
			textToPaste = clipboardData.getData("text/plain");
			event.preventDefault();
		} else if (mimeTypes.includes("text/html")) {
			textToPaste = clipboardData.getData("text/html");
			event.preventDefault();
		} else if (mimeTypes.includes("application/x-moz-file") || mimeTypes.includes("Files")) {
			const items = clipboardData.items;
			const textsToPaste: string[] = [];
			for (let i = 0; i < items.length; i++) {
				if (items[i].kind === "file") {
					const file = items[i].getAsFile();
					if (file) {
						textsToPaste.push(file.name);
						event.preventDefault();
					}
				}
			}
			textToPaste = textsToPaste.join(", ");
		} else {
			alert("붙여 넣을 수 없는 형식입니다.");
			return;
		}

		targetElement.textContent += textToPaste;

		const range = document.createRange();
		range.selectNodeContents(targetElement);
		range.collapse(false);
		selection.removeAllRanges();
		selection.addRange(range);
	}

	return {
		action: { referenceAction, floatingAction },
		stateStore: { notFound, open, touched },
		valueStore: { textContent, autoCompletes, filtered },
		handler: { handleIn, handleOut, handleInput, handlePaste },
	};
}
