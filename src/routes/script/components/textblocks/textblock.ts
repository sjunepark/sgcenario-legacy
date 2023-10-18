export type TextBlock = "h2" | "scene" | "action" | "dialogue" | "transition";

export type Block = {
	type: TextBlock;
	index: number;
};
