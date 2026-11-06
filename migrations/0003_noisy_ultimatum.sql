CREATE TABLE `politisk_reklam` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`rad2` text,
	`rad3` text,
	`rad4` text,
	`rad5` text,
	`rad6` text,
	`rad7` text,
	`rad8` text,
	`sort_order` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
