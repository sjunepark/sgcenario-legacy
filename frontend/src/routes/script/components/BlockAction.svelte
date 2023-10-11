<script lang="ts">
	import { twMerge } from "tailwind-merge";

	let { class: classProps, ...restProps } = $$restProps;
</script>

<p
	class={twMerge(classProps, "focus-visible:ring-offset-8 focus-visible:ring-offset-white")}
	contenteditable="true"
	data-placeholder="Action"
	{...restProps}
></p>
