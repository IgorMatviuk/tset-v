const featuresAttr = {
  title(i) {
    const titles = [
      'Собственное производство одежды',
      'Бесплатная доставка от 1 000 грн',
      '14 дней на обмен и возврат'
    ]

    return titles[i % titles.length]
  },
  icon(i) {
    const icons = ['sewing-machine', 'delivery', 'exchange-refund']

    return icons[i % icons.length]
  }
}

module.exports = featuresAttr
