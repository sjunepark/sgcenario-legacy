<script lang="ts">
	import { twMerge } from "tailwind-merge";

	let { class: classProps, ...restProps } = $$restProps;

	export let text: string;
</script>

<p
	class="{twMerge(classProps, '')}"
	contenteditable="true"
	data-placeholder="Location, INT. EXT. I/E. INT/EXT."
	bind:innerText="{text}"
	{...restProps}
></p>
