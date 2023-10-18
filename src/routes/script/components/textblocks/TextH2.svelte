<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import type { ComboboxProps } from "$lib/meltTypes";

	export let text: string = "";
	export let comboboxProps: ComboboxProps;
	let { class: classProps, ...restProps } = $$restProps;

	const {
		elements: { input },
	} = comboboxProps;
</script>

<!-- todo: when inserting text and removing it, the placeholder disappears since there is a br tag inserted. Need javascript -->
<!-- svelte-ignore a11y-missing-content -->
<h2
	{...$input}
	use:input
	class="{twMerge(classProps, '')}"
	bind:innerText="{text}"
	contenteditable="true"
	data-placeholder="제목"
	{...restProps}
></h2>
