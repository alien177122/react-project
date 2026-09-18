import type {AppTab} from './tabs';

interface AppAmbientBackgroundProps {
  /** Kept for shell API stability; logged-in shell uses CSS texture, not tab wallpapers. */
  activeTab: AppTab;
}

/**
 * Logged-in ambient layer — solid canvas + static vignette (no drifting grain).
 * Animated SVG grain + mix-blend caused scanline flicker through frosted cards.
 */
export function AppAmbientBackground({activeTab}: AppAmbientBackgroundProps) {
  void activeTab;

  return (
    <div className="app-ambient-bg app-ambient-bg--static" aria-hidden="true">
      <div className="app-ambient-bg__base" />
      <div className="app-ambient-bg__mesh" />
      <div className="app-ambient-bg__grain" />
      <div className="app-ambient-bg__vignette" />
    </div>
  );
}
