const db = require('../../db')

function posts(req, res) {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 8
  const posts = db.posts.slice(0, limit)

  res.jsonp({
    data: posts,
    meta: {
      current_page: page,
      total: db.posts.length
    }
  })
}

module.exports = posts
