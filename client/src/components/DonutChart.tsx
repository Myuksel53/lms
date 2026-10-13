export interface DonutSegment {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  segments: DonutSegment[];
  centerLabel: string;
  centerValue: string;
  centerNote?: string;
  size?: number;
}

const STROKE = 22;
const GAP = 2; // segmentler arası boşluk (px, çevre üzerinde)

export function DonutChart({ segments, centerLabel, centerValue, centerNote, size = 220 }: DonutChartProps) {
  const radius = (size - STROKE) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((s, seg) => s + seg.value, 0);

  let offset = 0;
  const arcs = segments.map((seg) => {
    const length = total > 0 ? (seg.value / total) * circumference : 0;
    const arc = {
      ...seg,
      dash: Math.max(length - GAP, 0.5),
      offset,
    };
    offset += length;
    return arc;
  });

  const summary = segments.map((s) => `${s.label} ${Math.round((s.value / total) * 100)}%`).join(', ');

  return (
    <figure className="donut" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`${centerLabel}: ${centerValue}. ${summary}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--line-faint)"
          strokeWidth={STROKE}
        />
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {arcs.map((arc) => (
            <circle
              key={arc.id}
              className="donut__arc"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={arc.color}
              strokeWidth={STROKE}
              strokeDasharray={`${arc.dash} ${circumference - arc.dash}`}
              strokeDashoffset={-arc.offset}
            />
          ))}
        </g>
      </svg>
      <figcaption className="donut__center">
        <span className="donut__label">{centerLabel}</span>
        <span className="donut__value">{centerValue}</span>
        {centerNote && <span className="donut__note">{centerNote}</span>}
      </figcaption>
    </figure>
  );
}
