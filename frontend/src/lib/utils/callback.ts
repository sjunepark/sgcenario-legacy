/**
 * A callback function that takes an array of arguments of type `T` and returns `void`.
 * @template T The types of the arguments that the callback function takes.
 */
export type Callback<T extends unknown[] = unknown[]> = (...args: T) => void;

/**
 * Executes an array of callback functions with the same arguments.
 * @template T The types of the arguments that the callback functions take.
 * @param callbacks array of callback functions to execute.
 * @returns A new function that executes all original callback functions with the same arguments.
 */
export function executeCallbacks<T extends unknown[]>(
	...callbacks: Array<Callback<T>>
): (...args: T) => void {
	return (...args) => {
		for (const callback of callbacks) {
			callback(...args);
		}
	};
}

/**
 * A no operation function (does nothing)
 */
export function noop() {
	//
}
