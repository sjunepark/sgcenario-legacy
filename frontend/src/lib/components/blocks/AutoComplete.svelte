<script lang="ts">
	import { createAutocomplete } from "$lib/components/blocks/autocomplete";
	import { writable } from "svelte/store";
	import PtagText from "$lib/components/blocks/tags/PtagText.svelte";

	const open = writable(false);

	const { referenceAction, floatingAction } = createAutocomplete({
		strategy: "absolute",
		placement: "bottom-end",
		autoUpdate: true,
	});

	const handleIn = () => {
		open.set(true);
	};
	const handleOut = () => {
		open.set(false);
	};
</script>

<PtagText tag="span" action={referenceAction} on:in={handleIn} on:out={handleOut} />
<ul use:floatingAction class="not-prose absolute left-0 top-0 z-10 max-w-[10rem] bg-stone-500">
	<li class="truncate whitespace-nowrap">Some tooltip just for testing</li>
</ul>
