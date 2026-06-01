export function getPageParam() {
  return new URLSearchParams(window.location.search).get('page') ?? ''
}

export function navigate(path) {
  if (!path) return

  const target = path.startsWith('?') ? `${window.location.pathname}${path}` : path
  window.history.pushState({}, '', target)
  window.dispatchEvent(new Event('cursor:navigate'))
}

export function navigateToPage(page) {
  const url = new URL(window.location.href)
  url.searchParams.set('page', page)
  window.history.pushState({}, '', url)
  window.dispatchEvent(new Event('cursor:navigate'))
}

/**
 * Returns to the previous in-app page. Uses browser history when available;
 * otherwise runs fallback (URL string or callback).
 */
export function navigateBack(fallback = '?page=home') {
  if (window.history.length > 1) {
    window.history.back()
    return
  }

  if (typeof fallback === 'function') {
    fallback()
    return
  }

  navigate(fallback)
}
