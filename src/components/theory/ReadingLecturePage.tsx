import type {LectureLessonGroup} from '../../data/theory';
import type {ChapterId} from '../../data/theoryChapters';
import {LectureCheckInBlock, LectureSection} from './LectureSection';
import {ReadingArticleLinks} from './ReadingArticleLinks';

type LessonSource = {
  kind: string;
  citation: string;
  title: string;
  url: string;
};

type PlanItem = {
  title: string;
  detail: string;
};

type SelectChapter = (chapterId: ChapterId) => void;

export function ReadingLecturePage({
  title,
  lede,
  plan,
  source,
  groups,
  articleId,
  onSelectChapter,
}: {
  title: string;
  lede: string;
  plan: readonly PlanItem[];
  source: LessonSource;
  groups: readonly LectureLessonGroup[];
  articleId: ChapterId;
  onSelectChapter: SelectChapter;
}) {
  return (
    <>
      <header className="ta-lesson-intro">
        <p className="ta-lesson-intro__eyebrow">Интересная статья для чтения</p>
        <h3 className="ta-lesson-intro__title">{title}</h3>
        <p className="ta-lesson-intro__lede">{lede}</p>
        <ol className="ta-lesson-plan" aria-label="Содержание">
          {plan.map((item, index) => (
            <li key={item.title}>
              <span className="ta-lesson-plan__step">{index + 1}</span>
              <span>
                <strong>{item.title}</strong> — {item.detail}
              </span>
            </li>
          ))}
        </ol>
        <footer className="ta-lesson-source">
          <span className="ta-lesson-source__kind">{source.kind}</span>
          <a
            className="ta-lesson-source__link"
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${source.citation}. Открыть видео на YouTube`}>
            {source.citation}
          </a>
          <span className="ta-lesson-source__title">
            На основе данных видео «{source.title}» — {source.url}
          </span>
        </footer>
      </header>

      {groups.map(group => (
        <section
          key={group.id}
          className="ta-lesson-section"
          aria-labelledby={`${articleId}-${group.id}-title`}>
          <header className="ta-lesson-section__head">
            <p className="ta-lesson-section__step">{group.step}</p>
            <h3 id={`${articleId}-${group.id}-title`} className="ta-lesson-section__title">
              {group.title}
            </h3>
            <p className="ta-lesson-section__lede">{group.lede}</p>
          </header>
          {group.topics.map(topic => (
            <LectureSection key={topic.id} topic={topic} onSelectChapter={onSelectChapter} />
          ))}
          {group.checkIn ? <LectureCheckInBlock checkIn={group.checkIn} /> : null}
        </section>
      ))}

      <ReadingArticleLinks
        source={source}
        articleId={articleId}
        onSelectChapter={onSelectChapter}
      />
    </>
  );
}
