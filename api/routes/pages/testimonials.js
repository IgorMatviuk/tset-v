const db = require('../../db')

function testimonials(req, res) {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 8

  const featuredTestimonials = db.testimonials.slice(0, 4)
  const byPageTestimonials = db.testimonials.slice(0, limit)

  res.jsonp({
    data: {
      featured_testimonials: featuredTestimonials,
      testimonials: byPageTestimonials
    },
    meta: {
      current_page: page,
      total: db.testimonials.length,
      tags: {
        title: 'Отзывы Virna',
        description: 'Virna',
        keywords: 'Virna',
        og_title: 'Virna',
        og_image: `/img/some-img.jpg`,
        og_description: 'Virna'
      }
    }
  })
}

module.exports = testimonials
