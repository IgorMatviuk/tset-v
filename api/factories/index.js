const _shuffle = require('lodash.shuffle')

const createFactory = require('../helpers/factory')

module.exports = {
  posts: createFactory(require('./post'), 50),
  testimonials: createFactory(require('./testimonial'), 50),
  products: _shuffle(createFactory(require('./product'), 144)),
  features: _shuffle(createFactory(require('./features'), 4))
}
