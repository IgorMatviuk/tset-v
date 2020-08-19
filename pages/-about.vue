<template>
  <main class="about-page">
    <TheBreadcrumb :is-float="true" :items="breadcrumb" />
    <BlockJumbotron class="about-page__presentation" :content="heroContent">
      <div>{{ $t('aboutPage.title') }}</div>
      <div>{{ $t('aboutPage.subtitle') }}</div>
    </BlockJumbotron>
    <BlockAboutContent
      class="about-page__who-we"
      :content="contentMock.firstBlock"
      direction="right"
      type="overlay"
      :is-first="true"
    />
    <BlockBlockquote
      :content="contentMock.blockquote"
      class="about-page__blockquote"
    />
    <BlockAboutContent
      class="about-page__production"
      :content="contentMock.secondBlock"
      direction="left"
      type="overlay"
    />
    <BlockOurFeatures class="about-page__features" :features="featuresMock" />
    <BlockAboutContent
      class="about-page__history"
      :content="contentMock.thirdBlock"
      direction="right"
      type="background"
    />
    <BlockAboutContent
      class="about-page__team"
      :content="contentMock.fourthBlock"
      direction="left"
      type="stretch"
    />
  </main>
</template>

<script>
import TheBreadcrumb from '@/components/layout/breadcrumb/TheBreadcrumb'
import BlockJumbotron from '@/components/shared/BlockJumbotron'
import BlockAboutContent from '@/components/blocks/BlockAbout/BlockAboutContent'
import BlockBlockquote from '@/components/shared/BlockBlockquote'
import BlockOurFeatures from '@/components/blocks/BlockOurFeatures'

import breadcrumb from '@/mixins/breadrumb'

const contentMock = {
  firstBlock: {
    video: '/video/about-page/who-we-video.mp4',
    videoPoster: '/video/about-page/who-we-poster.jpg',
    title: 'Мы - украинский бренд женской одежды «VIRNA».',
    description: `<p>Нам уже больше 3х лет, у нас собственное производство , 300 м.кв. творческого пространства и более 15 000 выполненных заказов и довольных клиентов!</p>
                  <p>До ребрендинга мы были брендом «Look fashion room», который всегда хотел расти и развиваться и уже тогда у нас были глобальные идеи по захвату мира! <br>
                  Ладно, шутим, только женских сердец, благодаря нашим невероятным товарам, которые создаются со всей душой и любовью</p>
                  <p>Мы создаем такую одежду, которая будет радовать тебя каждый день, ведь она комфортная, стильная и не требующая повода для того, что бы её надеть (согласись, в твоём шкафчике уже и так много платьев, которые так и ждут свадьбы собачки подруги или приглашения Леонардо Ди Каприо на свидания).</p>`
  },
  blockquote: `Мир моды соткан из историй.<br><b>Теперь мы творим свою собственную,</b> и приглашаем Вас <b>рассказать эту историю вместе с нами.</b>`,
  secondBlock: {
    video: '/video/about-page/production-video.mp4',
    videoPoster: '/video/about-page/production-poster.jpg',
    title: 'собственное производство',
    description: `<p>Нам уже больше 3х лет, у нас собственное производство , 300 м.кв. творческого пространства и более 15 000 выполненных заказов и довольных клиентов!</p>
                  <p>До ребрендинга мы были брендом «Look fashion room», который всегда хотел расти и развиваться и уже тогда у нас были глобальные идеи по захвату мира! <br>
                  Ладно, шутим, только женских сердец, благодаря нашим невероятным товарам, которые создаются со всей душой и любовью</p>
                  <p>Мы создаем такую одежду, которая будет радовать тебя каждый день, ведь она комфортная, стильная и не требующая повода для того, что бы её надеть (согласись, в твоём шкафчике уже и так много платьев, которые так и ждут свадьбы собачки подруги или приглашения Леонардо Ди Каприо на свидания).</p>`
  },
  thirdBlock: {
    video: '/video/about-page/history-video.mp4',
    videoPoster: '/video/about-page/history-poster.jpg',
    title: 'Как все начиналось',
    description: `<p>Нам уже больше 3х лет, у нас собственное производство , 300 м.кв. творческого пространства и более 15 000 выполненных заказов и довольных клиентов!</p>
                  <p>До ребрендинга мы были брендом «Look fashion room», который всегда хотел расти и развиваться и уже тогда у нас были глобальные идеи по захвату мира! <br>
                  Ладно, шутим, только женских сердец, благодаря нашим невероятным товарам, которые создаются со всей душой и любовью</p>
                  <p>Мы создаем такую одежду, которая будет радовать тебя каждый день, ведь она комфортная, стильная и не требующая повода для того, что бы её надеть (согласись, в твоём шкафчике уже и так много платьев, которые так и ждут свадьбы собачки подруги или приглашения Леонардо Ди Каприо).</p>`
  },
  fourthBlock: {
    videoPoster: '/video/about-page/our-team-poster.jpg',
    title: 'наша творческая команда',
    description: `<p>Подбираем стильный фасон, в котором ты не будешь думать о том «Как сесть? Можно ли дышать? Как я выгляжу в профиль?», комбинируем с качественной тканью и трендовой расцветкой добавляем немного любви и безумства и получается волшебный первый образец нового платья.</p>
                  <p>Далее наши закройщики и швеи создают его – твой идеальный look и мы его бережно храним до встречи с тобой! Наш интернет-магазин сделает максимум для того, чтобы покупка была комфортной и приятной. А ещё, чтобы она была доступна для всех без исключения девушек, и ты могла себя радовать максимально часто. <br />Выбираем простоту, лёгкость, комфорт и стиль в одном изделии и это доказываем с каждым новым товаром.</p>
                  <p>Выбирая нас, ты каждый день будешь выглядеть на все 100 % .</p>`
  }
}

