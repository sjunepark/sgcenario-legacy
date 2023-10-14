import { dev } from "$app/environment";
import { libsqlClient } from "$lib/server/db/turso";
import { libsql } from "@lucia-auth/adapter-sqlite";
import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";

import {
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	KAKAO_CLIENT_ID,
	KAKAO_CLIENT_SECRET,
} from "$env/static/private";
import { github, kakao } from "@lucia-auth/oauth/providers";

export const auth = lucia({
	env: dev ? "DEV" : "PROD",
	middleware: sveltekit(),
	adapter: libsql(libsqlClient, {
		user: "user",
		session: "user_session",
		key: "user_key",
	}),
	getUserAttributes: (user) => {
		return {
			userName: user.user_name,
			email: user.email,
		};
	},
});

export const githubAuth = github(auth, {
	clientId: GITHUB_CLIENT_ID,
	clientSecret: GITHUB_CLIENT_SECRET,
});

export const kakaoAuth = kakao(auth, {
	clientId: KAKAO_CLIENT_ID,
	clientSecret: KAKAO_CLIENT_SECRET,
	redirectUri: "http://localhost:5173/login/kakao/callback",
});

export type Auth = typeof auth;
