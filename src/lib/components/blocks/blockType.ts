export type BlockType = "h2" | "scene" | "action" | "dialogue" | "transition";

export type Block = {
	index: number;
	type: BlockType;
	character: string;
	text: string;
};
