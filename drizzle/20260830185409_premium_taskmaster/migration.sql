CREATE TABLE "password_reset" (
	"id" serial PRIMARY KEY,
	"user_id" integer NOT NULL,
	"otp" varchar(6) NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "accountType" varchar(50);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "country" varchar(100);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "countryCode" varchar(10);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "state" varchar(100);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone_number" varchar(30);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "occupation" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "address" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "dateofBirth" varchar(50);--> statement-breakpoint
ALTER TABLE "password_reset" ADD CONSTRAINT "password_reset_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");