import {HeroSection} from '../ui/HeroSection';

interface LoadingViewProps {
  message: string;
}

export function LoadingView({message}: LoadingViewProps) {
  return (
    <>
      <HeroSection
        className="app-hero"
        label="Тренировочный калькулятор"
        title="ПЕРИОДИЗАЦИЯ RPE–RIR"
        subtitle=""
      />
      <div className="app-status" role="status" aria-live="polite">
        {message}
      </div>
    </>
  );
}
