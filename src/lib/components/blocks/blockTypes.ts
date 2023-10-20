import {
	ArrowLeftRight,
	Clapperboard,
	Heading1,
	Heading2,
	Image,
	MessageCircle,
	type IconEvents,
	type IconProps,
} from "lucide-svelte";
import type { ComponentType, SvelteComponent } from "svelte";

export type BlockType = "h2" | "scene" | "action" | "dialogue" | "transition";

export type Block = {
	id: number;
	type: BlockType;
	character: string;
	text: string;
};
export const blockTypes: {
	type: BlockType;
	name: string;
	label: string;
	icon: ComponentType<SvelteComponent<IconProps, IconEvents, Record<string, never>>>;
	keyCode: string;
}[] = [
	{ type: "h2", name: "title", label: "Heading 1", icon: Heading1, keyCode: "Digit1" },
	{ type: "h2", name: "subtitle", label: "Heading 2", icon: Heading2, keyCode: "Digit2" },
	{
		type: "dialogue",
		name: "dialogue",
		label: "Dialogue",
		icon: MessageCircle,
		keyCode: "Digit3",
	},
	{ type: "action", name: "action", label: "Action", icon: Clapperboard, keyCode: "Digit4" },
	{ type: "scene", name: "scene", label: "Scene", icon: Image, keyCode: "Digit5" },
	{
		type: "transition",
		name: "transition",
		label: "Transition",
		icon: ArrowLeftRight,
		keyCode: "Digit6",
	},
];
