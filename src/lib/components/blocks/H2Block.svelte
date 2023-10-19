<script lang="ts">
	export let index: number;
	export let text: string = "";
	export let twClass: string = "";
</script>

<!-- svelte-ignore a11y-missing-content -->
<h2
	class="{twClass}"
	bind:innerText="{text}"
	contenteditable="true"
	data-placeholder="제목"
	data-index="{index}"
></h2>
