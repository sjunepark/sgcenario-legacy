<script lang="ts">
	import Block from "$lib/components/blocks/Block.svelte";
	import { blocks } from "$lib/store/stores";
</script>

<div
	id="page"
	class="relative mx-auto w-full max-w-3xl bg-white p-12 shadow-xl shadow-gray-700/10 ring-1 ring-gray-900/5 lg:p-16"
>
	<article class="prose-p:xtext-justify prose prose-stone mx-auto min-w-[45ch] max-w-[75ch]">
		{#each $blocks as block, index (block.id)}
			<Block blockProps="{block}" {index} />
		{/each}
	</article>
</div>
