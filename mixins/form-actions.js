import auth from '@/utils/auth'
import testimonials from '@/utils/testimonials'

export default {
  computed: {
    formActions() {
      return {
        auth: auth(this),
        testimonials: testimonials(this)
      }
    }
  }
}
