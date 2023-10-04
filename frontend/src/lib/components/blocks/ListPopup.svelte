<script lang="ts">
	import { generateId } from "$lib/id";
	import { createFloatingActions } from "svelte-floating-ui";
	import { derived, writable } from "svelte/store";
	import { createSortedListStore } from "$lib/store/storeBuilders";
	import type { TextboxTag, ValueWithId } from "$lib/types";
	import { sampleCharacters } from "$lib/store/stores";
	import Hangul from "hangul-js";
	import { isEmpty } from "$lib/utils/string";
	import { textBoxBuilder } from "$lib/components/blocks/textboxBuilder";

	/*!
	Element
	 */
	export let tag: TextboxTag;
	const popupId = generateId();

	/*!
	Builders and textbox
	 */
	const [textboxAction, popupAction] = createFloatingActions({
		strategy: "absolute",
		placement: "bottom-end",
		autoUpdate: true,
	});
	let textboxProps = textBoxBuilder(tag, textboxAction);
	const {
		state: { textContent, textboxIsFocused },
	} = textboxProps;

	/*!
	state
	 */
	// noinspection JSUnusedLocalSymbols
	const isOpen = derived([textboxIsFocused], ([$textboxIsFocused]) => {
		return $textboxIsFocused;
	});

	/*!
	options
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

	// dev:
	$: console.log(`notFound: ${$notFound}, open: ${$isOpen}, textIsEmpty: ${isEmpty($textContent)}`);
</script>

<!--suppress RequiredAttributes -->
<slot {textboxProps} />
{#if $isOpen}
	<ul
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
