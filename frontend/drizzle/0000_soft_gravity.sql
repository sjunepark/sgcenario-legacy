CREATE TABLE `scripts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user` text NOT NULL,
	`seq` real,
	`content` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`adjusted_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` numeric PRIMARY KEY NOT NULL,
	`user_name` text NOT NULL,
	`email` text
);
--> statement-breakpoint
CREATE TABLE `user_key` (
	`id` numeric PRIMARY KEY NOT NULL,
	`user_id` numeric NOT NULL,
	`hashed_password` numeric,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE cascade ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_session` (
	`id` numeric PRIMARY KEY NOT NULL,
	`user_id` numeric NOT NULL,
	`active_expires` integer NOT NULL,
	`idle_expires` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE cascade ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `scripts_seq_unique` ON `scripts` (`seq`);