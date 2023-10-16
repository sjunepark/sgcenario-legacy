import { logger } from "$lib/utils/logger";
import type { Session, User } from "lucia";

export const createCallbackResponse = (user: User, session: Session, locals: App.Locals) => {
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
};
