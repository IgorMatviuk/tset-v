const db = require('../../db')

function testimonials(req, res) {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 8
  const posts = db.posts.slice(0, limit)

  res.jsonp({
    data: posts,
    meta: {
      current_page: page,
      total: db.posts.length,
      tags: {
        title: 'Блог Virna',
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
