<script lang="ts">
	import type { RadioMenuGroupProps } from "$lib/meltTypes.js";

	export let radioItem: RadioMenuGroupProps["elements"]["radioItem"];
	export let isChecked: RadioMenuGroupProps["helpers"]["isChecked"];
	export let name: string = "";
</script>

<button
	{...$radioItem({ value: name })}
	use:radioItem
	class="flex items-center gap-x-3 text-gray-900 outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-0 focus-visible:ring-offset-stone-50
	${isChecked && 'bg-yellow-500'}"
>
	<slot twClass="h-6 w-6 stroke-1 text-gray-700" />
</button>
