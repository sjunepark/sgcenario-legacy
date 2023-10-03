<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import { createTextBlock } from "$lib/components/blocks/textblockBuilder";
	import { generateId } from "$lib/id";

	export let tag: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	export let classes: string = "";

	const {
		stateStore: { open },
		valueStore: { textContent, filtered },
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
	aria-autocomplete="list"
	role="textbox"
/>
{#if $open}
	<ul
		use:floatingAction
		class="not-prose absolute left-0 top-0 z-10 max-w-[10rem] bg-stone-500"
		aria-expanded="true"
		role="listbox"
		id={generateId()}
	>
		{#each $filtered as { id, value }}
			<li role="option" class="truncate whitespace-nowrap" aria-selected="false">{id}. {value}</li>
		{:else}
			<!--TODO: Implement "Add" option-->
		{/each}
	</ul>
{/if}
