export default {
  computed: {
    formattedPreviews() {
      const previewVideoIndex = this.previews.findIndex(
        (preview) => preview.preview_type === 'video'
      )

      const previewsClone = [...this.previews]
      const videoPreview = previewsClone[previewVideoIndex]

      /* istanbul ignore else */
      if (videoPreview) {
        previewsClone.splice(previewVideoIndex, 1)
        return [previewsClone[0], videoPreview, ...previewsClone.slice(1)]
      }

      return this.previews
    }
  }
}
