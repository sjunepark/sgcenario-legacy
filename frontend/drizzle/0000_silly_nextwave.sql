CREATE TABLE `scripts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user` text NOT NULL,
	`seq` real,
	`content` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`adjusted_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `scripts_seq_unique` ON `scripts` (`seq`);