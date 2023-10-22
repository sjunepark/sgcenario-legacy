<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import { autofocus } from "$lib/utils/action";

	export let text: string;
	export let twClass: string = "";
</script>

<p
	class="{twMerge(twClass, 'focus-visible:ring-offset-8 focus-visible:ring-offset-white')}"
	bind:innerText="{text}"
	use:autofocus
	contenteditable="true"
	data-placeholder="Action"
></p>
