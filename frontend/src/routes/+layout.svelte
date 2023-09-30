<script lang="ts">
	import "../app.css";
	import NavHeader from "./NavHeader.svelte";
</script>

<div class="flex h-[100dvh] flex-col">
	<NavHeader />
	<main class="flex-grow">
		<slot />
	</main>
</div>
