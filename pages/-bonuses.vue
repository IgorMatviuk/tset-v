<template>
  <main class="bonuses-page">
    <TheBreadcrumb :items="breadcrumb" :is-float="true" />
    <BlockJumbotron class="bonuses-page__jumbotron" :content="heroContent">
      <div class="bonuses-page__title">{{ $t('bonusesPage.title') }}</div>
      <div class="bonuses-page__subtitle">Virna <b>points</b></div>
    </BlockJumbotron>
    <template v-for="(block, index) in page.data.blocks">
      <BlockBonusesContent
        v-if="block.type === 'text'"
        :key="index"
        :content="block.content"
      />
      <BlockBonusesMemberRoad
        v-else-if="block.type === 'member-road'"
        :key="index"
        :content="block.content"
      />
      <BlockBlockquote
        v-else-if="block.type === 'blockquote'"
        :key="index"
        :content="block.content"
        class="bonuses-page__blockquote"
      />
      <BlockBonusesTable
        v-else-if="block.type === 'table'"
        :key="index"
        :items="block.content.items"
      />
      <BlockBonusesVip
        v-else-if="block.type === 'vip-bonuses'"
        :key="index"
        :content="block.content"
      />
      <BlockBonusesFaq
        v-else-if="block.type === 'faq'"
        :key="index"
        :content="block.content"
      />
    </template>
  </main>
</template>

<script>
import TheBreadcrumb from '@/components/layout/breadcrumb/TheBreadcrumb'
import BlockJumbotron from '@/components/shared/BlockJumbotron'
import BlockBonusesContent from '@/components/blocks/BlockBonuses/BlockBonusesContent'
import BlockBonusesMemberRoad from '@/components/blocks/BlockBonuses/BlockBonusesMemberRoad'
import BlockBlockquote from '@/components/shared/BlockBlockquote'
import BlockBonusesTable from '@/components/blocks/BlockBonuses/BlockBonusesTable'
import BlockBonusesVip from '@/components/blocks/BlockBonuses/BlockBonusesVip'
import BlockBonusesFaq from '@/components/blocks/BlockBonuses/BlockBonusesFaq'

import seoMeta from '@/mixins/seo-meta'
import breadcrumb from '@/mixins/breadrumb'

