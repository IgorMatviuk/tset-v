import { shallowMount } from '@vue/test-utils'
import ImageZoom from 'js-image-zoom'

import ZoomedImage from '@/components/shared/ZoomedImage'

jest.mock('js-image-zoom', () => {
  return jest.fn().mockImplementation(() => {
    return {
      kill: jest.fn()
    }
  })
})

describe('ZoomedImage', () => {
  beforeEach(() => {
    ImageZoom.mockClear()
  })

  function createMatchMediaMock(matches) {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches,
        media: query,
        addListener: jest.fn().mockImplementation((callback) => callback()),
        removeListener: jest.fn().mockImplementation((callback) => callback()),
        addEventListener: jest.fn().mockImplementation((callback) => callback())
      }))
    })
  }

  function createZoomedImage() {
    const wrapper = shallowMount(ZoomedImage, {
      props: {
        imageUrl: 'https://some-url.com'
      }
    })

    return wrapper
  }

  test('render zoomed image', () => {
    createMatchMediaMock(true)

    const wrapper = createZoomedImage()

    expect(wrapper.element).toMatchSnapshot()
    expect(ImageZoom).toBeCalledTimes(1)

    wrapper.destroy()
  })
})
