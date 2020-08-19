import { shallowMount, createLocalVue } from '@vue/test-utils'
import { BContainer } from 'bootstrap-vue'

import BlockAboutContent from '@/components/blocks/BlockAbout/BlockAboutContent'

const localVue = createLocalVue()

localVue.component('BContainer', BContainer)

describe('BlockAboutContent', () => {
  let content
  let rightDirectionClass
  let leftDirectionClass
  let typeOverlayClass
  let typeBackgroundClass
  let typeStretchClass
  let isFirstClass

  beforeEach(() => {
    content = {}
    rightDirectionClass = 'about-content--is-right'
    leftDirectionClass = 'about-content--is-left'
    typeOverlayClass = 'about-content--overlay'
    typeBackgroundClass = 'about-content--background'
    typeStretchClass = 'about-content--stretch'
    isFirstClass = 'about-content--is-first'
  })

  test('has expected structure: type: overlay, direction: right, isFirst: true', () => {
    const wrapper = shallowMount(BlockAboutContent, {
      localVue,
      propsData: {
        content,
        type: 'overlay',
        direction: 'right',
        isFirst: true
      }
    })

    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.vm.directionContentClass).toBe(rightDirectionClass)
    expect(wrapper.vm.typeContentClass).toBe(typeOverlayClass)
    expect(wrapper.vm.isFirstContentClass).toBe(isFirstClass)
  })

  test('has expected structure: type: overlay, direction: left', () => {
    const wrapper = shallowMount(BlockAboutContent, {
      localVue,
      propsData: {
        content,
        type: 'overlay',
        direction: 'left'
      }
    })

    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.vm.directionContentClass).toBe(leftDirectionClass)
    expect(wrapper.vm.typeContentClass).toBe(typeOverlayClass)
    expect(wrapper.vm.isFirstContentClass).toBe('')
  })

  test('has expected structure: type: background, direction: right', () => {
    const wrapper = shallowMount(BlockAboutContent, {
      localVue,
      propsData: {
        content,
        type: 'background',
        direction: 'right'
      }
    })

    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.vm.directionContentClass).toBe(rightDirectionClass)
    expect(wrapper.vm.typeContentClass).toBe(typeBackgroundClass)
    expect(wrapper.vm.isFirstContentClass).toBe('')
  })

  test('has expected structure: type: stretch, direction: left', () => {
    const wrapper = shallowMount(BlockAboutContent, {
      localVue,
      propsData: {
        content,
        type: 'stretch',
        direction: 'left'
      }
    })

    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.vm.directionContentClass).toBe(leftDirectionClass)
    expect(wrapper.vm.typeContentClass).toBe(typeStretchClass)
    expect(wrapper.vm.isFirstContentClass).toBe('')
  })
})
