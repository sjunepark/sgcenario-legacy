<script>
	import TextBlock from "$lib/components/blocks/TextBlock.svelte";
</script>

<div class="prose prose-gray">
	<!--eslint-disable-next-line @typescript-eslint/no-unused-vars-->
	{#each Array(1) as _, i}
		<TextBlock tag="p" />
	{/each}

	<p
		on:paste={(event) => {
			console.log(event.clipboardData?.types);
			console.log(event.clipboardData?.items);
		}}
		contenteditable="true"
	>
		TRy here
	</p>

	<!--eslint-disable-next-line @typescript-eslint/no-unused-vars-->
	{#each Array(30) as _, i}
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto dolores excepturi itaque
			maxime quod, totam vel! Minima omnis sequi voluptatem! Aliquam asperiores distinctio, dolor et
			fugiat iste magni quidem recusandae reiciendis repudiandae, suscipit ut voluptatem voluptatum.
			Atque deleniti inventore laboriosam.
		</p>
	{/each}
</div>
