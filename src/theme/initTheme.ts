import {applyTheme, getStoredTheme} from './theme';

export function initTheme(): void {
  applyTheme(getStoredTheme());
}
