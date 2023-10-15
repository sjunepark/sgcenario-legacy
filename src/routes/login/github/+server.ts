import { dev } from "$app/environment";
import { githubAuth } from "$lib/server/lucia";
import { logger } from "$lib/utils/logger";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ cookies }) => {
    const [url, state] = await githubAuth.getAuthorizationUrl();
    logger.trace({ url, state }, "Got github auth url and state");
    cookies.set("github_oauth_state", state, {
        httpOnly: true,
        secure: !dev,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    const redirectUrl = url.toString();
    logger.trace(`Redirect to ${redirectUrl}`);
    return new Response(null, {
        status: 302,
        headers: {
            Location: redirectUrl,
        },
    });
};
