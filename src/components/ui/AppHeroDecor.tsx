import {motion, type TargetAndTransition} from 'framer-motion';
import {
  appHeroNumPop,
  appHeroRingIn,
  drawLine,
  fadeInUp,
  staggerContainer,
} from '../../theme/animations';

/** Parses hero titles for display emphasis (RPE–RIR accent or legacy week count). */
export function parseAppHeroTitle(title: string): {
  lead: string;
  num: string | null;
  tail: string | null;
  ringLabel: string | null;
} {
  const rpeMatch = title.match(/^(.+?)\s+(RPE[–-]RIR)$/iu);
  if (rpeMatch) {
    return {
      lead: rpeMatch[1].trim(),
      num: rpeMatch[2].replace('-', '–'),
      tail: null,
      ringLabel: 'RPE·RIR',
    };
  }

  const weekMatch = title.match(/^(.+?)\s+(\d+)\s+(.+)$/u);
  if (weekMatch) {
    return {
      lead: weekMatch[1].trim(),
      num: weekMatch[2],
      tail: weekMatch[3].trim(),
      ringLabel: weekMatch[2],
    };
  }

  return {lead: title, num: null, tail: null, ringLabel: null};
}

export function appHeroChipsFromSubtitle(subtitle: string): string[] | null {
  if (!subtitle.includes('·')) return null;
  const chips = subtitle
    .split('·')
    .map(part => part.trim())
    .filter(Boolean);
  return chips.length > 0 ? chips : null;
}

