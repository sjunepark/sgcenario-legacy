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
		orientation: "horizontal",
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
		{ name: "title", label: "Heading 1", icon: Heading1 },
		{ name: "subtitle", label: "Heading 2", icon: Heading2 },
		{ name: "dialogue", label: "Dialogue", icon: MessageCircle },
		{ name: "action", label: "Action", icon: Clapperboard },
		{ name: "scene", label: "Scene", icon: Image },
		{ name: "transition", label: "Transition", icon: ArrowLeftRight },
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
				class="relative m-1.5 flex flex-col items-center rounded-full p-1.5 outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-0 focus-visible:ring-offset-stone-50"
			>
				<svelte:component this="{icon}" class="h-9 w-9 stroke-1 text-gray-700" />
				<span class="absolute -bottom-8 whitespace-nowrap font-normal text-gray-700">
					{label}
				</span>
			</button>
		{/each}
	</div>
</div>
