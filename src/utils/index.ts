export function getDarkMode(): boolean {
  const dark = localStorage.getItem('dark')
  if (dark == 'true') {
    return Boolean(dark)
  }
  localStorage.setItem('lang', 'false')
  return false
}
