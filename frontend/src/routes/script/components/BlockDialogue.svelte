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

	// DEV: For development purposes only
	export let textAreaValue: string;
	const scrollbarStyle = getContext("scrollbarStyle") satisfies DeepPartial<Options>;
	const placeholer = `이 세상은 참 복잡하고, 때로는 혼란스럽다. 사람들은 각자의 삶에서 행복을 찾기 위해 안간힘을 쓰고, 나 또한 그러하다. 사람들 사이에서 사랑과 이해를 주고받으며 살아가려 하지만, 때로는 이 세상이 내게 너무나 거대하고 무한한 것처럼 느껴진다.	내 인생의 방향을 잡으려 애쓰지만, 정작 중요한 것들은 늘 모호한 선상에 놓여 있다. 나는 이런 세상에서 내 자리를 찾고 싶다. 내가 진정으로 원하는 것이 무엇인지, 내가 어떤 존재로 이 세상에 머무르고 싶은지를 찾아내고 싶다.	사람들과의 관계 속에서 느끼는 따스함과 이해는 나를 더욱 성장하게 만든다. 하지만 무엇보다 나 자신을 이해하고 사랑하는 것이 중요하다. 내 삶의 의미를 찾아가며, 나 자신을 사랑하고, 타인을 이해하며, 이 세상과`;

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

<div class="my-[-1.25em] grid gap-x-4" style="grid-template-columns: 15ch 1fr">
	<p>
		<!--todo: warn when empty(can't use "required" since it's irrelevant to submit event)-->
		<input {...$input} use:input class="w-full" placeholder="Character" />
	</p>
	<p contenteditable="true">{textAreaValue}</p>
</div>

{#if $open}
	<ul
		class="prose z-10 flex max-h-48 w-[15ch] flex-col overflow-hidden bg-stone-50 shadow-lg ring-1 ring-stone-500/50"
		{...$menu}
		use:menu
		transition:fly={{ duration: 150, y: -5 }}
	>
		<OverlayScrollbarsComponent options={scrollbarStyle} defer>
			{#each $filteredCharacters as { value, id } (id)}
				<!--suppress JSCheckFunctionSignatures -->
				<li
					{...$option({
						value: value,
						label: value,
					})}
					use:option
					class="not-prose relative cursor-pointer scroll-my-2 whitespace-nowrap pl-2 data-[highlighted]:bg-stone-200 data-[disabled]:opacity-50"
					class:bg-stone-200={$isSelected(value)}
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
