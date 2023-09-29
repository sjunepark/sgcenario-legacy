<script lang="ts">
	import TheButton from '$lib/components/buttons/TheButton.svelte';
</script>

<main class="border-b border-b-stone-500/20 py-4">
	<header class="container mx-auto flex items-center justify-between">
		<h2 class="font-normal">플랜더스의 개</h2>
		<nav class="flex gap-4">
			<TheButton size="md">저장</TheButton>
			<TheButton size="md">공유</TheButton>
		</nav>
	</header>
</main>
