<script lang="ts">
	import "../app.css";
	import NavHeader from "./NavHeader.svelte";
</script>

<div class="h-screen">
	<NavHeader />
	<main class="flex-grow">
		<slot />
	</main>
</div>
