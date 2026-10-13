import { useState, type FormEvent } from 'react';
import { Icon } from '../components/Icon';
import { MetricTile } from '../components/MetricTile';
import { Modal } from '../components/Modal';
import { Panel } from '../components/Panel';
import { ProgressBar } from '../components/ProgressBar';
import { StatusChip } from '../components/StatusChip';
import type { AppData } from '../data/appData';
import type { Goal, Kurus } from '../data/types';
import { formatDate, TODAY } from '../lib/dates';
import { formatTRY, parseTRY, percent } from '../lib/money';
import { goalProgress, type GoalProgress } from '../lib/selectors';

interface GoalsProps {
  data: AppData;
  onContribute: (goalId: string, amount: Kurus) => void;
  onCreate: (goal: Omit<Goal, 'id'>) => void;
}

function GoalStatus({ g }: { g: GoalProgress }) {
  if (g.done) return <StatusChip tone="positive" dot>Tamamlandı</StatusChip>;
  if (g.monthsLeft <= 4 && g.progress < 75) return <StatusChip tone="warning" dot>Geride</StatusChip>;
  return <StatusChip tone="info" dot>Yolunda</StatusChip>;
}

function ContributeForm({ goal, onSave }: { goal: Goal; onSave: (amount: Kurus) => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = parseTRY(value);
    if (!parsed.ok) {
      setError(parsed.error);
      return;
    }
    onSave(parsed.value);
    setValue('');
    setError('');
  };

  return (
    <form className="contribute" onSubmit={submit} noValidate>
      <label htmlFor={`contrib-${goal.id}`} className="visually-hidden">{goal.name} için eklenecek tutar</label>
      <div className="amount-input amount-input--sm">
        <input
          id={`contrib-${goal.id}`}
          inputMode="decimal"
          placeholder="Tutar"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `contrib-${goal.id}-error` : undefined}
        />
        <span className="amount-input__suffix">₺</span>
      </div>
      <button type="submit" className="btn btn--gold btn--sm">Para ekle</button>
      {error && <p id={`contrib-${goal.id}-error`} className="field__error">{error}</p>}
    </form>
  );
}

function NewGoalModal({ onSave, onClose }: { onSave: (g: Omit<Goal, 'id'>) => void; onClose: () => void }) {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    const parsed = parseTRY(target);
    if (!name.trim()) next.name = 'Hedefe bir ad verin.';
    if (!parsed.ok) next.target = parsed.error;
    if (!deadline) next.deadline = 'Hedef tarihi seçin.';
    else if (deadline <= TODAY) next.deadline = 'Hedef tarihi bugünden sonra olmalı.';
    setErrors(next);
    if (Object.keys(next).length || !parsed.ok) return;
    onSave({ name: name.trim(), target: parsed.value, saved: 0, deadline, icon: 'flag' });
  };

  return (
    <Modal title="Yeni hedef oluştur" onClose={onClose}>
      <form className="form" onSubmit={submit} noValidate>
        <div className={`field ${errors.name ? 'field--error' : ''}`}>
          <label htmlFor="goal-name">Hedef adı</label>
          <input id="goal-name" placeholder="Örn. Ehliyet kursu" value={name} maxLength={60}
            onChange={(e) => setName(e.target.value)} aria-invalid={Boolean(errors.name)} />
          {errors.name && <p className="field__error">{errors.name}</p>}
        </div>
        <div className="form__row">
          <div className={`field ${errors.target ? 'field--error' : ''}`}>
            <label htmlFor="goal-target">Hedef tutar</label>
            <div className="amount-input">
              <input id="goal-target" inputMode="decimal" placeholder="0,00" value={target}
                onChange={(e) => setTarget(e.target.value)} aria-invalid={Boolean(errors.target)} />
              <span className="amount-input__suffix">₺</span>
            </div>
            {errors.target && <p className="field__error">{errors.target}</p>}
          </div>
          <div className={`field ${errors.deadline ? 'field--error' : ''}`}>
            <label htmlFor="goal-deadline">Hedef tarih</label>
            <input id="goal-deadline" type="date" min={TODAY} value={deadline}
              onChange={(e) => setDeadline(e.target.value)} aria-invalid={Boolean(errors.deadline)} />
            {errors.deadline && <p className="field__error">{errors.deadline}</p>}
          </div>
        </div>
        <footer className="form__actions">
          <button type="button" className="btn btn--outline" onClick={onClose}>Vazgeç</button>
          <button type="submit" className="btn btn--primary">Hedefi oluştur</button>
        </footer>
      </form>
    </Modal>
  );
}

