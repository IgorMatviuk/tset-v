const createFactory = require('../../helpers/factory')

function posts(req, res) {
  const postList = createFactory(require('../../factories/post'), 6)

  res.jsonp({
    data: {
      post: postList[0],
      related_posts: postList.slice(1)
    },
    links: {
      prev: {
        slug:
          'sovet-v-dekret-kak-podobrat-stilnye-letnie-platya-i-sarafany-dlya-beremennyh',
        title:
          'Совет в декрет! Как подобрать стильные летние платья и сарафаны для беременных?'
      },
      next: {
        slug:
          'made-in-ukraine-massmarket-protiv-ukrainskogo-brenda-chto-vybrat',
        title:
          'Made in Ukraine! Массмаркет против украинского бренда, что выбрать?'
      }
    },
    meta: {
      title: 'Статья Virna',
      description: 'Virna',
      keywords: 'Virna',
      og_title: 'Virna',
      og_image: `/img/some-img.jpg`,
      og_description: 'Virna'
    }
  })
}

module.exports = posts
