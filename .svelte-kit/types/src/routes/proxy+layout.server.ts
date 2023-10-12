// @ts-nocheck
import type { LayoutServerLoad } from "./$types";

// noinspection JSUnusedGlobalSymbols
export const load = async ({ url, locals }: Parameters<LayoutServerLoad>[0]) => {
	const session = await locals.auth.validate();
	return { pathname: url.pathname, user: session?.user };
};
