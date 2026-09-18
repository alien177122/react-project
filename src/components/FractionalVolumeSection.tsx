import {useId, useState} from 'react';
import {FRACTIONAL_VOLUME_GUIDE} from '../data/theory';

type LensId = (typeof FRACTIONAL_VOLUME_GUIDE.lenses)[number]['id'];

/**
 * Theory 01 volume block: definitions → rule → Сила/Гипертрофия lens → practice → dose.
 */
export function FractionalVolumeSection() {
  const guide = FRACTIONAL_VOLUME_GUIDE;
  const tabsId = useId();
  const [lensId, setLensId] = useState<LensId>('hypertrophy');
  const lens = guide.lenses.find(item => item.id === lensId) ?? guide.lenses[0];

  return (
    <section className="ta-frac" aria-labelledby="ta-frac-title">
      <header className="ta-frac__glossary">
        <p className="ta-frac__eyebrow">{guide.eyebrow}</p>
        <h3 id="ta-frac-title" className="ta-frac__terms-title">
          {guide.termsTitle}
        </h3>
        <p className="ta-frac__prose">{guide.termsIntro}</p>
        <dl className="ta-frac__terms" aria-label="Определения">
          {guide.terms.map(term => (
            <div key={term.id} className="ta-frac__term">
              <dt className="ta-frac__term-name">{term.name}</dt>
              <dd className="ta-frac__term-body">
                <span className="ta-frac__term-value">{term.value}</span>
                <span className="ta-frac__term-note">{term.note}</span>
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="ta-frac__section">
        <h4 className="ta-frac__block-title">{guide.overviewTitle}</h4>
        {guide.overview.map((paragraph, index) => (
          <p key={`overview-${index}`} className="ta-frac__prose">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="ta-frac__hero">
        <p className="ta-frac__figure" aria-label={guide.figureLabel}>
          {guide.figure}
        </p>
        <h4 className="ta-frac__title">{guide.title}</h4>
        <p className="ta-frac__prose ta-frac__prose--center">{guide.lede}</p>
      </div>

      <div className="ta-frac__section">
        <h4 className="ta-frac__block-title">{guide.countingTitle}</h4>
        <ul className="ta-frac__rule-list">
          {guide.counting.map(item => (
            <li key={item.id} className="ta-frac__rule">
              <p className="ta-frac__rule-title">{item.title}</p>
              <p className="ta-frac__prose ta-frac__prose--on-elev">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="ta-frac__section" aria-labelledby={`${tabsId}-try`}>
        <h4 id={`${tabsId}-try`} className="ta-frac__block-title">
          {guide.tryTitle}
        </h4>
        <p className="ta-frac__prose">{guide.tryIntro}</p>

        <div className="ta-frac__lens-tabs" role="tablist" aria-label="Цель подсчёта">
          {guide.lenses.map(item => {
            const selected = item.id === lens.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`${tabsId}-${item.id}`}
                aria-selected={selected}
                aria-controls={`${tabsId}-panel`}
                tabIndex={selected ? 0 : -1}
                className={`ta-frac__lens-tab${selected ? ' is-active' : ''}`}
                onClick={() => setLensId(item.id)}>
                {item.label}
              </button>
            );
          })}
        </div>

        <div
          className="ta-frac__lens-panel"
          role="tabpanel"
          id={`${tabsId}-panel`}
          aria-labelledby={`${tabsId}-${lens.id}`}>
          <p className="ta-frac__lens-headline">{lens.headline}</p>
          <p className="ta-frac__lens-workout">{lens.workout}</p>
          <ul className="ta-frac__lens-rows" aria-label="Подсчёт по мышцам">
            {lens.rows.map(row => (
              <li key={row.muscle} className="ta-frac__lens-row">
                <strong>{row.muscle}</strong>
                <span className="ta-frac__lens-unit">
                  {row.value} · {row.unit}
                </span>
              </li>
            ))}
          </ul>
          <p className="ta-frac__callout">{lens.takeaway}</p>
        </div>
      </div>

      <div className="ta-frac__section">
        <h4 className="ta-frac__block-title">{guide.practiceTitle}</h4>
        <ul className="ta-frac__rule-list">
          {guide.practice.map(item => (
            <li key={item.id} className="ta-frac__rule">
              <p className="ta-frac__rule-title">{item.title}</p>
              <p className="ta-frac__prose ta-frac__prose--on-elev">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="ta-frac__dose-wrap">
        <h4 className="ta-frac__block-title">{guide.doseTitle}</h4>
        <div className="ta-frac__dose" role="list" aria-label={guide.doseTitle}>
          {guide.dose.map(item => (
            <article key={item.id} className="ta-frac__dose-card" role="listitem">
              <p className="ta-frac__dose-label">{item.label}</p>
              <p className="ta-frac__dose-value">{item.value}</p>
              <p className="ta-frac__dose-unit">{item.unit}</p>
              <p className="ta-frac__dose-detail">{item.detail}</p>
            </article>
          ))}
        </div>
        <p className="ta-frac__callout">{guide.caveat}</p>
      </div>

      <footer className="ta-frac__source">
        <span className="ta-frac__source-kind">{guide.source.kind}</span>
        <a
          className="ta-frac__source-link"
          href={guide.source.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${guide.source.citation}. Открыть обзор`}>
          {guide.source.citation}
        </a>
        <span className="ta-frac__source-title">{guide.source.title}</span>
      </footer>
    </section>
  );
}
