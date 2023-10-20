<script lang="ts">
	import type { Block } from "./blockType";
	import H2Block from "./H2Block.svelte";
	import ActionBlock from "./ActionBlock.svelte";
	import CharacterBlock from "./CharacterBlock.svelte";
	import LineBlock from "./LineBlock.svelte";
	import SceneBlock from "./SceneBlock.svelte";
	import TransitionBlock from "./TransitionBlock.svelte";
	import { mountLogger } from "$lib/utils/action";

	export let index: number;

	export let blockProps: Block;

	let { id, type, character, text } = blockProps;

	const twCommon =
		"outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-8 focus-visible:ring-offset-white break-all";
</script>

<div data-index="{index}" data-id="{id}" data-text="{text}" use:mountLogger>
	{#if type === "h2"}
		<H2Block twClass="{twCommon}" bind:text />
	{/if}
	{#if type === "action"}
		<ActionBlock twClass="{twCommon}" bind:text />
	{/if}
	{#if type === "dialogue"}
		<div class="-my-5 flex gap-3">
			<CharacterBlock twClass="{twCommon}" bind:character />
			<LineBlock twClass="{twCommon}" bind:text />
		</div>
	{/if}
	{#if type === "scene"}
		<SceneBlock twClass="{twCommon}" bind:text />
	{/if}
	{#if type === "transition"}
		<TransitionBlock twClass="{twCommon}" bind:text />
	{/if}
</div>
