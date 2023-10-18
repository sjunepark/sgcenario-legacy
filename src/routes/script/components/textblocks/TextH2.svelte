<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import type { ComboboxProps } from "$lib/meltTypes";
	import { logger } from "$lib/utils/logger";
	import type { Readable } from "svelte/store";
	import { tick } from "svelte";

	listboxOptions.addElements(["/h1", "/h2", "박쥐", "박사"]);

	export let text: string = "";
	export let meltProps: ComboboxProps;
	let { class: classProps, ...restProps } = $$restProps;

	const {
		elements: { input },
		states: { inputValue, selected, highlighted },
	} = meltProps;
</script>

<!-- todo: when inserting text and removing it, the placeholder disappears since there is a br tag inserted. Need javascript -->
<!-- svelte-ignore a11y-missing-content -->
<h2
	data-placeholder="제목"
	class="{twMerge(classProps, '')}"
	{...$input}
	use:input
	{...restProps}
></h2>
	<h2
		{...$input}
		use:input
		class="{twMerge(classProps, '')}"
		bind:innerText="{text}"
		}}"
		contenteditable="true"
		data-placeholder="제목"
		{...restProps}
	></h2>
