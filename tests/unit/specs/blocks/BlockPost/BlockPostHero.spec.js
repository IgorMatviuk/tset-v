import { shallowMount, createLocalVue } from '@vue/test-utils'
import _cloneDeep from 'lodash.clonedeep'

import { BContainer } from 'bootstrap-vue'

import BlockPostHero from '@/components/blocks/BlockPost/BlockPostHero'

import createFactory from '@/api/helpers/factory'
import postAttrs from '@/api/factories/post'

const localVue = createLocalVue()
localVue.component('BContainer', BContainer)

describe('BlockPostHero', () => {
  let posts

  function createBlockPostHero() {
    const wrapper = shallowMount(BlockPostHero, {
      localVue,
      propsData: {
        content: _cloneDeep(posts[0])
      }
    })

    return wrapper
  }

  beforeEach(() => {
    posts = createFactory(postAttrs, 1)
  })

  test('render post hero', () => {
    const wrapper = createBlockPostHero()

    expect(wrapper.element).toMatchSnapshot()
  })
})
