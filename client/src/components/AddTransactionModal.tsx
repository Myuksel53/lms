import { useState, type FormEvent } from 'react';
import type { Account, Category, Transaction, TxKind } from '../data/types';
import { TODAY } from '../lib/dates';
import { parseTRY } from '../lib/money';
import { Modal } from './Modal';

interface AddTransactionModalProps {
  initialKind: TxKind;
  categories: Category[];
  accounts: Account[];
  onSave: (tx: Omit<Transaction, 'id'>) => void;
  onClose: () => void;
}

type Errors = Partial<Record<'amount' | 'description' | 'date', string>>;

export function AddTransactionModal({ initialKind, categories, accounts, onSave, onClose }: AddTransactionModalProps) {
  const [kind, setKind] = useState<TxKind>(initialKind);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(TODAY);
  const kindCategories = categories.filter((c) => c.kind === kind);
  const [categoryId, setCategoryId] = useState(kindCategories[0]?.id ?? '');
  const [accountId, setAccountId] = useState(initialKind === 'gelir' ? 'vadesiz' : 'kart');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const switchKind = (next: TxKind) => {
    setKind(next);
    setCategoryId(categories.find((c) => c.kind === next)?.id ?? '');
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    const parsed = parseTRY(amount);
    if (!parsed.ok) next.amount = parsed.error;
    if (!date) next.date = 'Tarih seçin.';
    else if (date > TODAY) next.date = 'İleri tarihli kayıt eklenemez.';
    if (kind === 'gider' && description.trim() === '') next.description = 'Harcamayı kısaca açıklayın.';
    setErrors(next);
    if (Object.keys(next).length > 0 || !parsed.ok) return;

    const category = categories.find((c) => c.id === categoryId);
    onSave({
      kind,
      amount: parsed.value,
      date,
      categoryId,
      accountId,
      description: description.trim() || category?.name || '',
    });
  };

  const verb = kind === 'gider' ? 'Gider' : 'Gelir';

  return (
    <Modal title={`${verb} ekle`} onClose={onClose}>
      <form className="form" onSubmit={submit} noValidate>
        <div className="segmented" role="radiogroup" aria-label="İşlem türü">
          {(['gider', 'gelir'] as const).map((k) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={kind === k}
              className={`segmented__option segmented__option--${k}`}
              onClick={() => switchKind(k)}
            >
              {k === 'gider' ? 'Gider' : 'Gelir'}
            </button>
          ))}
        </div>

        <div className={`field field--amount ${errors.amount ? 'field--error' : ''}`}>
          <label htmlFor="tx-amount">Tutar</label>
          <div className="amount-input">
            <input
              id="tx-amount"
              inputMode="decimal"
              autoComplete="off"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              aria-invalid={Boolean(errors.amount)}
              aria-describedby={errors.amount ? 'tx-amount-error' : undefined}
            />
            <span className="amount-input__suffix">₺</span>
          </div>
          {errors.amount && <p id="tx-amount-error" className="field__error">{errors.amount}</p>}
        </div>

        <div className="form__row">
          <div className={`field ${errors.date ? 'field--error' : ''}`}>
            <label htmlFor="tx-date">Tarih</label>
            <input
              id="tx-date"
              type="date"
              value={date}
              max={TODAY}
              onChange={(e) => setDate(e.target.value)}
              aria-invalid={Boolean(errors.date)}
              aria-describedby={errors.date ? 'tx-date-error' : undefined}
            />
            {errors.date && <p id="tx-date-error" className="field__error">{errors.date}</p>}
          </div>
          <div className="field">
            <label htmlFor="tx-category">{kind === 'gider' ? 'Kategori' : 'Kaynak'}</label>
            <select id="tx-category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              {kindCategories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="tx-account">{kind === 'gider' ? 'Ödeme yöntemi' : 'Yatırılan hesap'}</label>
          <select id="tx-account" value={accountId} onChange={(e) => setAccountId(e.target.value)}>
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>{a.name} ({a.institution})</option>
            ))}
          </select>
        </div>

        <div className={`field ${errors.description ? 'field--error' : ''}`}>
          <label htmlFor="tx-desc">
            Açıklama {kind === 'gelir' && <span className="field__optional">(isteğe bağlı)</span>}
          </label>
          <input
            id="tx-desc"
            placeholder={kind === 'gider' ? 'Örn. Migros haftalık alışveriş' : 'Örn. Ekim maaşı'}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={80}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? 'tx-desc-error' : undefined}
          />
          {errors.description && <p id="tx-desc-error" className="field__error">{errors.description}</p>}
        </div>

        <footer className="form__actions">
          <button type="button" className="btn btn--outline" onClick={onClose}>Vazgeç</button>
          <button type="submit" className={`btn ${kind === 'gider' ? 'btn--primary' : 'btn--navy'}`}>
            {verb}i kaydet
          </button>
        </footer>
      </form>
    </Modal>
  );
}
