<script lang="ts">
	import H2Block from "./H2Block.svelte";
	import ActionBlock from "./ActionBlock.svelte";
	import CharacterBlock from "./CharacterBlock.svelte";
	import LineBlock from "./LineBlock.svelte";
	import SceneBlock from "./SceneBlock.svelte";
	import TransitionBlock from "./TransitionBlock.svelte";
	import type { Action } from "svelte/action";
	import { blockTypes } from "$lib/components/blocks/blockTypes";
	import { mountLogger } from "$lib/utils/logger";
	import { logger, mountLogger } from "$lib/utils/logger";

	export let index: number;
	export let id: number;
	export let type: string;
	export let text: string;
	export let character: string;

	const twCommon =
		"outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-8 focus-visible:ring-offset-white break-all";

	const addKeyboardShortcuts: Action = (node) => {
		for (const blockType of blockTypes) {
			node.addEventListener("keydown", (e) => {
				if (e.altKey && e.code === blockType.keyCode) {
					e.preventDefault();
				}
			});

			node.addEventListener("keydown", (e) => {
				if (e.altKey && e.code === blockType.keyCode) {
					e.preventDefault();
					type = blockType.type;
					console.log(`Change block ${id} from ${type} to ${pressedBlockType.type}`);
				}
			});
		}
	};
</script>

<div
	data-index="{index}"
	data-id="{id}"
	data-text="{text}"
	use:mountLogger
	use:addKeyboardShortcuts
	class="focus-visible:ring-8"
>
	{#if type === "h2"}
		<H2Block twClass="{twCommon}" {id} {type} bind:text />
	{/if}
	{#if type === "action"}
		<ActionBlock twClass="{twCommon}" {id} {type} bind:text />
	{/if}
	{#if type === "dialogue"}
		<div class="-my-5 flex gap-3">
			<CharacterBlock twClass="{twCommon}" {id} {type} bind:character />
			<LineBlock twClass="{twCommon}" {id} {type} bind:text />
		</div>
	{/if}
	{#if type === "scene"}
		<SceneBlock twClass="{twCommon}" {id} {type} bind:text />
	{/if}
	{#if type === "transition"}
		<TransitionBlock twClass="{twCommon}" {id} {type} bind:text />
	{/if}
</div>
