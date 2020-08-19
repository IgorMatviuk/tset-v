import { mount, createLocalVue } from '@vue/test-utils'
import { BPagination } from 'bootstrap-vue'

import PagePagination from '@/components/shared/PagePagination'

const localVue = createLocalVue()
localVue.component('BPagination', BPagination)

describe('PagePagination', () => {
  test('renders pagination component', () => {
    const wrapper = createPagePagination()

    expect(wrapper.findComponent(BPagination).exists()).toBe(true)
    expect(wrapper.findAll('button[role="menuitemradio"]').length).toBe(4)
  })

  test('updates currentPageModel on props change', async () => {
    const wrapper = createPagePagination()

    expect(wrapper.vm.currentPage).toBe(1)
    expect(wrapper.vm.currentPageModel).toBe(1)

    wrapper.setProps({ currentPage: 2 })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.currentPage).toBe(2)
    expect(wrapper.vm.currentPageModel).toBe(2)
  })

  test('updates currentPageModel on link click', async () => {
    const wrapper = createPagePagination()

    expect(wrapper.vm.currentPage).toBe(1)
    expect(wrapper.vm.currentPageModel).toBe(1)

    const nextLink = wrapper.find('.page-item.active + .page-item .page-link')
    nextLink.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.currentPageModel).toBe(2)
    expect(wrapper.emitted('page-change')[0]).toEqual([2])
  })
})

function createPagePagination() {
  const wrapper = mount(PagePagination, {
    localVue,
    propsData: {
      currentPage: 1,
      totalRows: 6
    },
    stubs: ['svg-icon']
  })

  return wrapper
}
