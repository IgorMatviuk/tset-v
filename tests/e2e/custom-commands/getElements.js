module.exports = {
  command(selector, callback) {
    this.execute(
      function(selector) {
        const elements = document.querySelectorAll(selector)
        return elements
      },
      [selector],
      (result) => {
        callback(result.value)
      }
    )

    return this
  }
}
