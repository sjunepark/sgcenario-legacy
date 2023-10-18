<script lang="ts">
	import type { ToolbarProps } from "$lib/meltTypes.js";

	export let item: ReturnType<ToolbarProps["builders"]["createToolbarGroup"]>["elements"]["item"];
	export let name: string = "";
</script>

<button
	{...$item(name)}
	use:item
	class="flex items-center gap-x-3 text-gray-900 outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-0 focus-visible:ring-offset-stone-50"
>
	<slot twClass="h-6 w-6 stroke-1 text-gray-700" />
</button>
