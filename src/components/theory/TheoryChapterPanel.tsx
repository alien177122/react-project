import {motion} from 'framer-motion';
import {useEffect, useRef, useState, type CSSProperties, type ReactNode} from 'react';
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
      style={style}
      aria-labelledby="chapter-panel-title"
      initial={reduced ? false : {opacity: 0, y: 12}}
      animate={reduced ? undefined : {opacity: 1, y: 0}}
      exit={reduced ? undefined : {opacity: 0, y: 12}}
      transition={{duration: 0.4, ease: [0.16, 1, 0.3, 1]}}>
      <header className="ta-chapter-panel__head">
        <div className="ta-chapter-panel__title-wrap">
          <span className="ta-section-pill">
            {chapter ? `Глава ${chapter.num}` : 'Глава не найдена'}
          </span>
          <h2 ref={headingRef} id="chapter-panel-title" className="ta-section-title" tabIndex={-1}>
            {chapter?.panelTitle ?? 'Глава не найдена'}
          </h2>
          <p className="ta-section-lede">
            {chapter?.summary ??
              `Параметр chapter=${invalidChapter} не найден. Выбери тему из списка выше.`}
          </p>
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
        <LazyPanelBody key={chapter.id}>{children}</LazyPanelBody>
      ) : (
        <div className="ta-chapter-empty">
          <p>Глава не найдена. Выберите тему из списка выше.</p>
        </div>
      )}
    </motion.section>
  );
}

function LazyPanelBody({children}: {children: ReactNode}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const body = bodyRef.current;
    if (!body || visible) return undefined;

    const observer = new IntersectionObserver(
      entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        setVisible(true);
        observer.disconnect();
      },
      {rootMargin: '120px 0px'},
    );

    observer.observe(body);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={bodyRef} className="ta-chapter-panel__body">
      {visible ? children : <ChapterSkeleton />}
    </div>
  );
}

function ChapterSkeleton() {
  return (
    <div className="ta-chapter-skeleton" aria-label="Загружаем тему">
      <span />
      <span />
      <span />
    </div>
  );
}
