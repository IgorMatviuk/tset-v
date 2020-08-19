export default ($t, $i18n, items) => {
  return [{ text: $t('pages.home'), href: $i18n.path('') }, ...items]
}
