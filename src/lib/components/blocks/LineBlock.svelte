<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import { autofocus } from "$lib/utils/action";

	export let text: string;
	export let twClass: string = "";
</script>

<p
	class="{twMerge(twClass, 'flex-1')}"
	bind:innerText="{text}"
	use:autofocus
	contenteditable="true"
	data-placeholder="대사"
></p>
