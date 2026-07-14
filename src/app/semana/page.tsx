import { db } from '@/db';
import { dailyCheckins, sessions, workouts, habitLogs } from '@/db/schema';
import { gte, sql } from 'drizzle-orm';
const since = new Date(Date.now() - 6 * 864e5).toISOString().slice(0, 10);
export default async function Week() {
  const [days, study, training, habits] = await Promise.all([
    db.select().from(dailyCheckins).where(gte(dailyCheckins.day, since)),
    db
      .select({ minutes: sql<number>`coalesce(sum(${sessions.minutes}),0)` })
      .from(sessions)
      .where(gte(sessions.day, since)),
    db
      .select({ count: sql<number>`count(*)` })
      .from(workouts)
      .where(gte(workouts.day, since)),
    db
      .select({ count: sql<number>`count(*)` })
      .from(habitLogs)
      .where(gte(habitLogs.day, since)),
  ]);
  const sleep = days.length
    ? (days.reduce((a, x) => a + (x.sleepHours || 0), 0) / days.length).toFixed(1)
    : '—';
  const score = Math.min(
    100,
    Math.round(
      (Number(study[0].minutes) / 180) * 35 +
        (Number(training[0].count) / 4) * 30 +
        (Number(habits[0].count) / 20) * 20 +
        (days.length / 7) * 15,
    ),
  );
  return (
    <main className="grid">
      <h2>Semana</h2>
      <section className="grid metrics">
        {[
          ['Score', score + '/100'],
          ['Sono médio', sleep + 'h'],
          ['Estudo', study[0].minutes + ' min'],
          ['Treinos', String(training[0].count)],
          ['Hábitos', String(habits[0].count)],
        ].map(([l, v]) => (
          <div className="card metric" key={l}>
            <span className="muted">{l}</span>
            <strong>{v}</strong>
          </div>
        ))}
      </section>
      <section className="card">
        <h3>Decisão</h3>
        <p className="muted">
          Se o sono médio estiver abaixo de 7 horas, reduza carga extra e proteja a rotina noturna
          antes de aumentar metas.
        </p>
        <div className="bar">
          <i style={{ width: `${score}%` }} />
        </div>
      </section>
    </main>
  );
}
