<script lang="ts">
	import { createDropdownMenu } from "../../../../../../melt-ui";
	import {
		AlignJustify,
		ArrowLeftRight,
		Clapperboard,
		Heading1,
		Heading2,
		type IconEvents,
		type IconProps,
		Image,
		MessageCircle,
	} from "lucide-svelte";
	import { fly } from "svelte/transition";
	import TextTypeButton from "../toolbar/TextTypeButton.svelte";
	import type { ComponentType, SvelteComponent } from "svelte";

	const {
		elements: { trigger, menu },
		builders: { createMenuRadioGroup },
		states: { open },
	} = createDropdownMenu({
		forceVisible: true,
		preventScroll: false,
		portal: "#anchor",
	});

	const {
		elements: { radioGroup, radioItem },
		helpers: { isChecked },
	} = createMenuRadioGroup({
		// todo: fix
		defaultValue: "Hunter Johnston",
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

<button
	type="button"
	class="absolute left-0 top-40"
	{...$trigger}
	use:trigger
	aria-label="Update dimensions"
>
	<AlignJustify class="square-4" />
	<span class="sr-only">Open Popover</span>
</button>

{#if $open}
	<div {...$menu} use:menu transition:fly="{{ duration: 150, y: -10 }}">
		<div {...$radioGroup} use:radioGroup>
			{#each types as { name, label, icon }, i (i)}
				<TextTypeButton {name} {radioItem} {isChecked} let:twClass>
					<svelte:component this="{icon}" class="{twClass}" />
					{label}
				</TextTypeButton>
			{/each}
		</div>
	</div>
{/if}
