import { shallowMount } from '@vue/test-utils'

import TheSiteNav from '@/components/layout/site-nav/TheSiteNav'
import TheSiteNavSlider from '@/components/layout/site-nav/TheSiteNavSlider'
import TheSiteNavBlockRegular from '@/components/layout/site-nav/TheSiteNavBlockRegular'

describe('TheSiteNav', () => {
  test('has expected structure', () => {
    const wrapper = shallowMount(TheSiteNav)

    expect(wrapper.findComponent(TheSiteNavSlider).exists()).toBe(true)
    expect(wrapper.findComponent(TheSiteNavBlockRegular).exists()).toBe(true)
  })
})
