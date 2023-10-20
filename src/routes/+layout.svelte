<script lang="ts">
	import "../app.css";
	import "overlayscrollbars/overlayscrollbars.css";
	import NavHeader from "./NavHeader.svelte";
	import { OverlayScrollbars } from "overlayscrollbars";
	import { onDestroy, onMount } from "svelte";
	import type { LayoutData } from "./$types";
	import { scrollbarStyle } from "$lib/configs/configs";
	import { logger } from "$lib/utils/logger";

	export let data: LayoutData;
	$: ({ user } = data);

	let osInstance: OverlayScrollbars;
	onMount(() => {
		osInstance = OverlayScrollbars(document.body, scrollbarStyle);
	});
	onDestroy(() => {
		osInstance && osInstance.destroy();
	});

	logger.info(data, "from root layout");
</script>

<div>
	<NavHeader {user} />
	<main class="global-container relative mt-28">
		<slot />
	</main>
</div>
