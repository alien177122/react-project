import {useCallback, useRef} from 'react';
import {useTheme} from '../../hooks/useTheme';

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 14.5A8.5 8.5 0 1 1 9.5 3a6.5 6.5 0 0 0 11.5 11.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ThemeToggle() {
  const {theme, toggleTheme} = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isDark = theme === 'dark';

  const handlePointerEnter = useCallback(() => {
    buttonRef.current?.style.setProperty('will-change', 'transform');
  }, []);

  const handlePointerLeave = useCallback(() => {
    buttonRef.current?.style.removeProperty('will-change');
  }, []);

  return (
    <button
      ref={buttonRef}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
      onClick={toggleTheme}
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      onFocus={handlePointerEnter}
      onBlur={handlePointerLeave}
      className="theme-toggle">
      <span className="theme-toggle__track">
        <span className={`theme-toggle__thumb ${isDark ? 'is-dark' : 'is-light'}`}>
          {isDark ? <SunIcon /> : <MoonIcon />}
        </span>
      </span>
    </button>
  );
}
