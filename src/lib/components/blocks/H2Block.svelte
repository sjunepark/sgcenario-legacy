<script lang="ts">
	import { autofocus } from "$lib/utils/action";
	import type { BlockType } from "$lib/components/blocks/blockTypes";

	export let id: number;
	export let type: BlockType;
	export let text: string = "";
	export let twClass: string = "";
</script>

<!-- svelte-ignore a11y-missing-content -->
<h2
	class="{twClass}"
	bind:innerText="{text}"
	use:autofocus
	contenteditable="true"
	data-placeholder="제목"
></h2>
