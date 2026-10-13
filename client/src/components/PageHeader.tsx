import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  actions?: ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="page-head">
      <div className="wrap page-head__inner">
        <div>
          <h1 className="page-head__title">{title}</h1>
          <p className="page-head__subtitle">{subtitle}</p>
        </div>
        {actions && <div className="page-head__actions">{actions}</div>}
      </div>
    </div>
  );
}
