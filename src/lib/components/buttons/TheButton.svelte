<script lang="ts">
	import { tv } from "tailwind-variants";
	import { createEventDispatcher } from "svelte";
	import { twMerge } from "tailwind-merge";

	let { class: classProps, ...restProps } = $$restProps;

	export let size: "xs" | "sm" | "md" | "lg" | "xl";

	const button = tv({
		base: twMerge(
			classProps,
			"min-w-[3.5rem] rounded-full bg-white font-normal text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 hover:bg-stone-100 focus-visible:outline-stone-500",
		),
		variants: {
			size: {
				xs: "px-2.5 py-1 text-xs",
				sm: "px-2.5 py-1 text-sm",
				md: "px-3 py-1.5 text-sm",
				lg: "px-3.5 py-2 text-sm",
				xl: "px-4 py-2.5 text-sm",
			},
		},
	});

	const dispatch = createEventDispatcher();
</script>

<button
	type="button"
	class="{button({ size })}"
	on:click="{() => dispatch('click')}"
	{...restProps}
>
	<slot />
</button>
