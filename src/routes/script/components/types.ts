export type BlockType = "h2" | "scene" | "action" | "dialogue" | "transition";

export type Block = {
  type: BlockType;
  index: number;
} & BlockContent;

export type BlockContent = {
  character?: string;
  text: string;
};
