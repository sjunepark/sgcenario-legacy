<script lang="ts">
	import { computePosition, flip, shift } from "@floating-ui/dom";
	import { onMount } from "svelte";

	let content: HTMLElement;
	let tooltip: HTMLElement;

	let left: number;
	let top: number;

	onMount(() => {
		computePosition(content, tooltip, {
			placement: "top-end",
			middleware: [flip(), shift({ padding: 5 })],
		}).then(({ x, y }) => {
			left = x;
			top = y;
		});
		console.log("computed position");
	});
</script>

<button id="content" bind:this={content}>
	Lorem ipsum dolor sit amet, consectetur adipisicing elit.
</button>
<div
	id="tooltip"
	bind:this={tooltip}
	class="not-prose absolute left-0 top-0 z-10 max-w-[10rem] bg-stone-500"
	style:left="{left}px"
	style:top="{top}px"
>
	<ul>
		<li class="truncate whitespace-nowrap">Some tooltip just for testing</li>
	</ul>
</div>
