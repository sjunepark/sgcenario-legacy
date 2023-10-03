<script>
	import TextBox from "$lib/components/blocks/TextBox.svelte";
	import ListPopup from "$lib/components/blocks/ListPopup.svelte";
</script>

<div class="prose prose-gray">
	<!--eslint-disable-next-line @typescript-eslint/no-unused-vars-->
	{#each Array(1) as _, i}
		<ListPopup tag="p" let:textboxProps>
			<TextBox props={textboxProps} />
		</ListPopup>
	{/each}

	<p
		on:paste={(event) => {
			console.log(event.clipboardData?.types);
			console.log(event.clipboardData?.items);
		}}
		contenteditable="true"
	>
		Try here
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
