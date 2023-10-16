<script lang="ts">
	import { twMerge } from "tailwind-merge";

	let { class: classProps, ...restProps } = $$restProps;
</script>

<p
	class="{twMerge(
		classProps,
		'italic focus-visible:ring-offset-8 focus-visible:ring-offset-white',
	)}"
	contenteditable="true"
	data-placeholder="transition"
	{...restProps}
></p>
