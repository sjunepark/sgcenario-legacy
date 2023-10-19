<script lang="ts">
	import { twMerge } from "tailwind-merge";

	export let text: string;
	export let twClass: string = "";
</script>

<p
	class="{twMerge(twClass, 'focus-visible:ring-offset-8 focus-visible:ring-offset-white')}"
	contenteditable="true"
	data-placeholder="Action"
	bind:innerText="{text}"
></p>
