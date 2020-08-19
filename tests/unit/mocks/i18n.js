import VueI18n from 'vue-i18n'

function loadLocaleMessages() {
  return {
    ru: require('~/locales/ru.json'),
    uk: require('~/locales/uk.json')
  }
}

export default function setupI18n(vueInstance, defaultLocale) {
  vueInstance.use(VueI18n)

  return new VueI18n({
    locale: defaultLocale || 'ru',
    fallbackLocale: defaultLocale || 'ru',
    messages: loadLocaleMessages()
  })
}
