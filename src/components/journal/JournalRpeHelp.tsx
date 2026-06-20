export function JournalRpeHelp() {
  return (
    <details className="journal-rpe-help">
      <summary className="journal-rpe-help__summary">Что такое RPE?</summary>
      <div className="journal-rpe-help__body">
        <p>
          <strong>RPE</strong> (Rate of Perceived Exertion) — субъективная оценка, насколько тяжёлым
          был подход. В журнале шкала <strong>6–10</strong>: чем выше число, тем меньше запас до
          отказа.
        </p>
        <ul className="journal-rpe-help__scale">
          <li>
            <span>6</span> — легко, запас ~4+ повтора
          </li>
          <li>
            <span>7</span> — умеренно, запас ~3
          </li>
          <li>
            <span>8</span> — тяжело, запас ~2
          </li>
          <li>
            <span>9</span> — очень тяжело, запас ~1
          </li>
          <li>
            <span>10</span> — максимум, отказ
          </li>
        </ul>
        <p className="journal-rpe-help__note">
          RPE необязателен, но помогает сравнивать сессии: один вес может быть @7 в свежую неделю и
          @9 после накопленной усталости. e1RM на графике считается по весу и повторам, без RPE.
        </p>
      </div>
    </details>
  );
}
