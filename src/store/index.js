import Vue from 'vue'
import Vuex from 'vuex'

import formItem from "./moudelus/formItem"
import staffCare from "./moudelus/staffCare"
import MoreInput from "./moudelus/MoreInput"
import hrm from "./moudelus/hrm"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    formItem,
    staffCare,
    MoreInput,
    hrm,
  }
})
