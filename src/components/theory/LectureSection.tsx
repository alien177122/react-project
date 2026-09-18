import type {LectureCheckIn, LectureTopic} from '../../data/theory';
import {getTheoryChapter, isChapterId, type ChapterId} from '../../data/theoryChapters';
import {ChapterLink} from './ChapterLink';
import {splitPattern} from './parsePattern';

type SelectChapter = (chapterId: ChapterId) => void;

export function LectureSection({
  topic,
  onSelectChapter,
}: {
  topic: LectureTopic;
  onSelectChapter: SelectChapter;
}) {
  const linked =
    topic.chapterLink && isChapterId(topic.chapterLink.chapterId)
      ? getTheoryChapter(topic.chapterLink.chapterId)
      : null;

  return (
    <article className="ta-lecture-topic">
      <h4 className="ta-lecture-topic__title">{topic.title}</h4>
      <div className="ta-lecture-body">
        {topic.lecture.map(paragraph => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>

      {topic.callout ? (
        <aside className="ta-lecture-callout">
          <p className="ta-lecture-callout__value">{topic.callout.value}</p>
          <p className="ta-lecture-callout__caption">{topic.callout.caption}</p>
        </aside>
      ) : null}

      {topic.caseStudy ? (
        <aside className="ta-lecture-case">
          <p className="ta-lecture-case__label">Случай</p>
          <p className="ta-lecture-case__title">{topic.caseStudy.title}</p>
          <p className="ta-lecture-case__body">{topic.caseStudy.body}</p>
        </aside>
      ) : null}

      {topic.chapterLink && linked ? (
        <p className="ta-chapter-link">
          <ChapterLink
            chapterId={linked.id}
            onSelectChapter={onSelectChapter}
            ariaLabel={`Открыть ${linked.kind === 'reading' ? 'статью' : 'главу'} ${linked.num}: ${topic.chapterLink.principle}`}>
            {linked.kind === 'reading'
              ? linked.cardTitle
              : `${linked.num} · ${topic.chapterLink.principle}`}
          </ChapterLink>
          <span className="ta-chapter-link__context">{topic.chapterLink.context}</span>
        </p>
      ) : null}

      <dl className="ta-lecture-glossary">
        <div>
          <dt>Определение</dt>
          <dd>{topic.definition}</dd>
        </div>
        {topic.pattern ? (
          <div>
            <dt>Схема</dt>
            <dd>
              <PatternFormula pattern={topic.pattern} />
            </dd>
          </div>
        ) : null}
        {topic.bullets && topic.bullets.length > 0 ? (
          <div>
            <dt>Как применять</dt>
            <dd>
              <ul>
                {topic.bullets.map(bullet => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}

export function LectureCheckInBlock({checkIn}: {checkIn: LectureCheckIn}) {
  return (
    <details className="ta-lecture-checkin">
      <summary>{checkIn.question}</summary>
      <p>{checkIn.answer}</p>
    </details>
  );
}

/** First gold used mTOR-prefixed names; keep imports compiling. */
export const MtorLectureSection = LectureSection;
export const MtorCheckInBlock = LectureCheckInBlock;

function PatternFormula({pattern}: {pattern: string}) {
  const pieces = splitPattern(pattern);
  return (
    <p className="ta-pattern-formula">
      {pieces.map((piece, index) =>
        piece.kind === 'op' ? (
          <span key={`${piece.text}-${index}`} className="ta-pattern-formula__op">
            {piece.text}
          </span>
        ) : (
          <span key={`${piece.text}-${index}`} className="ta-pattern-formula__chip">
            {piece.text}
          </span>
        ),
      )}
    </p>
  );
}
