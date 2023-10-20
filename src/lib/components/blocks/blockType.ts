export type BlockType = "h2" | "scene" | "action" | "dialogue" | "transition";

export type Block = {
	id: number;
	type: BlockType;
	character: string;
	text: string;
};
