const formItem = {
  state: {
    //初始化数据
    configFormData: [{
        "type": "one_drop_down",
        "title": "请假类型",
        desc: '',
        placeholder: "",
        default: "",
        is_required: true,
        is_bgy_default_field: true,
        dragPosition: 'bottom',
        system: true,
        string: 1,
        bgy_field_sort: 1,
      },

      {
        "type": "timePicker",
        "title": "开始时间",
        is_bgy_default_field: true,
        is_required: true,
        desc: '',
        placeholder: "",
        default: "",
        dragPosition: 'top',
        system: true,
        string: 1,
        bgy_field_sort: 2,
      },
      {
        "type": "timePicker",
        "title": "结束时间",
        desc: '',
        placeholder: "",
        default: "",
        is_bgy_default_field: true,
        is_required: true,
        dragPosition: 'bottom',
        system: true,
        string: 2,
        bgy_field_sort: 3,
      },
      {
        "type": "askForLeaveFor",
        "title": "请假事由",
        desc: '',
        placeholder: "",
        default: "",
        is_bgy_default_field: true,
        dragPosition: 'all',
        system: true,
        string: 3,
        bgy_field_sort: 4,
        is_required: false
      },
      {
        "type": "nextLower",
        "title": "下一级审批人",
        is_bgy_default_field: true,
        dragPosition: 'top',
        system: true,
        string: 4,
        bgy_field_sort: 5,
        desc: '',
        placeholder: "",
        default: "",
        is_required: false
      },
      {
        "type": "make",
        "title": "抄送人",
        is_bgy_default_field: true,
        dragPosition: 'bottom',
        system: true,
        string: 5,
        bgy_field_sort: 6,
        desc: '',
        placeholder: "",
        default: "",
        is_required: false
      }
    ],
    //六大组件类型
    componentsType: {
      input: {
        type: "single_line_text",
        title: "单行文本",
        placeholder: "",
        desc: '',
        default: "",
        is_required: false,
        is_bgy_default_field: false,
        sort: '',
      },
      textarea: {
        type: "mutil_line_text",
        title: "多行文本",
        desc: '',
        placeholder: "",
        default: "",
        is_required: false,
        is_bgy_default_field: false,
        sort: '',

      },
      radio: {
        type: "single_choice",
        title: "单选按钮",
        desc: '',
        sort: "",
        "is_bgy_default_field": false, // 是否办公逸默认字段
        is_required: false,
        checked_sort: '',
        choice_list: [{
            name: '选项',
            sort: 0
          },
          {
            name: '选项',
            sort: 1
          },
          {
            name: '选项',
            sort: 2
          },
          {
            name: '选项',
            sort: 3
          },
        ],
        other_list: []
      },
      checkbox: {
        type: "mutil_choice",
        title: "复选按钮",
        "is_bgy_default_field": false, // 是否办公逸默认字段
        checked_sort: [],
        is_required: false,
        otherDefault: "",
        desc: '',
        choice_list: [{
            name: '选项',
            sort: 0
          },
          {
            name: '选项',
            sort: 1
          },
          {
            name: '选项',
            sort: 2
          },
          {
            name: '选项',
            sort: 3
          }
        ],
        other_list: []
      },
      select: {
        type: "one_drop_down",
        title: "下拉列表",
        "is_bgy_default_field": false, // 是否办公逸默认字段
        checked_sort: '',
        desc: "",
        is_required: false,
        drop_down_list: [{
            sort: 0,
            name: '选项'

          },
          {
            sort: 1,
            name: '选项'
          },
          {
            sort: 2,
            name: '选项'
          }
        ],

      },
      secondLevelSelect: {
        desc: '',
        type: "two_drop_down",
        title: '二级列表',
        "is_bgy_default_field": false, // 是否办公逸默认字段
        is_required: false,
        firstDefault: '',
        placeholder: "",
        secondaryDefault: '',
        firstValueData: [{
            sort: '0',
            name: '选项',

          },
          {
            sort: '1',
            name: '选项',

          },
        ],
        secondValueData: {
          '0': [{
            sort: '0',
            name: '子选项',
          }, {
            sort: '1',
            name: '子选项',
          }],
          '1': [{
            sort: '0',
            name: '子选项',
          }, {
            sort: '1',
            name: '子选项',
          }]
        }
      },
      hand_written: {
        type: "hand_written",
        title: "手写签名",
        placeholder: "",
        desc: '',
        default: "",
        is_required: false,
        is_bgy_default_field: false,
        sort: '',
        use_prev:false

      },
    },
    //组件索引值
    componentsIndex: 0,
    //配置弹窗
    configurePopUps: false,
    changeConfigFormData: 1,
    configurationData: {},
    typeTitle: {
      single_line_text: '单行文本',
      mutil_line_text: '多行文本',
      single_choice: '单选按钮',
      mutil_choice: '复选按钮',
      one_drop_down: '下拉列表',
      two_drop_down: '二级列表',
      hand_written:'手写签名'
    },
    lowestLevel: 1,


  },
  mutations: {
    //初始化更新数据
    initConfigFormData(state, data) {
      if (data.length != 0) {
        state.configFormData = data
      }

      state.changeConfigFormData = state.changeConfigFormData + 1
    },
    //新增组件
    addComponentItem(state, type) {
      let data = state.componentsType[type]
      data.string = `${Date.parse(new Date())}_${Math.ceil(
        Math.random() * 99999
      )}`;
      let arr = formItem.mutations.copy(data)
      state.configFormData.push(arr)
      formItem.mutations.handleChangeComponentsIndex(state, state.configFormData.length - 1)
      state.changeConfigFormData = state.changeConfigFormData + 1
      state.lowestLevel = state.lowestLevel + 1

    },
    //修改组件选中组件的索引值
    handleChangeComponentsIndex(state, index) {
      state.componentsIndex = index
      state.configurationData = JSON.parse(JSON.stringify(state.configFormData[index]))
      state.configurePopUps = true

    },
    //表单拖拽改变组件位置
    handeleChangeComponentItemPosition(state, data) {
      state.configFormData = data.row
      //   console.log(data.index)
      formItem.mutations.handleChangeComponentsIndex(state, data.index)
      //   state.configurationData = JSON.parse(JSON.stringify(state.configFormData[index]))
      //   state.configurePopUps = false
      state.changeConfigFormData = state.changeConfigFormData + 1

    },
    //删除表单组件
    removeConfigFormDataItem(state, index) {
      state.configFormData = state.configFormData.filter((item, idx) => {
        return index != idx ? item : ''
      })
      if (index == state.configFormData.length) {

        if (state.configFormData[state.configFormData.length - 1].is_bgy_default_field == true) {
          state.configurePopUps = false
        } else {
          formItem.mutations.handleChangeComponentsIndex(state, state.configFormData.length - 1)
        }

      } else {
        if (state.configFormData[index].is_bgy_default_field == true) {
          state.configurePopUps = false
        } else {
          formItem.mutations.handleChangeComponentsIndex(state, index)
        }
      }
      state.changeConfigFormData = state.changeConfigFormData + 1
    },
    //修改组件标题
    handleChangeFormItemTilet(state, title) {
      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          item.title = title.length == 0 ? state.typeTitle[state.configurationData.type] : title
        }
        return item
      })
      state.changeConfigFormData = state.changeConfigFormData + 1

    },
    //修改配置描述
    handleChangeFormItemDec(state, desc) {
      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          item.desc = desc
        }
        return item
      })
      state.changeConfigFormData = state.changeConfigFormData + 1

    },
    //修改配置中的占位符
    handleChangeFormItemPlaceholder(state, placeholder) {
      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          item.placeholder = placeholder
        }
        return item
      })
      state.changeConfigFormData = state.changeConfigFormData + 1
    },
    //修改配置中input框的默认值
    handleChangeFormItemDefault(state, data) {
      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          item.default = data.default
        }
        return item
      })
      state.changeConfigFormData = state.changeConfigFormData + 1
    },
    // //修改配置中input框的必填
    handleChangeFormItemRequired(state, is_required) {
      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          item.is_required = is_required
        }
        return item
      })
      state.changeConfigFormData = state.changeConfigFormData + 1
    },
    handleChangeFormItemHandWritenUsePerv(state, use_prev) {
      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          item.use_prev = use_prev
        }
        return item
      })
      state.changeConfigFormData = state.changeConfigFormData + 1
    },
    handleChangeWidgetTextDefault(state, data) {
      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          item.default = data.default
        }
        return item
      })
      state.configurationData.default = data.default
    },
    //修改单选和多选options的标题
    handlechangeRadioOptionsName(state, data) {
      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          item.choice_list[data.index].name = data.val.length == 0 ? '选项' : data.val
        }
        return item
      })
      state.changeConfigFormData = state.changeConfigFormData + 1
    },
    //单选和复选操作其他按钮
    handelChangeOperationOther(state, type) {
      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          if (type == 'add') {
            item.other_list = [{
              name: '其他',
              sort: 6,
              default: ''
            }]
            state.configurationData.other_list = [{
              name: '其他',
              sort: 6,
              default: ''
            }]
          } else {
              if(item.type == 'single_choice'){
                if(item.checked_sort == 6){
                    item.checked_sort  = ''
                }
              }else{

                if(item.checked_sort.indexOf(6) != -1){
                    item.checked_sort.splice(item.checked_sort.indexOf(6),1)
                }

            }

            item.other_list = []
            state.configurationData.other_list = []
            state.configurationData.checked_sort = item.checked_sort
          }
        }
        return item
      })

      state.changeConfigFormData = state.changeConfigFormData + 1
    },
    //单选和复选操作其他选项重的input值
    handelChangeOtherDefault(state, val) {
      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          item.other_list[0].name = val.length == 0 ? '其他' : val
        }
        return item
      })

      state.changeConfigFormData = state.changeConfigFormData + 1
    },
    //点击单选或者复选
    clickRadioOptions(state, val) {

      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
            if(item.type == 'single_choice'){
                item.checked_sort = item.checked_sort === val ? '' : val
                state.configurationData.checked_sort = JSON.parse(JSON.stringify(item.checked_sort))
            }else{
                if( item.checked_sort.indexOf(val) == -1){
                    item.checked_sort.push(val)
                }else{
                    item.checked_sort.splice(item.checked_sort.indexOf(val),1)
                }
            }
        }

        return item
      })

      state.changeConfigFormData = state.changeConfigFormData + 1

    },
    //修改单选或者多选其他选中后面input的值
    handleChangeotherDefault(state, val) {
      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          item.other_list[0].default = val
        }
        return item
      })
    },
    //删除单选或者复选某一值
    deleteRadioOptions(state, data) {
      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          if (item.type == "single_choice") {
            //删除默认值
            if (data.idx == item.checked_sort) {
              item.checked_sort = ''
            }

          } else {
            if(item.checked_sort.indexOf(data.idx) != -1){
                item.checked_sort.splice(item.checked_sort.indexOf(data.idx),1)
            }
          }
          item.choice_list = item.choice_list.filter((res, idx) => {
            return res.sort != data.idx ? res : ''
          })


          state.configurationData.choice_list = JSON.parse(JSON.stringify(item.choice_list))
          state.configurationData.checked_sort = item.checked_sort

        }
        return item

        // if (item.checked_sort == data.idx) {
        //   if (data.type == 'single_choice') {
        //     item.checked_sort = ''
        //   } else {
        //     if (item.checked_sort.indexOf(data.idx) != -1) {
        //       item.choice_list = item.choice_list.filter(res => {
        //         return res != data.idx ? res : ''
        //       })

        //     }
        //   }

        // }
        // if (index == state.componentsIndex) {
        //   item.choice_list.splice(data.idx, 1)
        // }
        // return item
      })

      state.changeConfigFormData = state.changeConfigFormData + 1
    },
    //添加单选或者复选选项
    addRadioOptions(state) {
      let num = 0;
      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          let arr = []
          item.choice_list.forEach(element => {
            arr.push(element.sort)
          })

          for (let i = 0; i < 6; i++) {
            if (arr.indexOf(i) == -1) {
              num = i
              break;
            }
          }
          item.choice_list.push({
            name: '选项',
            sort: num
          })
        }
        return item
      })
      state.configurationData.choice_list.push({
        name: '选项',
        sort: num
      })
      state.changeConfigFormData = state.changeConfigFormData + 1
    },
    //组件中下拉框选项值变化
    handelChangeSelect(state, val) {
      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          item.checked_sort = val
        }
        return item
      })
      state.configurationData.checked_sort = val
    },
    //组件配置中修改下拉框的默认值
    handleChangeSelectDefalut(state, val) {
      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          item.checked_sort = val
        }
        return item
      })
      state.configurationData.checked_sort = val
      state.changeConfigFormData = state.changeConfigFormData + 1
    },
    //修改下拉框选项值的标题
    handleChangeSelectOptionsInput(state, data) {
      let idx = data.index + 1
      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          item.drop_down_list[data.index].name = data.val.length == 0 ? '选项' + idx : data.val
        }
        return item
      })
      state.changeConfigFormData = state.changeConfigFormData + 1
    },
    //删除下拉框里面的选项
    deleteSelectOptionsItem(state, idx) {
      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          item.drop_down_list = item.drop_down_list.filter((data, i) => {
            return idx != i ? data : ''
          })
          if (item.checked_sort == idx) {
            item.checked_sort = ''
            state.configurationData.checked_sort = ''
          }
          state.configurationData.drop_down_list = JSON.parse(JSON.stringify(item.drop_down_list))
        }
        return item
      })
      state.changeConfigFormData = state.changeConfigFormData + 1
    },
    //新增一级列表选项
    addSelectOptionItem(state) {
      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          let num = item.drop_down_list.length + 1
          item.drop_down_list.push({
            sort: item.drop_down_list.length,
            name: '选项'

          })
          state.configurationData.drop_down_list = JSON.parse(JSON.stringify(item.drop_down_list))
        }
        return item
      })
      state.changeConfigFormData = state.changeConfigFormData + 1
    },
    //二级列表中的一级列表改变事件
    handleChangeFirstDefault(state, val) {
      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          item.firstDefault = val
          item.secondaryDefault = ''
          state.configurationData.firstDefault = val
          state.configurationData.secondaryDefault = ''
        }

        return item
      })


      state.changeConfigFormData = state.changeConfigFormData + 1
    },
    //二级列表中的二级列表改变事件
    handleChangeSecondaryDefault(state, val) {
      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          item.secondaryDefault = val
          state.configurationData.secondaryDefault = val
        }

        return item
      })
      state.changeConfigFormData = state.changeConfigFormData + 1
    },
    //添加二级列表数据
    addTwo_drop_downOptions(state, data) {
      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          item.secondValueData = data.secondValueData
          item.firstValueData = data.firstValueData
          item.secondaryDefault = ''
          item.firstDefault = ''
        }
        return item
      })
      state.configurationData.secondValueData = data.secondValueData
      state.configurationData.firstValueData = JSON.parse(JSON.stringify(data.firstValueData))
      state.configurationData.secondaryDefault = ''
      state.configurationData.firstDefault = ''
      state.changeConfigFormData = state.changeConfigFormData + 1
    },
    //修改二级列表组件中一级列表中选项的标题
    handlechangeSecondSelectOptionsTitle(state, data) {

      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          item.firstValueData = item.firstValueData.map((res, idx) => {
            if (idx == data.index) {
              res.name = data.val.length == 0 ? '一级选项' : data.val
            }
            return res
          })
        }
        return item
      })
      state.changeConfigFormData = state.changeConfigFormData + 1
    },
    //删除二级列表中的一级选项
    deleteSecondOption(state, data) {

      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          item.firstValueData = item.firstValueData.filter((res, idx) => {
            return data.index != idx ? res : ''
          })
          item.secondaryDefault = ''
          item.firstDefault = ''
          let arr = []
          item.firstValueData.forEach(element => {
            arr.push(element)
          })

          item.firstValueData = []
          let arr1 = []
          delete item.secondValueData[data.index]
          for (let i in item.secondValueData) {
            arr1.push(item.secondValueData[i])
          }
          item.secondValueData = []
          arr.forEach((data, dx) => {
            item.firstValueData.push({
              name: data.name,
              sort: dx
            })
            item.secondValueData[dx] = arr1[dx]
          })
          state.configurationData.firstValueData = JSON.parse(JSON.stringify(item.firstValueData))
          state.configurationData.secondValueData = JSON.parse(JSON.stringify(item.secondValueData))


        }
        return item
      })
      let arr = []
      arr = state.configurationData.firstValueData.filter((res, idx) => {
        return data.index != idx ? res : ''
      })

      state.configurationData.secondaryDefault = ''
      state.configurationData.firstDefault = ''
      state.changeConfigFormData = state.changeConfigFormData + 1
    },
    //批量编辑二级列表数组数据
    batchEditingSendSelctOptions(state, data) {
      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          item.firstValueData = data.fdata
          item.secondValueData = data.sdata
          item.secondaryDefault = ''
          item.firstDefault = ''
        }
        return item
      })
      state.configurationData.secondaryDefault = ''
      state.configurationData.firstDefault = ''
      state.configurationData.firstValueData = data.fdata
      state.configurationData.secondValueData = data.sdata
      state.changeConfigFormData = state.changeConfigFormData + 1
    },
    //下拉列表批量编辑事件
    batchEditingSelect(state, data) {
      state.configFormData = state.configFormData.map((item, index) => {
        if (index == state.componentsIndex) {
          item.drop_down_list = data
          item.checked_sort = ''
        }
        return item
      })
      state.configurationData.drop_down_list = data
      state.configurationData.checked_sort = ''
      state.changeConfigFormData = state.changeConfigFormData + 1
    },
    //关闭配置
    closeConfiguration(state) {
      state.configurePopUps = false
    },
    copy(obj) {
      // 先判断拷贝目标是对象还是数组，用instanceof判断原型是Array还是Object
      let res = obj instanceof Array ? [] : {};
      for (const [key, value] of Object.entries(obj)) {
        res[key] = typeof value === "object" ? formItem.mutations.copy(value) : value;
      }
      return res
      // return JSON.parse(JSON.stringify(obj));
    }
  },
  actions: {}
};

export default formItem
