<script lang="ts">
	import { derived, writable, type Writable } from "svelte/store";
	import type { WritableSortedList } from "$lib/store/sortedListStore";
	import type { PopupProps, ValueWithId } from "$lib/types";
	import Hangul from "hangul-js";
	import { isEmpty } from "$lib/utils/string";
	import { generateId } from "$lib/utils/id";
	import { kbd } from "$lib/utils/keyboard";
	import type { SelectedOption } from "$lib/components/blocks/types";

	/*! To prevent warning: "was created with unknown prop"
			refer: https://github.com/sveltejs/svelte/issues/4652
	 */
	$$restProps;
	$: console.log("restProps", JSON.stringify($$restProps));

	/*!
	Props
	 */
	export let innerText: Writable<string>;
	export let options: WritableSortedList<ValueWithId>;

	export let popupProps: PopupProps;

	const {
		popupId,
		state: { isOpen, focusedOption },
		action: { popupAction },
	} = popupProps;

	/*!
	options
	 */
	const filtered = derived([options, innerText], ([oStoreValue, tStoreValue]) => {
		// return: Early return when no innerText
		if (isEmpty(tStoreValue)) {
			return oStoreValue;
		}

		// return: option found
		// Computed in advance to prevent unnecessary additional computation
		const disassembled = Hangul.disassemble($innerText).join("").trim();

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
		const current = event.currentTarget as HTMLLIElement;
		if (event.key === kbd.ARROW_DOWN) {
			event.preventDefault();
			event.stopPropagation();
			nextList(current).focus();
		} else if (event.key === kbd.ARROW_UP) {
			event.preventDefault();
			event.stopPropagation();
			previousList(current).focus();
		} else if (event.key === kbd.ENTER) {
			event.preventDefault();
			event.stopPropagation();
			selected.setWithElement(current);
		}
	}

	/*!
	bind:property
	 */
	// noinspection JSUnusedGlobalSymbols
	export function focusFirstOption() {
		firstLinkedList.focus();
	}
	export let selected = createSelected(undefined);

	function createSelected(defaultValue: ValueWithId | undefined): SelectedOption {
		const { subscribe, set, update } = writable<ValueWithId | undefined>(defaultValue);

		function setWithElement(elementWithData: HTMLElement) {
			const dataset = elementWithData.dataset;
			let id = dataset.id;
			let value = dataset.value;
			if (!id || !value) return;
			set({ id: Number(id), value: value });
		}
		return {
			subscribe,
			set,
			update,
			setWithElement,
		};
	}

	function nextList(listElement: LinkedHTMLLIElement) {
		const next = listElement.llNext;
		if (next) return next;
		else return firstLinkedList;
	}

	function previousList(listElement: LinkedHTMLLIElement) {
		const previous = listElement.llPrevious;
		if (previous) return previous;
		else return lastLinkedList;
	}

	let firstLinkedList: LinkedHTMLLIElement;
	let lastLinkedList: LinkedHTMLLIElement;

	type LinkedHTMLLIElement = HTMLLIElement & {
		llPrevious?: HTMLLIElement | null;
		llNext?: HTMLLIElement | null;
	};

	/* eslint-disable @typescript-eslint/no-unused-vars */
	// noinspection JSUnusedLocalSymbols
	function createLink(node: LinkedHTMLLIElement, props: { value: string; isLast: boolean }) {
		function setLink() {
			const previous = node.previousElementSibling as LinkedHTMLLIElement;
			if (!previous) {
				firstLinkedList = node;
			} else {
				node.llPrevious = previous as HTMLLIElement;
				previous.llNext = node;
			}

			if (props.isLast) {
				node.llNext = firstLinkedList;
				firstLinkedList.llPrevious = node;
			}
		}
		setLink();

		// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols,ES6ShorthandObjectProperty
		return {
			update(props: { value: string; isLast: boolean }) {
				setLink();
			},
			destroy() {},
		};
	}
	/* eslint-enable @typescript-eslint/no-unused-vars */

	// dev:
</script>

<ul
	id={popupId}
	class="not-prose absolute left-0 top-0 z-10 flex max-h-48 w-[15ch] flex-col overflow-y-auto overflow-x-hidden text-ellipsis bg-stone-50 shadow-lg ring-1 ring-stone-500/50"
	use:popupAction
	on:focusin={() => {
		isOpen.set(true);
		console.log("ul focused");
	}}
	on:focusout={() => {
		isOpen.set(false);
		console.log("ul blurred");
	}}
	role="listbox"
>
	{#each $filtered as { id, value }, index (id)}
		{@const isSelected = $focusedOption ? $focusedOption.id === id : false}
		{@const isLast = index === $filtered.length - 1}
		<li
			id="{popupId}-{index}"
			class="cursor-pointer space-y-2 whitespace-nowrap px-2 focus:bg-stone-200 focus:outline-none data-[disabled]:opacity-50"
			use:createLink={{ value, isLast }}
			tabindex="0"
			on:focus={() => {
				console.log(`li ${value} focused`);
				focusedOption.set({ id, value });
			}}
			on:blur={() => {
				console.log(`li ${value} blurred`);
				focusedOption.set(undefined);
			}}
			on:keydown={handleKeyDown}
			role="option"
			aria-selected={isSelected}
			data-id={id}
			data-value={value}
			data-index={index}
		>
			{value}
		</li>
	{:else}
		{#if $isOpen && !isEmpty($innerText)}
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
