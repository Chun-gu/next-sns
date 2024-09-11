// import { useEffect, useState } from "react";

// export function useDebounce<Fn extends (...args:any)=>ReturnType<Fn>>(fn: Fn, ms: number):ReturnType<Fn> {
// 	const [value, setValue] = useState<any>();

// 	useEffect(() => {
// 		const timeoutId = setTimeout(() => fn(), ms);

// 		return () => {
// 			clearTimeout(timeoutId);
// 		};
// 	}, []);

// }

// import {useCallback, useRef} from 'react';

// export function useDebounce ()  {
//   const schedule = useRef<NodeJS.Timer>();

//  return useCallback(
//     <T extends (...args: any[]) => void>(callback: T, delay: number) =>
//       (...args: Parameters<T>) => {
//         clearTimeout(schedule.current);
//         schedule.current = setTimeout(() => callback(...args), delay);
//       },
//     [],
//   );
// };

// import { useState, useEffect, useCallback, useRef } from "react";

// export function useDebounce<T extends (...args: any) => ReturnType<T>>(
// 	callback: T,
// 	delay: number,
// ) {
// 	const timeoutIdRef = useRef<any>();

// 	return useCallback(
// 		(...args: Parameters<T>) => {
// 			const latter = () => {
// 				clearTimeout(timeoutIdRef.current);
// 				callback(...args);
// 			};
// 			clearTimeout(timeoutIdRef.current);
// 			timeoutIdRef.current = setTimeout(latter, delay);
// 		},
// 		[callback, delay],
// 	);
// }
import { useCallback, useRef } from "react";

export function useDebounce<T extends (...args: any) => ReturnType<T>>(
	callback: T,
	delay: number,
) {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const debouncedCallback = useCallback(
		(...args: Parameters<T>) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay],
	);

	return debouncedCallback;
}
