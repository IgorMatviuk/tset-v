import { mount, createLocalVue } from '@vue/test-utils'

import { BContainer } from 'bootstrap-vue'

import BlockPostNavigation from '@/components/blocks/BlockPost/BlockPostNavigation'

const localVue = createLocalVue()
localVue.component('BContainer', BContainer)

describe('BlockPostNavigation', () => {
  function createBlockPostNavigation(props) {
    const wrapper = mount(BlockPostNavigation, {
      localVue,
      propsData: {
        ...props
      },
      mocks: {
        $i18n: {
          path: (url) => url
        }
      },
      stubs: ['svg-icon', 'NuxtLink']
    })

    return wrapper
  }

  test('render post navigation', () => {
    const links = {
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
    }

    const wrapper = createBlockPostNavigation({ links })

    expect(wrapper.element).toMatchSnapshot()
  })

  test('render post navigation without next link', () => {
    const links = {
      prev: {
        slug:
          'sovet-v-dekret-kak-podobrat-stilnye-letnie-platya-i-sarafany-dlya-beremennyh',
        title:
          'Совет в декрет! Как подобрать стильные летние платья и сарафаны для беременных?'
      }
    }

    const wrapper = createBlockPostNavigation({ links })

    expect(wrapper.element).toMatchSnapshot()
  })

  test('render post navigation without previous link', () => {
    const links = {
      next: {
        slug:
          'sovet-v-dekret-kak-podobrat-stilnye-letnie-platya-i-sarafany-dlya-beremennyh',
        title:
          'Совет в декрет! Как подобрать стильные летние платья и сарафаны для беременных?'
      }
    }

    const wrapper = createBlockPostNavigation({ links })

    expect(wrapper.element).toMatchSnapshot()
  })
})
