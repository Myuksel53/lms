import { useEffect, useRef, useState } from 'react';
import type { AppNotification } from '../data/types';
import { Icon } from './Icon';

export type PageId = 'overview' | 'transactions' | 'budget' | 'goals' | 'reports';

export const NAV_ITEMS: Array<{ id: PageId; label: string; icon: string }> = [
  { id: 'overview', label: 'Genel bakış', icon: 'space_dashboard' },
  { id: 'transactions', label: 'İşlemler', icon: 'receipt_long' },
  { id: 'budget', label: 'Bütçe', icon: 'donut_large' },
  { id: 'goals', label: 'Hedefler', icon: 'savings' },
  { id: 'reports', label: 'Raporlar', icon: 'bar_chart' },
];

interface AppHeaderProps {
  page: PageId;
  onNavigate: (page: PageId) => void;
  notifications: AppNotification[];
  profile: { name: string; initials: string };
}

const TONE_ICON: Record<AppNotification['tone'], string> = {
  asim: 'error',
  uyari: 'warning',
  bilgi: 'flag',
};

export function AppHeader({ page, onNavigate, notifications, profile }: AppHeaderProps) {
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!popoverRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  const unread = !read && notifications.length > 0;

  return (
    <header className="app-header">
      <div className="wrap app-header__bar">
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('overview');
          }}
        >
          <span className="brand__mark">
            <Icon name="savings" size={20} filled />
          </span>
          <span className="brand__text">
            <span className="brand__name">Kumbara</span>
            <span className="brand__tag">Kişisel bütçe</span>
          </span>
        </a>

        <nav className="main-nav" aria-label="Ana menü">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="main-nav__item"
              aria-current={page === item.id ? 'page' : undefined}
              onClick={() => onNavigate(item.id)}
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="app-header__tools">
          <div className="notify" ref={popoverRef}>
            <button
              type="button"
              className="icon-button"
              aria-label={`Bildirimler${unread ? `, ${notifications.length} yeni` : ''}`}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name="notifications" size={22} />
              {unread && <span className="notify__badge" aria-hidden="true" />}
            </button>
            {open && (
              <div className="notify__popover" role="dialog" aria-label="Bildirimler">
                <div className="notify__head">
                  <span className="notify__title">Bildirimler</span>
                  {notifications.length > 0 && (
                    <button type="button" className="link-button" onClick={() => setRead(true)}>
                      Tümünü okundu işaretle
                    </button>
                  )}
                </div>
                {notifications.length === 0 ? (
                  <p className="notify__empty">Bütçen ve hedeflerin yolunda. Yeni bildirim yok.</p>
                ) : (
                  <ul className="notify__list">
                    {notifications.map((n) => (
                      <li key={n.id} className={`notify__item notify__item--${n.tone}`} data-read={read}>
                        <Icon name={TONE_ICON[n.tone]} size={18} filled />
                        <div>
                          <p className="notify__item-title">{n.title}</p>
                          <p className="notify__item-body">{n.body}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className="user">
            <span className="user__avatar" aria-hidden="true">{profile.initials}</span>
            <span className="user__text">
              <span className="user__name">{profile.name}</span>
              <span className="user__role">Yerel profil</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
