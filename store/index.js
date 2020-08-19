import { actionTypes as catalogActionTypes } from '@/store/catalog'

export const mutationTypes = {
  SET_LANG: 'SET_LANG',
  SET_MENUS: 'SET_MENUS',
  SET_PAGE_TYPE: 'SET_PAGE_TYPE',
  SET_BREADCRUMB: 'SET_BREADCRUMB',
  SET_CONTACTS: 'SET_CONTACTS',
  SET_GLOBALS: 'SET_GLOBALS'
}

export const actionTypes = {
  GET_MENUS: 'GET_MENUS',
  GET_CONTACTS: 'GET_CONTACTS',
  GET_BANNER: 'GET_BANNER',
  GET_CLIENT_LOCATION: 'GET_CLIENT_LOCATION'
}

export const state = () => {
  return {
    locale: 'ru',
    locales: ['uk', 'ru'],
    fallbackLocale: 'ru',
    pageType: null,
    breadcrumb: [],
    menus: [],
    globals: {
      countryCode: 'UA',
      banner: null
    },
    contacts: {
      phone: '0 800 332 512',
      email: 'office@virna.com.ua',
      schedule: 'с 9:00 - 18:00',
      socialLinks: [
        { name: 'instagram', url: 'https://www.instagram.com/' },
        { name: 'facebook', url: 'https://facebook.com/' },
        { name: 'youtube', url: 'https://www.youtube.com/' }
      ]
    }
  }
}

export const mutations = {
  [mutationTypes.SET_LANG](state, locale) {
    state.locale = locale
  },
  [mutationTypes.SET_MENUS](state, menus) {
    state.menus = menus
  },
  [mutationTypes.SET_PAGE_TYPE](state, pageType) {
    state.pageType = pageType
  },
  [mutationTypes.SET_BREADCRUMB](state, breadcrumb) {
    state.breadcrumb = breadcrumb
  },
  [mutationTypes.SET_CONTACTS](state, contacts) {
    state.contacts = contacts
  },
  [mutationTypes.SET_GLOBALS](state, { key, value }) {
    state.globals[key] = value
  }
}

export const actions = {
  async [actionTypes.GET_MENUS]({ commit }) {
    const STAGE_API_URL = 'https://back.virna.com.ua'
    const { data: menus } = await this.$axios.$get(`${STAGE_API_URL}/api/menus`)
    commit(mutationTypes.SET_MENUS, menus)
  },
  async [actionTypes.GET_CONTACTS]({ commit }) {
    const STAGE_API_URL = 'https://back.virna.com.ua'
    const { data: contacts } = await this.$axios.$get(
      `${STAGE_API_URL}/api/contacts`
    )
    commit(mutationTypes.SET_CONTACTS, contacts)
  },
  async [actionTypes.GET_BANNER]({ commit }) {
    const { data: banner } = await this.$axios.$get('/api/banner')
    const defaultBanner = {
      key: 'banner',
      value: banner
    }

    commit(mutationTypes.SET_GLOBALS, defaultBanner)
  },
  async [actionTypes.GET_CLIENT_LOCATION]({ commit }) {
    const locationString = await this.$axios.$get('https://ip2c.org/s')
    const [, countryCode] = locationString.split(';')
    const defaultCountry = {
      key: 'countryCode',
      value: countryCode
    }

    commit(mutationTypes.SET_GLOBALS, defaultCountry)
  },
  async nuxtServerInit({ dispatch }) {
    await Promise.all([
      dispatch(actionTypes.GET_MENUS),
      dispatch(actionTypes.GET_CONTACTS),
      dispatch(`catalog/${catalogActionTypes.GET_CATEGORIES}`)
    ])
  }
}

/**
 * Get menum by type
 * @param {object} state
 * @param {('header'|'footer'|'catalog'|'promo')} type
 */
function getMenuByType(state, type) {
  const { menus } = state
  return menus.find((menu) => menu.menu_type === type)
}

export const getters = {
  mobileMenu(state) {
    return getMenuByType(state, 'mobile')
  },
  desktopMenu(state) {
    return getMenuByType(state, 'header')
  },
  promoMenu(state) {
    return getMenuByType(state, 'promo')
  },
  topMenu(state) {
    return getMenuByType(state, 'top')
  },
  catalogMenu(state) {
    return getMenuByType(state, 'catalog')
  },
  footerMenu(state) {
    return getMenuByType(state, 'footer')
  }
}
