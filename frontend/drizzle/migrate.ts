import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
dotenv.config();

const client = createClient({
	url: process.env.TURSO_SCRIPTS_URL ?? "",
	authToken: process.env.TURSO_SCRIPTS_AUTH ?? "",
});

const db = drizzle(client);

async function main() {
	try {
		await migrate(db, {
			migrationsFolder: "drizzle",
		});
		console.log("Tables migrated");
		process.exit(0);
	} catch (e) {
		console.error("Error performing migration: ", e);
		process.exit(1);
	}
}

await main();
