// 平替 v2 template内不支持 ?. 可选链操作 
export const variableJudge = (obj, keyName) => {
    if (!obj) return null
    let keys = (keyName + '').split('.')
    let tempObj = obj
    for (let i = 0; i < keys.length; i++) {
      if (!tempObj) return
      if (keys[i] !== '') tempObj = tempObj[keys[i]]
    }
    return tempObj
}

// 向字符串指定位置添加新内容
export const insertStr = (soure, start, newStr) => {  
  if(!soure) soure = "";
  return soure.slice(0, start) + newStr + soure.slice(start);
}

// 深拷贝
export const copy = (obj) => {
  // 先判断拷贝目标是对象还是数组，用instanceof判断原型是Array还是Object
  let res = obj instanceof Array ? [] : {};
  for (const [key, value] of Object.entries(obj)) {
      res[key] = typeof value === "object" ? copy(value) : value;
  }
  return res
}

// 获取 iframe url 携带的参数
export const getUrlParams = function(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
// 根据href中的字段 获取该字段后的所有文字内容 目前人事入职资料登记外部链接页面在用
export const getUrl_t = function(name) {
  let url = window.location.href;
  let r = url.indexOf(name) !== -1;
  if (r) return url.substr(name.length+url.indexOf(name));
  return null;
}

// 获取 iframe 外层主项目的 url
export const getParentUrl = function() {
  let parentUrl = null;
  if (parent !== window) {
      try {
        parentUrl = parent.location.href; 
      }catch (e) { 
        parentUrl = document.referrer; 
      } 
   }
   return parentUrl !== null ? parentUrl.slice(0, -1) : 'http://a.bangongyi.com';
}

// 通过屏幕视口 减去同页面其他dom的高度获取表格的最大高度
export const el_table_max_height = function() {
  let arr = [...arguments];
  let html_clientHeight = document.documentElement.clientHeight;
  let else_dom_heights = arr.reduce((a, b) => { return a+b*1 }, 0);
  let max_height = html_clientHeight - else_dom_heights;
  return max_height;
}



/* 
  协同MoreInput组件
*/
// 协同MoreInput组件 处理自定义表单项组件 特殊数据所需要的 i_item 参数格式
export const setMoreInputI_item = function(arr) {
  let newArr = [];
  if(arr.length<=0) return []
  newArr = arr.map(i => {
    if(i.type === 'department_widget') {
      i.form_item_type = '部门';
      i.form_item_radio = (i.title === '部门');
    }else if(i.type === 'staff_widget') {
      i.form_item_type = '成员';
      i.form_item_radio = (i.title === '直接上级');
    }
    // 部分数字值Boolean化
    i.readonly = i.readonly > 0;
    i.required = i.required > 0;
    i.modify_readonly = i.modify_readonly > 0;
    i.modify_required = i.modify_required > 0;
    return i
  });
  return newArr
}
// 协同MoreInput组件 部分组件区分 （比如部门/选人组件是多层子级调用要把v-model都透传至最外层需要做些处理）
export const vifMoreInput = function(type) {
  let widgetTypes = ["department_widget", "staff_widget"];
  return widgetTypes.some(i => i === type)
}
// 协同MoreInput组件 的展示模板字段展示处理 
export const textEchoMoreInput = function(value) {
  let newValue = '';
  if(Array.isArray(value)) {
    newValue = value.join("");
  }else if(Object.prototype.toString.call(value) === '[object Object]') {
    newValue = value.name?value.name: value.title?value.title: value.titles?value.titles: value;
  }else{
    newValue = value;
  }
  return newValue
}
// 协同MoreInput组件 设置表单校验项
export const setFormDataRules = function(arr) {
  let rulesObj = {};
  for (let index = 0; index < arr.length; index++) {
    if(arr[index].required) {
      let obj = {
        required: true,
        message: (arr[index].type==='text'||arr[index].type==='textarea')?`请输入${arr[index].title}`:`请选择${arr[index].title}`,
        trigger: (arr[index].type==='text'||arr[index].type==='textarea')?`blur`:`change`,
      }
      rulesObj[arr[index].key] = [obj];
    }
  }
  return rulesObj
}

// element-ui 一些通用校验
export const elRules = {
  // 手机号
  mobile: (rule, value, callback) => {
    if (!value) {
      return new Error('请输入电话号码')
    } else {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      const isPhone = reg.test(value)
      value = Number(value) //转换为数字
      if (typeof value === 'number' && !isNaN(value)) {
        //判断是否为数字
        value = value.toString() //转换成字符串
        if (value.length < 0 || value.length > 12 || !isPhone) {
          //判断是否为11位手机号
          callback(new Error('手机号码格式如:138xxxx8754'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请输入电话号码'))
      }
    }
  },
  
}