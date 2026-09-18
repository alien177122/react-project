/** Resolve a file from Vite `public/` against `import.meta.env.BASE_URL`. */
export function publicAsset(relativePath: string): string {
  const env = import.meta.env as ImportMetaEnv | undefined;
  const base = env?.BASE_URL || '/';
  const path = relativePath.replace(/^\//, '');
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}${path}`;
}
