'use client';

import { useState } from 'react';
import {
  addHabit,
  addSession,
  addWorkout,
  deleteHabit,
  deleteSession,
  deleteWorkout,
  saveCheckin,
  updateSession,
  updateWorkout,
} from '@/app/actions';

type Checkin =
  | {
      day: string;
      sleepHours: number | null;
      energy: number | null;
      mood: number | null;
      wifeMinutes: number | null;
      note: string | null;
    }
  | undefined;
type Session = {
  id: string;
  track: string;
  minutes: number;
  outcome: string | null;
};
type Workout = { id: string; modality: string; durationMinutes: number };
type Habit = { id: string; habit: string };

const tracks = [
  ['curso_dev', 'curso.dev'],
  ['vtex', 'VTEX IO'],
  ['react', 'React'],
  ['nextjs', 'Next.js'],
  ['english', 'Inglês'],
];
const modalities = [
  ['boxing', 'Boxe'],
  ['upper', 'Upper'],
  ['lower', 'Lower'],
];
const label = (value: string, items: string[][]) =>
  items.find(([key]) => key === value)?.[1] ?? value;

export function CheckinForm({ checkin }: { checkin: Checkin }) {
  return (
    <form action={saveCheckin} className="form">
      <input
        name="day"
        type="date"
        defaultValue={checkin?.day ?? new Date().toISOString().slice(0, 10)}
      />
      <input
        name="sleepHours"
        type="number"
        step="0.5"
        placeholder="Sono (horas)"
        defaultValue={checkin?.sleepHours ?? ''}
      />
      <select name="energy" defaultValue={checkin?.energy ?? ''}>
        <option value="">Energia</option>
        {[1, 2, 3, 4, 5].map((x) => (
          <option key={x} value={x}>
            {x}
          </option>
        ))}
      </select>
      <select name="mood" defaultValue={checkin?.mood ?? ''}>
        <option value="">Humor</option>
        {[1, 2, 3, 4, 5].map((x) => (
          <option key={x} value={x}>
            {x}
          </option>
        ))}
      </select>
      <input
        name="wifeMinutes"
        type="number"
        placeholder="Min. com esposa"
        defaultValue={checkin?.wifeMinutes ?? ''}
      />
      <input
        className="full"
        name="note"
        placeholder="Nota do dia"
        defaultValue={checkin?.note ?? ''}
      />
      <button className="full">{checkin ? 'Atualizar check-in' : 'Salvar check-in'}</button>
    </form>
  );
}

export function QuickActions() {
  return (
    <div className="grid quick-actions">
      <form action={addHabit} className="card form">
        <b>Hábito</b>
        <select name="habit">
          <option>Estudo</option>
          <option>Inglês</option>
          <option>Treino</option>
          <option>Água</option>
          <option>Vitaminas</option>
        </select>
        <button>Concluir</button>
      </form>
      <form action={addSession} className="card form">
        <b>Sessão</b>
        <select name="area">
          <option value="career">Carreira</option>
          <option value="english">Inglês</option>
        </select>
        <select name="track">
          {tracks.map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
        <input name="minutes" type="number" min="1" placeholder="Minutos" required />
        <button>Registrar</button>
      </form>
      <form action={addWorkout} className="card form">
        <b>Treino</b>
        <select name="modality">
          {modalities.map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
        <input name="duration" type="number" min="1" placeholder="Minutos" required />
        <button>Registrar</button>
      </form>
    </div>
  );
}

function Actions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <span className="record-actions">
      <button type="button" className="icon-button" onClick={onEdit} aria-label="Editar">
        Editar
      </button>
      <button
        type="button"
        className="icon-button danger-button"
        onClick={() => {
          if (confirm('Excluir este registro?')) onDelete();
        }}
        aria-label="Excluir"
      >
        Excluir
      </button>
    </span>
  );
}

export function TodayRecords({
  sessions,
  workouts,
  habits,
}: {
  sessions: Session[];
  workouts: Workout[];
  habits: Habit[];
}) {
  const [editing, setEditing] = useState<{
    type: 'session' | 'workout';
    item: Session | Workout;
  } | null>(null);
  const all = [
    ...sessions.map((item) => ({ type: 'session' as const, item })),
    ...workouts.map((item) => ({ type: 'workout' as const, item })),
  ];
  return (
    <section className="card">
      <h3>Registro de hoje</h3>
      {all.length === 0 && habits.length === 0 ? (
        <p className="muted">
          Seu dia ainda está aberto. Comece pelo check-in quando fizer sentido.
        </p>
      ) : (
        <ul className="list">
          {all.map(({ type, item }) => (
            <li key={item.id}>
              <span className="pill">
                {type === 'session'
                  ? label((item as Session).track, tracks)
                  : label((item as Workout).modality, modalities)}
              </span>
              <span>
                {type === 'session'
                  ? `${(item as Session).minutes} min`
                  : `${(item as Workout).durationMinutes} min`}
              </span>
              <Actions
                onEdit={() => setEditing({ type, item })}
                onDelete={() =>
                  type === 'session' ? deleteSession(item.id) : deleteWorkout(item.id)
                }
              />
            </li>
          ))}
          {habits.map((h) => (
            <li key={h.id}>
              <span className="pill">Hábito</span>
              <span>{h.habit}</span>
              <span className="record-actions">
                <button
                  type="button"
                  className="icon-button danger-button"
                  onClick={() => {
                    if (confirm(`Desfazer hábito: ${h.habit}?`)) deleteHabit(h.id);
                  }}
                >
                  Desfazer
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
      {editing && <EditDialog entry={editing} close={() => setEditing(null)} />}
    </section>
  );
}

function EditDialog({
  entry,
  close,
}: {
  entry: { type: 'session' | 'workout'; item: Session | Workout };
  close: () => void;
}) {
  const isSession = entry.type === 'session';
  const item = entry.item;
  return (
    <div className="dialog-backdrop" role="presentation">
      <div className="dialog" role="dialog" aria-modal="true">
        <div className="dialog-header">
          <h3>Editar {isSession ? 'sessão' : 'treino'}</h3>
          <button type="button" className="close-button" onClick={close}>
            ×
          </button>
        </div>
        {isSession ? (
          <form
            action={async (data) => {
              await updateSession(data);
              close();
            }}
            className="form"
          >
            <input type="hidden" name="id" value={item.id} />
            <select name="track" defaultValue={(item as Session).track}>
              {tracks.map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
            <input name="minutes" type="number" min="1" defaultValue={(item as Session).minutes} />
            <input
              className="full"
              name="outcome"
              placeholder="Resultado da sessão"
              defaultValue={(item as Session).outcome ?? ''}
            />
            <button className="full">Salvar alterações</button>
          </form>
        ) : (
          <form
            action={async (data) => {
              await updateWorkout(data);
              close();
            }}
            className="form"
          >
            <input type="hidden" name="id" value={item.id} />
            <select name="modality" defaultValue={(item as Workout).modality}>
              {modalities.map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
            <input
              name="duration"
              type="number"
              min="1"
              defaultValue={(item as Workout).durationMinutes}
            />
            <button className="full">Salvar alterações</button>
          </form>
        )}
      </div>
    </div>
  );
}