export function Goals({ data, onContribute, onCreate }: GoalsProps) {
  const [creating, setCreating] = useState(false);
  const stats = data.goals.map((g) => goalProgress(g, TODAY));
  const saved = data.goals.reduce((s, g) => s + g.saved, 0);
  const target = data.goals.reduce((s, g) => s + g.target, 0);
  const monthly = stats.filter((g) => !g.done).reduce((s, g) => s + g.monthlyNeeded, 0);

  return (
    <div className="wrap stack">
      <section className="metrics metrics--three" aria-label="Hedef özeti">
        <MetricTile accent="gold" label="Biriken toplam" icon="savings" value={formatTRY(saved)}
          note={<span className="delta">Hedeflerin %{percent(saved, target)} kadarı</span>} />
        <MetricTile accent="navy" label="Kalan tutar" icon="flag" value={formatTRY(Math.max(target - saved, 0))}
          note={<span className="delta">{stats.filter((g) => !g.done).length} açık hedef</span>} />
        <MetricTile accent="emerald" label="Aylık ayırman gereken" icon="event_repeat" value={formatTRY(monthly)}
          note={<span className="delta">Tüm hedeflere zamanında yetişmek için</span>} />
      </section>

      <Panel
        title="Birikim hedeflerim"
        description="Her hedefin ilerlemesi ve hedef tarihe yetişmek için gereken aylık tutar"
        actions={
          <button type="button" className="btn btn--primary btn--sm" onClick={() => setCreating(true)}>
            <Icon name="add" size={18} />
            Yeni hedef
          </button>
        }
      >
        {stats.length === 0 ? (
          <div className="empty">
            <Icon name="flag" size={28} />
            <p>Henüz hedef yok. Biriktirmek istediğin bir şey için ilk hedefini oluştur.</p>
          </div>
        ) : (
          <ul className="goals">
            {stats.map((g) => (
              <li key={g.goal.id} className={`goal ${g.done ? 'goal--done' : ''}`}>
                <div className="goal__head">
                  <span className="goal__icon"><Icon name={g.goal.icon} size={22} /></span>
                  <div className="goal__titles">
                    <h3 className="goal__name">{g.goal.name}</h3>
                    <p className="goal__deadline">Hedef tarih: {formatDate(g.goal.deadline)}</p>
                  </div>
                  <GoalStatus g={g} />
                </div>

                <div className="goal__progress">
                  <span className="goal__pct">%{g.progress}</span>
                  <span className="goal__amounts">{formatTRY(g.goal.saved)} / {formatTRY(g.goal.target)}</span>
                </div>
                <ProgressBar value={g.progress} state="goal" label={`${g.goal.name} ilerlemesi`} />

                <dl className="goal__facts">
                  <div><dt>Kalan</dt><dd>{formatTRY(g.remaining)}</dd></div>
                  <div>
                    <dt>Aylık gereken</dt>
                    <dd>{g.done ? '—' : `${formatTRY(g.monthlyNeeded)} × ${g.monthsLeft} ay`}</dd>
                  </div>
                </dl>

                {!g.done && <ContributeForm goal={g.goal} onSave={(amount) => onContribute(g.goal.id, amount)} />}
              </li>
            ))}
          </ul>
        )}
      </Panel>

      {creating && (
        <NewGoalModal
          onClose={() => setCreating(false)}
          onSave={(goal) => {
            onCreate(goal);
            setCreating(false);
          }}
        />
      )}
    </div>
  );
}
