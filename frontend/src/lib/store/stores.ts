// DEV: For development purposes only
import { createSortedListStore } from "$lib/store/storeBuilders";
import type { ValueWithId } from "$lib/types";

// DEV: For development purposes only
export const sampleCharacters: ValueWithId[] = [
	{ id: "1", value: "세준" },
	{ id: "2", value: "슬기" },
	{ id: "3", value: "지수" },
	{ id: "4", value: "재현" },
	{ id: "5", value: "박혁거세" },
	{ id: "6", value: "이름이아주긴친구" },
	{ id: "7", value: "철수" },
	{ id: "8", value: "철심" },
	{ id: "9", value: "철부지" },
	{ id: "10", value: "철가" },
	{ id: "11", value: "철나" },
	{ id: "12", value: "철다" },
	{ id: "13", value: "철라" },
	{ id: "14", value: "철마" },
	{ id: "15", value: "철밥" },
	{ id: "16", value: "철밥통" },
	{ id: "17", value: "철밥통이" },
	{ id: "18", value: "철밥통이랑" },
	{ id: "19", value: "철밥통이랑놀자" },
	{ id: "20", value: "철밥통이랑놀자구" },
	{ id: "21", value: "철밥통이랑놀자구요" },
	{ id: "22", value: "철밥통이랑놀자구요오" },
	{ id: "23", value: "철바" },
	{ id: "24", value: "철사" },
	{ id: "25", value: "철아" },
	{ id: "26", value: "철자" },
	{ id: "27", value: "철칙" },
	{ id: "28", value: "철쭉" },
	{ id: "29", value: "철쭉이" },
	{ id: "30", value: "철쭉이랑" },
	{ id: "31", value: "철쭉이랑놀자" },
	{ id: "32", value: "영희" },
];
export const characters = createSortedListStore(sampleCharacters);
