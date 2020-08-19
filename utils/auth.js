export default function auth(context) {
  return {
    async login() {
      const { email, password } = context.formData
      await context.$auth.loginWith('local', { data: { email, password } })
    },
    async forgotPassword() {
      await context.$axios.$post(
        '/api/customer/forgot-password',
        context.formData
      )
    },
    async register() {
      await context.$axios.$post('/api/customer/register', context.formData)
    }
  }
}
