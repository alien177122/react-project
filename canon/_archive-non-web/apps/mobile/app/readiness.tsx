import { mockReadinessSnapshot } from '@/mocks/readiness';
import { ReadinessScreen } from '@/screens/ReadinessScreen';

export default function ReadinessRoute() {
  return <ReadinessScreen snapshot={mockReadinessSnapshot} />;
}
