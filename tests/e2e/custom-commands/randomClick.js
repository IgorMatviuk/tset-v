module.exports = {
  command(params, callback) {
    let targetElement
    let randomIndex

    this.getElements(params.fromElements, (elements) => {
      const elementsCount = elements.length
      randomIndex = Math.floor(Math.random() * elementsCount)
      targetElement = elements[randomIndex]
    })
      .perform(() => {
        this.execute(
          function(target) {
            const parent = target.parentNode
            const offsetTop = target.offsetTop
            parent.scrollTop = offsetTop
          },
          [targetElement],
          () => {
            params.section.click({
              selector: params.trigger,
              index: randomIndex
            })
          }
        )
      })
      .perform(() => callback && callback(randomIndex))
  }
}
