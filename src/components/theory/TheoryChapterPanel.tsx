import {motion} from 'framer-motion';
import {useEffect, useRef, type CSSProperties, type ReactNode} from 'react';
import type {TheoryChapterMeta} from '../../data/theoryChapters';
import {ShareButton} from '../seo/ShareButton';
import {buildChapterOgMeta} from '../../utils/ogMeta';
import {useReducedMotion} from '../../hooks/useReducedMotion';

interface TheoryChapterPanelProps {
  chapter: TheoryChapterMeta | null;
  invalidChapter: string | null;
  children?: ReactNode;
  onClose: () => void;
}

export function TheoryChapterPanel({
  chapter,
  invalidChapter,
  children,
  onClose,
}: TheoryChapterPanelProps) {
  const panelRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const style: CSSProperties | undefined = chapter
    ? {
        ['--ta-panel-accent' as string]: `var(${chapter.accentVar})`,
        ['--ta-panel-tint' as string]: `var(${chapter.tintVar})`,
      }
    : undefined;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({
        block: 'start',
        behavior: reduced ? 'auto' : 'smooth',
      });
      headingRef.current?.focus({preventScroll: true});
    });
    return () => window.cancelAnimationFrame(frame);
  }, [chapter?.id, invalidChapter, reduced]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <motion.section
      ref={panelRef}
      id="chapter-panel"
      className={`ta-chapter-panel${chapter ? '' : ' is-empty'}`}
      data-kind={chapter?.kind}
      style={style}
      aria-labelledby="chapter-panel-title"
      initial={reduced ? false : {opacity: 0, y: 12}}
      animate={reduced ? undefined : {opacity: 1, y: 0}}
      exit={reduced ? undefined : {opacity: 0, y: 12}}
      transition={{duration: 0.4, ease: [0.16, 1, 0.3, 1]}}>
      <header className="ta-chapter-panel__head">
        <div className="ta-chapter-panel__title-wrap">
          <div className="ta-chapter-panel__title-stack">
            <h2
              ref={headingRef}
              id="chapter-panel-title"
              className="ta-section-title"
              tabIndex={-1}>
              {chapter?.panelTitle ?? 'Глава не найдена'}
            </h2>
            <p className="ta-section-lede">
              {chapter?.summary ??
                `Параметр chapter=${invalidChapter} не найден. Выбери тему из списка выше.`}
            </p>
          </div>
          <span className="ta-section-pill">
            {chapter
              ? chapter.kind === 'reading'
                ? 'Интересная статья для чтения'
                : `Глава ${chapter.num}`
              : 'Глава не найдена'}
          </span>
        </div>
        <div className="ta-chapter-panel__actions">
          {chapter && (
            <ShareButton
              title={chapter.panelTitle}
              text={chapter.summary}
              url={buildChapterOgMeta(chapter.id).url}
            />
          )}
          <button
            type="button"
            className="ta-chapter-panel__close"
            onClick={onClose}
            aria-label="Закрыть тему">
            Закрыть
          </button>
        </div>
      </header>

      {chapter ? (
        <div
          key={chapter.id}
          className="ta-chapter-panel__body"
          data-chapter={chapter.id}
          data-kind={chapter.kind}>
          {children}
        </div>
      ) : (
        <div className="ta-chapter-empty">
          <p>Глава не найдена. Выберите тему из списка выше.</p>
        </div>
      )}
    </motion.section>
  );
}
