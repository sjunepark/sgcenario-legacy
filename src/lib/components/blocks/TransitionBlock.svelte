<script lang="ts">
	import { twMerge } from "tailwind-merge";

	export let text: string;
	export let twClass: string = "";
</script>

<p
	class="{twMerge(twClass, 'italic focus-visible:ring-offset-8 focus-visible:ring-offset-white')}"
	bind:innerText="{text}"
	contenteditable="true"
	data-placeholder="transition"
></p>
