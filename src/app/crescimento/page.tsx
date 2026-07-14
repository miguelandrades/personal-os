import { db } from '@/db';
import { goals, sessions } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
export default async function Growth() {
  const [active, logs] = await Promise.all([
    db.select().from(goals).where(eq(goals.status, 'active')),
    db.select().from(sessions).orderBy(desc(sessions.day)).limit(12),
  ]);
  return (
    <main className="grid">
      <h2>Crescimento</h2>
      <section className="card">
        <h3>Objetivos ativos</h3>
        <ul className="list">
          {active.map((g) => (
            <li key={g.id}>
              <b>{g.title}</b>
              <br />
              <span className="muted">Próxima ação: {g.nextAction || 'Definir'}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="card">
        <h3>Sessões recentes</h3>
        <ul className="list">
          {logs.map((x) => (
            <li key={x.id}>
              <span className="pill">{x.track}</span> {x.minutes} min{' '}
              <span className="muted">— {x.day}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
