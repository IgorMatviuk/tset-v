Object.defineProperty(HTMLFormElement.prototype, 'submit', {
  writable: true,
  value: jest.fn()
})
