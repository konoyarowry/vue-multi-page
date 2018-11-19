module.exports = {
  env: { browser: true, es6: true, node: true },
  parserOptions: { parser: 'babel-eslint' },
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  rules: {
    'vue/no-unused-components': 'none',
    'no-console': ['warn', { allow: ['error'] }]
  },
  globals: {
    mmlg: true,
    Cookie: true,
    axios: true,
    Swiper: true,
    mobile: true,
    require: true,
    WeixinJSBridge: true,
    wx: true,
    xw: true
  }
}
