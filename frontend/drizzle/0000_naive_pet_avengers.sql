CREATE TABLE `scripts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user` integer NOT NULL,
	`seq` real,
	`content` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`adjusted_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`user`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `scripts_seq_unique` ON `scripts` (`seq`);