export default {
  filters: {
    convertPhone(phone) {
      return phone.replace(/\s/g, '')
    }
  }
}
