<script lang="ts">
	export let text: string;
	export let twClass: string = "";
</script>

<p
	class="{twClass}"
	bind:innerText="{text}"
	contenteditable="true"
	data-placeholder="Location, INT. EXT. I/E. INT/EXT."
></p>
