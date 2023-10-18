export type ValueWithId = {
	id: number;
	value: string;
};

export function isValueWithId(obj: unknown): obj is ValueWithId {
	return typeof obj === "object" && obj !== null && "id" in obj && "value" in obj;
}

export function compareValueWithId(a: ValueWithId, b: ValueWithId): number {
	return a.value.localeCompare(b.value, "ko-KR", { sensitivity: "base" });
}
export function compareDefault(a: unknown, b: unknown): number {
	return String(a).localeCompare(String(b), "ko-KR", { sensitivity: "base" });
}

export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends Record<string, unknown> ? DeepPartial<T[P]> : T[P];
};
//
// export type DeepPartial<Thing> = Thing extends Function
// 	? Thing
// 	: Thing extends Array<infer InferredArrayMember>
// 	? DeepPartialArray<InferredArrayMember>
// 	: Thing extends object
// 	? DeepPartialObject<Thing>
// 	: Thing | undefined;
//
// interface DeepPartialArray<Thing> extends Array<DeepPartial<Thing>> {}
//
// type DeepPartialObject<Thing> = {
// 	[Key in keyof Thing]?: DeepPartial<Thing[Key]>;
// };