const mockData = {
  data: {
    blocks: [
      {
        type: 'text',
        content:
          '<h2>уважаемые покупатели!</h2><p>Специально для Вас мы разработали программу лояльности, которая сделает покупки в нашем интернет-магазине более приятными и выгодными. С помощью нашей программы лояльности, Вы сможете экономить на покупках до 50% от стоимости товаров. Начисление и списание бонусов происходит даже при покупке подарочных сертификатов и вещей со скидкой. </p>'
      },
      {
        type: 'member-road',
        content: {
          title: 'Как стать участником программы:',
          items: [
            {
              icon: 'bonuses-registration',
              content: 'Зарегистрируйтесь в личном кабинете на сайте'
            },
            {
              icon: 'bonuses-shop',
              content: 'Сделайте покупку на сайте'
            },
            {
              icon: 'bonuses-diamond',
              content: 'Получите  бонусы на следующую покупку'
            }
          ]
        }
      },
      {
        type: 'text',
        content:
          '<h2>что такое бонусы?</h2><p>Бонусы – это денежное вознаграждение  за то, что вы покупаете в интернет-магазине Virna. За каждую покупку на ваш счет будут начислены бонусы. Бонусы  будут называться Virna Points.</p><p>В нашей бонусной программе 1 бонус = 1 гривне,  и потратить эти бонусы можно на любые последующие покупки на нашем сайте.</p>'
      },
      {
        type: 'blockquote',
        content:
          'Бонусы позволяют <b>экономить деньги</b> на покупках! Оплачивайте бонусами <b>до 50% от суммы заказа</b>'
      },
      {
        type: 'text',
        content:
          '<h3>Как стать участником программы:</h3><p>Каждому Пользователю при регистрации на сайте virna.ua открывается бонусный счет, и он автоматически становится участником программы лояльности «Virna Points». Став участником дисконтной программы, Вы накапливаете бонусы, которые можете использовать для получения скидок при оформлении заказов.</p><p>Каждый раз, когда Вы заходите  на сайт и оплачиваете покупки -  Вы получаете бонусы.  Бонус за покупку начисляется от суммы оплаченного Вами заказа, а его процент зависит от суммы всех предыдущих покупок. Более детально в таблице.</p>'
      },
      {
        type: 'table',
        content: {
          items: [
            {
              amount: 'от первой покупки до 3000 грн',
              percent: '5%'
            },
            {
              amount: 'от 3001 грн до 8000 грн',
              percent: '7%'
            },
            {
              amount: 'от 8001 грн и больше',
              percent: '10%'
            }
          ]
        }
      },
      {
        type: 'text',
        content:
          '<p>После оплаты покупки, Вы можете посмотреть сумму бонусов и общую сумму покупок в личном кабинете.</p>'
      },
      {
        type: 'text',
        content:
          '<h3>Как проверить состояние бонусного счета?</h3><p>Все ваши бонусы хранятся на отдельном виртуальном счету.  Состояние вашего бонусного счета и все операции по начислению и списанию бонусов вы можете всегда посмотреть в личном кабинете в закладке «Мои бонусы». Бонусы доступны к использованию через 14 дней после получения и оплаты заказа. Оплатить бонусами можно не более 50% стоимости заказа.</p>'
      },
      {
        type: 'text',
        content:
          '<h3>Как использовать бонусы?</h3><p>Для использования бонусов необходимо авторизоваться на сайте, и если на вашем счету имеются неиспользованные бонусы, то при оформлении заказа, система автоматически покажет вам количество имеющихся бонусов и предложит использовать их для оплаты текущего заказа, при этом Вам будет начислены бонусы.  Баллы начисляется на ту часть товара, которая оплачена деньгами (если частично использованы баллы). Бонусы, начисленные за оплаченные Вами товары, можно потратить на любые последующие покупки в нашем сайте.</p>'
      },
      {
        type: 'blockquote',
        content:
          'Курс обмена бонусов <b>1 бонус = 1 гривна.</b> Чем больше покупка, <b>тем больше экономия!</b>'
      },
      {
        type: 'vip-bonuses',
        content: {
          title: 'vip бонусы',
          items: [
            {
              icon: 'bonuses-holiday',
              title: 'Праздничные бонусы',
              content:
                'В день рождения вы получаете дополнительных <b>200 бонусов.</b> Срок действия подарочных бонусов  7 дней до дня рождения, и 7 дней после дня рождения. По истечению этого срока неиспользованные бонусы будут аннулированы.'
            },
            {
              icon: 'bonuses-content',
              title: 'Контентные бонусы',
              content:
                'Контентные бонусы начисляются при размещении на сайте отзывов о товаре. Отзывы о товаре могут размещать все зарегистрированные пользователи. Бонусы за размещенные отзывы  начисляются всем пользователям при условии, что публикация соответствует определенным требованиям. Подробнее о требованиях и условиях начисления контентных бонусов  <a href="#">здесь.</a>'
            },
            {
              icon: 'bonuses-marketing',
              title: 'Маркетинговые бонусы',
              content:
                'Бонусы за подписку на email рассылку - <b>100 бонусов</b>'
            }
          ]
        }
      },
      {
        type: 'faq',
        content: {
          title: 'основные faq программы лояльности:',
          items: [
            {
              title: 'Что такое бонусная программа?',
              content:
                'Бонусная программа – это специальная программа лояльности для наших постоянных клиентов. Она позволяет участникам программы накапливать бонусы и использовать их, оплачивая новые покупки.'
            },
            {
              title: 'Как стать участник бонусной программа?',
              content:
                'Пройдите процедуру регистрации и вы автоматически станете участником бонусной программы. Сколько бонусов вы будете получать, став участником программы?  50 бонусов за отзывы на купленные товары.'
            },
            {
              title: 'Как вы сможете потратить накопленные бонусы?',
              content:
                'Вы можете рассчитываться накопленными бонусами при осуществлении своих последующих покупок в интернет-магазине . При использовании бонусов вы получаете скидку на товар из расчета 1 бонус = 1 грн. Вы можете использовать бонусы при получении скидки на часть но не более 50% от стоимости товара. Бонусами можно оплатить любой товар на сайте, кроме подарочных сертификатов.'
            },
            {
              title: 'Что происходит с бонусами при возврате товара?',
              content:
                'Вы можете рассчитываться накопленными бонусами при осуществлении своих последующих покупок в интернет-магазине . При использовании бонусов вы получаете скидку на товар из расчета 1 бонус = 1 грн. Вы можете использовать бонусы при получении скидки на часть но не более 50% от стоимости товара. Бонусами можно оплатить любой товар на сайте, кроме подарочных сертификатов.'
            }
          ]
        }
      }
    ]
  },
  meta: {
    title: 'Программа лояльности Virna',
    description: 'Virna',
    keywords: 'Virna',
    og_title: 'Virna',
    og_image: '/img/some-img.jpg',
    og_description: 'Virna'
  }
}

