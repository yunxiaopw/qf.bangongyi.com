'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// 开发环境  ==> 具体配置在 utils/request.js 中配置
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST: '"http://a.bangongyi.com"',
  VUE_APP_BASE_API: '"/dev-api"'
})
