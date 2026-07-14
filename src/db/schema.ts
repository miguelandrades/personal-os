import { pgTable, uuid, text, integer, real, boolean, timestamp, date } from 'drizzle-orm/pg-core';
const id = uuid('id').defaultRandom().primaryKey();
const createdAt = timestamp('created_at').defaultNow().notNull();
export const dailyCheckins = pgTable('daily_checkins', {
  id,
  createdAt,
  day: date('day').notNull().unique(),
  sleepHours: real('sleep_hours'),
  energy: integer('energy'),
  mood: integer('mood'),
  weightKg: real('weight_kg'),
  wifeMinutes: integer('wife_minutes'),
  note: text('note'),
});
export const habitLogs = pgTable('habit_logs', {
  id,
  createdAt,
  day: date('day').notNull(),
  habit: text('habit').notNull(),
  level: text('level').notNull(),
});
export const sessions = pgTable('sessions', {
  id,
  createdAt,
  day: date('day').notNull(),
  area: text('area').notNull(),
  track: text('track').notNull(),
  format: text('format').notNull(),
  minutes: integer('minutes').notNull(),
  outcome: text('outcome'),
});
export const workouts = pgTable('workouts', {
  id,
  createdAt,
  day: date('day').notNull(),
  modality: text('modality').notNull(),
  durationMinutes: integer('duration_minutes').notNull(),
  quality: integer('quality'),
  focus: text('focus'),
  learning: text('learning'),
});
export const goals = pgTable('goals', {
  id,
  createdAt,
  title: text('title').notNull(),
  area: text('area').notNull(),
  horizon: text('horizon').notNull(),
  status: text('status').notNull().default('active'),
  dueDate: date('due_date'),
  successMetric: text('success_metric'),
  nextAction: text('next_action'),
});
