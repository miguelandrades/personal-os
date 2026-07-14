import { db } from '@/db';
import { workouts, dailyCheckins } from '@/db/schema';
import { desc } from 'drizzle-orm';
export default async function Body() {
  const [training, days] = await Promise.all([
    db.select().from(workouts).orderBy(desc(workouts.day)).limit(12),
    db.select().from(dailyCheckins).orderBy(desc(dailyCheckins.day)).limit(7),
  ]);
  return (
    <main className="grid">
      <h2>Corpo</h2>
      <section className="card">
        <h3>Recuperação recente</h3>
        <ul className="list">
          {days.map((d) => (
            <li key={d.id}>
              {d.day}{' '}
              <span className="muted">
                sono {d.sleepHours ?? '—'}h · energia {d.energy ?? '—'}/5
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section className="card">
        <h3>Treinos recentes</h3>
        <ul className="list">
          {training.map((t) => (
            <li key={t.id}>
              <span className="pill">{t.modality}</span> {t.durationMinutes} min{' '}
              <span className="muted">— {t.day}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
