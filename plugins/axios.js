export default function({ $axios, store, redirect }) {
  $axios.onRequest((config) => {
    const locale = store.state.locale
    const paramsIndex = config.url.lastIndexOf('?')

    if (paramsIndex > -1) {
      config.url += `&locale=${locale}`
    } else {
      config.url += `?locale=${locale}`
    }
  })

  $axios.onError((error) => {
    // eslint-disable-next-line
    console.error(error.response.data.message)
  })
}
