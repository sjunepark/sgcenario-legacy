CREATE TABLE `scripts` (
	`id` integer PRIMARY KEY NOT NULL,
	`user` text NOT NULL,
	`index` real,
	`content` text,
	`created_at` integer NOT NULL,
	`adjusted_at` integer NOT NULL,
	FOREIGN KEY (`user`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `scripts_index_unique` ON `scripts` (`index`);