import { auth, githubAuth } from "$lib/server/lucia";
import { logger } from "$lib/utils/logger";
import { OAuthRequestError } from "@lucia-auth/oauth";
import type { RequestHandler } from "@sveltejs/kit";
import { createCallbackResponse } from "../../utils";

export const GET: RequestHandler = async ({ url, cookies, locals }) => {
	const storedState = cookies.get("github_oauth_state");
	const state = url.searchParams.get("state");
	const code = url.searchParams.get("code");
	logger.trace({ url: { code } }, "Starting callback");

	// validate state
	if (!storedState || !state || storedState !== state || !code) {
		logger.debug({ storedState, state, code }, "Invalid state or code");
		return new Response(null, {
			status: 400,
		});
	}
	try {
		const { getExistingUser, githubUser, createUser } = await githubAuth.validateCallback(code);
		const getOrCreateUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) {
				logger.trace({ existingUser }, "Found existing user");
				return existingUser;
			}

			const createdUser = await createUser({
				attributes: {
					user_name: githubUser.login,
					email: githubUser.email,
				},
			});

			logger.trace({ createdUser }, "Created new user");
			return createdUser;
		};

		const user = await getOrCreateUser();
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {},
		});

		return createCallbackResponse(user, session, locals);
	} catch (e) {
		if (e instanceof OAuthRequestError) {
			logger.error(e, "OAuth request error");
			return new Response(null, {
				status: 400,
			});
		}
		logger.error(e, "Unexpected error");
		return new Response(null, {
			status: 500,
		});
	}
};
