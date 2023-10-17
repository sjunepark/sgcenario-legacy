import type { ComponentType } from "svelte";
import TextAction from "./TextAction.svelte";
import TextCharacter from "./TextCharacter.svelte";
import TextH2 from "./TextH2.svelte";
import TextLine from "./TextLine.svelte";
import TextScene from "./TextScene.svelte";
import TextTransition from "./TransitionText.svelte";

export type TextBlockType = "h2" | "scene" | "action" | "character" | "line" | "transition";

export type Block = {
	type: TextBlockType;
	index: number;
};

export const textBlockComponents: { type: TextBlockType; component: ComponentType }[] = [
	{ type: "h2", component: TextH2 },
	{ type: "scene", component: TextScene },
	{ type: "action", component: TextAction },
	{ type: "character", component: TextCharacter },
	{ type: "line", component: TextLine },
	{ type: "transition", component: TextTransition },
];
