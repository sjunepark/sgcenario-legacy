import type { ReadableExtended } from "$lib/types";
import { writable } from "svelte/store";

export type SortedCharacters = string[];

function createCharactersStore(
	initialCharacters: SortedCharacters,
): ReadableExtended<SortedCharacters> {
	const sortedInitialCharacters = [...new Set(initialCharacters)].sort();
	const { subscribe, set, update } = writable<SortedCharacters>(sortedInitialCharacters);

	function addCharacter(character: string) {
		update((characters) => {
			if (characters.includes(character)) {
				return characters;
			}
			return [...characters, character].sort();
		});
	}

	function deleteCharacter(character: string) {
		update((characters) => characters.filter((c) => c !== character));
	}

	function clearCharacters() {
		set([]);
	}

	return {
		subscribe,
		addCharacter,
		deleteCharacter,
		clearCharacters,
	};
}

// DEV: For development purposes only
const sampleCharacters = [
	"세준",
	"슬기",
	"지수",
	"재현",
	"박혁거세",
	"이름이아주긴친구",
	"철수",
	"철심",
	"철부지",
	"철가",
	"철나",
	"철다",
	"철라",
	"철마",
	"철밥",
	"철밥통",
	"철밥통이",
	"철밥통이랑",
	"철밥통이랑놀자",
	"철밥통이랑놀자구",
	"철밥통이랑놀자구요",
	"철밥통이랑놀자구요오",
	"철바",
	"철사",
	"철아",
	"철자",
	"철칙",
	"철쭉",
	"철쭉이",
	"철쭉이랑",
	"철쭉이랑놀자",
	"영희",
	"맹구",
	"훈이",
	"둘리",
	"도우너",
	"또치",
	"고길동",
];
export const characters = createCharactersStore(sampleCharacters);
