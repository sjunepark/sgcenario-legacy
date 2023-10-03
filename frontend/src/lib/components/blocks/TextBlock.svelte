<script lang="ts">
	import { generateId } from "$lib/id";
	import { createFloatingActions } from "svelte-floating-ui";
	import { derived, writable } from "svelte/store";
	import { createSortedListStore } from "$lib/store/storeBuilders";
	import type { ValueWithId } from "$lib/types";
	import { sampleCharacters } from "$lib/store/stores";
	import Hangul from "hangul-js";
	import { isEmpty } from "$lib/utils/string";
	import { handlePaste } from "$lib/utils/event";

	/*!
	Element
	 */
	export let tag: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	let textbox: HTMLElement;
	let popup: HTMLUListElement;
	const popupId = generateId();

	/*!
	Floating-ui
	 */
	const [textboxAction, popupAction] = createFloatingActions({
		strategy: "absolute",
		placement: "bottom-end",
		autoUpdate: true,
	});

	/*!
	States: elements
	*/
	const textboxIsFocused = writable(false);
	// noinspection JSUnusedLocalSymbols
	const isOpen = derived([textboxIsFocused], ($textboxIsFocused) => {
		return $textboxIsFocused;
	});
	const textContent = writable("");

	/*!
	Options
	 */
	const options = createSortedListStore<ValueWithId>(sampleCharacters); // DEV: For development purposes only
	// noinspection JSUnusedLocalSymbols
	const notFound = writable(false);
	// noinspection JSUnusedLocalSymbols
	const filtered = derived([options, textContent], ([$options, $textContent]) => {
		// return: Early return when no textContent
		if (isEmpty($textContent)) {
			return $options;
		}

		// return: option found
		// Computed in advance to prevent unnecessary additional computation
		const disassembled = Hangul.disassemble($textContent).join("").trim();

		const filteredOptions = $options.filter((v) => {
			const disassembledV = Hangul.disassemble(v.value).join("").trim();
			return disassembledV.indexOf(disassembled) >= 0;
		});

		if (filteredOptions.length > 0) {
			notFound.set(false);
			return filteredOptions;
			// return: no option
		} else {
			notFound.set(true);
			return [];
		}
	});

	/*!
	DEV
	 */
	$: console.log(`notFound: ${$notFound}, open: ${$isOpen}, textIsEmpty: ${isEmpty($textContent)}`);
</script>

<!--suppress RequiredAttributes -->
<svelte:element
	this={tag}
	bind:this={textbox}
	id={generateId()}
	bind:innerText={$textContent}
	class="min-w-[15ch] break-all outline-none"
	use:textboxAction
	on:focus={() => {
		textboxIsFocused.set(true);
	}}
	on:blur={() => {
		textboxIsFocused.set(false);
	}}
	on:paste={handlePaste}
	contenteditable="true"
	aria-autocomplete="list"
	role="textbox"
/>
{#if $isOpen}
	<ul
		bind:this={popup}
		use:popupAction
		class="not-prose z-10 flex max-h-48 w-[15ch] flex-col overflow-hidden bg-stone-50 shadow-lg ring-1 ring-stone-500/50"
		aria-expanded="true"
		role="listbox"
		id={popupId}
	>
		{#each $filtered as { id, value }}
			<li
				id="{popupId}-{id}"
				role="option"
				class="relative cursor-pointer scroll-my-2 whitespace-nowrap pl-2 data-[highlighted]:bg-stone-200 data-[disabled]:opacity-50"
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
{/if}
