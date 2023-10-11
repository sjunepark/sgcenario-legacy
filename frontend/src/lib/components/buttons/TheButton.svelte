<script lang="ts">
	import { tv } from "tailwind-variants";

	export let size: "xs" | "sm" | "md" | "lg" | "xl";

	const button = tv({
		base: "rounded-full min-w-[3.5rem] bg-white font-normal text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-stone-100",
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
</script>

<button type="button" class={button({ size })}>
	<slot />
</button>
