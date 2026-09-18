/**
 * Mobile web console (Eruda).
 * Off by default in all environments — enable with ?eruda=1 or VITE_ERUDA=1.
 * ?eruda=0 clears sticky localStorage flag.
 */
function shouldEnableEruda(): boolean {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('eruda') === '0') {
      localStorage.removeItem('eruda');
      return false;
    }
    if (params.get('eruda') === '1') {
      localStorage.setItem('eruda', '1');
      return true;
    }
  } catch {
    // ignore storage / URL errors
  }

  if (import.meta.env.VITE_ERUDA === '1') return true;

  try {
    return localStorage.getItem('eruda') === '1';
  } catch {
    return false;
  }
}

export async function initEruda(): Promise<void> {
  if (!shouldEnableEruda()) return;

  const {default: eruda} = await import('eruda');
  eruda.init();
}
