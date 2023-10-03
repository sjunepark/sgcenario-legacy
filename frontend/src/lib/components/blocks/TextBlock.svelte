<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import { createTextBlock } from "$lib/components/blocks/textblockBuilder";

	export let tag: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	export let classes: string = "";

	const {
		stateStore: { open, textContent, autoCompletes },
		action: { referenceAction, floatingAction },
		handler: { handleIn, handleOut, handlePaste },
	} = createTextBlock({
		strategy: "absolute",
		placement: "bottom-end",
		autoUpdate: true,
	});

	$: classes = twMerge(classes, "break-all min-w-[15ch] outline-none");
</script>

<!--suppress RequiredAttributes -->
<svelte:element
	this={tag}
	bind:innerText={$textContent}
	class={classes}
	use:referenceAction
	on:focus={handleIn}
	on:blur={handleOut}
	on:paste={handlePaste}
	contenteditable="true"
/>
{#if $open}
	<ul use:floatingAction class="not-prose absolute left-0 top-0 z-10 max-w-[10rem] bg-stone-500">
		<li class="truncate whitespace-nowrap">Some tooltip just for testing</li>
	</ul>
{/if}
