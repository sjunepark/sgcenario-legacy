<script lang="ts">
	import "../app.css";
	import "overlayscrollbars/overlayscrollbars.css";
	import NavHeader from "./NavHeader.svelte";
	import { OverlayScrollbars } from "overlayscrollbars";
	import { onDestroy, onMount } from "svelte";
	import type { LayoutData } from "./$types";
	import { scrollbarStyle } from "$lib/configs/configs";

	export let data: LayoutData;
	$: ({ pathname, user } = data);

	let osInstance: OverlayScrollbars;
	onMount(() => {
		osInstance = OverlayScrollbars(document.body, scrollbarStyle);
	});
	onDestroy(() => {
		osInstance && osInstance.destroy();
	});
</script>

<div>
	<NavHeader {pathname} {user} />
	<main class="global-container mt-20">
		<slot />
	</main>
</div>
