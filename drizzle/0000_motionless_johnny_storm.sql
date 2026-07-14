CREATE TABLE "daily_checkins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"day" date NOT NULL,
	"sleep_hours" real,
	"energy" integer,
	"mood" integer,
	"weight_kg" real,
	"wife_minutes" integer,
	"note" text,
	CONSTRAINT "daily_checkins_day_unique" UNIQUE("day")
);
--> statement-breakpoint
CREATE TABLE "goals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"title" text NOT NULL,
	"area" text NOT NULL,
	"horizon" text NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"due_date" date,
	"success_metric" text,
	"next_action" text
);
--> statement-breakpoint
CREATE TABLE "habit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"day" date NOT NULL,
	"habit" text NOT NULL,
	"level" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"day" date NOT NULL,
	"area" text NOT NULL,
	"track" text NOT NULL,
	"format" text NOT NULL,
	"minutes" integer NOT NULL,
	"outcome" text
);
--> statement-breakpoint
CREATE TABLE "workouts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"day" date NOT NULL,
	"modality" text NOT NULL,
	"duration_minutes" integer NOT NULL,
	"quality" integer,
	"focus" text,
	"learning" text
);
