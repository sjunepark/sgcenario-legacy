<script lang="ts">
	import { characters } from "$lib/store/stores";
</script>

<div
	id="page"
	class="relative mx-auto w-full max-w-3xl bg-white p-12 shadow-xl shadow-gray-700/10 ring-1 ring-gray-900/5 lg:p-16"
>
	<article class="prose prose-stone mx-auto min-w-[45ch] max-w-[75ch]">
		<h2>플랜더스의 개</h2>
		<!--DEV: for dev purpose only-->
		{#each $characters as character (character)}
			{character.value}
		{/each}
	</article>
</div>
