interface IconProps {
  name: string;
  size?: number;
  filled?: boolean;
  className?: string;
}

export function Icon({ name, size = 20, filled = false, className = '' }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined icon ${className}`}
      aria-hidden="true"
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'opsz' ${Math.min(Math.max(size, 20), 48)}`,
      }}
    >
      {name}
    </span>
  );
}
