import { shallowMount } from '@vue/test-utils'

import BlockProductReview from '@/components/blocks/BlockProduct/BlockProductReview'

describe('BlockProductReview', () => {
  test('renders component itself', () => {
    const review = {
      author: 'Александра',
      published_at: '01.02.2020',
      title: 'Платье понравилось, но курьер ужасный',
      comment:
        'В самое волнующее и прекрасное для всех девушек время хочется чувствовать себя очень комфортно и уютно. Чтобы за эти 9 месяцев можно было насладиться жизнью, ощущать и получать только крутые впечатления.'
    }

    const wrapper = shallowMount(BlockProductReview, {
      propsData: { review }
    })

    expect(wrapper.find('.product-review__author').text()).toBe(review.author)
    expect(wrapper.find('.product-review__date').text()).toBe(
      review.published_at
    )
    expect(wrapper.find('.product-review__title').text()).toBe(review.title)
    expect(wrapper.find('.product-review__comment').text()).toBe(review.comment)
  })
})
