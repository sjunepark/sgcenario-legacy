<script lang="ts">
	import Block from "$lib/components/blocks/Block.svelte";
	import type { Action } from "svelte/action";
	import { kbd } from "$lib/utils/keyboard";
	import type { BlockType } from "$lib/components/blocks/blockType";

	const addKeyboardShortcut: Action = (node) => {
		node.addEventListener("keydown", (e: KeyboardEvent) => {
			if (e.key === kbd.ALT) {
				if (!(e.target instanceof HTMLElement)) return;

				console.log("alt key down");
				console.log(`index: ${e.target.dataset.index}`);
				console.log(e);
			}
		});
		node.addEventListener("keyup", (e: KeyboardEvent) => {
			if (e.key === kbd.ALT) {
				console.log("alt key up");
			}
		});
	};

	const scriptLines: {
		index: number;
		type: "h2" | "scene" | "action" | "dialogue" | "transition";
		character: string;
		text: string;
	}[] = /* todo */
</script>

<div
	id="page"
	class="relative mx-auto w-full max-w-3xl bg-white p-12 shadow-xl shadow-gray-700/10 ring-1 ring-gray-900/5 lg:p-16"
>
	<article
		use:addKeyboardShortcut
		class="prose-p:xtext-justify prose prose-stone mx-auto min-w-[45ch] max-w-[75ch]"
	>
		<Block type="h2" character="" text="" index="{0}" />
		<Block type="scene" character="" text="" index="{1}" />
		<Block type="action" character="" text="" index="{2}" />
		<Block type="dialogue" character="" text="" index="{3}" />
		<Block type="transition" character="" text="" index="{4}" />
	</article>
</div>
