CREATE TABLE `kundutlatanden` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`text` text,
	`att` text,
	`logo` text,
	`link` text,
	`sort_order` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `prisexempel` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`monthly` text,
	`total` text,
	`details` text,
	`sort_order` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_medarbetare` (
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
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_medarbetare`("id", "name", "title", "phone", "email", "photo", "department", "sort_order", "adjustx", "adjusty", "zoom", "created_at", "updated_at") SELECT "id", "name", "title", "phone", "email", "photo", "department", "sort_order", "adjustx", "adjusty", "zoom", "created_at", "updated_at" FROM `medarbetare`;--> statement-breakpoint
DROP TABLE `medarbetare`;--> statement-breakpoint
ALTER TABLE `__new_medarbetare` RENAME TO `medarbetare`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_mediaproduktioner` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`q-card-link` text,
	`screenshot` text,
	`filmtyp` text,
	`sort_order` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_mediaproduktioner`("id", "title", "q-card-link", "screenshot", "filmtyp", "sort_order", "created_at", "updated_at") SELECT "id", "title", "q-card-link", "screenshot", "filmtyp", "sort_order", "created_at", "updated_at" FROM `mediaproduktioner`;--> statement-breakpoint
DROP TABLE `mediaproduktioner`;--> statement-breakpoint
ALTER TABLE `__new_mediaproduktioner` RENAME TO `mediaproduktioner`;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`reset_id` text
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "created_at", "updated_at", "email", "password", "reset_id") SELECT "id", "created_at", "updated_at", "email", "password", "reset_id" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);