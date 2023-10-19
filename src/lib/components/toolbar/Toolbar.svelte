<script lang="ts">
	import { createToolbar } from "../../../../../melt-ui";
	import {
		ArrowLeftRight,
		Clapperboard,
		Heading1,
		Heading2,
		type IconEvents,
		type IconProps,
		Image,
		MessageCircle,
	} from "lucide-svelte";
	import type { ComponentType, SvelteComponent } from "svelte";

	const {
		elements: { root },
		builders: { createToolbarGroup },
	} = createToolbar({
		orientation: "vertical",
	});
	const {
		elements: { group: typeGroup, item: typeItem },
	} = createToolbarGroup({
		type: "single",
	});

	const types: {
		name: string;
		label: string;
		icon: ComponentType<SvelteComponent<IconProps, IconEvents, Record<string, never>>>;
	}[] = [
		{ name: "dialogue", label: "Dialogue", icon: Clapperboard },
		{ name: "action", label: "Action", icon: MessageCircle },
		{ name: "scene", label: "Scene", icon: Image },
		{ name: "transition", label: "Transition", icon: ArrowLeftRight },
		{ name: "title", label: "Heading 1", icon: Heading1 },
		{ name: "subtitle", label: "Heading 2", icon: Heading2 },
	];
</script>

<div
	{...$root}
	use:root
	class="flex rounded-full bg-white/90 px-3 font-medium shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur"
>
	<div class="flex flex-row gap-x-6" {...$typeGroup} use:typeGroup>
		{#each types as { name, label, icon }, i (i)}
			<button
				{...$typeItem(name)}
				use:typeItem
				class="flex items-center gap-x-3 p-3 text-gray-900 outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-0 focus-visible:ring-offset-stone-50"
			>
				<svelte:component this="{icon}" class="h-9 w-9 stroke-1 text-gray-700" />
			</button>
			{label}
		{/each}
	</div>
</div>
