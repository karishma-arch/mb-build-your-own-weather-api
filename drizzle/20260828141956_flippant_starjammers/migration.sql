ALTER TABLE "users" RENAME COLUMN "age" TO "password";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE text USING "password"::text;