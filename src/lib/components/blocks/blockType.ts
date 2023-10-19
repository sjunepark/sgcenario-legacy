export type BlockType = "h2" | "scene" | "action" | "dialogue" | "transition";

// Define specific types for Dialogue which requires a 'character' field.
type DialogueBlock = {
	index: number;
	type: "dialogue";
	character: string; // 'character' is required for 'dialogue'
	text: string;
};

// Define a GeneralBlock type for all other BlockTypes that don't require 'character'.
type GeneralBlock = {
	index: number;
	type: Exclude<BlockType, "dialogue">; // All BlockTypes except 'dialogue'.
	text: string;
};

// The Block type is now a union of DialogueBlock and GeneralBlock.
export type Block = DialogueBlock | GeneralBlock;
