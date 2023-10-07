<script lang="ts">
	import BlockTitle from "./BlockTitle.svelte";
	import BlockScene from "./BlockScene.svelte";
	import BlockAction from "./BlockAction.svelte";
	import BlockDialogue from "./BlockDialogue.svelte";
	import BlockTransition from "./BlockTransition.svelte";
	import type { ComponentType } from "svelte";

	export let type: "title" | "scene" | "action" | "dialogue" | "transition";

	let options: { type: typeof type; component: ComponentType }[] = [
		{ type: "title", component: BlockTitle },
		{ type: "scene", component: BlockScene },
		{ type: "action", component: BlockAction },
		{ type: "dialogue", component: BlockDialogue },
		{ type: "transition", component: BlockTransition },
	];
</script>

<svelte:component this={options.find((o) => o.type === type)?.component} />
