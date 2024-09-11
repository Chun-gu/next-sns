export type PickPartial<T, K extends keyof T> = Omit<T, K> &
	Partial<Pick<T, K>>;

export type KeysOfValue<Obj extends object, Value> = {
	[Key in keyof Obj]: Obj[Key] extends Value ? Key : never;
}[keyof Obj];

export function isKeyOf<Obj extends object>(
	obj: Obj,
	key: PropertyKey,
): key is keyof Obj {
	return key in obj;
}

export type Entries<Obj extends object> = {
	[Key in keyof Obj]: [Key, Obj[Key]];
}[keyof Obj][];

type Entry<T> = [keyof T, T[keyof T]];

export function objectEntries<T extends object>(obj: T): Entry<T>[] {
	return (Object.keys(obj) as Array<keyof T>).map((key) => [
		key,
		obj[key],
	]) as Entry<T>[];
}
