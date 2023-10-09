-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `users` (
	`id` integer PRIMARY KEY
);
--> statement-breakpoint
CREATE TABLE `emails` (
	`user_id` integer,
	`email` text
);

*/