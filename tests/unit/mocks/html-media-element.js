Object.defineProperties(HTMLMediaElement.prototype, {
  play: {
    writable: true,
    value: jest.fn()
  },
  pause: {
    writable: true,
    value: jest.fn()
  }
})
