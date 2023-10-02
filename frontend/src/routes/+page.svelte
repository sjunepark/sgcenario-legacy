<script lang="ts">
	import BlockLine from "$lib/components/blocks/BlockLine.svelte";
	import { characters } from "$lib/stores/charactersStore";
</script>

<div
	id="page"
	class="relative mx-auto mt-20 w-full max-w-3xl bg-white p-12 shadow-xl shadow-gray-700/10 ring-1 ring-gray-900/5 lg:p-16"
>
	<article class="prose prose-stone mx-auto min-w-[45ch] max-w-[75ch]">
		<h2>플랜더스의 개</h2>
		<!--DEV: for dev purpose only-->
		{#each $characters as character (character)}
			<BlockLine />
		{/each}
	</article>
</div>
