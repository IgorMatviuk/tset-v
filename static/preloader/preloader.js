/* eslint-disable */
;(function() {
  var preloaderElem = document.querySelector('.preloader')
  document.body.style.overflow = 'hidden'
  document.body.style.height = '100px'

  if (!preloaderElem) return

  var preloaderDone = createEvent('preloader:done')

  function hidePreloader() {
    return new Promise(function(resolve) {
      preloaderElem.style.opacity = 0

      setTimeout(() => {
        preloaderElem.style.display = 'none'
        preloaderElem.classList.remove('preloader--animating')
        document.body.style.overflow = ''
        document.body.style.height = ''

        resolve()
      }, 300)
    })
  }

  function onAppLoaded() {
    setTimeout(function() {
      hidePreloader().then(function() {
        document.documentElement.removeEventListener('app:loaded', onAppLoaded)
        document.documentElement.dispatchEvent(preloaderDone)
      })
    }, 3000)
  }

  document.documentElement.addEventListener('app:loaded', onAppLoaded, false)
})()

function createEvent(name) {
  var event = document.createEvent('Event')
  event.initEvent(name, false, false)
  return event
}
