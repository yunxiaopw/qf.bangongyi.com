// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './assets/publicLess/index.less'
import './assets/icon-font/iconfont.css'

// vex-table  tableUI组件库
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
Vue.use(VXETable)

// 移动端 UI库
import './assets/js/rem'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// PC 页面 UI库
import ElementUI from 'element-ui'
import 'ant-design-vue/dist/antd.css';
import 'element-ui/lib/theme-chalk/index.css';
import './style/theme/index.css'
Vue.use(ElementUI);

// 路由 vuex axios
import router from './router'
import store from "./store/index"
import axios from 'axios'
Vue.prototype.$axios = axios



import { variableJudge, el_table_max_height, elRules } from '@/utils/utils.js'
// 平替 v2 template内不支持 ?. 可选链操作
Vue.prototype.$vj = variableJudge;
// 通过屏幕视口 减去同页面其他dom的高度获取表格的最大高度
Vue.prototype.$el_table_max_height = el_table_max_height;
// element-ui 一些通用校验
Vue.prototype.$elRules = elRules;

// 头部标题组件
import HeadLine from "@/components/public/headline";
// 树形下拉选框
import TreeSelect from "@/components/public/TreeSelect";
// 成员等相关信息弹层
import ListWidget from "@/components/public/ListWidget";
// 成员等相关信息弹层 人事二期 优化新版
import NewListWidget from "@/components/public/NewListWidget";
// 导入
import Tolead from "@/components/public/Tolead";
// 表格分页
import Pagination from "@/components/public/Pagination";
// 灵活的表单项 支持文本 单选 多选 下拉选项 等等表单项
import MoreInput from "@/components/public/MoreInput";
// 职级选择框
import PositionLevel from "@/components/public/PositionLevel";
// 职级选择框
import RankLevel from "@/components/public/RankLevel";


/* 
  全局按钮防抖
  <el-button v-debounce>使用方式 v-debounce</el-button>
  */
Vue.directive('debounce', {
  inserted(el, binding) {
    el.addEventListener('click', e => {
      el.classList.add('is-disabled')
      el.disabled = true
      setTimeout(() => {
        el.disabled = false
        el.classList.remove('is-disabled')
      }, 1000)//我这里设置的是2000毫秒也就是2秒
    })
  }
})


// 全局组件挂载
Vue.component('HeadLine', HeadLine)
Vue.component('TreeSelect', TreeSelect)
Vue.component('ListWidget', ListWidget)
Vue.component('Tolead', Tolead)
Vue.component('Pagination', Pagination)
Vue.component('MoreInput', MoreInput)
Vue.component('NewListWidget', NewListWidget)
Vue.component('PositionLevel', PositionLevel)
Vue.component('RankLevel', RankLevel)



new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
