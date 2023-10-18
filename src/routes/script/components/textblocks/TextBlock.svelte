<script lang="ts">
	import type { TextBlockType } from "./textblock";
	import { textBlockComponents } from "./textblock";
	import { createCombobox } from "@melt-ui/svelte";
	import { derived } from "svelte/store";
	import { isEmpty } from "$lib/utils/string";
	import { createSortedListStore } from "$lib/store/sortedListStore";
	import Hangul from "hangul-js";
	import { OverlayScrollbarsComponent } from "overlayscrollbars-svelte";
	import { fly } from "svelte/transition";
	import { twMerge } from "tailwind-merge";
	import { scrollbarStyle } from "$lib/configs/configs";

	export let type: TextBlockType;

	let listboxOptions = createSortedListStore<string>([]);

	// todo: for dev
	listboxOptions.clearElements();
	listboxOptions.addElements(["짱구", "짱아", "/h", "/char"]);

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

	const meltProps = {
		elements: { input },
		states: { inputValue, selected, highlighted },
	};

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

<svelte:component
	this="{textBlockComponents.find((element) => element.type === type)?.component}"
	{input}
	{listboxOptions}
	{meltProps}
	class="outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-8 focus-visible:ring-offset-white"
	contenteditable="true"
/>

{#if $open}
	<ul
		{...$menu}
		use:menu
		class="{twMerge(
			$filtered.length > 0 ? 'outline' : '',
			'prose z-10 flex max-h-48 w-[15ch] flex-col overflow-hidden bg-white shadow-lg outline-1 outline-stone-500/50',
		)}"
		transition:fly="{{ duration: 150, y: -5 }}"
	>
		<OverlayScrollbarsComponent options="{scrollbarStyle}" defer>
			{#each $filtered as value, i (i)}
				<!--suppress JSCheckFunctionSignatures -->
				<li
					{...$option({
						value: value,
						label: value,
					})}
					use:option
					class="not-prose relative cursor-pointer scroll-my-2 whitespace-nowrap pl-2 data-[highlighted]:bg-stone-200/50 data-[highlighted]:font-semibold data-[disabled]:opacity-50"
					class:bg-stone-200="{$isSelected(value)}"
				>
					<span>{value}</span>
				</li>
			{/each}
		</OverlayScrollbarsComponent>
	</ul>
{/if}
