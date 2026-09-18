import {AUTH_IMAGE_PHONE_SLOTS, type AuthImagePhoneSlot} from '../../config/auth-image-phone';
import {publicAsset} from '../../utils/publicAsset';

export const AUTH_WALLPAPER_SLUG = 'discipline-statue' as const;

const SLOT_PLACEMENT_CLASS: Record<AuthImagePhoneSlot['placement'], string> = {
  left: 'auth-hero-decor__slot--left',
  center: 'auth-hero-decor__slot--center',
  right: 'auth-hero-decor__slot--right',
};

interface AuthHeroDecorProps {
  reduced?: boolean;
}

function AuthHeroFigure({
  src,
  width,
  height,
  placement,
}: {
  src: string;
  width: number;
  height: number;
  placement: AuthImagePhoneSlot['placement'];
}) {
  const isCenter = placement === 'center';
  return (
    <div className="auth-hero-decor__figure-wrap">
      <img
        className="auth-hero-decor__figure"
        src={src}
        alt=""
        width={width}
        height={height}
        sizes={isCenter ? '(min-width: 768px) 360px, 280px' : '(min-width: 768px) 38vw, 26vw'}
        loading="eager"
        decoding="async"
        fetchPriority={isCenter ? 'high' : 'low'}
      />
    </div>
  );
}

/** Auth triptych — Vite public URLs from `publicAsset('imagePhone/…')`, not disk paths. */
export function AuthHeroDecor({reduced: _reduced = false}: AuthHeroDecorProps) {
  void _reduced;
  return (
    <div className="auth-hero-decor" aria-hidden="true">
      <div className="auth-hero-decor__base" />
      <div className="auth-hero-decor__stage">
        {AUTH_IMAGE_PHONE_SLOTS.map(slot => (
          <div
            key={slot.id}
            className={`auth-hero-decor__slot ${SLOT_PLACEMENT_CLASS[slot.placement]}`}>
            <AuthHeroFigure
              src={publicAsset(slot.src)}
              width={slot.width}
              height={slot.height}
              placement={slot.placement}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
