import { createFloatingActions, type ComputeConfig } from "svelte-floating-ui";

export function createAutocomplete(floatingConfig: ComputeConfig | undefined) {
	const [referenceAction, floatingAction] = createFloatingActions(floatingConfig);

	return {
		referenceAction,
		floatingAction,
	};
}
