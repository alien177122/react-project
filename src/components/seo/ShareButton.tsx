import {useCallback, useState} from 'react';
import {useReducedMotion} from '../../hooks/useReducedMotion';

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
  className?: string;
}

export function ShareButton({title, text, url, className}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const reduced = useReducedMotion();

  const handleShare = useCallback(async () => {
    const payload = {title, text, url};

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(payload);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Скопируй ссылку', url);
    }
  }, [text, title, url]);

  return (
    <button
      type="button"
      className={`ta-share-btn${className ? ` ${className}` : ''}${copied ? ' is-copied' : ''}`}
      onClick={() => void handleShare()}
      aria-live="polite">
      <span
        className="ta-share-btn__icon"
        aria-hidden="true"
        style={reduced ? undefined : {transition: 'transform 0.2s var(--ease-in-out)'}}>
        {copied ? '✓' : '↗'}
      </span>
      <span>{copied ? 'Ссылка скопирована' : 'Поделиться'}</span>
    </button>
  );
}
