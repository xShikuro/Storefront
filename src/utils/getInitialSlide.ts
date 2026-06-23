export function getInitialSlide(maxSlideIndex: number) {
  if (typeof window === 'undefined') {
    return 0
  }

  const querySlide = new URLSearchParams(window.location.search).get('slide')
  const hashSlide = window.location.hash.match(/slide=(\d+)/)?.[1]
  const slide = querySlide ?? hashSlide

  if (!slide) {
    return 0
  }

  const index = Number(slide)

  if (!Number.isFinite(index)) {
    return 0
  }

  return Math.max(0, Math.min(maxSlideIndex, index))
}
