<script lang="ts">
	import { createCombobox } from "@melt-ui/svelte";
	import { derived } from "svelte/store";
	import { isEmpty } from "$lib/utils/string";
	import Hangul from "hangul-js";
	import Listbox from "../Listbox.svelte";
	import { createSortedListStore } from "$lib/store/sortedListStore";
	import { twMerge } from "tailwind-merge";

	export let character: string;
	export let twClass: string = "";

	const {
		elements: { menu, input, option },
		states: { open, inputValue },
		helpers: { isSelected },
	} = createCombobox({
		preventScroll: false, // There's a bug
		positioning: {
			placement: "bottom-start",
			sameWidth: false,
		},
	});

	const listboxProps = {
		elements: { menu, option },
		helpers: { isSelected },
	};

	let listboxOptions = createSortedListStore<string>([]);
	// todo: for dev
	listboxOptions.clearElements();
	listboxOptions.addElements(["짱구", "짱아", "/h", "/char"]);

	// noinspection JSUnusedLocalSymbols
	let filtered = derived(
		[inputValue, listboxOptions],
		/* eslint-disable @typescript-eslint/no-unused-vars */
		([$inputValue, $listboxOptions]) => {
			// return1: Early return when no inputValue
			if (isEmpty($inputValue)) {
				return $listboxOptions;
			}

			// return2: character found
			// Computed in advance to prevent unnecessary additional computation
			const disassembled = Hangul.disassemble($inputValue).join("").trim();

			const filteredOptions = $listboxOptions.filter((option) => {
				const disassembledValue = Hangul.disassemble(option).join("").trim();
				return disassembledValue.indexOf(disassembled) >= 0;
			});

			if (filteredOptions.length > 0) {
				return filteredOptions;
				// return3: no character found
			} else {
				return [];
			}
		},
	);
</script>

<p
	{...$input}
	use:input
	class="{twMerge(twClass, 'w-[15ch]')}"
	bind:innerText="{character}"
	contenteditable="true"
	data-placeholder="Character"
></p>

{#if $open}
	<Listbox comboboxProps="{listboxProps}" listOptions="{filtered}" />
{/if}
