import { mount, createLocalVue } from '@vue/test-utils'
import { BButton, BFormGroup, BFormInput, BFormTextarea } from 'bootstrap-vue'

import Vuelidate from 'vuelidate'
import VueTelInput from 'vue-tel-input'

import BlockContactsForm from '@/components/blocks/BlockContacts/BlockContactsForm'

const localVue = createLocalVue()

localVue.use(Vuelidate)
localVue.use(VueTelInput)
localVue.component('BButton', BButton)
localVue.component('BFormGroup', BFormGroup)
localVue.component('BFormInput', BFormInput)
localVue.component('BFormTextarea', BFormTextarea)

describe('BlockContactsForm', () => {
  function createBlockContactsForm() {
    const wrapper = mount(BlockContactsForm, {
      localVue,
      stubs: ['svg-icon', 'client-only'],
      mocks: {
        $t: () => ''
      }
    })

    return wrapper
  }

  beforeEach(() => {
    Object.defineProperty(window, 'fetch', {
      writable: true,
      value: jest.fn(() => Promise.resolve({ text: () => '1;UA;UKR;Ukraine' }))
    })
  })

  test('has expected structure', () => {
    const wrapper = createBlockContactsForm()

    expect(wrapper.element).toMatchSnapshot()
  })

  test('contacts form name validation', async () => {
    const wrapper = createBlockContactsForm()

    const nameInput = wrapper.find('#contactsFormName')
    let inputNameValue = 'fv'

    nameInput.setValue(inputNameValue)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.formData.name).toBe(inputNameValue)
    expect(wrapper.vm.$v.formData.name.$error).toBe(true)
    expect(wrapper.get('.error-message').element).toBeVisible()

    inputNameValue = 'denis'
    nameInput.setValue(inputNameValue)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.formData.name).toBe(inputNameValue)
    expect(wrapper.vm.$v.formData.name.$error).toBe(false)
    expect(wrapper.find('.error-message').element).toBeUndefined()
  })

  test('contacts form phone validation', async () => {
    const wrapper = createBlockContactsForm()

    const phoneInput = wrapper.find('#contactsFormPhone')
    let inputPhoneValue = '097'

    phoneInput.setValue(inputPhoneValue)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.formData.phone).toBe(inputPhoneValue)
    expect(wrapper.vm.$v.formData.phone.$error).toBe(true)
    expect(wrapper.find('.error-message').element).toBeVisible()

    inputPhoneValue = '+380 97 304 0027'
    phoneInput.setValue(inputPhoneValue)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.formData.phone).toBe(inputPhoneValue)
    expect(wrapper.vm.$v.formData.phone.$error).toBe(false)
    expect(wrapper.find('.error-message').element).toBeUndefined()
  })

  test('contacts form email validation', async () => {
    const wrapper = createBlockContactsForm()

    const emailInput = wrapper.find('#contactsFormEmail')
    let inputEmailValue = 'denis'

    emailInput.setValue(inputEmailValue)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.formData.email).toBe(inputEmailValue)
    expect(wrapper.vm.$v.formData.email.$error).toBe(true)
    expect(wrapper.find('.error-message').element).toBeVisible()

    inputEmailValue = 'denis@gmail.com'
    emailInput.setValue(inputEmailValue)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.formData.email).toBe(inputEmailValue)
    expect(wrapper.vm.$v.formData.email.$error).toBe(false)
    expect(wrapper.find('.error-message').element).toBeUndefined()
  })

  test('contacts form comment validation', async () => {
    const wrapper = createBlockContactsForm()

    const commentInput = wrapper.find('#contactsFormComment')
    let inputCommentValue = '<>???#&#%!&!<>'

    commentInput.setValue(inputCommentValue)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.formData.comment).toBe(inputCommentValue)
    expect(wrapper.vm.$v.formData.comment.$error).toBe(true)
    expect(wrapper.find('.error-message').element).toBeVisible()

    inputCommentValue = ''
    commentInput.setValue(inputCommentValue)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.formData.comment).toBe(inputCommentValue)
    expect(wrapper.vm.$v.formData.comment.$error).toBe(false)
    expect(wrapper.find('.error-message').element).toBeUndefined()
  })

  test('contacts form submit', async () => {
    const wrapper = createBlockContactsForm()

    expect(wrapper.vm.$v.$invalid).toBe(true)

    const nameInput = wrapper.find('#contactsFormName')
    const phoneInput = wrapper.find('#contactsFormPhone')
    const emailInput = wrapper.find('#contactsFormEmail')
    const form = wrapper.find('form')

    nameInput.setValue('Denis')
    phoneInput.setValue('+380 97 304 0027')
    emailInput.setValue('bobbhuter@gmail.com')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$v.$invalid).toBe(false)

    form.trigger('submit')
  })

  // TODO: cover form submission
})