const orbFloat = {
  x: [0, 14, -6, 0],
  y: [0, -10, 6, 0],
  transition: {
    duration: 11,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
};

const orbFloatAlt = {
  x: [0, -10, 8, 0],
  y: [0, 12, -8, 0],
  transition: {
    duration: 13,
    repeat: Infinity,
    ease: 'easeInOut' as const,
    delay: 0.6,
  },
};

interface AppHeroBackdropProps {
  ringLabel: string | null;
  ringCompact?: boolean;
  animated?: boolean;
}

export function AppHeroBackdrop({
  ringLabel,
  ringCompact = false,
  animated = false,
}: AppHeroBackdropProps) {
  const Mesh = animated ? motion.div : 'div';
  const OrbTL = animated ? motion.div : 'div';
  const OrbBR = animated ? motion.div : 'div';
  const Shimmer = animated ? motion.div : 'div';
  const Ring = animated ? motion.div : 'div';

  return (
    <>
      <Mesh
        className="app-hero__mesh"
        aria-hidden="true"
        {...(animated
          ? {
              initial: {opacity: 0},
              animate: {opacity: 1},
              transition: {duration: 1.2},
            }
          : {})}
      />
      <OrbTL
        className="app-hero__orb app-hero__orb--tl"
        aria-hidden="true"
        {...(animated ? {animate: orbFloat} : {})}
      />
      <OrbBR
        className="app-hero__orb app-hero__orb--br"
        aria-hidden="true"
        {...(animated ? {animate: orbFloatAlt} : {})}
      />
      <Shimmer className="app-hero__shimmer" aria-hidden="true" />
      {ringLabel ? (
        <Ring
          className="app-hero__ring"
          aria-hidden="true"
          {...(animated
            ? {
                variants: appHeroRingIn,
                initial: 'hidden',
                animate: 'show',
              }
            : {})}>
          <span className="app-hero__ring-track app-hero__ring-track--outer" />
          <span className="app-hero__ring-track app-hero__ring-track--inner" />
          <span
            className={`app-hero__ring-num${ringCompact ? ' app-hero__ring-num--compact' : ''}`}>
            {ringLabel}
          </span>
        </Ring>
      ) : null}
    </>
  );
}

type TitleElementProps = React.HTMLAttributes<HTMLHeadingElement> & {
  title: string;
};

function AppHeroTitleContent({title, className, ...rest}: TitleElementProps) {
  const parsed = parseAppHeroTitle(title);

  if (!parsed.num) {
    return (
      <h1 id="app-hero-title" className={className} {...rest}>
        {title}
      </h1>
    );
  }

  return (
    <h1 id="app-hero-title" className={`${className ?? ''} app-hero__title`} {...rest}>
      <span className="app-hero__title-lead">{parsed.lead}</span>
      <span className="app-hero__title-num">{parsed.num}</span>
      <span className="app-hero__title-tail">{parsed.tail}</span>
    </h1>
  );
}

interface AppHeroBodyProps {
  label: string;
  title: string;
  subtitle: string;
  onTitleClick?: () => void;
  animated?: boolean;
  titleWhileTap?: TargetAndTransition;
}

export function AppHeroBody({
  label,
  title,
  subtitle,
  onTitleClick,
  animated = false,
  titleWhileTap,
}: AppHeroBodyProps) {
  const parsed = parseAppHeroTitle(title);
  const chips = appHeroChipsFromSubtitle(subtitle);
  const isInteractive = Boolean(onTitleClick);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onTitleClick) {
      e.preventDefault();
      onTitleClick();
    }
  };

  const titleClass = `theory-hero-title app-hero__title-block${
    isInteractive ? ' theory-hero-title--interactive' : ''
  }`;

  const titleProps = {
    title,
    className: titleClass,
    onClick: onTitleClick,
    onKeyDown: handleKeyDown,
    role: isInteractive ? ('button' as const) : undefined,
    tabIndex: isInteractive ? 0 : undefined,
    style: isInteractive ? {cursor: 'pointer' as const} : undefined,
  };

  const Badge = animated ? motion.div : 'div';
  const Subtitle = animated ? motion.p : 'p';
  const Line = animated ? motion.div : 'div';
  const Lead = animated ? motion.span : 'span';
  const Num = animated ? motion.span : 'span';
  const Tail = animated ? motion.span : 'span';
  const Chip = animated ? motion.span : 'span';

  const titleInner = (() => {
    if (!parsed.num) {
      return title;
    }
    return (
      <>
        <Lead className="app-hero__title-lead" {...(animated ? {variants: fadeInUp} : {})}>
          {parsed.lead}
        </Lead>
        <Num className="app-hero__title-num" {...(animated ? {variants: appHeroNumPop} : {})}>
          {parsed.num}
        </Num>
        <Tail className="app-hero__title-tail" {...(animated ? {variants: fadeInUp} : {})}>
          {parsed.tail}
        </Tail>
      </>
    );
  })();

  const Inner = animated ? motion.div : 'div';

  return (
    <>
      <AppHeroBackdrop
        ringLabel={parsed.ringLabel}
        ringCompact={Boolean(parsed.ringLabel && parsed.num && !/^\d+$/u.test(parsed.num))}
        animated={animated}
      />
      <Inner
        className="app-hero__inner"
        {...(animated ? {variants: staggerContainer, initial: 'hidden', animate: 'show'} : {})}>
        <Badge className="app-hero__badge" {...(animated ? {variants: fadeInUp} : {})}>
          <span className="app-hero__badge-dot" aria-hidden="true" />
          {label}
        </Badge>

        {animated ? (
          <motion.h1
            id="app-hero-title"
            className={`${titleClass} app-hero__title`}
            onClick={onTitleClick}
            onKeyDown={handleKeyDown}
            role={isInteractive ? 'button' : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            style={isInteractive ? {cursor: 'pointer'} : undefined}
            variants={{
              hidden: {},
              show: {transition: {staggerChildren: 0.09, delayChildren: 0.1}},
            }}
            whileTap={titleWhileTap}>
            {titleInner}
          </motion.h1>
        ) : (
          <AppHeroTitleContent {...titleProps} />
        )}

        {chips ? (
          <motion.div
            className="app-hero__chips"
            role="list"
            aria-label="Параметры программы"
            {...(animated
              ? {
                  variants: {
                    hidden: {},
                    show: {transition: {staggerChildren: 0.07, delayChildren: 0.35}},
                  },
                }
              : {})}>
            {chips.map(chip => (
              <Chip
                key={chip}
                className="app-hero__chip"
                role="listitem"
                {...(animated ? {variants: fadeInUp} : {})}>
                {chip}
              </Chip>
            ))}
          </motion.div>
        ) : subtitle ? (
          <Subtitle
            className="theory-hero-subtitle app-hero__subtitle"
            {...(animated ? {variants: fadeInUp} : {})}>
            {subtitle}
          </Subtitle>
        ) : null}

        <Line
          className="theory-hero-line app-hero__line"
          {...(animated ? {variants: drawLine, style: {originX: 0}} : {})}
        />
      </Inner>
    </>
  );
}
