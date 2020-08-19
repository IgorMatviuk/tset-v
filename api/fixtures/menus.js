const menus = [
  {
    menu_type: 'header',
    columns: [
      {
        id: 1,
        name: 'Акции',
        slug: 'specials',
        items: []
      },
      {
        id: 2,
        name: 'Покупателям',
        slug: '',
        items: [
          { name: 'Оплата', slug: 'oplata', items: [] },
          { name: 'Доставка', slug: 'dostavka', items: [] },
          { name: 'Отзывы', slug: 'otzyvy', items: [] },
          { name: 'Возврат и обмен', slug: 'vozvrat-i-obmen', items: [] }
        ]
      },
      {
        id: 3,
        name: 'О компании',
        slug: '',
        items: [
          { id: 4, name: 'Блог', slug: 'blog', items: [] },
          { id: 5, name: 'Договор оферты', slug: 'dogovor-oferty', items: [] },
          { id: 6, name: 'Сотрудничество', slug: 'sotrudnichestvo', items: [] },
          { id: 7, name: 'Контакты', slug: 'contacts', items: [] }
        ]
      }
    ]
  },
  {
    menu_type: 'footer',
    columns: [
      {
        id: 8,
        name: 'Покупателям',
        slug: '',
        items: [
          { id: 9, name: 'Каталог', slug: 'catalog', items: [] },
          { id: 10, name: 'Новинки', slug: 'novelty', items: [] },
          { id: 11, name: 'Sale', slug: 'sale', items: [] },
          {
            id: 12,
            name: 'Возврат и обмен',
            slug: 'vozvrat-i-obmen',
            items: []
          },
          { id: 13, name: 'Оплата', slug: 'oplata', items: [] },
          { id: 14, name: 'Доставка', slug: 'dostavka', items: [] }
        ]
      },
      {
        id: 15,
        name: 'О компании',
        slug: '',
        items: [
          { id: 16, name: 'Отзывы', slug: 'otzyvy', items: [] },
          { id: 17, name: 'О нас', slug: 'o-nas', items: [] },
          { id: 18, name: 'Блог', slug: 'blog', items: [] },
          { id: 19, name: 'Договор оферты', slug: 'dogovor-oferty', items: [] },
          {
            id: 20,
            name: 'Сотрудничество',
            slug: 'sotrudnichestvo',
            items: []
          },
          { id: 21, name: 'Контакты', slug: 'contacts', items: [] }
        ]
      }
    ]
  },
  {
    menu_type: 'catalog',
    columns: [
      {
        id: 22,
        name: 'Платья',
        slug: '',
        items: [
          { id: 23, name: 'Все платья', slug: 'platia', items: [] },
          {
            id: 24,
            name: 'Повседневные платья',
            slug: 'povsednevnye-platia',
            items: []
          },
          {
            id: 25,
            name: 'Нарядные платья',
            slug: 'natyandye-platia',
            items: []
          },
          {
            id: 26,
            name: 'Летние платья',
            slug: 'letnie-platia',
            items: []
          }
        ]
      },
      { id: 27, name: 'Юбки', slug: 'yubki', items: [] }
    ]
  },
  {
    menu_type: 'promo',
    columns: [
      {
        id: 28,
        name: 'Sale',
        slug: 'sale',
        items: []
      },
      {
        id: 29,
        name: 'Новинки',
        slug: 'new',
        items: []
      }
    ]
  },
  {
    menu_type: 'top',
    columns: [
      {
        id: 30,
        name: 'О нас',
        slug: 'about',
        items: []
      },
      {
        id: 31,
        name: 'Sale',
        slug: 'sale',
        items: []
      }
    ]
  },
  {
    menu_type: 'mobile',
    columns: [
      {
        id: 32,
        name: 'О нас',
        slug: 'about',
        items: []
      },
      {
        id: 33,
        name: 'Sale',
        slug: 'sale',
        items: []
      },
      {
        id: 34,
        name: 'АКЦИИ',
        slug: 'promo',
        items: []
      }
    ]
  }
]

module.exports = menus
