import { auth, kakaoAuth } from "$lib/server/lucia";
import { logger } from "$lib/utils/logger";
import { OAuthRequestError } from "@lucia-auth/oauth";
import type { RequestHandler } from "@sveltejs/kit";

// todo: remove duplicate code and add provider to db
export const GET: RequestHandler = async ({ url, cookies, locals }) => {
	const storedState = cookies.get("kakao_oauth_state");
	const state = url.searchParams.get("state");
	const code = url.searchParams.get("code");
	// validate state
	if (!storedState || !state || storedState !== state || !code) {
		logger.debug({ storedState, state, code }, "Invalid state or code");
		return new Response(null, {
			status: 400,
		});
	}
	try {
		const { getExistingUser, kakaoUser, createUser } = await kakaoAuth.validateCallback(code);
		const getUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) {
				logger.trace({ existingUser }, "Found existing user");
				return existingUser;
			}

			const createdUser = await createUser({
				attributes: {
					user_name: kakaoUser.kakao_account?.name || null,
					email: kakaoUser.kakao_account?.email || null,
				},
			});
			logger.trace({ createdUser }, "Created new user");
			return createdUser;
		};

		const user = await getUser();
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {},
		});
		locals.auth.setSession(session);
		logger.trace({ user, session }, "Logged in and set session");

		const redirectUrl = "/";
		logger.trace(`Redirect to ${redirectUrl}`);
		return new Response(null, {
			status: 302,
			headers: {
				Location: redirectUrl,
			},
		});
	} catch (e) {
		if (e instanceof OAuthRequestError) {
			logger.error({ e }, "OAuth request error");
			return new Response(null, {
				status: 400,
			});
		}
		logger.error({ e }, "Unexpected error");
		return new Response(null, {
			status: 500,
		});
	}
};
