type ScrollTarget = Element | Document | Window

export function addPassiveScroll(
  target: ScrollTarget,
  handler: (event: Event) => void,
  options: AddEventListenerOptions = { passive: true },
): () => void {
  target.addEventListener('scroll', handler, options)
  return () => target.removeEventListener('scroll', handler, options)
}
