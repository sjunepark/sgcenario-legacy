<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import { autofocus } from "$lib/utils/action";
	import type { BlockType } from "$lib/components/blocks/blockTypes";
	import { blocks } from "$lib/store/stores";

	export let id: number;
	export let type: BlockType;
	export let text: string;
	export let twClass: string = "";

	$: console.log(text);
</script>

<p
	class="{twMerge(twClass, 'italic focus-visible:ring-offset-8 focus-visible:ring-offset-white')}"
	bind:innerText="{text}"
	use:autofocus
	on:focusout="{() => {
		blocks.updateBlockById(id, { id, type, character: '', text });
	}}"
	contenteditable="true"
	data-placeholder="transition"
></p>
