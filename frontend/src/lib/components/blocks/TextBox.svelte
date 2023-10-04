<script lang="ts">
	import { generateId } from "$lib/id.js";
	import { handlePaste } from "$lib/utils/event.js";
	import type { TextboxProps } from "$lib/types";

	export let props: TextboxProps;
	const {
		tag,
		state: { textContent },
		action,
		handlers: { handleTextboxFocus, handleTextboxBlur },
	} = props;
</script>

<!--suppress RequiredAttributes -->
<svelte:element
	this={tag}
	id={generateId()}
	bind:innerText={$textContent}
	class="break-all outline-none"
	use:action
	on:focus={handleTextboxFocus}
	on:blur={handleTextboxBlur}
	on:paste={handlePaste}
	contenteditable="true"
	aria-autocomplete="list"
	role="textbox"
/>
