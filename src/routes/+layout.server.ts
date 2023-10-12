import type { LayoutServerLoad } from "./$types";

// noinspection JSUnusedGlobalSymbols
export const load: LayoutServerLoad = async ({ url, locals }) => {
  const session = await locals.auth.validate();
  return { pathname: url.pathname, user: session?.user };
};
