<script lang="ts">
	import type { TextBlock } from "./textblock";
	import TextH2 from "./TextH2.svelte";
	import TextAction from "./TextAction.svelte";
	import TextCharacter from "./TextCharacter.svelte";
	import TextLine from "./TextLine.svelte";
	import TextScene from "./TextScene.svelte";
	import TextTransition from "./TextTransition.svelte";

	export let type: TextBlock;
	export let character: string = "";
	export let text: string;

	const twCommon =
		"outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-8 focus-visible:ring-offset-white break-all";
</script>

{#if type === "h2"}
	<TextH2 twClass="{twCommon}" bind:text />
{/if}
{#if type === "action"}
	<TextAction twClass="{twCommon}" bind:text />
{/if}
{#if type === "dialogue"}
	<div class="flex gap-3">
		<TextCharacter twClass="{twCommon}" bind:character />
		<TextLine twClass="{twCommon}" bind:text />
	</div>
{/if}
{#if type === "scene"}
	<TextScene twClass="{twCommon}" bind:text />
{/if}
{#if type === "transition"}
	<TextTransition twClass="{twCommon}" bind:text />
{/if}