export default {
  components: {
    TheBreadcrumb,
    BlockJumbotron,
    BlockBonusesContent,
    BlockBonusesMemberRoad,
    BlockBlockquote,
    BlockBonusesTable,
    BlockBonusesVip,
    BlockBonusesFaq
  },
  mixins: [seoMeta, breadcrumb({ isStaticPage: true, pageName: 'bonuses' })],
  data() {
    return {
      page: mockData,
      heroContent: {
        images: {
          background_xl: '/img/bonuses/background_xl.jpg',
          background_lg: '/img/bonuses/background_lg.jpg',
          background_md: '/img/bonuses/background_md.jpg',
          background_sm: '/img/bonuses/background_sm.jpg',
          background_xs: '/img/bonuses/background_xs.jpg'
        }
      }
    }
  }
}
</script>

<style lang="scss">
.bonuses-page {
  &__jumbotron {
    margin-bottom: 35px;

    &.block-jumbotron {
      height: 250px;
    }

    .block-jumbotron__title {
      margin-top: 2px;
      margin-bottom: 0;
    }
  }

  &__title {
    display: none;
  }

  &__subtitle {
    b {
      display: block;
      color: $primary;
    }
  }

  &__blockquote {
    margin-top: 45px;
    margin-bottom: 45px;
  }

  .blockquote-text__description {
    padding-left: 17px;
  }

  @include media-breakpoint-up(md) {
    &__jumbotron {
      &.block-jumbotron {
        height: 300px;
      }
    }

    &__title {
      display: block;
      font-size: 35px;
      line-height: 45px;
    }

    &__subtitle {
      font-size: 35px;
      line-height: 45px;

      b {
        display: inline;
      }
    }

    .blockquote-text__description {
      max-width: 585px;
      padding-left: 4px;
    }
  }

  @include media-breakpoint-up(lg) {
    &__jumbotron {
      .block-jumbotron__title {
        margin-left: 0;
      }
    }

    .blockquote-text__description {
      padding-left: 9px;
      margin-left: 176px;
    }
  }

  @include media-breakpoint-up(xl) {
    &__jumbotron {
      margin-bottom: 40px;

      &.block-jumbotron {
        height: 350px;
      }
    }

    &__title {
      font-size: 40px;
      line-height: 50px;
    }

    &__subtitle {
      font-size: 40px;
      line-height: 50px;
    }

    &__blockquote {
      margin-top: 65px;
      margin-bottom: 60px;
    }

    .blockquote-text__description {
      max-width: 900px;
      padding-left: 19px;
      margin-left: 216px;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__jumbotron {
      &.block-jumbotron {
        height: 400px;
      }

      .block-jumbotron__title {
        margin-top: 29px;
      }
    }

    &__title,
    &__subtitle {
      font-size: 50px;
      line-height: 60px;
    }

    &__blockquote {
      margin-top: 78px;
      margin-bottom: 78px;
    }

    .blockquote-text__description {
      padding-left: 27px;
      margin-left: 255px;
    }
  }
}
</style>
