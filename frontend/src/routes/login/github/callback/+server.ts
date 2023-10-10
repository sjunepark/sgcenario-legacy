import { auth, githubAuth } from "$lib/server/lucia";
import { OAuthRequestError } from "@lucia-auth/oauth";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, cookies, locals }) => {
	const storedState = cookies.get("github_oauth_state");
	const state = url.searchParams.get("state");
	const code = url.searchParams.get("code");
	// validate state
	if (!storedState || !state || storedState !== state || !code) {
		console.log("Unmatched");
		return new Response(null, {
			status: 400,
		});
	}
	try {
		const { getExistingUser, githubUser, createUser } = await githubAuth.validateCallback(code);
		const getUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) {
				console.log("User exists, returning existing user: ", existingUser.userName);
				return existingUser;
			}
			console.log(`Create user with username ${githubUser.login} and email ${githubUser.email}`);
			return await createUser({
				attributes: {
					user_name: githubUser.login,
					email: githubUser.email,
				},
			});
		};

		const user = await getUser();
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {},
		});
		locals.auth.setSession(session);

		console.log("Return 302 and redirect to /");
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/",
			},
		});
	} catch (e) {
		if (e instanceof OAuthRequestError) {
			console.log("OAuthRequestError: ", e);
			// invalid code
			return new Response(null, {
				status: 400,
			});
		}
		console.log(`storedState: ${storedState}, urlState: ${state}, urlCode: ${code}`);
		console.log("Unknown error", e);
		return new Response(null, {
			status: 500,
		});
	}
};
