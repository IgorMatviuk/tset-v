import Vue from 'vue'

/**
 * Viewed products storage using IndexedDB
 */
class ViewedProducts {
  constructor() {
    this.db = null
  }

  /**
   * Conntect to the database
   */
  connectToDatabase() {
    const request = indexedDB.open('products')

    return new Promise((resolve, reject) => {
      request.onupgradeneeded = () => {
        const db = request.result
        db.createObjectStore('recently_viewed', { keyPath: 'id' })
      }

      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onerror = () => {
        reject(new Error('Cannot connect to the database.'))
      }
    })
  }

  /**
   * Create a product entry in the storage
   * @param {object} product
   */
  async incrementing(product) {
    const transaction = this.db.transaction('recently_viewed', 'readwrite')

    const recentlyViewedStore = transaction.objectStore('recently_viewed')

    const productEntry = await this.getById(recentlyViewedStore, product.id)

    if (!productEntry) {
      return this.update(recentlyViewedStore, product)
    }

    return Promise.resolve()
  }

  /**
   * Get project entry by id
   * @param {IDBObjectStore} store
   * @param {number} id
   * @returns {Promise}
   */
  getById(store, id) {
    const request = store.get(id)

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result)
      }

      request.onerror = () => {
        reject(request.error)
      }
    })
  }

  /**
   * Get all product entries
   * @returns {Promise}
   */
  getAll() {
    const transaction = this.db.transaction('recently_viewed', 'readonly')
    const recentlyViewedStore = transaction.objectStore('recently_viewed')

    const request = recentlyViewedStore.getAll()

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result)
      }

      request.onerror = () => {
        reject(request.error)
      }
    })
  }

  /**
   * Add or update a product entry
   * @param {IDBObjectStore} store
   * @param {object} payload
   */
  update(store, payload) {
    const storeRequest = store.add(payload)

    return new Promise((resolve, reject) => {
      storeRequest.onsuccess = () => {
        resolve(storeRequest.result)
      }

      storeRequest.onerror = () => {
        reject(storeRequest.error)
      }
    })
  }
}

const viewedProducts = {}

viewedProducts.install = function(Vue) {
  Vue.prototype.$viewedProducts = new ViewedProducts()
}

Vue.use(viewedProducts)
