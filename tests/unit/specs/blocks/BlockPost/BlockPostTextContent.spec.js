import { mount, createLocalVue } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'

import { BContainer } from 'bootstrap-vue'

import BlockPostTextContent from '@/components/blocks/BlockPost/BlockPostTextContent'

import createFactory from '@/api/helpers/factory'
import postAttrs from '@/api/factories/post'

const localVue = createLocalVue()
localVue.component('BContainer', BContainer)

describe('BlockPostTextContent', () => {
  let textContent

  function createBlockPostTextContent() {
    const wrapper = mount(BlockPostTextContent, {
      localVue,
      propsData: {
        content: _cloneDeep(textContent)
      }
    })

    return wrapper
  }

  beforeEach(() => {
    const post = createFactory(postAttrs, 1)
    const textBlock = post[0].blocks.find((item) => item.type === 'text')

    textContent = textBlock.content
  })

  test('render posts text', () => {
    const wrapper = createBlockPostTextContent()

    expect(wrapper.element).toMatchSnapshot()
  })
})
