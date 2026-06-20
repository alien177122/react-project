import {appHeroChipsFromSubtitle, parseAppHeroTitle} from './appHeroParsing';

interface AppHeroBodyProps {
  label: string;
  title: string;
  subtitle: string;
  onTitleClick?: () => void;
}

export function AppHeroBody({label, title, subtitle, onTitleClick}: AppHeroBodyProps) {
  const parsed = parseAppHeroTitle(title);
  const chips = appHeroChipsFromSubtitle(subtitle);
  const isInteractive = Boolean(onTitleClick);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onTitleClick) {
      e.preventDefault();
      onTitleClick();
    }
  };

  const titleClass = `app-hero__title-block theory-hero-title${
    isInteractive ? ' theory-hero-title--interactive' : ''
  }`;

  return (
    <div className="app-hero__inner">
      <span className="app-hero__eyebrow">{label}</span>

      <h1
        id="app-hero-title"
        className={titleClass}
        onClick={onTitleClick}
        onKeyDown={handleKeyDown}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        style={isInteractive ? {cursor: 'pointer'} : undefined}>
        {parsed.num ? (
          <>
            <span className="app-hero__title-lead">{parsed.lead}</span>{' '}
            <span className="app-hero__title-accent">{parsed.num}</span>
            {parsed.tail ? (
              <>
                {' '}
                <span className="app-hero__title-tail">{parsed.tail}</span>
              </>
            ) : null}
          </>
        ) : (
          title
        )}
      </h1>

      {chips ? (
        <div className="app-hero__chips" role="list" aria-label="Параметры программы">
          {chips.map(chip => (
            <span key={chip} className="app-hero__chip" role="listitem">
              {chip}
            </span>
          ))}
        </div>
      ) : subtitle ? (
        <p className="theory-hero-subtitle app-hero__subtitle">{subtitle}</p>
      ) : null}

      <div className="theory-hero-line app-hero__line" aria-hidden="true" />
    </div>
  );
}
