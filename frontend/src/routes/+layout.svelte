<script lang="ts">
	import "../app.css";
	import NavHeader from "./NavHeader.svelte";
</script>

<div>
	<NavHeader />
	<main class="px-4 md:px-8 lg:px-12">
		<slot />
	</main>
</div>
