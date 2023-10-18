<script lang="ts">
	import { createToolbar } from "@melt-ui/svelte";
	import {
		ArrowLeftRight,
		Clapperboard,
		Heading1,
		Heading2,
		MessageCircle,
		Image,
		type IconEvents,
		type IconProps,
	} from "lucide-svelte";
	import type { ComponentType, SvelteComponent } from "svelte";
	import TextTypeButton from "./TextTypeButton.svelte";

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
	class="absolute top-0 bg-white p-6 shadow-xl shadow-gray-700/10 ring-1 ring-gray-900/5"
>
	<div class="flex flex-col gap-y-6" {...$typeGroup} use:typeGroup>
		{#each types as { name, label, icon }, i (i)}
			<TextTypeButton {name} item="{typeItem}" let:twClass>
				<svelte:component this="{icon}" class="{twClass}" />
				{label}
			</TextTypeButton>
		{/each}
	</div>
</div>
