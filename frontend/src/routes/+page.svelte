<script lang="ts">
	import MainHeader from "./MainHeader.svelte";
	import BlockLine from "$lib/components/blocks/BlockLine.svelte";

	let mainHeight: number;
	let headerHeight: number;
	$: mainContentHeight = mainHeight - headerHeight;

	$: console.log({ mainHeight, headerHeight, mainContentHeight });
</script>

<main
	class="grid h-screen"
	style:grid-template-rows="min-content 1fr"
	bind:clientHeight={mainHeight}
>
	<header class="border-b border-b-stone-500/20 py-4" bind:clientHeight={headerHeight}>
		<MainHeader />
	</header>
	<div
		class="container mx-auto grid gap-x-6"
		style:grid-template-columns="1fr 240px"
		style:height="{mainContentHeight}px"
	>
		<section class="h-full overflow-y-auto">
			<BlockLine />
			<BlockLine />
			<BlockLine />
			<BlockLine />
			<BlockLine />
			<BlockLine />
			<BlockLine />
		</section>
		<aside class="overflow-y-auto">Configuration Menus and TOC</aside>
	</div>
</main>
