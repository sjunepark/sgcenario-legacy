import { createSortedListStore } from "$lib/store/storeBuilders";
import { sampleCharacters } from "$lib/store/stores";
import type { ValueWithId } from "$lib/types";
import * as Hangul from "hangul-js";
import { createFloatingActions, type ComputeConfig } from "svelte-floating-ui";
import { derived, writable } from "svelte/store";

export function createTextBlock(floatingConfig: ComputeConfig | undefined) {
	const [referenceAction, floatingAction] = createFloatingActions(floatingConfig);

	const open = writable(false);
	const textContent = writable("");
	// DEV: For development purposes only
	const autoCompletes = createSortedListStore<ValueWithId>(sampleCharacters);
	// TODO: implement touched state
	const filtered = derived([autoCompletes, textContent], ([$autoCompletes, $textContent]) => {
		// DEV
		console.log(
			JSON.stringify({
				autoCompletes: $autoCompletes.slice(0, 5),
				textContent: $textContent,
			}),
		);

		if ($textContent.trim().length === 0) return $autoCompletes;

		const disassembled = Hangul.disassemble($textContent).join("").trim();

		const filteredAutoCompletes = $autoCompletes.filter((v) => {
			const disassembledV = Hangul.disassemble(v.value).join("").trim();
			const result = disassembledV.indexOf(disassembled) >= 0;
			console.log(`Comparing ${disassembledV} and ${disassembled}: ${result}`);
			return result;
		});
		return filteredAutoCompletes.length > 0 ? filteredAutoCompletes : $autoCompletes;
	});

	const handleIn = () => {
		open.set(true);
	};
	const handleOut = () => {
		open.set(false);
	};

	// Without this handler, sometimes html tags can be pasted into the  element.
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
		stateStore: { open },
		valueStore: { textContent, autoCompletes, filtered },
		action: { referenceAction, floatingAction },
		handler: { handleIn, handleOut, handlePaste },
	};
}
