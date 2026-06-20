/** Browser GSAP defaults; no-op in Node test runs. */
let configured = false;

export function configureAppGsap(): void {
  if (configured) return;
  configured = true;
}

export function resetAppGsapForTests(): void {
  configured = false;
}
