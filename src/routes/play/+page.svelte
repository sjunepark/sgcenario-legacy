<script lang="ts">
	import Block from "$lib/components/blocks/Block.svelte";
	import type { Action } from "svelte/action";
	import { kbd } from "$lib/utils/keyboard";
	import { blocks } from "$lib/store/stores";

	const addKeyboardShortcuts: Action = (node) => {
		node.addEventListener("keydown", (e: KeyboardEvent) => {
			if (e.key === kbd.ALT) {
				if (!(e.target instanceof HTMLElement)) return;
				console.log("ALT key down");
			}
		});
		node.addEventListener("keyup", (e: KeyboardEvent) => {
			if (e.key === kbd.ALT) {
				console.log("ALT key up");
			}
		});
	};
</script>

<div
	id="page"
	class="relative mx-auto w-full max-w-3xl bg-white p-12 shadow-xl shadow-gray-700/10 ring-1 ring-gray-900/5 lg:p-16"
>
	<article
		use:addKeyboardShortcuts
		class="prose-p:xtext-justify prose prose-stone mx-auto min-w-[45ch] max-w-[75ch]"
	>
		{#each $blocks as block, index (block.id)}
			<Block {...block} {index} />
		{/each}
	</article>
</div>
