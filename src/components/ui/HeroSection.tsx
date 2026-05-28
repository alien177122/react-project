import {memo} from 'react';
import {motion} from 'framer-motion';
import {appleEase, drawLine, fadeInUp, staggerContainer} from '../../theme/animations';
import {useReducedMotion} from '../../hooks/useReducedMotion';
import {AppHeroBody} from './AppHeroDecor.tsx';

export interface HeroSectionProps {
  /** Eyebrow label shown above the title (e.g. "Theory", "Calculator") */
  label: string;
  /** Primary heading — large display text */
  title: string;
  /** Secondary description line */
  subtitle: string;
  /**
   * When provided, the title becomes interactive:
   * clickable via mouse and keyboard (Enter / Space).
   * Adds a spring tap animation and focus ring.
   */
  onTitleClick?: () => void;
  className?: string;
}

const tapSpring = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 18,
} satisfies object;

function isAppHeroVariant(className?: string): boolean {
  return Boolean(className?.includes('app-hero'));
}

/**
 * Animated hero block used at the top of each tab.
 *
 * - Staggered entrance: label → title → subtitle → decorative line
 * - Optional `onTitleClick` makes the title interactive with spring tap + keyboard support
 * - `prefers-reduced-motion`: renders static HTML with zero JS animation overhead
 * - `React.memo`: skips re-renders when props haven't changed
 */
export const HeroSection = memo(function HeroSection({
  label,
  title,
  subtitle,
  onTitleClick,
  className,
}: HeroSectionProps) {
  const reduced = useReducedMotion();
  const isAppHero = isAppHeroVariant(className);
  const isInteractive = Boolean(onTitleClick);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onTitleClick) {
      e.preventDefault();
      onTitleClick();
    }
  };

  const headerClass = `theory-hero${className ? ` ${className}` : ''}`;

  if (isAppHero) {
    if (reduced) {
      return (
        <header className={`${headerClass} app-hero--live`} role="region">
          <AppHeroBody
            label={label}
            title={title}
            subtitle={subtitle}
            onTitleClick={onTitleClick}
          />
        </header>
      );
    }

    return (
      <motion.header
        className={`${headerClass} app-hero--live`}
        role="region"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.45, ease: appleEase}}>
        <AppHeroBody
          label={label}
          title={title}
          subtitle={subtitle}
          onTitleClick={onTitleClick}
          animated
          titleWhileTap={isInteractive ? {scale: 0.98, transition: tapSpring} : undefined}
        />
      </motion.header>
    );
  }

  // ─── Reduced motion: static render, zero framer overhead ─────────────────
  if (reduced) {
    return (
      <header className={headerClass} role="region" aria-label={title}>
        <div className="theory-hero-label">{label}</div>
        <h1
          className="theory-hero-title"
          onClick={onTitleClick}
          onKeyDown={handleKeyDown}
          role={isInteractive ? 'button' : undefined}
          tabIndex={isInteractive ? 0 : undefined}
          style={isInteractive ? {cursor: 'pointer'} : undefined}>
          {title}
        </h1>
        <p className="theory-hero-subtitle">{subtitle}</p>
      </header>
    );
  }

  // ─── Animated render (theory tab) ─────────────────────────────────────────
  return (
    <motion.header
      className={headerClass}
      role="region"
      aria-label={title}
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      whileHover={{scale: 1.004, transition: {duration: 0.2, ease: appleEase}}}>
      <motion.div className="theory-hero-label" variants={fadeInUp}>
        {label}
      </motion.div>

      <motion.h1
        className={`theory-hero-title${isInteractive ? ' theory-hero-title--interactive' : ''}`}
        variants={fadeInUp}
        onClick={onTitleClick}
        onKeyDown={handleKeyDown}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        whileTap={isInteractive ? {scale: 0.98, transition: tapSpring} : undefined}
        style={isInteractive ? {cursor: 'pointer'} : undefined}>
        {title}
      </motion.h1>

      <motion.p className="theory-hero-subtitle" variants={fadeInUp}>
        {subtitle}
      </motion.p>

      <motion.div className="theory-hero-line" variants={drawLine} style={{originX: 0}} />
    </motion.header>
  );
});
