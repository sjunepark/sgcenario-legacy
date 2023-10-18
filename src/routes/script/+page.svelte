<script lang="ts">
	import Block from "./components/textblocks/TextBlock.svelte";
</script>

<div
	id="page"
	class="relative mx-auto w-full max-w-3xl bg-white p-12 shadow-xl shadow-gray-700/10 ring-1 ring-gray-900/5 lg:p-16"
>
	<article class="prose-p:xtext-justify prose prose-stone mx-auto min-w-[45ch] max-w-[75ch]">
		<Block type="h2" />
		<Block type="scene" />
		<Block type="action" />
		<Block type="character" />
		<Block type="line" />
		<Block type="transition" />
	</article>
</div>
