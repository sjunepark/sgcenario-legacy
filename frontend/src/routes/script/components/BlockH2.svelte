<script lang="ts">
	import { twMerge } from "tailwind-merge";
	let { class: classProps, ...restProps } = $$restProps;
</script>

<!--enhance: when inserting text and removing it, the placeholder disappears since there is a br tag inserted. Need javascript-->
<!-- svelte-ignore a11y-missing-content -->
<h2
	contenteditable="true"
	data-placeholder="제목"
	class={twMerge(classProps, "focus-visible:ring-offset-8 focus-visible:ring-offset-white")}
	{...restProps}
></h2>