const featuresMock = [
  { title: 'Собственное производство одежды', icon: 'sewing-machine' },
  { title: 'Бесплатная доставка от 1 000 грн', icon: 'delivery' },
  { title: '14 дней на обмен и возврат', icon: 'exchange-refund' },
  { title: 'Уникальный дизайн платьев', icon: 'dress' }
]

export default {
  components: {
    TheBreadcrumb,
    BlockJumbotron,
    BlockAboutContent,
    BlockBlockquote,
    BlockOurFeatures
  },
  mixins: [breadcrumb({ isStaticPage: true, pageName: 'about' })],
  data() {
    return {
      contentMock,
      featuresMock,
      heroContent: {
        images: {
          background_xl: '/img/about/background_xl.jpg',
          background_lg: '/img/about/background_lg.jpg',
          background_md: '/img/about/background_md.jpg',
          background_sm: '/img/about/background_sm.jpg',
          background_xs: '/img/about/background_xs.jpg'
        }
      }
    }
  }
}
</script>

<style lang="scss">
.about-page {
  &__who-we {
    margin-top: 40px;
  }

  &__blockquote {
    margin-top: 42px;
  }

  &__production {
    margin-top: 64px;
  }

  &__features {
    padding-top: 36px;
  }

  &__history {
    padding-bottom: 31px;
    margin-top: 53px;
  }

  &__team {
    margin-bottom: 53px;
  }

  @include media-breakpoint-up(md) {
    &__who-we {
      margin-top: 43px;
    }

    &__blockquote {
      margin-top: 46px;
    }

    &__production {
      margin-top: 89px;
    }

    &__history {
      padding-bottom: 23px;
      margin-top: 37px;
    }

    &__team {
      margin-bottom: 0;
    }
  }

  @include media-breakpoint-up(lg) {
    &__who-we {
      margin-top: 93px;
    }

    &__blockquote {
      margin-top: 41px;
    }

    &__production {
      margin-top: 81px;
    }

    &__features {
      padding-top: 65px;
    }

    &__history {
      padding-bottom: 71px;
      margin-top: 122px;
    }
  }

  @include media-breakpoint-up(xl) {
    &__who-we {
      margin-top: 100px;
    }

    &__blockquote {
      margin-top: 104px;
    }

    &__production {
      margin-top: 132px;
    }

    &__features {
      padding-top: 104px;
    }

    &__history {
      padding-bottom: 42px;
      margin-top: 193px;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__who-we {
      margin-top: 115px;
    }

    &__blockquote {
      margin-top: 132px;
    }

    &__features {
      padding-top: 161px;
    }

    &__history {
      padding-bottom: 80px;
      margin-top: 203px;
    }
  }
}
</style>
