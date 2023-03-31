'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

// 测试环境  ==> 具体配置在 utils/request.js 中配置
module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_HOST: '"http://vv.bangongyi.com"',
  VUE_APP_BASE_API: '"/stage-api"'
})
