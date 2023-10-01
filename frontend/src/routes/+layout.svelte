<script lang="ts">
	import "../app.css";
	import "overlayscrollbars/overlayscrollbars.css";
	import NavHeader from "./NavHeader.svelte";
	import { OverlayScrollbars } from "overlayscrollbars";
	import { onMount } from "svelte";

	onMount(() => {
		OverlayScrollbars(document.body, {
			scrollbars: {
				visibility: "auto",
				autoHide: "scroll",
				autoHideDelay: 500,
				autoHideSuspend: true
			}
		});
	});
</script>

<NavHeader />
<main class="px-4 md:px-8 lg:px-12">
	<slot />
</main>
