import type { Block } from "$lib/components/blocks/blockTypes";
import { logger } from "$lib/utils/logger";
import { writable, type Readable } from "svelte/store";

type WritableBlocks = {
	addBlock: (blockToAdd: Block) => void;
	addBlocks: (blocksToAdd: Block[]) => void;
	removeBlock: (blockToRemove: Block) => void;
	removeBlocks: (blocksToRemove: Block[]) => void;
	clearBlocks: () => void;
	updateBlockById: (id: number, newBlock: Block) => void;
	updateBlocksByIds: (newBlocks: { id: number; newBlock: Block }[]) => void;
} & Readable<Block[]>;

export type WritableSortedBlocks = WritableBlocks;

export function createSortedBlocksStore(initialBlocks: Block[]): WritableSortedBlocks {
	const compare = (a: Block, b: Block) => {
		return a.id - b.id;
	};

	const blockExists = (blockToCheck: Block, blocks: Block[]) => {
		return blocks.some((block) => block.id === blockToCheck.id);
	};

	// Initialize
	const sortedInitialBlocks = [...initialBlocks].sort(compare);
	const { subscribe, set, update } = writable<Block[]>(sortedInitialBlocks);

	const addBlock = (blockToAdd: Block) => {
		update((originalBlocks) => {
			if (blockExists(blockToAdd, originalBlocks)) {
				logger.error(blockToAdd, "Block already exists");
				return originalBlocks;
			}

			originalBlocks.push(blockToAdd);
			originalBlocks.sort(compare);
			return originalBlocks;
		});
	};

	const addBlocks = (blocksToAdd: Block[]) => {
		for (const block of blocksToAdd) {
			addBlock(block);
		}
	};

	const removeBlock = (blockToRemove: Block) => {
		update((originalBlocks) => {
			if (!blockExists(blockToRemove, originalBlocks)) {
				logger.info(blockToRemove, "Block does not exist");
				return originalBlocks;
			}

			originalBlocks.filter((originalBlock) => {
				return compare(originalBlock, blockToRemove) === 0;
			});
			return originalBlocks;
		});
	};

	const removeBlocks = (blocks: Block[]) => {
		for (const block of blocks) {
			removeBlock(block);
		}
	};

	const updateBlockById = (id: number, newBlock: Block) => {
		update((originalBlocks) => {
			const index = originalBlocks.findIndex((block) => block.id === id);
			if (index === -1) {
				logger.error(id, "Block for this id does not exist");
				return originalBlocks;
			}
			originalBlocks[index] = newBlock;
			logger.info(originalBlocks[index], "Updated block");
			return originalBlocks;
		});
	};

	const updateBlocksByIds = (newBlocks: { id: number; newBlock: Block }[]) => {
		for (const { id, newBlock } of newBlocks) {
			updateBlockById(id, newBlock);
		}
	};

	const clearBlocks = () => {
		set([]);
	};

	return {
		subscribe,
		addBlock,
		addBlocks,
		removeBlock,
		removeBlocks,
		clearBlocks,
		updateBlockById,
		updateBlocksByIds,
	};
}
