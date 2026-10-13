import type { Account, AccountType, Kurus } from '../data/types';
import { formatTRY } from '../lib/money';
import { Icon } from './Icon';
import { StatusChip, type ChipTone } from './StatusChip';

const TYPE_META: Record<AccountType, { icon: string; label: string; tone: ChipTone; balanceLabel: string }> = {
  banka: { icon: 'account_balance', label: 'Vadesiz', tone: 'positive', balanceLabel: 'Kullanılabilir bakiye' },
  nakit: { icon: 'payments', label: 'Nakit', tone: 'neutral', balanceLabel: 'Eldeki nakit' },
  kart: { icon: 'credit_card', label: 'Kredi kartı', tone: 'info', balanceLabel: 'Dönem borcu' },
  birikim: { icon: 'savings', label: 'Hedeflere bağlı', tone: 'warning', balanceLabel: 'Birikmiş tutar' },
};

interface AccountCardsProps {
  accounts: Array<{ account: Account; balance: Kurus }>;
  onShowTransactions: (accountId: string) => void;
}

export function AccountCards({ accounts, onShowTransactions }: AccountCardsProps) {
  return (
    <ul className="accounts">
      {accounts.map(({ account, balance }) => {
        const meta = TYPE_META[account.type];
        const isDebt = account.type === 'kart';
        return (
          <li key={account.id} className={`account account--${account.type}`}>
            <div className="account__head">
              <span className="account__icon">
                <Icon name={meta.icon} size={22} />
              </span>
              <div className="account__titles">
                <h3 className="account__name">{account.name}</h3>
                <p className="account__inst">{account.institution}</p>
              </div>
              <StatusChip tone={meta.tone}>{meta.label}</StatusChip>
            </div>
            <div className="account__balance">
              <span className="account__balance-label">{meta.balanceLabel}</span>
              <span className={`account__amount ${isDebt ? 'amount--negative' : ''}`}>
                {isDebt ? formatTRY(Math.abs(balance)) : formatTRY(balance)}
              </span>
              <span className="account__detail">{account.detail}</span>
            </div>
            <div className="account__actions">
              <button type="button" className="link-button" onClick={() => onShowTransactions(account.id)}>
                Hareketleri gör
                <Icon name="chevron_right" size={18} />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
