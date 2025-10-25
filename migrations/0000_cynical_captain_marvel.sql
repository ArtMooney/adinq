CREATE TABLE `medarbetare` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`title` text,
	`phone` text,
	`email` text,
	`photo` text,
	`department` text,
	`sort_order` integer,
	`adjustx` real,
	`adjusty` real,
	`zoom` real,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `mediaproduktioner` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`q-card-link` text,
	`screenshot` text,
	`filmtyp` text,
	`sort_order` integer,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`reset_id` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);