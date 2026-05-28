import type {ReactNode} from 'react';
import {useScrollReveal} from '../hooks/useScrollReveal';

interface SectionBlockProps {
  num: string;
  title: string;
  children: ReactNode;
  variant?: 'legacy' | 'apple';
  className?: string;
  titleId?: string;
}

export function SectionBlock({
  num,
  title,
  children,
  variant = 'legacy',
  className,
  titleId,
}: SectionBlockProps) {
  const {ref, isVisible} = useScrollReveal<HTMLElement>();
  if (variant === 'apple') {
    return (
      <section
        ref={ref}
        className={`ta-section ta-calc-section reveal-section${isVisible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}>
        <div className="ta-section-inner ta-calc-section__inner">
          <header className="ta-section-head ta-calc-section__head">
            <span className="ta-section-pill ta-calc-section__pill" aria-hidden="true">
              {num}
            </span>
            <h2 id={titleId} className="ta-section-title ta-calc-section__title">
              {title}
            </h2>
          </header>
          <div className="ta-calc-section__body">{children}</div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className={`theory-section reveal-section${isVisible ? ' is-visible' : ''}`}>
      <div className="theory-section-header">
        <div className="theory-section-pill">{num}</div>
        <h2 className="theory-section-title">{title}</h2>
      </div>
      <div className="theory-section-body">{children}</div>
    </section>
  );
}

export function NoteBox({
  children,
  variant = 'legacy',
}: {
  children: ReactNode;
  variant?: 'legacy' | 'apple';
}) {
  return <div className={variant === 'apple' ? 'ta-calc-note' : 'theory-note-box'}>{children}</div>;
}
