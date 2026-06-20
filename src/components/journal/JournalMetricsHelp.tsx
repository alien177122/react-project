export function JournalMetricsHelp() {
  return (
    <details className="journal-metrics-help">
      <summary className="journal-metrics-help__summary">Как считаются метрики</summary>
      <div className="journal-metrics-help__body">
        <p>
          <strong>e1RM · линия</strong> — оценка одноповторного максимума по формуле{' '}
          <strong>Epley</strong>: вес × (1 + повторы ÷ 30). В сессии берётся{' '}
          <strong>лучший подход</strong> (максимальный e1RM среди записанных сетов). Линия — по
          последним 8 записям упражнения, слева направо по дате. RPE в расчёт не входит.
        </p>
        <p>
          <strong>Объём · столбцы</strong> — сумма <strong>кг×повторы</strong> по всем подходам
          сессии (тоннаж). Высота столбца — доля от самой объёмной сессии на графике; это не счётчик
          повторов.
        </p>
        <p className="journal-metrics-help__note">
          «За 4 нед» сравнивает пик e1RM последней даты с записью ~4 недели назад в той же истории.
        </p>
      </div>
    </details>
  );
}
