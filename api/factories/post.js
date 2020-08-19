const postAttrs = {
  title() {
    return 'Совет в декрет! Как подобрать стильные летние платья и сарафаны для беременных?'
  },

  slug() {
    return 'sovet-v-dekret-kak-podobrat-stilnye-letnie-platya-i-sarafany-dlya-beremennyh'
  },

  published_at() {
    return '17 июля 2018'
  },

  base_image() {
    return {
      post_xl: '/img/posts/post_xl.jpg',
      post_lg: '/img/posts/post_lg.jpg',
      post_md: '/img/posts/post_md.jpg',
      post_sm: '/img/posts/post_sm.jpg',
      post_xs: '/img/posts/post_xs.jpg',
      post_main_xl: '/img/posts/post_main_xl.jpg',
      post_main_lg: '/img/posts/post_main_lg.jpg',
      post_main_md: '/img/posts/post_main_md.jpg',
      post_main_sm: '/img/posts/post_main_sm.jpg',
      post_main_xs: '/img/posts/post_main_xs.jpg'
    }
  },

  blocks() {
    return [
      {
        type: 'text',
        content:
          '<p>Последнее время, мы всё чаще слышим фразу «Made in Ukraine», она приобрела совсем новый смысл. Внезапно, стереотип “наше – значит плохо” сменился на полную противоположность. И дело не только в патриотизме! А в чем? <b>Почему стоит выбирать именно украинский бренд?</b> Почему мы всё реже заглядываем в магазины известных масс-маркетов? Читай дальше!</p>'
      },
      {
        type: 'slider',
        content: {
          items: [
            {
              image: {
                post_slide_xl: '/img/posts/slider_preview_xl.jpg',
                post_slide_lg: '/img/posts/slider_preview_lg.jpg',
                post_slide_md: '/img/posts/slider_preview_md.jpg',
                post_slide_sm: '/img/posts/slider_preview_sm.jpg',
                post_slide_xs: '/img/posts/slider_preview_xs.jpg'
              },
              title: 'image title'
            },
            {
              image: {
                post_slide_xl: '/img/posts/slider_preview_xl.jpg',
                post_slide_lg: '/img/posts/slider_preview_lg.jpg',
                post_slide_md: '/img/posts/slider_preview_md.jpg',
                post_slide_sm: '/img/posts/slider_preview_sm.jpg',
                post_slide_xs: '/img/posts/slider_preview_xs.jpg'
              },
              title: 'image title'
            },
            {
              image: {
                post_slide_xl: '/img/posts/slider_preview_xl.jpg',
                post_slide_lg: '/img/posts/slider_preview_lg.jpg',
                post_slide_md: '/img/posts/slider_preview_md.jpg',
                post_slide_sm: '/img/posts/slider_preview_sm.jpg',
                post_slide_xs: '/img/posts/slider_preview_xs.jpg'
              },
              title: 'image title'
            }
          ]
        }
      },
      {
        type: 'text',
        content:
          '<h2>Уникальность и ещё раз уникальность</h2><p>Такие популярные масс-маркеты, как Inditex (Zara, Pull&Bear и т.д.) и H&M – легкий способ быть в тренде и хорошо выглядеть без внушительных затрат. Но ещё это легкий способ… встретить на улице девушку в таком же изделии. Признайся, у тебя было такое? Идёшь по парку, думая, что сегодня такой день, который невозможно испортить и вот тут она … девушка в таком же платье, с кем не бывало? Ведь быть уникальной хочется всем и каждой, правда? Пожалуй, именно поэтому знаменитости мирового масштаба были замечены в вещах «Made in Ukraine». Rihanna, Lady Gaga, Моника Белуччи, Beyonce мелькали в статьях с заголовками “шляпа/платье от украинского бренда …”. Почему? Потому что уникально!</p>'
      },
      {
        type: 'video',
        content: {
          poster_url_xl: '/video/post/poster_xl.jpg',
          poster_url_lg: '/video/post/poster_lg.jpg',
          video_url: '/video/post/history-video.mp4'
        }
      },
      {
        type: 'text',
        content:
          '<h2>Качество товара</h2><p>Согласитесь, что товары масс-маркета не самого высокого качества. Бывает, что платье или сарафан тебе очень подошли, но в нём, ты чувствуешь себя завернутой в полиэтиленовый пакет. Нет комфорта и приятного ощущения от ткани, даже внешний вид не компенсирует дискомфорт при носке. Что касается большинства украинских брендов женской одежды, то они используют качественные ткани, которые в составе имеют натуральные волокна, что добавляет комфорт и уют каждому изделию. Главное не забывать важный момент, что почти всегда цена равна качеству, кроме тех случаев, когда мы переплачиваем за название на бирке. Поэтому, при покупке изделия, нужно соотносить эти два понятия. Что качается бренда «Virna», то он создаёт изделия из самых качественных тканей в очень удобных фасонах на каждый день.</p>'
      },
      {
        type: 'text',
        content:
          '<h2>Лишние покупки</h2><p>Когда ты видишь в масс-маркете футболку за 200 грн, то тебе так и хочется взять её, а лучше таких 3, чтобы разнообразить свой гардероб. Из-за низкой цены у каждой девушки обостряется желание набрать всего побольше. Мы покупаем и покупаем, а вся одежда собирается в шкафах или выбрасывается, со временем, в мусор. Возможно, кому-то именно такой вариант подходит, но большинство девушек стримятся использовать капсульный гардероб, чтобы 3-4 вещи помогали создавать крутые образы каждый день.</p>'
      },
      {
        type: 'slider',
        content: {
          items: [
            {
              image: {
                post_slide_xl: '/img/posts/slider_preview_xl.jpg',
                post_slide_lg: '/img/posts/slider_preview_lg.jpg',
                post_slide_md: '/img/posts/slider_preview_md.jpg',
                post_slide_sm: '/img/posts/slider_preview_sm.jpg',
                post_slide_xs: '/img/posts/slider_preview_xs.jpg'
              },
              title: 'image title'
            },
            {
              image: {
                post_slide_xl: '/img/posts/slider_preview_xl.jpg',
                post_slide_lg: '/img/posts/slider_preview_lg.jpg',
                post_slide_md: '/img/posts/slider_preview_md.jpg',
                post_slide_sm: '/img/posts/slider_preview_sm.jpg',
                post_slide_xs: '/img/posts/slider_preview_xs.jpg'
              },
              title: 'image title'
            }
          ]
        }
      },
      {
        type: 'text',
        content:
          '<h2>Поддерживаем национального производителя и любимые бренды</h2><p>Многие жители других стран просто обожают свои бренды, свою еду и свои товары. Причина проста! Они ценят и уважают то, что создавалось веками именно у них. И пусть продукт украинского производства ничем не хуже их национального, они заплатят больше, но выберут национального производителя. Может и нам стоит делать так же? Воспитывать следующее поколение с любовью к родным товарам и продуктам. Так что же выберешь ты? Любимый масс-маркет или украинский бренд? Решай! А лучше переходи к нам в каталог и смотри товары, ведь в такие изделия невозможно не влюбиться!</p>'
      }
    ]
  }
}

module.exports = postAttrs
