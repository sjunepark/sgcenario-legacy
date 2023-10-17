<script lang="ts">
	import { createCombobox } from "@melt-ui/svelte";
	import { fly } from "svelte/transition";
	import { OverlayScrollbarsComponent } from "overlayscrollbars-svelte";
	import type { Options } from "overlayscrollbars";
	import type { DeepPartial } from "$lib/types";
	import { getContext } from "svelte";
	import { derived } from "svelte/store";
	import { characters } from "$lib/store/stores";
	import { isEmpty } from "$lib/utils/string";
	import Hangul from "hangul-js";
	import { twMerge } from "tailwind-merge";

	let { class: classProps, ...restProps } = $$restProps;

	export let text: string;

	const scrollbarStyle = getContext("scrollbarStyle") satisfies DeepPartial<Options>;

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

	// noinspection JSUnusedLocalSymbols
	let filteredCharacters = derived(
		[inputValue, characters],
		/* eslint-disable @typescript-eslint/no-unused-vars */
		([$inputValue, $characters]) => {
			// return: Early return when no inputValue
			if (isEmpty($inputValue)) {
				return $characters;
			}

			// return: character found
			// Computed in advance to prevent unnecessary additional computation
			const disassembled = Hangul.disassemble($inputValue).join("").trim();

			const filteredOptions = $characters.filter((character) => {
				const disassembledValue = Hangul.disassemble(character.value).join("").trim();
				return disassembledValue.indexOf(disassembled) >= 0;
			});

			if (filteredOptions.length > 0) {
				return filteredOptions;
				// return: no character found
			} else {
				return [];
			}
		},
		/* eslint-enable @typescript-eslint/no-unused-vars */
	);
</script>

<div
	class="{twMerge(classProps, 'my-[-1.25em] grid gap-x-4')}"
	style="grid-template-columns: 15ch 1fr"
	{...restProps}
>
	<!--todo: warn when empty(can't use "required" since it's irrelevant to submit event)-->
	<p {...$input} use:input contenteditable="true"></p>
	<p
		class="focus-visible:ring-offset-8 focus-visible:ring-offset-white"
		contenteditable="true"
		data-placeholder="Dialogue"
		bind:innerText="{text}"
	></p>
</div>

{#if $open}
	<ul
		class="prose z-10 flex max-h-48 w-[15ch] flex-col overflow-hidden bg-stone-50 shadow-lg ring-1 ring-stone-500/50"
		{...$menu}
		use:menu
		transition:fly="{{ duration: 150, y: -5 }}"
	>
		<OverlayScrollbarsComponent options="{scrollbarStyle}" defer>
			{#each $filteredCharacters as { value, id } (id)}
				<!--suppress JSCheckFunctionSignatures -->
				<li
					{...$option({
						value: value,
						label: value,
					})}
					use:option
					class="not-prose relative cursor-pointer scroll-my-2 whitespace-nowrap pl-2 data-[highlighted]:bg-stone-200 data-[disabled]:opacity-50"
					class:bg-stone-200="{$isSelected(value)}"
				>
					<span>{value}</span>
				</li>
			{:else}
				<!--suppress JSCheckFunctionSignatures -->
				<li
					class="not-prose relative cursor-pointer scroll-my-2 whitespace-nowrap pl-2 data-[highlighted]:bg-stone-200 data-[disabled]:opacity-50"
					{...$option({
						value: $inputValue,
						label: $inputValue,
					})}
					use:option
				>
					<span>추가</span>
				</li>
			{/each}
		</OverlayScrollbarsComponent>
	</ul>
{/if}
