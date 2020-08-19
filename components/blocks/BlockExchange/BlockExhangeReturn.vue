<template>
  <div>
    <BlockExhangeConditions :content="data.exchange" />
    <BlockExhangeDocuments :content="data.documents" />
    <BlockContent :content="data.Content" />
    <div class="BlockBlockquote-flex">
      <BlockBlockquote class="block-text" :content="data.blockText.title" />
    </div>
    <BlockExhangeInfo :content="data.blockInfo" />
  </div>
</template>

<script>
import BlockExhangeConditions from '@/components/blocks/BlockExchange/BlockExhangeConditions.vue'
import BlockExhangeDocuments from '@/components/blocks/BlockExchange/BlockExhangeDocuments.vue'
import BlockContent from '@/components/blocks/BlockExchange/BlockContent.vue'
import BlockBlockquote from '@/components/shared/BlockBlockquote.vue'
import BlockExhangeInfo from '@/components/blocks/BlockExchange/BlockExhangeInfo.vue'

export default {
  components: {
    BlockExhangeConditions,
    BlockExhangeDocuments,
    BlockContent,
    BlockBlockquote,
    BlockExhangeInfo
  },
  data() {
    return {
      data: {
        exchange: {
          title: 'обмен и возврат товаров',
          subtitle:
            'Товар может быть обменен или возвращен в течение 14 дней, с момента получения посылки. Дата получения посылки является та которая фиксируется в компании грузоперевозчика. Обмен и возврат осуществляется согласно со статьей 9 Закона Украины «О защите прав потребителя» ',
          items: [
            {
              number: '1',
              description:
                'Потребитель может вернуть новый товар, при этом должен быть сохранен товарный вид, фабричные ярлыки, бирки, и заполнена форма «обмен-возврат». Бланк для заполнения прилагается к Вашей посылке вместе с товаром, если по какой-то причине бланк отсутствует, Вы можете скачать его здесь, распечатать и заполнить.'
            },
            {
              number: '2',
              description:
                'Возврат и обмен товара осуществляется за счет покупателя (за исключением фабричного брака или ошибки при отправке товара нашей компанией)'
            },
            {
              number: '3',
              description:
                'Возврат и обмен осуществляется грузоперевозчиком «Новая почта». Реквизиты для отправки указаны в бланке «обмен-возврат» который вкладывается в каждую посылку, либо Вы можете скачать его здесь'
            }
          ]
        },
        documents: {
          items: [
            { image: '(image)' },
            { image: '(image)' },
            { image: '(image)' }
          ]
        },
        Content: {
          text0:
            'После получения нами посылки, склад осматривает товар в течении 1-3 рабочих дней. ',
          text1:
            'Бланк с заполненной формой «Обмен» передается на склад, для формирования отправки на другой выбранный вами товар (в случае необходимости, с вами свяжется менеджер, для уточнения деталей обмена). И отправка обмена в течении 1-5 рабочих дней.',
          text2:
            'Бланк с заполненной формой «Возврат» передается в бухгалтерию и в течении 5 рабочих дней осуществляется возврат денежных средств на указанные вами реквизиты карты. '
        },
        blockText: {
          title:
            'Хотим обратить ваше внимание, возврат средств за товар <strong>НЕВОЗМОЖЕН наложенным платежом </strong>'
        },
        blockInfo: {
          title: 'Остались дополнительные вопросы?',
          text: 'Свяжитесь с нами, и мы будем рады вам помочь!',
          phone: 'Тел. 0 800 332 512 (пн-пт 9:00-18:00) или напишите нам в',
          downloadForm: 'Скачать форму «обмен-возврат»'
        }
      }
    }
  }
}
</script>

<style lang="scss">
.BlockBlockquote-flex {
  display: flex;
  margin-left: -30%;
}

.block-text {
  display: flex;
  margin-top: 50px;
  margin-bottom: 50px;
  font-family: $font-family-base;
  font-size: 35px;
  font-style: normal;
  font-weight: 300;
  line-height: 44px;
  color: #000;
}

@include media-breakpoint-down(sm) {
  .BlockBlockquote-flex {
    display: flex;
    margin-left: -24px;
  }
}
</style>
