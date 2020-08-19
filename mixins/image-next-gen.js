export default {
  filters: {
    webp(imageUrl) {
      const [ext] = imageUrl.match(/.[^.]+$/)
      const extRegExp = new RegExp(`${ext}$`)

      return imageUrl.replace(extRegExp, '.webp')
    }
  }
}
