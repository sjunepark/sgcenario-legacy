import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";
dotenv.config();

export default {
	schema: "./src/lib/server/db/schema.ts",
	out: "./drizzle",
	driver: "turso",
	dbCredentials: {
		url: process.env.TURSO_SCRIPTS_URL ?? "",
		authToken: process.env.TURSO_SCRIPTS_AUTH ?? "",
	},
} satisfies Config;
