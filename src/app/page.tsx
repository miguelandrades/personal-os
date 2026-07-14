import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { dailyCheckins, habitLogs, sessions, workouts } from '@/db/schema';
import { CheckinForm, QuickActions, TodayRecords } from '@/components/forms';

const day = new Date().toISOString().slice(0, 10);

export default async function Home() {
  const [checkin, habits, study, training] = await Promise.all([
    db.query.dailyCheckins.findFirst({ where: eq(dailyCheckins.day, day) }),
    db.select().from(habitLogs).where(eq(habitLogs.day, day)),
    db.select().from(sessions).where(eq(sessions.day, day)),
    db.select().from(workouts).where(eq(workouts.day, day)),
  ]);
  return (
    <main className="grid">
      <section>
        <p className="muted">
          {new Intl.DateTimeFormat('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          }).format(new Date())}
        </p>
        <h2>Hoje</h2>
        <p className="muted">Foco único: escolha uma ação que mova sua carreira ou curso.dev.</p>
      </section>
      <section className="grid metrics">
        <div className="card metric">
          <span className="muted">Sono</span>
          <strong>{checkin?.sleepHours ? `${checkin.sleepHours}h` : '—'}</strong>
        </div>
        <div className="card metric">
          <span className="muted">Energia</span>
          <strong>{checkin?.energy ? `${checkin.energy}/5` : '—'}</strong>
        </div>
        <div className="card metric">
          <span className="muted">Hábitos</span>
          <strong>{habits.length}</strong>
        </div>
        <div className="card metric">
          <span className="muted">Treinos</span>
          <strong>{training.length}</strong>
        </div>
      </section>
      <section className="card">
        <h3>Check-in diário</h3>
        <CheckinForm checkin={checkin} />
      </section>
      <QuickActions />
      <TodayRecords sessions={study} workouts={training} habits={habits} />
    </main>
  );
}
