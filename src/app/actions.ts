'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { dailyCheckins, habitLogs, sessions, workouts } from '@/db/schema';

const today = () => new Date().toISOString().slice(0, 10);
const refresh = () => {
  ['/', '/semana', '/crescimento', '/corpo'].forEach((path) => {
    revalidatePath(path);
  });
};

export async function saveCheckin(formData: FormData) {
  const day = String(formData.get('day') || today());
  const data = {
    day,
    sleepHours: Number(formData.get('sleepHours')) || null,
    energy: Number(formData.get('energy')) || null,
    mood: Number(formData.get('mood')) || null,
    wifeMinutes: Number(formData.get('wifeMinutes')) || null,
    note: String(formData.get('note') || '') || null,
  };
  await db
    .insert(dailyCheckins)
    .values(data)
    .onConflictDoUpdate({ target: dailyCheckins.day, set: data });
  refresh();
}

export async function addHabit(formData: FormData) {
  await db.insert(habitLogs).values({
    day: today(),
    habit: String(formData.get('habit')),
    level: 'ideal',
  });
  refresh();
}
export async function deleteHabit(id: string) {
  await db.delete(habitLogs).where(eq(habitLogs.id, id));
  refresh();
}

export async function addSession(formData: FormData) {
  await db.insert(sessions).values({
    day: today(),
    area: String(formData.get('area')),
    track: String(formData.get('track')),
    format: 'study',
    minutes: Number(formData.get('minutes')),
    outcome: String(formData.get('outcome') || '') || null,
  });
  refresh();
}
export async function updateSession(formData: FormData) {
  const id = String(formData.get('id'));
  await db
    .update(sessions)
    .set({
      track: String(formData.get('track')),
      minutes: Number(formData.get('minutes')),
      outcome: String(formData.get('outcome') || '') || null,
    })
    .where(eq(sessions.id, id));
  refresh();
}
export async function deleteSession(id: string) {
  await db.delete(sessions).where(eq(sessions.id, id));
  refresh();
}

export async function addWorkout(formData: FormData) {
  await db.insert(workouts).values({
    day: today(),
    modality: String(formData.get('modality')),
    durationMinutes: Number(formData.get('duration')),
    quality: 4,
  });
  refresh();
}
export async function updateWorkout(formData: FormData) {
  const id = String(formData.get('id'));
  await db
    .update(workouts)
    .set({
      modality: String(formData.get('modality')),
      durationMinutes: Number(formData.get('duration')),
    })
    .where(eq(workouts.id, id));
  refresh();
}
export async function deleteWorkout(id: string) {
  await db.delete(workouts).where(eq(workouts.id, id));
  refresh();
}
