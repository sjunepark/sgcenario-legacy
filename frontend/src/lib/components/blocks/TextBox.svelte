<script lang="ts">
	import { derived, readable, writable } from "svelte/store";
	import type { Action } from "svelte/action";
	import { createFloatingActions } from "svelte-floating-ui";
	import type { PopupProps, TextboxTag, ValueWithId } from "$lib/types";
	import { generateId } from "$lib/utils/id";
	import { handlePaste } from "$lib/utils/event";
	import ListPopup from "$lib/components/blocks/ListPopup.svelte";
	import { createSortedListStore } from "$lib/store/sortedListStore";
	import { sampleCharacters } from "$lib/store/stores";
	import { kbd } from "$lib/utils/keyboard";

	let focusFirstList = () => {};

	// !Props
	export let tag: TextboxTag;
	export let defaultText = "";
	export let hasPopup = false;

	// !Popup
	let popupTextboxAction: Action = () => {};

	let popupProps: PopupProps = {
		popupId: undefined,
		state: {
			isOpen: readable(false),
			popupIsFocused: writable(false),
			focusedOption: writable(undefined),
		},
		action: {
			popupAction: () => {},
		},
	};

	// !Stores
	const innerText = writable(defaultText);
	const textboxIsFocused = writable(false);
	// dev: For development purposes only
	const characters = createSortedListStore<ValueWithId>(sampleCharacters);

	function createPopupStore() {
		const popupId = generateId();
		const popupIsFocused = writable(false);
		const focusedOption = writable<ValueWithId | undefined>();
		const isOpen = derived([textboxIsFocused, popupIsFocused], ([tifStoreValue, pifStoreValue]) => {
			return tifStoreValue || pifStoreValue;
		});

		const [popupTextboxAction, popupAction] = createFloatingActions({
			strategy: "absolute",
			placement: "bottom-end",
			autoUpdate: true,
		});

		return {
			popup: {
				popupId,
				state: { isOpen, popupIsFocused, focusedOption },
				action: { popupAction },
			},
			textbox: {
				action: { popupTextboxAction },
			},
		};
	}

	if (hasPopup) {
		({
			popup: popupProps,
			textbox: {
				action: { popupTextboxAction },
			},
		} = createPopupStore());
	}

	const {
		popupId,
		state: { isOpen, popupIsFocused },
	} = popupProps;

	async function handleKeydown(e: KeyboardEvent) {
		if (e.key === kbd.ARROW_DOWN) {
			e.preventDefault();
			e.stopPropagation();
			focusFirstList();
		}
	}
	$: console.log(`isOpen: ${$isOpen}`);
</script>

{#key [$isOpen, $popupIsFocused]}
	<p>
		hasPopup: {hasPopup}, isOpen: {$isOpen}, popupIsFocused: {$popupIsFocused}
	</p>
{/key}

<!--todo: change "aria-activedescendant" to selected element's id -->
<!--suppress RequiredAttributes -->
<svelte:element
	this={tag}
	id={generateId()}
	class="break-all outline-none"
	use:popupTextboxAction
	bind:innerText={$innerText}
	on:focus={() => {
		textboxIsFocused.set(true);
	}}
	on:blur={() => {
		textboxIsFocused.set(false);
	}}
	on:keydown={handleKeydown}
	on:paste={handlePaste}
	contenteditable="true"
	role={hasPopup ? "combobox" : "textbox"}
	aria-autocomplete={hasPopup ? "list" : undefined}
	aria-controls={hasPopup ? popupId : undefined}
	aria-expanded={hasPopup ? $isOpen : undefined}
	aria-activedescendant={hasPopup ? popupId : undefined}
/>
{#if hasPopup && $isOpen}
	<ListPopup bind:focusFirstList {innerText} options={characters} {popupProps} />
{/if}
