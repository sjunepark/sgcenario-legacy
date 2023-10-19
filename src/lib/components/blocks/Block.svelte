<script lang="ts">
	import type { BlockType } from "./blockType";
	import H2Block from "./H2Block.svelte";
	import ActionBlock from "./ActionBlock.svelte";
	import CharacterBlock from "./CharacterBlock.svelte";
	import LineBlock from "./LineBlock.svelte";
	import SceneBlock from "./SceneBlock.svelte";
	import TransitionBlock from "./TransitionBlock.svelte";

	export let index: number;
	export let type: BlockType;
	export let character: string;
	export let text: string;

	const twCommon =
		"outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-8 focus-visible:ring-offset-white break-all";
</script>

<span class="hidden">{index}</span>
{#if type === "h2"}
	<H2Block twClass="{twCommon}" bind:text {index} />
{/if}
{#if type === "action"}
	<ActionBlock twClass="{twCommon}" bind:text {index} />
{/if}
{#if type === "dialogue"}
	<div class="flex gap-3">
		<CharacterBlock twClass="{twCommon}" bind:character {index} />
		<LineBlock twClass="{twCommon}" bind:text {index} />
	</div>
{/if}
{#if type === "scene"}
	<SceneBlock twClass="{twCommon}" bind:text {index} />
{/if}
{#if type === "transition"}
	<TransitionBlock twClass="{twCommon}" bind:text {index} />
{/if}
