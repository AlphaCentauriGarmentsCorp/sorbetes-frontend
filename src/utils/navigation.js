export function getPageParam() {
  return new URLSearchParams(window.location.search).get('page') ?? ''
}

export function navigateToPage(page) {
  const url = new URL(window.location.href)
  url.searchParams.set('page', page)
  window.history.pushState({}, '', url)
  window.dispatchEvent(new Event('cursor:navigate'))
}
