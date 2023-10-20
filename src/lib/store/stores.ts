// DEV: For development purposes only
import type { Block, BlockType } from "$lib/components/blocks/blockType";
import { createSortedListStore } from "$lib/store/sortedListStore";
import { writable } from "svelte/store";

// DEV: For development purposes only
const sampleBlocks: Block[] = [
	{
		id: 0,
		type: "h2",
		character: "",
		text: "Act 1",
	},
	{
		id: 1,
		type: "scene",
		character: "",
		text: "서울의 한복판, 번화가에 위치한 카페의 내부. 밖은 비가 오고 있다.",
	},
	{
		id: 2,
		type: "action",
		character: "",
		text: "John은 급하게 문을 열고 들어온다. 그의 옷은 비에 젖어 있다.",
	},
	{
		id: 3,
		type: "dialogue",
		character: "John",
		text: "Here, out of all places! I never thought I'd return.",
	},
	{
		id: 4,
		type: "action",
		character: "",
		text: "미아는 조용히 자리에서 일어나 John을 바라본다.",
	},
	{
		id: 5,
		type: "dialogue",
		character: "미아",
		text: "여기서 무엇을 찾으러 온 거야, John?",
	},
	{
		id: 6,
		type: "dialogue",
		character: "John",
		text: "I'm not sure myself, 미아. But something pulled me back.",
	},
	{
		id: 7,
		type: "action",
		character: "",
		text: "그들은 서로를 오랫동안 바라보다가, 밖에서 천둥소리가 들려온다.",
	},
	{
		id: 8,
		type: "dialogue",
		character: "미아",
		text: "Maybe what you're looking for isn't a place or person, but peace, John.",
	},
	{
		id: 9,
		type: "dialogue",
		character: "John",
		text: "혹시 맞을지도 몰라, 미아.",
	},
	{
		id: 10,
		type: "transition",
		character: "",
		text: "카페의 분위기는 긴장되며, 밖의 비는 점점 더 거세진다.",
	},
	{
		id: 11,
		type: "scene",
		character: "",
		text: "A small, cramped apartment in Seoul. Old photos are scattered everywhere.",
	},
	{
		id: 12,
		type: "action",
		character: "",
		text: "John은 사진들을 주워보며 과거를 회상한다.",
	},
	{
		id: 13,
		type: "dialogue",
		character: "John",
		text: "These photos, 이들은 모두 나의 과거의 일부분이야.",
	},
	{
		id: 14,
		type: "action",
		character: "",
		text: "미아가 문을 조심스럽게 두드리며 들어선다.",
	},
	{
		id: 15,
		type: "dialogue",
		character: "미아",
		text: "과거는 과거일 뿐이야, John. 우리는 현재를 살아가고 있어.",
	},
	{
		id: 16,
		type: "dialogue",
		character: "John",
		text: "I know, 미아. But sometimes, the past holds the keys to our present.",
	},
	{
		id: 17,
		type: "transition",
		character: "",
		text: "John은 미아의 손을 잡으며, 함께 사진들을 바라본다.",
	},
	// ... additional script lines would follow
];

export const blocks = createSortedListStore<Block>(sampleBlocks, "id", "id");

export const currentType = writable<BlockType>("dialogue");
