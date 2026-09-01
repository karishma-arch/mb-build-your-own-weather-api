CREATE TABLE "location_Table" (
	"id" serial PRIMARY KEY,
	"user_id" integer NOT NULL,
	"location" text NOT NULL,
	"title" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "location_Table" ADD CONSTRAINT "location_Table_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");