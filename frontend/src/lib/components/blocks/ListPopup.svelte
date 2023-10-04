<script lang="ts">
	import { derived, type Writable } from "svelte/store";
	import type { WritableSortedList } from "$lib/store/sortedListStore";
	import type { ValueWithId } from "$lib/types";
	import type { PopupProps } from "$lib/types";
	import Hangul from "hangul-js";
	import { isEmpty } from "$lib/utils/string";
	import { generateId } from "$lib/utils/id";
	import { kbd } from "$lib/utils/keyboard";

	/*!
	Props
	 */
	export let textContent: Writable<string>;
	export let options: WritableSortedList<ValueWithId>;

	export let popupProps: PopupProps;

	const {
		popupId,
		state: { isOpen, popupIsFocused, selectedOption },
		action: { popupAction },
	} = popupProps;

	/*!
	options
	 */
	const filtered = derived([options, textContent], ([oStoreValue, tStoreValue]) => {
		// return: Early return when no textContent
		if (isEmpty(tStoreValue)) {
			return oStoreValue;
		}

		// return: option found
		// Computed in advance to prevent unnecessary additional computation
		const disassembled = Hangul.disassemble($textContent).join("").trim();

		const filteredOptions = $options.filter((v) => {
			const disassembledV = Hangul.disassemble(v.value).join("").trim();
			return disassembledV.indexOf(disassembled) >= 0;
		});

		if (filteredOptions.length > 0) {
			return filteredOptions;
			// return: no option
		} else {
			return [];
		}
	});

	/*!
	Navigation
	 */
	// const optionRefs: HTMLLIElement[]
	// function next(currentIndex: number) {
	// 	return currentIndex + 1;
	// }

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === kbd.ARROW_DOWN) {
			event.preventDefault();
			event.stopPropagation();
			// noinspection JSIgnoredPromiseFromCall
			// todo: next
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			event.stopPropagation();
			// todo: prev
		} else if (event.key === "Enter") {
			event.preventDefault();
			event.stopPropagation();
			// noinspection JSIgnoredPromiseFromCall
			// todo: close
		}
	}
</script>

<ul
	use:popupAction
	class="not-prose z-10 flex max-h-48 w-[15ch] flex-col overflow-hidden bg-stone-50 shadow-lg ring-1 ring-stone-500/50"
	role="listbox"
	id={popupId}
>
	{#each $filtered as { id, value }, index (id)}
		<li
			id="{popupId}-{index}"
			class="relative cursor-pointer scroll-my-2 whitespace-nowrap pl-2 data-[highlighted]:bg-stone-200 data-[disabled]:opacity-50"
			tabindex="0"
			on:focus={() => {}}
			on:blur={() => {}}
			on:keydown={(event) => {
				handleKeyDown(event);
			}}
			role="option"
			aria-selected="false"
		>
			{value}
		</li>
	{:else}
		{#if $isOpen && !isEmpty($textContent)}
			<li
				id="{popupId}-{generateId()}"
				role="option"
				class="relative cursor-pointer scroll-my-2 whitespace-nowrap pl-2 data-[highlighted]:bg-stone-200 data-[disabled]:opacity-50"
				aria-selected="false"
			>
				추가
			</li>
		{/if}
	{/each}
</ul>
