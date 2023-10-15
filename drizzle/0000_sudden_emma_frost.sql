CREATE TABLE IF NOT EXISTS "scripts" (
	"script_id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_keys" (
	"key_id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"hashed_password" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_sessions" (
	"session_id" varchar(128) PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"active_expires" bigint NOT NULL,
	"idle_expires" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" varchar(15) PRIMARY KEY NOT NULL,
	"user_name" varchar(255),
	"email" varchar(255)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scripts" ADD CONSTRAINT "scripts_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE CASCADE ;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_keys" ADD CONSTRAINT "user_keys_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE CASCADE ;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE CASCADE ;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
