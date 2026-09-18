import type {ApiPlatform} from '@training/shared/config/api';

/** Web-only root — native shell archived in `_archive-non-web/`. */
export function isNativeShell(): boolean {
  return false;
}

export function getNativePlatform(): 'ios' | 'android' | null {
  return null;
}

export function resolveApiPlatform(): ApiPlatform {
  return 'web';
}
