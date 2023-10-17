<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import type { Writable } from "svelte/store";
	import type { WritableSortedList } from "$lib/store/sortedListStore";
	import type { Action } from "svelte/action";

	export let input: Action & Writable<object>;
	export let listboxOptions: WritableSortedList<string>;

	listboxOptions.addElements(["/h1", "/h2", "박쥐", "박사"]);

	let { class: classProps, ...restProps } = $$restProps;
</script>

<!--enhance: when inserting text and removing it, the placeholder disappears since there is a br tag inserted. Need javascript-->
<!-- svelte-ignore a11y-missing-content -->
<h2
	contenteditable="true"
	data-placeholder="제목"
	class="{twMerge(classProps, 'focus-visible:ring-offset-8 focus-visible:ring-offset-white')}"
	{...$input}
	use:input
	{...restProps}
></h2>
