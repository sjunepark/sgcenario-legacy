<script lang="ts">
	import { twMerge } from "tailwind-merge";

	export let text: string;
	export let twClass: string = "";
</script>

<p
	class="{twMerge(twClass, 'flex-1')}"
	bind:innerText="{text}"
	contenteditable="true"
	data-placeholder="대사"
></p>
