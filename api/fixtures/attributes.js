const attributes = [
  {
    id: 1,
    code: 'size',
    name: 'Размер',
    options: [
      { id: 11, label: 'One Size', slug: 'one-size', swatch_value: null },
      { id: 12, label: 'XSS', slug: 'xss', swatch_value: null },
      { id: 13, label: 'XS', slug: 'xs', swatch_value: null },
      { id: 14, label: 'S', slug: 's', swatch_value: null },
      { id: 15, label: 'M', slug: 'm', swatch_value: null },
      { id: 16, label: 'L', slug: 'l', swatch_value: null }
    ]
  },
  {
    id: 2,
    code: 'color',
    name: 'Цвет',
    options: [
      { id: 21, label: 'Белый', slug: 'belyj', swatch_value: '#ffffff' },
      { id: 22, label: 'Чёрный', slug: 'chyornyj', swatch_value: '#ffffff' },
      { id: 23, label: 'Красный', slug: 'krasnyj', swatch_value: '#ffffff' },
      { id: 24, label: 'Марсала', slug: 'marsala', swatch_value: '#ffffff' },
      { id: 25, label: 'Бургунди', slug: 'burgundi', swatch_value: '#ffffff' },
      { id: 26, label: 'Голубой', slug: 'goluboj', swatch_value: '#ffffff' },
      { id: 27, label: 'Синий', slug: 'sinij', swatch_value: '#ffffff' },
      { id: 28, label: 'Бежевый', slug: 'bezhevyj', swatch_value: '#ffffff' },
      {
        id: 29,
        label: 'Бутылочный',
        slug: 'bulylochtyj',
        swatch_value: '#ffffff'
      },
      {
        id: 30,
        label: 'Оранжевый',
        slug: 'oranzhevyj',
        swatch_value: '#ffffff'
      },
      {
        id: 31,
        label: 'Коричневый',
        slug: 'korichnevyj',
        swatch_value: '#ffffff'
      },
      { id: 32, label: 'Мятный', slug: 'myatnyj', swatch_value: '#ffffff' },
      {
        id: 33,
        label: 'Бирюзовый',
        slug: 'biryuzovyj',
        swatch_value: '#ffffff'
      },
      { id: 34, label: 'Жёлтый', slug: 'zhyoltyj', swatch_value: '#ffffff' }
    ]
  },
  {
    id: 3,
    code: 'pattern',
    name: 'Узор',
    options: [
      { id: 31, label: 'Однотонный', slug: 'odnotonnyj', swatch_value: null },
      { id: 32, label: 'Горошек', slug: 'goroshek', swatch_value: null },
      { id: 33, label: 'Цветочный', slug: 'cvetochnyj', swatch_value: null },
      {
        id: 34,
        label: 'Геометрический',
        slug: 'geometricheskij',
        swatch_value: null
      }
    ]
  },
  {
    id: 4,
    code: 'style',
    name: 'Стиль',
    options: [
      {
        id: 41,
        label: 'Повседневный',
        slug: 'povsednevnyj',
        swatch_value: null
      },
      { id: 42, label: 'Нарядный', slug: 'naryadnyj', swatch_value: null },
      { id: 43, label: 'Деловой', slug: 'delovoj', swatch_value: null },
      {
        id: 44,
        label: 'Классический',
        slug: 'klassicheskij',
        swatch_value: null
      }
    ]
  },
  {
    id: 5,
    code: 'material',
    name: 'Материал',
    options: [
      { id: 51, label: 'Лён', slug: 'lyon', swatch_value: null },
      { id: 52, label: 'Вискоза', slug: 'viskoza', swatch_value: null },
      { id: 53, label: 'Замша', slug: 'zamsha', swatch_value: null },
      { id: 54, label: 'Хлопок', slug: 'hlopok', swatch_value: null }
    ]
  }
]

module.exports = attributes
