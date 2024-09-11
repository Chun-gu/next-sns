import { useSyncExternalStore, useCallback } from "react";

export function useSyncLocalStorage<T>(
	key: string,
	initialValue: T,
): [T, (value: T) => void] {
	const subscribe = useCallback(
		(callback: () => void) => {
			function onStorageChange(event: StorageEvent) {
				if (event.key === key) callback();
			}

			window.addEventListener("storage", onStorageChange);

			return () => {
				window.removeEventListener("storage", onStorageChange);
			};
		},
		[key],
	);

	const getSnapshot = useCallback(() => {
		const item = localStorage.getItem(key);
		return item ? (JSON.parse(item) as T) : initialValue;
	}, [key, initialValue]);

	const setLocalStorageValue = useCallback(
		(value: T) => {
			localStorage.setItem(key, JSON.stringify(value));
			window.dispatchEvent(
				new StorageEvent("storage", { key, newValue: JSON.stringify(value) }),
			);
		},
		[key],
	);

	const value = useSyncExternalStore(subscribe, getSnapshot);

	return [value, setLocalStorageValue];
}
