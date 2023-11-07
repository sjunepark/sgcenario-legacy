<script lang="ts">
	import H2Block from "./H2Block.svelte";
	import ActionBlock from "./ActionBlock.svelte";
	import SceneBlock from "./SceneBlock.svelte";
	import TransitionBlock from "./TransitionBlock.svelte";
	import type { Action } from "svelte/action";
	import { blockTypes } from "$lib/components/blocks/blockTypes";
	import { mountLogger } from "$lib/utils/logger";
	import { listen } from "$lib/utils/event";

	export let index: number;
	export let id: number;
	export let type: string;
	export let text: string;
	export let character: string;

	const twCommon =
		"outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-8 focus-visible:ring-offset-white break-all";

	// start here
	const addKeyboardShortcuts: Action = (node) => {
		const removers: (() => void)[] = [];

		for (const blockType of blockTypes) {
			const remover = listen(node, "keydown", (e) => {
				if (e.altKey && e.code === blockType.keyCode) {
					e.preventDefault();
				}

				if (e.altKey && e.code === blockType.keyCode) {
					e.preventDefault();
					type = blockType.type;
					console.log(`Change block ${id} from ${type} to ${type}`);
				}
			});

			removers.push(remover);
		}

		return {
			destroy() {
				for (const remover of removers) {
					remover();
				}
			},
		};
	};
</script>

<div
	use:mountLogger
	use:addKeyboardShortcuts
	class="focus-visible:ring-8"
	data-index="{index}"
	data-id="{id}"
	data-type="{type}"
	data-character="{character}"
	data-text="{text}"
>
	{#if type === "h2"}
		<H2Block twClass="{twCommon}" bind:text />
	{/if}
	{#if type === "action"}
		<ActionBlock twClass="{twCommon}" bind:text />
	{/if}
	{#if type === "dialogue"}
		<div class="-my-5 flex gap-3">
			<!--			<CharacterBlock twClass="{twCommon}" bind:character />-->
			<!--			<LineBlock twClass="{twCommon}" bind:text />-->
		</div>
	{/if}
	{#if type === "scene"}
		<SceneBlock twClass="{twCommon}" bind:text />
	{/if}
	{#if type === "transition"}
		<TransitionBlock twClass="{twCommon}" bind:text />
	{/if}
</div>
