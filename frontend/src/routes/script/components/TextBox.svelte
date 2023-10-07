<script lang="ts">
	import { writable } from "svelte/store";
	import type { Action } from "svelte/action";
	import { createFloatingActions } from "svelte-floating-ui";
	import type { PopupProps, TextboxTag, ValueWithId } from "$lib/types";
	import { generateId } from "$lib/utils/id";
	import { handlePaste } from "$lib/utils/event";
	import ListPopup from "./ListPopup.svelte";
	import { createSortedListStore } from "$lib/store/sortedListStore";
	import { sampleCharacters } from "$lib/store/stores";
	import { kbd } from "$lib/utils/keyboard";
	import type { SelectedOption } from "./types";
	import { tick } from "svelte";

	/*!
	Ref
	 */
	let textbox: HTMLElement;

	/*!
	Props
	 */
	export let tag: TextboxTag;
	export let defaultText = "";
	export let hasPopup = false;

	/*!
	Popup
	 */
	let popupProps: PopupProps = {
		popupId: undefined,
		state: {
			isOpen: writable(false),
			focusedOption: writable(undefined),
		},
		action: {
			popupAction: () => {},
		},
	};
	let popupTextboxAction: Action = () => {};

	// bind:property
	let focusPopup: () => Promise<void>;
	let selected: SelectedOption;

	// builder
	function createPopupStore() {
		const popupId = generateId();
		const focusedOption = writable<ValueWithId | undefined>();
		const isOpen = writable(false);

		const [popupTextboxAction, popupAction] = createFloatingActions({
			strategy: "absolute",
			placement: "bottom-start",
			autoUpdate: true,
		});

		return {
			popup: {
				popupId,
				state: { isOpen, focusedOption },
				action: { popupAction },
			},
			textbox: { action: { popupTextboxAction } },
		};
	}

	const {
		popupId,
		state: { isOpen },
	} = popupProps;

	/*!
	Stores
	 */
	const innerText = writable(defaultText);
	// dev: For development purposes only
	const characters = createSortedListStore<ValueWithId>(sampleCharacters);

	/*!
	Handlers & Functions
	 */
	async function handleKeydown(e: KeyboardEvent) {
		if (e.key === kbd.ARROW_DOWN) {
			e.preventDefault();
			e.stopPropagation();
			await tick();
			await focusPopup();
		}
	}

	function focusTextbox() {
		textbox.focus();
	}

	/*!
	Run
	 */
	if (hasPopup) {
		({
			popup: popupProps,
			textbox: {
				action: { popupTextboxAction },
			},
		} = createPopupStore());
	}
</script>

<!--dev:-->
{#key [hasPopup, $isOpen]}
	<p>
		hasPopup: {hasPopup}, isOpen: {$isOpen}
	</p>
{/key}

<!--todo: change "aria-activedescendant" to selected element's id -->
<!--suppress RequiredAttributes -->
<svelte:element
	this={tag}
	bind:this={textbox}
	id={generateId()}
	class="break-all outline-none"
	use:popupTextboxAction
	bind:innerText={$innerText}
	on:focus={async () => {
		await tick();
		isOpen.set(true);
	}}
	on:blur={async () => {
		await tick();
		isOpen.set(false);
	}}
	on:keydown={handleKeydown}
	on:paste={handlePaste}
	contenteditable="true"
	role={hasPopup ? "combobox" : "textbox"}
	aria-autocomplete={hasPopup ? "list" : undefined}
	aria-controls={hasPopup ? popupId : undefined}
	aria-expanded={hasPopup ? $isOpen : undefined}
	aria-activedescendant={hasPopup ? $selected?.value : undefined}
/>
{#if hasPopup && $isOpen}
	<ListPopup
		bind:selected
		bind:focusPopup
		{focusTextbox}
		{innerText}
		options={characters}
		{popupProps}
	/>
{/if}
