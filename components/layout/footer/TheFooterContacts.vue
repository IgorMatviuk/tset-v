<template>
  <div class="footer__contacts">
    <button
      :aria-expanded="isVisible ? 'true' : 'false'"
      :class="[
        { 'footer__list-title--active': isVisible },
        'footer__list-title footer__list-title--contacts'
      ]"
      @click="onCollapse"
    >
      Наши контакты
      <svg-icon
        v-if="allowCollapse"
        class="footer__collapse-icon"
        name="chevron"
        width="10"
        height="10"
      />
    </button>
    <BCollapse v-model="isVisible" class="footer__contacts-row">
      <ul class="footer__list footer__list--contacts">
        <li class="footer__list-item">
          <a
            :href="`tel:${contacts.phone}` | convertPhone"
            class="footer__link"
          >
            {{ contacts.phone }}
          </a>
        </li>
        <li class="footer__list-item">
          <a :href="`mailto:${contacts.email}`" class="footer__link">
            {{ contacts.email }}
          </a>
        </li>
      </ul>
      <ul class="footer__list footer__list--schedule">
        <li class="footer__list-item footer__schedule-title">
          <span class="footer__link">График контакт-центра</span>
        </li>
        <li class="footer__list-item">
          <span class="footer__link">{{ contacts.schedule }}</span>
        </li>
      </ul>
    </BCollapse>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import responsiveCollapse from '@/mixins/responsive-collapse'
import phoneConversion from '@/mixins/phone-conversion'

export default {
  mixins: [responsiveCollapse, phoneConversion],
  data() {
    return {
      isVisible: true,
      allowCollapse: false
    }
  },
  computed: {
    ...mapState({
      contacts: (state) => state.contacts
    })
  }
}
</script>
