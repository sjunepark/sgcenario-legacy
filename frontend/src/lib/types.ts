export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends Record<string, unknown> ? DeepPartial<T[P]> : T[P];
};

export type ValueWithId = {
	id: string;
	value: string;
};

export function compareValueWithId(a: ValueWithId, b: ValueWithId): number {
	return a.value.localeCompare(b.value, "ko-KR", { sensitivity: "base" });
}
