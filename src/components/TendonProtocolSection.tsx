import {TENDON_PROTOCOL_CONCEPTS} from '../data/theory';
import {RevealTimeline, type TimelineNode} from './RevealTimeline';

const TENDON_NODES: TimelineNode[] = TENDON_PROTOCOL_CONCEPTS.map(c => ({
  id: c.id,
  title: c.title,
  definition: c.definition,
  pattern: c.pattern,
  bullets: [...c.bullets],
}));

/**
 * Tendons protocol as sequential textbook cards (definition → scheme → practice).
 * Why: thin bullet list hid the central cue — isometric hold 3–6 s under heavy load.
 */
export function TendonProtocolSection() {
  return (
    <RevealTimeline
      items={TENDON_NODES}
      asideEyebrow="Статическая работа"
      asideQuote="Тяжёлый вес + удержание 3–6 секунд в пике момента силы."
      asideNote="Изометрия на контролируемых 85–90% ПМ даёт сухожилию рабочую деформацию. Ориентир — качество удержания и TUT, не отказ."
    />
  );
}
