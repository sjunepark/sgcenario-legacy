import { writable } from "svelte/store";

type SortedCharacters = string[];

function createCharactersStore(initialCharacters: SortedCharacters) {
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
		clearCharacters
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
	"영희",
	"맹구",
	"훈이",
	"둘리",
	"도우너",
	"또치",
	"고길동",
	"둘리",
	"도우너",
	"또치",
	"고길동",
	"둘리",
	"도우너",
	"또치",
	"고길동",
	"둘리",
	"도우너",
	"또치",
	"고길동",
	"둘리",
	"도우너",
	"또치",
	"고길동",
	"둘리",
	"도우너",
	"또치",
	"고길동",
	"둘리",
	"도우너",
	"또치",
	"고길동",
	"둘리",
	"도우너",
	"또치",
	"고길동"
];
export const characters = createCharactersStore(sampleCharacters);
