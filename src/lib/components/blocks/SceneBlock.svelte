<script lang="ts">
	import { autofocus } from "$lib/utils/action";

	export let text: string;
	export let twClass: string = "";
</script>

<p
	class="{twClass}"
	bind:innerText="{text}"
	use:autofocus
	contenteditable="true"
	data-placeholder="Location, INT. EXT. I/E. INT/EXT."
></p>
