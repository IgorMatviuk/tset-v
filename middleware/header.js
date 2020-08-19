import { mutationTypes as uiMutationsTypes } from '@/store/ui'

export default function({ isHMR, route, store, params }) {
  if (isHMR) {
    return
  }

  const isHomePage =
    route.path === '/' ||
    route.path === `/${params.lang}` ||
    route.path === `/${params.lang}/`

  if (isHomePage) {
    store.commit(`ui/${uiMutationsTypes.SET_BACKGROUND_REVEALED_TOGGLE}`, false)
  } else {
    store.commit(`ui/${uiMutationsTypes.SET_BACKGROUND_REVEALED_TOGGLE}`, true)
    store.commit(
      `ui/${uiMutationsTypes.SET_PRELOADER_VISIBILITY_TOGGLE}`,
      false
    )
  }
}
