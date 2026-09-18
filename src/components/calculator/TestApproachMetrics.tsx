import {EXERCISES} from '../../data/exercises';
import {PremiumInput} from '../ui/PremiumInput';

type ExerciseConfig = (typeof EXERCISES)[string];

interface TestApproachMetricsProps {
  isBodyWeightLift: boolean;
  config: ExerciseConfig;
  testWeight: string;
  setTestWeight: (value: string) => void;
  testBodyWeight: string;
  setTestBodyWeight: (value: string) => void;
  testExtraWeight: string;
  setTestExtraWeight: (value: string) => void;
  testReps: string;
  setTestReps: (value: string) => void;
}

export function TestApproachMetrics({
  isBodyWeightLift,
  config,
  testWeight,
  setTestWeight,
  testBodyWeight,
  setTestBodyWeight,
  testExtraWeight,
  setTestExtraWeight,
  testReps,
  setTestReps,
}: TestApproachMetricsProps) {
  return (
    <div className="calc-test__metrics">
      {isBodyWeightLift ? (
        <>
          <PremiumInput
            id="calc-body-weight"
            variant="stepper"
            label="Вес тела"
            type="number"
            inputMode="decimal"
            autoComplete="off"
            placeholder="80"
            unit="кг"
            step={config.step}
            value={testBodyWeight}
            onValueChange={setTestBodyWeight}
          />
          <PremiumInput
            id="calc-extra-weight"
            variant="stepper"
            label="Доп. вес"
            type="number"
            inputMode="decimal"
            autoComplete="off"
            placeholder="0"
            unit="кг"
            step={config.step}
            value={testExtraWeight}
            onValueChange={setTestExtraWeight}
          />
        </>
      ) : (
        <PremiumInput
          id="calc-weight"
          variant="stepper"
          label="Вес"
          type="number"
          inputMode="decimal"
          autoComplete="off"
          placeholder="80"
          unit="кг"
          step={config.step}
          value={testWeight}
          onValueChange={setTestWeight}
        />
      )}
      <PremiumInput
        id="calc-reps"
        variant="stepper"
        label="Повторений"
        type="number"
        inputMode="numeric"
        autoComplete="off"
        placeholder="6"
        step={1}
        value={testReps}
        onValueChange={setTestReps}
      />
    </div>
  );
}
