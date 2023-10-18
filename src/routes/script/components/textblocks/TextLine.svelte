<script lang="ts">
	import { twMerge } from "tailwind-merge";

	export let text: string;
	let { class: classProps, ...restProps } = $$restProps;
</script>

<p
	class="{twMerge(classProps, '')}"
	bind:innerText="{text}"
	contenteditable="true"
	data-placeholder="대사"
	{...restProps}
></p>
