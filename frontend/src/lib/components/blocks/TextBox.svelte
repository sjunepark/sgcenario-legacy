<script lang="ts">
	import { derived, writable, type Readable } from "svelte/store";
	import type { Action } from "svelte/action";
	import { createFloatingActions } from "svelte-floating-ui";
	import type { TextboxTag } from "$lib/types";
	import { generateId } from "$lib/utils/id";
	import { handlePaste } from "$lib/utils/event";
	import ListPopup from "$lib/components/blocks/ListPopup.svelte";
	import { createSortedListStore, type WritableSortedList } from "$lib/store/storeBuilders";
	import type { ValueWithId } from "$lib/types";
	import { sampleCharacters } from "$lib/store/stores";

	// !Props
	export let tag: TextboxTag;
	export let defaultText = "";
	export let hasPopup = false;

	// !Popup
	let popupId: string;
	let isOpen: Readable<boolean>;
	let popupAction: Action = () => {};
	let popupTextboxAction: Action = () => {};
	let selectedOptions: WritableSortedList<ValueWithId>;

	// !Stores
	const textContent = writable(defaultText);
	const textboxIsFocused = writable(false);
	// dev: For development purposes only
	const characters = createSortedListStore<ValueWithId>(sampleCharacters);

	function createPopupStore() {
		const id = generateId();
		// noinspection JSUnusedLocalSymbols
		const isOpen = derived([textboxIsFocused], ([$textboxIsFocused]) => {
			return $textboxIsFocused;
		});
		const selectedOptions = createSortedListStore<ValueWithId>([]);

		const [popupTextboxAction, popupAction] = createFloatingActions({
			strategy: "absolute",
			placement: "bottom-end",
			autoUpdate: true,
		});

		return {
			id,
			isOpen,
			selectedOptions,
			action: {
				popupTextboxAction,
				popupAction,
			},
		};
	}

	if (hasPopup) {
		const {
			id: _popupId,
			isOpen: _isOpen,
			action: { popupTextboxAction: _popupTextboxAction, popupAction: _popupAction },
			selectedOptions: _selectedOptions,
		} = createPopupStore();

		popupId = _popupId;
		isOpen = _isOpen;
		popupAction = _popupAction;
		popupTextboxAction = _popupTextboxAction;
		selectedOptions = _selectedOptions;
	}
</script>

<!--dev: -->
<p>
	isOpen: {$isOpen}
</p>

<!--todo: change "aria-activedescendant" to selected element's id -->
<!--suppress RequiredAttributes -->
<svelte:element
	this={tag}
	id={generateId()}
	class="break-all outline-none"
	use:popupTextboxAction
	bind:innerText={$textContent}
	on:focus={() => {
		textboxIsFocused.set(true);
	}}
	on:blur={() => {
		textboxIsFocused.set(false);
	}}
	on:paste={handlePaste}
	contenteditable="true"
	role={hasPopup ? "combobox" : "textbox"}
	aria-autocomplete={hasPopup ? "list" : undefined}
	aria-controls={hasPopup ? popupId : undefined}
	aria-expanded={hasPopup ? $isOpen : undefined}
	aria-activedescendant={hasPopup ? popupId : undefined}
/>
{#if hasPopup && $isOpen}
	<ListPopup
		id={popupId}
		action={popupAction}
		{isOpen}
		{textContent}
		options={characters}
		{selectedOptions}
	/>
{/if}
