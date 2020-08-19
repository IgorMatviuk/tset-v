<script>
export default {
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  methods: {
    getIsRootOnly(category) {
      return !category.name && !category.slug
    },
    renderList(h, category) {
      return h(
        'ul',
        {
          class: {
            'catalog-menu__list--no-children': !category.items.length
          },
          staticClass: 'catalog-menu__list'
        },
        this.renderBatch(h, category)
      )
    },
    renderBatch(h, category) {
      return [
        !this.getIsRootOnly(category) && this.renderParentItem(h, category),
        this.renderChildItems(h, category)
      ]
    },
    renderNuxtLink(h, category) {
      return h(
        'NuxtLink',
        {
          props: {
            to: this.$i18n.path(category.slug),
            exactActiveClass: 'catalog-menu__link--active',
            exact: true
          },
          staticClass: 'catalog-menu__link'
        },
        [category.name]
      )
    },
    renderParentItem(h, category) {
      return h(
        'li',
        {
          staticClass: 'catalog-menu__item catalog-menu__item--parent'
        },
        [
          category.items.length
            ? h('span', null, [category.name])
            : this.renderNuxtLink(h, category)
        ]
      )
    },
    renderChildItems(h, category) {
      return category.items.map((item) =>
        h(
          'li',
          {
            key: item.id,
            class: [
              item.items.length > 0 ? 'catalog-menu__item--has-children' : '',
              `${
                this.getIsRootOnly(category)
                  ? 'catalog-menu__item--parent'
                  : 'catalog-menu__item--child'
              }`
            ],
            staticClass: 'catalog-menu__item'
          },
          [
            !this.getIsRootOnly(item) && this.renderNuxtLink(h, item),
            [item.items.length > 0 && this.renderList(h, item)]
          ]
        )
      )
    }
  },
  render(h) {
    return this.renderList(h, this.category)
  }
}
</script>

<style lang="scss">
.catalog-menu {
  &__list {
    padding: 0;
    margin: 0;
    list-style: none;

    &:not(:first-child):not(:only-child) {
      margin-top: 20px;
    }

    &:not(&--no-children):not(:only-child) {
      margin-bottom: 20px;
    }
  }

  &__item--parent {
    font-size: 13px;
    text-transform: uppercase;

    &:not(:only-child) {
      margin-bottom: 12px;
    }
  }

  &__item--has-children {
    margin-top: 25px;
  }

  &__item--parent &__link:not(&__link--active):not(:hover) {
    color: $body-color;
  }

  &__item--parent &__link--active {
    cursor: default;

    &:not(:hover) {
      color: $primary;
    }
  }

  &__item--child &__link {
    font-size: 13px;
    line-height: 34px;
  }

  &__link {
    &:hover {
      text-decoration: none;
    }

    &:not(:hover) {
      color: $text-color;
    }

    &--active {
      cursor: default;
    }

    &--active:not(:hover) {
      color: $primary;
    }
  }
}
</style>
