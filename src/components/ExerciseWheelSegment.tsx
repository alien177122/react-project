import type {KeyboardEvent} from 'react';
import type {SavedExercise} from '../types';
import {EXERCISES, SHORT_NAMES, TYPE_COLORS, TYPE_LABELS} from '../data/exercises';
import {donutArc, pol} from '../utils/geometry';

interface ExerciseWheelSegmentProps {
  exerciseKey: string;
  index: number;
  segmentDeg: number;
  gap: number;
  selectedKey: string;
  hoveredKey: string | null;
  saved?: SavedExercise;
  cx: number;
  cy: number;
  ro: number;
  ri: number;
  labelRadius: number;
  onHover: (key: string | null) => void;
  onPick: (key: string) => void;
}

export function ExerciseWheelSegment({
  exerciseKey,
  index,
  segmentDeg,
  gap,
  selectedKey,
  hoveredKey,
  saved,
  cx,
  cy,
  ro,
  ri,
  labelRadius,
  onHover,
  onPick,
}: ExerciseWheelSegmentProps) {
  const ex = EXERCISES[exerciseKey];
  const start = index * (segmentDeg + gap);
  const end = start + segmentDeg;
  const midDeg = (start + end) / 2;
  const isHovered = hoveredKey === exerciseKey;
  const isSelected = selectedKey === exerciseKey;
  const isMuted = hoveredKey && !isHovered;
  const color = TYPE_COLORS[ex.type];
  const [tx, ty] = pol(cx, cy, labelRadius, midDeg);
  const flip = midDeg > 90 && midDeg < 270;
  const rotation = flip ? midDeg + 180 : midDeg;

  const keyDown = (event: KeyboardEvent<SVGPathElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    onPick(exerciseKey);
  };

  return (
    <g>
      <path
        className="ew-segment"
        d={donutArc(cx, cy, isHovered ? ro + 5 : ro, ri, start, end)}
        fill={color}
        opacity={isMuted ? 0.2 : isSelected ? 0.95 : 0.7}
        stroke={isSelected || isHovered ? 'var(--ta-calc-accent, #ffb020)' : 'transparent'}
        strokeWidth={isSelected || isHovered ? 2 : 1}
        role="button"
        tabIndex={0}
        aria-label={`${ex.name}. ${TYPE_LABELS[ex.type]}`}
        aria-current={isSelected ? 'true' : undefined}
        onMouseEnter={() => onHover(exerciseKey)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(exerciseKey)}
        onBlur={() => onHover(null)}
        onTouchStart={() => onHover(isHovered ? null : exerciseKey)}
        onClick={() => onPick(exerciseKey)}
        onKeyDown={keyDown}
      />
      <text
        x={tx}
        y={ty}
        textAnchor="middle"
        dominantBaseline="central"
        transform={`rotate(${rotation},${tx},${ty})`}
        fill={isHovered || isSelected ? '#fff' : '#bbb'}
        fontFamily="Inter,sans-serif"
        fontSize={isHovered ? '12' : '11'}
        fontWeight={isHovered || isSelected ? '600' : '400'}
        style={{pointerEvents: 'none', transition: 'fill 0.15s'}}>
        {SHORT_NAMES[exerciseKey]}
      </text>
      {saved ? (
        <SavedOneRmLabel
          saved={saved}
          color={color}
          flip={flip}
          midDeg={midDeg}
          cx={cx}
          cy={cy}
          ro={ro}
        />
      ) : null}
    </g>
  );
}

function SavedOneRmLabel({
  saved,
  color,
  flip,
  midDeg,
  cx,
  cy,
  ro,
}: {
  saved: SavedExercise;
  color: string;
  flip: boolean;
  midDeg: number;
  cx: number;
  cy: number;
  ro: number;
}) {
  const [lx, ly] = pol(cx, cy, ro + 14, midDeg);
  const rotation = flip ? midDeg + 180 : midDeg;
  return (
    <text
      x={lx}
      y={ly}
      textAnchor="middle"
      dominantBaseline="central"
      transform={`rotate(${rotation},${lx},${ly})`}
      fill={color}
      fontFamily="'Courier New',monospace"
      fontSize="9"
      fontWeight="700"
      opacity="0.85"
      style={{pointerEvents: 'none'}}>
      {saved.oneRM}
    </text>
  );
}
