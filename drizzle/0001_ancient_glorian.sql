CREATE SCHEMA "script";
--> statement-breakpoint
ALTER TABLE business."scripts" RENAME COLUMN "script_id" TO "id";--> statement-breakpoint
ALTER TABLE business."user_keys" RENAME COLUMN "key_id" TO "id";--> statement-breakpoint
ALTER TABLE business."user_sessions" RENAME COLUMN "session_id" TO "id";--> statement-breakpoint
ALTER TABLE business."users" RENAME COLUMN "user_id" TO "id";--> statement-breakpoint
ALTER TABLE business."scripts" DROP CONSTRAINT "scripts_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE business."user_keys" DROP CONSTRAINT "user_keys_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE business."user_sessions" DROP CONSTRAINT "user_sessions_user_id_users_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE business."scripts" ADD CONSTRAINT "scripts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES business."users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE business."user_keys" ADD CONSTRAINT "user_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES business."users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE business."user_sessions" ADD CONSTRAINT "user_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES business."users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "scripts" SET SCHEMA business;
--> statement-breakpoint
ALTER TABLE "user_keys" SET SCHEMA business;
--> statement-breakpoint
ALTER TABLE "user_sessions" SET SCHEMA business;
--> statement-breakpoint
ALTER TABLE "users" SET SCHEMA business;
