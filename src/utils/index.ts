export function getDarkMode(): boolean {
  const lang = localStorage.getItem('dark')
  if (lang) {
    return Boolean(lang)
  }
  localStorage.setItem('lang', 'false')
  return false
}
