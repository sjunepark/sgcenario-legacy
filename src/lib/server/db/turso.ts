import { TURSO_SCRIPTS_AUTH, TURSO_SCRIPTS_URL } from "$env/static/private";
import { createClient } from "@libsql/client/http";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

export const libsqlClient = createClient({
  url: TURSO_SCRIPTS_URL,
  authToken: TURSO_SCRIPTS_AUTH,
});
export const db = drizzle(libsqlClient, { logger: true, schema });
