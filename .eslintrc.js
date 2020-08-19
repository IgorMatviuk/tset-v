module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: ['prettier', 'jest-dom'],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'vue/no-v-html': 'off'
  },
  overrides: [
    {
      files: ['*-test.js', '*.spec.js', '*.e2e-spec.js'],
      rules: {
        'no-unused-expressions': 'off'
      }
    }
  ]
}
