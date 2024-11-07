CREATE TABLE IF NOT EXISTS "billing_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"clerk_user_id" text NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"credits" numeric(10, 2) NOT NULL,
	"paddle_transaction_id" varchar NOT NULL,
	"status" varchar NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "billing_history" ADD CONSTRAINT "billing_history_clerk_user_id_users_clerk_user_id_fk" FOREIGN KEY ("clerk_user_id") REFERENCES "public"."users"("clerk_user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
