import { mount, createLocalVue } from '@vue/test-utils'

import { BContainer } from 'bootstrap-vue'

import BlockJumbotron from '@/components/shared/BlockJumbotron'

const localVue = createLocalVue()
localVue.component('BContainer', BContainer)

describe('BlockPostNavigation', () => {
  let jumbotronContent

  function createBlockJumbotron() {
    const wrapper = mount(BlockJumbotron, {
      localVue,
      propsData: {
        content: {
          title: 'title',
          images: {
            background_xl: '/img/blog/background_xl.jpg',
            background_lg: '/img/blog/background_lg.jpg',
            background_md: '/img/blog/background_md.jpg',
            background_sm: '/img/blog/background_sm.jpg',
            background_xs: '/img/blog/background_xs.jpg'
          }
        }
      }
    })

    return wrapper
  }

  beforeEach(() => {
    jumbotronContent
  })

  test('render block jumbotron', () => {
    const wrapper = createBlockJumbotron()

    expect(wrapper.element).toMatchSnapshot()
  })
})
