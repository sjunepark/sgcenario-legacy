export function addEventListeners(
	target: Window | Document | EventTarget,
	event: string[],
	handler: EventListenerOrEventListenerObject,
	options?: boolean | AddEventListenerOptions,
) {
	const events = Array.isArray(event) ? event : [event];

	// Add the event listener to each specified event for the target element(s).
	events.forEach((_event) => target.addEventListener(_event, handler, options));

	// Return a function that removes the event listener from the target element(s).
	return () => {
		events.forEach((_event) => target.removeEventListener(_event, handler, options));
	};
}
