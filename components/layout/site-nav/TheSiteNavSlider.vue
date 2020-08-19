<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      offset: 0,
      stack: []
    }
  },
  computed: {
    ...mapState({
      categories: (state) => state.catalog.categories
    }),
    ...mapGetters(['mobileMenu']),
    items() {
      return [
        { name: this.$t('catalogPage.catalog'), categories: this.categories },
        ...this.mobileMenu.columns
      ]
    }
  },
  methods: {
    navigateBack() {
      this.offset -= 1

      this.stack.pop()
    },
    navigateNext(event, item) {
      event.stopPropagation()

      this.offset += 1
      this.stack.push(item)
    },
    getIsPassedItem(item) {
      return this.stack.find((currItem, index) => {
        return currItem.name === item.name && index === this.stack.length - 2
      })
    },
    getIsInactiveItem(item) {
      return !this.stack.includes(item)
    },
    buildRoutePath(item) {
      const stackButRoot = [...this.stack].splice(1)
      const parentPath = stackButRoot
        .filter((stackItem) => stackItem.slug !== item.slug)
        .map((stackItem) => stackItem.slug)

      parentPath.push(item.slug)

      return this.$i18n.path(parentPath.join('/'))
    },
    renderLink(h, item) {
      if (item.categories && item.categories.length) {
        return h(
          'span',
          {
            staticClass: 'nav-slider__link',
            on: {
              click: (event) => this.navigateNext(event, item)
            }
          },
          [
            h('span', item.name),
            h('svg-icon', {
              staticClass: 'nav-slider__icon nav-slider__icon--next',
              props: { name: 'chevron' }
            })
          ]
        )
      }

      return h(
        'NuxtLink',
        {
          props: {
            to: this.buildRoutePath(item),
            activeClass: 'nav-slider__link--active'
          },
          staticClass: 'nav-slider__link'
        },
        item.name
      )
    },
    renderChildList(h, item) {
      return (
        item.categories &&
        h(
          'ul',
          {
            class: {
              'nav-slider--inactive': this.getIsInactiveItem(item),
              'nav-slider--passed': this.getIsPassedItem(item)
            },
            staticClass: 'nav-slider'
          },
          [this.renderItems(h, item.categories)]
        )
      )
    },
    renderBtnBack(h) {
      return h('li', { staticClass: 'nav-slider__item' }, [
        h(
          'span',
          {
            staticClass: 'nav-slider__btn-back',
            on: { click: this.navigateBack }
          },
          [
            h('svg-icon', {
              staticClass: 'nav-slider__icon nav-slider__icon--prev',
              props: { name: 'chevron' }
            }),
            h('span', 'Назад')
          ]
        )
      ])
    },
    renderItems(h, items, isRoot) {
      const renderedItems = items.map((item, index) =>
        h(
          'li',
          {
            staticClass: 'nav-slider__item',
            class: {
              'nav-slider__item--has-children':
                item.categories && item.categories.length
            },
            key: index
          },
          [this.renderLink(h, item), this.renderChildList(h, item)]
        )
      )

      if (isRoot) {
        return renderedItems
      }

      return [this.renderBtnBack(h), ...renderedItems]
    }
  },
  render(h) {
    return h(
      'ul',
      {
        staticClass: 'nav-slider nav-slider--root',
        class: {
          'nav-slider--passed': this.offset !== 0
        },
        ref: 'list'
      },
      [this.renderItems(h, this.items, true)]
    )
  }
}
</script>

<style lang="scss">
.nav-slider {
  @include list-unstyled();

  position: fixed;
  top: 50px;
  right: 0;
  bottom: calc(134px + env(safe-area-inset-bottom));
  left: 0;
  width: 200%;
  padding-right: calc(100% + 25px);
  padding-left: 25px;
  margin-bottom: 0;
  overflow: visible;
  overflow-y: auto;
  background-color: $white;
  transition: left 0.3s cubic-bezier(0.47, 0, 0.745, 0.715);
  -webkit-overflow-scrolling: touch;

  &--passed {
    left: -100%;
  }

  &--inactive {
    left: 100%;
  }

  &__item {
    height: 50px;
    font-size: 12px;
    line-height: 50px;
    text-transform: uppercase;

    &:not(:last-child) {
      line-height: 49px;
      border-bottom: 1px solid #e7e7e7;
    }
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    letter-spacing: 0.05em;

    &:not(:hover) {
      color: $body-color;
    }

    &:hover {
      text-decoration: none;
    }
  }

  &__btn-back {
    display: flex;
    align-items: center;
    font-weight: 500;
  }

  &__icon {
    width: 10px;
    height: 10px;

    &--prev {
      margin-right: 4px;
      margin-bottom: 2px;
      transform: rotate(90deg);
    }

    &--next {
      transform: rotate(-90deg);
    }
  }

  @include media-breakpoint-up(md) {
    top: 60px;
  }
}
</style>
