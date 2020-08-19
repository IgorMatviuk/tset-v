const testimonialAttrs = {
  title(i) {
    const titles = [
      'Супер магазин',
      'Спасибо, всем довольна',
      'Платье понравилось, но курьер ужасный'
    ]
    return titles[i % titles.length]
  },

  images(i) {
    const images = [
      {
        small: '/img/testimonials/mock-1__sm.jpg',
        large: '/img/testimonials/mock-1__lg.jpg'
      },
      {
        small: '/img/testimonials/mock-2__sm.jpg',
        large: '/img/testimonials/mock-2__lg.jpg'
      },
      {
        small: '/img/testimonials/mock-3__sm.jpg',
        large: '/img/testimonials/mock-3__lg.jpg'
      },
      {
        small: '/img/testimonials/mock-4__sm.jpg',
        large: '/img/testimonials/mock-4__lg.jpg'
      }
    ]

    return images[i % images.length]
  },

  reviews(i) {
    const reviews = [
      `В самое волнующее и прекрасное для всех девушек время хочется чувствовать себя очень комфортно и уютно. Чтобы за эти 9 месяцев можно было насладиться жизнью, ощущать и получать только крутые впечатления.
      А выглядеть хочется так же красиво и женственно. Ведь растянутые футболки и лосины с вытянутыми коленками – это только для дома.
      Ведь представляешь, лето, жара, солнце, а ты в красивом и удобном образе...`,
      `В самое волнующее и прекрасное для всех девушек время хочется чувствовать себя очень комфортно и уютно. Чтобы за эти 9 месяцев можно было насладиться жизнью, ощущать и получать только крутые впечатления.
      А выглядеть хочется так же красиво и женственно. Ведь растянутые футболки...`
    ]

    return reviews[i % reviews.length]
  },

  author(i) {
    const authors = ['Александра', 'Инна', 'Екатерина']

    return authors[i % authors.length]
  },

  pub_date(i) {
    const pubDate = ['01.02.2020', '01.12.2020', '11.02.2020']

    return pubDate[i % pubDate.length]
  },

  ratings(i) {
    const ratings = ['1', '2', '3', '4', '5', '2', '3', '5', '5', '1']

    return ratings[i % ratings.length]
  }
}

module.exports = testimonialAttrs
