<script lang="ts">
	import "../app.css";
	import "overlayscrollbars/overlayscrollbars.css";
	import NavHeader from "./NavHeader.svelte";
	import { type Options, OverlayScrollbars } from "overlayscrollbars";
	import { onDestroy, onMount, setContext } from "svelte";
	import type { DeepPartial } from "$lib/types";

	const scrollbarStyle: DeepPartial<Options> = {
		scrollbars: {
			theme: "os-theme-dark",
			autoHide: "scroll",
			autoHideSuspend: true,
			autoHideDelay: 500,
		},
	};
	setContext("scrollbarStyle", scrollbarStyle);

	let osInstance: OverlayScrollbars;

	onMount(() => {
		osInstance = OverlayScrollbars(document.body, scrollbarStyle);
	});
	onDestroy(() => {
		osInstance && osInstance.destroy();
	});
</script>

<div>
	<NavHeader />
	<main class="global-container mt-20">
		<slot />
	</main>
</div>
