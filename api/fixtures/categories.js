const categories = [
  {
    id: '1',
    name: 'Платья',
    name_alias: 'Все платья',
    column: 1,
    status: 1,
    slug: 'platia',
    image_url: '/img/featured-products/category-img-2.jpg',
    categories: [
      {
        id: '3',
        name: 'Повседневные платья',
        slug: 'povsednevnye-platia',
        popularity: '0.1'
      },
      {
        id: '4',
        name: 'Нарядные платья',
        slug: 'naradnye-platia',
        popularity: '0.2'
      },
      {
        id: '5',
        name: 'Летние платья',
        slug: 'letnie-platia',
        popularity: '0.6'
      }
    ]
  },
  {
    id: '6',
    name: 'Сарафаны',
    column: 1,
    status: 1,
    slug: 'sarafany',
    image_url: '/img/featured-products/category-img-1.jpg',
    categories: []
  },
  {
    id: '7',
    name: 'Костюмы',
    name_alias: 'Все костюмы',
    column: 2,
    status: 1,
    slug: 'kostyumy',
    image_url: '/img/featured-products/category-img-2.jpg',
    categories: [
      {
        id: '9',
        name: 'Повседневные костюмы',
        slug: 'povsednevnye-kostyumy',
        popularity: '0.6'
      },
      {
        id: '10',
        name: 'Классические костюмы',
        slug: 'klassicheskie-kostyumy',
        popularity: '0.8'
      },
      {
        id: '11',
        name: 'Спортивные костюмы',
        slug: 'sportivnye-kostyumy',
        popularity: '0.1'
      },
      {
        id: '12',
        name: 'Летние костюмы',
        slug: 'letnie-kostyumy',
        popularity: '0.3'
      },
      { id: '13', name: 'Комбинезоны', slug: 'kombinezony', popularity: '0.7' }
    ]
  },
  {
    id: '14',
    name: 'Брюки и шорты',
    column: 3,
    status: 1,
    slug: 'bryuki-i-shorty',
    image_url: '/img/featured-products/category-img-1.jpg',
    categories: []
  },
  {
    id: '15',
    name: 'Юбки',
    column: 3,
    status: 1,
    slug: 'yubki',
    image_url: '/img/featured-products/category-img-2.jpg',
    categories: []
  },
  {
    id: '16',
    name: 'Гольфы',
    column: 3,
    status: 1,
    slug: 'golfy',
    image_url: '/img/featured-products/category-img-1.jpg',
    categories: []
  },
  {
    id: '17',
    name: 'Блузы и рубашки',
    column: 3,
    status: 1,
    slug: 'bluzy-i-rubashki',
    image_url: '/img/featured-products/category-img-2.jpg',
    categories: []
  },
  {
    id: '18',
    name: 'Свитеры и джемперы',
    column: 3,
    status: 1,
    slug: 'svitery-i-dzhempery',
    image_url: '/img/featured-products/category-img-1.jpg',
    categories: []
  },
  {
    id: '19',
    name: 'Верхняя одежда',
    name_alias: 'Все модели',
    column: 4,
    status: 1,
    slug: 'verhniaia-odezhda',
    image_url: '/img/featured-products/category-img-2.jpg',
    categories: [
      { id: '21', name: 'Пальто', slug: 'palto', popularity: '0.1' },
      { id: '22', name: 'Пиджаки', slug: 'pidzhaki', popularity: '0.2' },
      { id: '23', name: 'Тренчи', slug: 'trenchi', popularity: '0.3' }
    ]
  }
]

module.exports = categories
