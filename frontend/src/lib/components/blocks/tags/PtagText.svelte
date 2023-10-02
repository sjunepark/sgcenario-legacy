<script lang="ts">
	import type { Action } from "svelte/action";
	import { createEventDispatcher, onMount } from "svelte";
	import { writable } from "svelte/store";
	import { twMerge } from "tailwind-merge";

	export let tag: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	export let classes: string = "";
	export let styles: string = "";
	export let action: Action;

	const dispatch = createEventDispatcher();
	function handleIn(event: Event) {
		dispatch("in", event);
	}
	function handleOut(event: Event) {
		dispatch("out", event);
	}

	const textContent = writable<string>("Default");

	onMount(() => {
		classes = twMerge(classes, "break-all");
	});
</script>

<svelte:element
	this={tag}
	bind:innerText={$textContent}
	class={classes}
	style={styles}
	use:action={undefined}
	on:focus={handleIn}
	on:blur={handleOut}
	contenteditable="true"
/>
