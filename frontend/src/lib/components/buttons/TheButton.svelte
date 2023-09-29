<script lang="ts">
	import { tv } from 'tailwind-variants';

	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

	const button = tv({
		base: 'min-w-[3.5rem] bg-white font-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-500',
		variants: {
			size: {
				xs: 'rounded px-2 py-1 text-xs',
				sm: 'rounded px-2 py-1 text-sm',
				md: 'rounded-md px-2.5 py-1.5 text-sm',
				lg: 'rounded-md px-3 py-2 text-sm',
				xl: 'rounded-md px-3.5 py-2.5 text-sm'
			}
		}
	});
</script>

<button type="button" class={button({ size: size })}>
	<slot />
</button>
