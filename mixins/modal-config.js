import {
  required,
  email,
  sameAs,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'

const onlyLetters = (value) => /^([a-zа-яёїієґ\s']+|\d+)$/gim.test(value)
const onlyText = (value) =>
  /^([a-zа-яёїієґ0-9-.,;:?!'"()\s]+|\d+)$/gim.test(value)

const loginModalConfig = () => ({
  title: 'Войдите в аккаунт',
  submitText: 'войти',
  fields: [
    {
      name: 'email',
      type: 'email',
      label: 'Ваш e-mail',
      placeholder: 'Введите электронную почту',
      validation: { required, email }
    },
    {
      name: 'password',
      type: 'password',
      label: 'Пароль',
      placeholder: 'Введите Ваш пароль',
      validation: { required, minLength: minLength(6) }
    }
  ],
  links: [
    {
      label: null,
      name: 'Забыли пароль?',
      nextModal: 'forgot-password'
    },
    {
      label: 'Нет аккаунта?',
      name: 'Регистрация',
      nextModal: 'register'
    }
  ],
  action: {
    scope: 'auth',
    method: 'login'
  }
})

const forgotPasswordModalConfig = () => ({
  title: 'Забыли пароль?',
  actionText:
    'Введите адрес электронной почты вашей учетной записи. Нажмите кнопку Продолжить, чтобы получить пароль по электронной почте.',
  submitText: 'продолжить',
  success: {
    title: 'Пароль успешно изменен',
    content: 'Пожалуйста, проверьте Вашу почту'
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      label: 'Ваше e-mail',
      placeholder: 'Введите электронную почту',
      validation: { required, email }
    }
  ],
  action: {
    scope: 'auth',
    method: 'forgotPassword',
    showSuccessMessage: true
  }
})

const registerModalConfig = () => ({
  title: 'Регистрация',
  submitText: 'регистрация',
  success: {
    title: 'Регистрация прошла успешно',
    content: 'Теперь Вы можете войти в свой аккаунт'
  },
  fields: [
    {
      name: 'first_name',
      type: 'text',
      label: 'Ваше имя',
      placeholder: 'Введите Ваше имя',
      validation: { required, minLength: minLength(3), onlyLetters }
    },
    {
      name: 'last_name',
      type: 'text',
      label: 'Ваша фамилия',
      placeholder: 'Введите Вашу фамилия',
      validation: { required, minLength: minLength(3), onlyLetters }
    },
    {
      name: 'phone',
      type: 'tel',
      label: 'Телефон',
      placeholder: 'Номер телефона',
      options: {
        name: 'phone',
        placeholder: 'Ваш телефон',
        defaultCountry: 'UA',
        // onlyCountries: ['UA', 'RU'], // FIXME:
        validCharactersOnly: true,
        mode: 'international'
      },
      validation: {
        required,
        phone() {
          const [tel] = this.$refs.tel
          return tel.phoneObject.isValid
        }
      }
    },
    {
      name: 'email',
      type: 'email',
      label: 'Ваш e-mail',
      placeholder: 'Введите электронную почту',
      validation: { required, email }
    },
    {
      name: 'password',
      type: 'password',
      label: 'Пароль',
      placeholder: 'Введите Ваш пароль',
      validation: { required, minLength: minLength(6) }
    },
    {
      name: 'password_confirmation',
      type: 'password',
      label: 'Подтвердите пароль',
      placeholder: 'Введите Ваш пароль',
      validation: {
        required,
        sameAsPassword: sameAs(function() {
          return this.formData.password
        })
      }
    }
  ],
  links: [
    {
      label: 'Уже зарегистрировны?',
      name: 'Войти',
      nextModal: 'login'
    }
  ],
  action: {
    scope: 'auth',
    method: 'register',
    showSuccessMessage: true
  }
})

const postAReviewModalConfig = () => ({
  title: 'Оставить отзыв',
  submitText: 'отправить',
  success: {
    title: 'Отзыв отправлен',
    content: 'Спасибо за Ваш отзыв'
  },
  fields: [
    {
      name: 'ratings',
      type: 'ratings',
      label: 'Выберите рейтинг',
      validation: {
        required
      }
    },
    {
      name: 'post_title',
      type: 'text',
      label: 'Заголовок отзыва',
      validation: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(200),
        onlyText
      }
    },
    {
      name: 'post',
      type: 'textarea',
      label: 'Ваш отзыв',
      validation: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(200),
        onlyText
      }
    },
    {
      name: 'file',
      type: 'file',
      label: 'прикрепить фото',
      validation: { required }
    }
  ],
  action: {
    scope: 'testimonials',
    methods: 'create',
    showSuccessMessage: true
  }
})

export default {
  methods: {
    createModalConfig(name, data) {
      let createConfig = null

      switch (name) {
        case 'login':
          createConfig = loginModalConfig
          break
        case 'forgot-password':
          createConfig = forgotPasswordModalConfig
          break
        case 'register':
          createConfig = registerModalConfig
          break
        case 'feedback':
          createConfig = postAReviewModalConfig
      }

      if (typeof createConfig === 'function') {
        const config = {
          name,
          ...createConfig.call(this)
        }
        return { config, data }
      } else {
        throw new TypeError(`Invalid modal config ${name}`)
      }
    }
  }
}
