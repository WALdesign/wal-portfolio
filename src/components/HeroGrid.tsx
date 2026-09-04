import type { CSSProperties } from 'react'

const COLS = 33
const ROWS = 14
const VIEW_W = 1040
const VIEW_H = 560
const MARGIN_L = 40
const MARGIN_B = 48
const GRID_BOTTOM = VIEW_H - MARGIN_B
const COL_GAP = (VIEW_W - MARGIN_L) / COLS
const ROW_GAP = GRID_BOTTOM / ROWS

const DIAGONALS = [
  { angle: '45°', x: 190, y2: 40, labelX: 150 },
  { angle: '60°', x: 560, y2: 60, labelX: 520 },
  { angle: '30°', x: 860, y2: 140, labelX: 820 },
]

interface HeroGridProps {
  opacity?: number
  showGuides?: boolean
  showRowLabels?: boolean
  strokeColor?: string
  className?: string
  style?: CSSProperties
}

export default function HeroGrid({
  opacity = 0.5,
  showGuides = true,
  showRowLabels = true,
  strokeColor = 'var(--color-border)',
  className,
  style,
}: HeroGridProps) {
  const columnIndexes = Array.from({ length: COLS }, (_, i) => i + 1)
  const rowIndexes = Array.from({ length: ROWS }, (_, i) => i + 1)

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity,
        ...style,
      }}
    >
      {columnIndexes.map((i) => (
        <line
          key={`col-${i}`}
          x1={MARGIN_L + i * COL_GAP}
          y1={0}
          x2={MARGIN_L + i * COL_GAP}
          y2={GRID_BOTTOM}
          stroke={strokeColor}
          strokeWidth={1}
        />
      ))}

      {rowIndexes.map((i) => (
        <line
          key={`row-${i}`}
          x1={MARGIN_L}
          y1={i * ROW_GAP}
          x2={VIEW_W}
          y2={i * ROW_GAP}
          stroke={strokeColor}
          strokeWidth={1}
        />
      ))}

      {showGuides && (
        <>
          {/* diagonales largas en X, esquina a esquina, como en el mat de corte */}
          <line
            x1={MARGIN_L}
            y1={GRID_BOTTOM}
            x2={VIEW_W}
            y2={0}
            stroke={strokeColor}
            strokeWidth={1}
          />
          <line
            x1={MARGIN_L}
            y1={0}
            x2={VIEW_W}
            y2={GRID_BOTTOM}
            stroke={strokeColor}
            strokeWidth={1}
          />

          {/* línea diagonal punteada */}
          <line
            x1={MARGIN_L + COL_GAP * 3}
            y1={GRID_BOTTOM}
            x2={MARGIN_L + COL_GAP * 20}
            y2={0}
            stroke={strokeColor}
            strokeWidth={1}
            strokeDasharray="6 6"
          />

          {/* arcos curvos, como las guías de radio del mat */}
          <path
            d={`M ${MARGIN_L} ${GRID_BOTTOM - 140} A 140 140 0 0 1 ${MARGIN_L + 140} ${GRID_BOTTOM}`}
            fill="none"
            stroke={strokeColor}
            strokeWidth={1}
          />
          <path
            d={`M ${VIEW_W - 340} ${GRID_BOTTOM} A 340 340 0 0 1 ${VIEW_W} ${GRID_BOTTOM - 340}`}
            fill="none"
            stroke={strokeColor}
            strokeWidth={1}
          />

          {DIAGONALS.map((d) => (
            <g key={d.angle}>
              <line
                x1={d.x}
                y1={GRID_BOTTOM}
                x2={d.x - 220}
                y2={d.y2}
                stroke={strokeColor}
                strokeWidth={1}
              />
              <text
                x={d.labelX}
                y={VIEW_H - 6}
                fill="var(--color-muted-2)"
                fontSize={11}
                fontFamily="var(--font-primary)"
              >
                {d.angle}
              </text>
            </g>
          ))}

          {showRowLabels &&
            rowIndexes.map((i) => (
              <text
                key={`row-label-${i}`}
                x={12}
                y={i * ROW_GAP + 4}
                fill="var(--color-muted-2)"
                fontSize={10}
                fontFamily="var(--font-primary)"
              >
                {String(i).padStart(2, '0')}
              </text>
            ))}

          {Array.from({ length: COLS }, (_, i) => i).map((i) => (
            <text
              key={`col-label-${i}`}
              x={MARGIN_L + i * COL_GAP + 3}
              y={VIEW_H - MARGIN_B + 16}
              fill="var(--color-muted-2)"
              fontSize={10}
              fontFamily="var(--font-primary)"
            >
              {String(i + 1).padStart(2, '0')}
            </text>
          ))}
        </>
      )}
    </svg>
  )
}
