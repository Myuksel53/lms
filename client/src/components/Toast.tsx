import { useEffect } from 'react';
import { Icon } from './Icon';

interface ToastProps {
  message: string | null;
  onDone: () => void;
}

export function Toast({ message, onDone }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(onDone, 3200);
    return () => window.clearTimeout(timer);
  }, [message, onDone]);

  return (
    <div className="toast-region" role="status" aria-live="polite">
      {message && (
        <div className="toast">
          <Icon name="check_circle" size={18} filled />
          {message}
        </div>
      )}
    </div>
  );
}
