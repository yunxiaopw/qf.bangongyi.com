<template>

  <div class="right-configuration-area">
    <el-drawer
      :title="configurationData.type == 'single_line_text' ? '单行文本' : configurationData.type == 'mutil_line_text' ? '多行文本' : configurationData.type == 'single_choice' ? '单选按钮' : configurationData.type == 'mutil_choice' ? '复选按钮' : configurationData.type == 'one_drop_down' ? '下拉列表' : configurationData.type == 'hand_written' ? '手写签名' : '二级列表'  "
      :visible.sync="configurePopUps" direction="rtl" :before-close="handleClose" :modal-append-to-body='false'
      :modal='false' size='288px' :wrapperClosable='false'>
      <div>
        <el-form ref="ruleform"
          v-if=" (configurationData.type == 'single_line_text' || configurationData.type == 'mutil_line_text') "
          :model="configurationData">
          <el-form-item label="标题" style="margin-bottom:0px">
            <el-input :maxlength="5" show-word-limit @input="handelChangeTitle" size="small"
              v-model="configurationData.title">
            </el-input>
          </el-form-item>
          <el-form-item label="描述" style="margin-bottom:0px">
            <el-input :maxlength="15" show-word-limit @input="handelChangeDescribe" size="small"
              v-model="configurationData.desc">
            </el-input>
          </el-form-item>
          <el-form-item label="占位符" style="margin-bottom:0px">
            <el-input :maxlength="15" show-word-limit @input="handelChangePlaceholder" size="small"
              v-model="configurationData.placeholder">
            </el-input>
          </el-form-item>

          <el-form-item label="默认值" style="margin-bottom:0px">
            <el-input @input="handelChangeDefaultValue" size="small"
              :maxlength="configurationData.type == 'mutil_line_text' ? 30 : 15" v-model="configurationData.default"
              show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="是否必填" style="margin-bottom:0px">
            <el-switch @change='handlChangeRequired' v-model="configurationData.is_required" active-color="#13ce66"
              inactive-color="#8c8282">
            </el-switch>
          </el-form-item>
        </el-form>
        <el-form v-if=" (configurationData.type == 'single_choice' || configurationData.type == 'mutil_choice') "
          v-model="configurationData">

          <el-form-item label="标题" style="margin-bottom:0px">
            <el-input :maxlength="5" @input="handelChangeTitle" size="small" v-model="configurationData.title"
              show-word-limit>
            </el-input>
          </el-form-item>
          <el-form-item label="描述" style="margin-bottom:0px">
            <el-input :maxlength="15" show-word-limit @input="handelChangeDescribe" size="small"
              v-model="configurationData.desc">
            </el-input>
          </el-form-item>

          <el-form-item label="选项" style="margin-bottom:0px">
            <div class="option-item" v-for="(item,index) in configurationData.choice_list" :key="index">
              <el-radio @click.native.prevent="clickRadio(item.sort)" v-if=" configurationData.type == 'single_choice'"
                v-model="configurationData.checked_sort" :label="item.sort"></el-radio>
              <el-checkbox v-else @change="changeRadioOptions(item.sort)" v-model="configurationData.checked_sort"
                :key="index" :label="item.sort"></el-checkbox>
              <el-input :maxlength='5' show-word-limit style="width:80%" @input='changeRadioInput(item.name,index)'
                size="small" :ref="'input' + index" v-model="item.name"></el-input>
              <el-button v-if="configurationData.choice_list.length > 1 "
                @click="deleteOption(item.sort,configurationData.type)" size="mini" type="danger" icon="el-icon-delete">
              </el-button>
            </div>
            <div class="option-item" v-for="(item) in configurationData.other_list" :key="item.sort">
              <el-radio v-if=" configurationData.type == 'single_choice'" @change="changeRadioOptions"
                v-model="configurationData.checked_sort" :label="item.sort"></el-radio>
              <el-checkbox v-else @change="changeRadioOptions(item.sort)" v-model="configurationData.checked_sort"
                :label="item.sort"></el-checkbox>
              <el-input :maxlength='5' show-word-limit style="width:80%" @input='changeOtherInput(item.name)'
                size="small" ref="other" v-model="item.name"></el-input>
              <el-button @click="deleteOther" size="mini" type="danger" icon="el-icon-delete"></el-button>
            </div>

            <el-button :disabled="configurationData.choice_list.length > 5 " @click="addOption" type="primary"
              size="mini" icon="el-icon-circle-plus-outline">添加选项</el-button>
            <el-button :disabled='configurationData.other_list.length == 1' @click="addOther" type="primary" size="mini"
              icon="el-icon-circle-plus-outline">添加其他</el-button>
          </el-form-item>
          <el-form-item label="是否必填" style="margin-bottom:0px">
            <el-switch @change='handlChangeRequired' v-model="configurationData.is_required" active-color="#13ce66"
              inactive-color="#8c8282">
            </el-switch>
            <span class="sw-tip">开启后可作为分支审批条件</span>
          </el-form-item>

        </el-form>
        <el-form v-if="configurationData.type == 'one_drop_down' " v-model="configurationData">

          <el-form-item label="标题" style="margin-bottom:0px">
            <el-input :maxlength="5" @input="handelChangeTitle" size="small" v-model="configurationData.title"
              show-word-limit>
            </el-input>
            <el-form-item label="描述" style="margin-bottom:0px">
              <el-input :maxlength="15" show-word-limit @input="handelChangeDescribe" size="small"
                v-model="configurationData.desc">
              </el-input>
            </el-form-item>
            <el-form-item label="默认值" style="margin-bottom:0px">
              <el-select @change="changeSelectDefalut" style="width:100%" size="small" clearable
                v-model="configurationData.checked_sort" placeholder="请选择">
                <el-option v-for="item in configurationData.drop_down_list" :key="item.sort" :label="item.name"
                  :value="item.sort">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form-item>

          <el-form-item label="选项" style="margin-bottom:0px">

            <div class="option-item" v-for="(item,index) in configurationData.drop_down_list" :key="index">
              <el-input style="width:80%" @input='changeSelectOptionsInput(item.name,index)' size="small"
                :ref="'input' + index" v-model="item.name"></el-input>
              <el-button v-if="configurationData.drop_down_list.length > 1 " @click="deleteSelectOptions(index)"
                size="mini" type="danger" icon="el-icon-delete"></el-button>
            </div>

            <el-button @click="addSelectOption" type="primary" size="mini" icon="el-icon-circle-plus-outline">添加选项
            </el-button>
            <el-button @click="batchAddSelectOption(configurationData.drop_down_list)" type="primary" size="mini"
              icon="el-icon-circle-plus-outline">批量编辑
            </el-button>
          </el-form-item>
          <el-form-item label="是否必填" style="margin-bottom:0px">
            <el-switch @change='handlChangeRequired' v-model="configurationData.is_required" active-color="#13ce66"
              inactive-color="#8c8282">
            </el-switch>
            <span class="sw-tip">开启后可作为分支审批条件</span>

          </el-form-item>

        </el-form>
        <el-form v-if="configurationData.type == 'two_drop_down' " v-model="configurationData">
          <el-form-item label="标题" style="margin-bottom:0px">
            <el-input :maxlength="5" @input="handelChangeTitle" size="small" v-model="configurationData.title"
              show-word-limit>
            </el-input>
          </el-form-item>
          <el-form-item label="描述" style="margin-bottom:0px">
            <el-input :maxlength="15" show-word-limit @input="handelChangeDescribe" size="small"
              v-model="configurationData.desc">
            </el-input>
          </el-form-item>
          <el-form-item label="默认值" style="margin-bottom:0px">
            <el-select clearable style="width:100%" size="small" v-model="configurationData.firstDefault" placeholder="请选择"
              @change="changeFirstDefaultValue">
              <el-option v-for="item in configurationData.firstValueData" :key="item.sort" :label="item.name"
                :value="item.sort">
              </el-option>
            </el-select>
            <el-select clearable style="width:100%" size="small" v-model="configurationData.secondaryDefault"
              placeholder="请选择" @change="changeSecondaryDefault">
              <el-option v-for="item in configurationData.secondValueData[configurationData.firstDefault]"
                :key="item.sort" :label="item.name" :value="item.sort">
              </el-option>
            </el-select>


            <el-form-item label="选项" style="margin-bottom:0px">
              <div class="option-item" v-for="(item,index) in configurationData.firstValueData" :key="index">
                <el-input style="width:80%" @input='changeSecondSelectOptionsInput(item.name,index)' size="small"
                  :ref="'input' + index" v-model="item.name"></el-input>
                <el-button v-if="configurationData.firstValueData.length > 1 " @click="deleteSecondOption(item,index)"
                  size="mini" type="danger" icon="el-icon-delete"></el-button>
              </div>
              <el-button @click="batchAddSecondSelectOption(configurationData.firstValueData)" type="primary"
                size="mini" icon="el-icon-circle-plus-outline">添加选项
              </el-button>
              <el-button @click="clickisBatchEditing" type="primary" size="mini" icon="el-icon-circle-plus-outline">批量编辑
              </el-button>
            </el-form-item>
          </el-form-item>
          <el-form-item label="是否必填" style="margin-bottom:0px">
            <el-switch @change='handlChangeRequired' v-model="configurationData.is_required" active-color="#13ce66"
              inactive-color="#8c8282">
            </el-switch>
            <span class="sw-tip">开启后可作为分支审批条件</span>

          </el-form-item>

        </el-form>

        <el-form v-if="configurationData.type == 'hand_written' " v-model="configurationData">
          <el-form-item label="标题" style="margin-bottom:0px">
            <el-input :maxlength="5" @input="handelChangeTitle" size="small" v-model="configurationData.title"
                      show-word-limit>
            </el-input>
          </el-form-item>
          <el-form-item label="是否使用上次签名" style="margin-bottom:0px">
            <el-switch @change='handleChangeFormItemHandWritenUsePerv' v-model="configurationData.use_prev" active-color="#13ce66"
                       inactive-color="#8c8282">
            </el-switch>
          </el-form-item>
          <el-form-item label="是否必填" style="margin-bottom:0px">
            <el-switch @change='handlChangeRequired' v-model="configurationData.is_required" active-color="#13ce66"
                       inactive-color="#8c8282">
            </el-switch>
          </el-form-item>

        </el-form>
      </div>
    </el-drawer>

    <!-- 添加二级列表数据项的弹窗 -->
    <AddSecondaryOption v-if="isAddSecondaryOption" :isAddSecondaryOption='isAddSecondaryOption'
      :batchAddTitle='batchAddTitle' :batchData='batchData' @sumbitAddSecondaryOption='sumbitAddSecondaryOption'
      @clonseAddSecondaryOption='clonseAddSecondaryOption' />
    <!-- 批量编辑二级下拉列表 -->
    <BatchEditing v-if="isBatchEditing" :isBatchEditing='isBatchEditing' :batchEditingData='batchEditingData'
      @sumbitBatchEditing='sumbitBatchEditing' @clonseBatchEditing='clonseBatchEditing' />
    <!-- 批量编辑下拉列表数据 -->
    <BatchEditingSelect v-if="isBatchEditingSelect" :isBatchEditingSelect='isBatchEditingSelect' :batchData='batchData'
      @sumbitBatchEditingSelect='sumbitBatchEditingSelect' @clonseBatchEditingSelect='clonseBatchEditingSelect' />
  </div>
</template>

<script>
  import AddSecondaryOption from "./AddSecondaryOption"
  import BatchEditing from "./BatchEditing"
  import BatchEditingSelect from "./BatchEditingSelect"
  import {
    mapState,
  } from "vuex";
  export default {
    components: {
      AddSecondaryOption,
      BatchEditing,
      BatchEditingSelect
    },
    data() {
      return {
        isAddSecondaryOption: false,
        isBatchEditing: false,
        isBatchEditingSelect: false,
        batchData: [],
        batchAddTitle: '',
        form: {},
        fromData: {},

        batchEditingData: [],
      }
    },
    computed: {
      ...mapState({
        componentsIndex: (state) => state.formItem.componentsIndex,
        configFormData: (state) => state.formItem.configFormData,
        changeConfigFormData: (state) => state.formItem.changeConfigFormData,
        configurationData: (state) => state.formItem.configurationData,
        configurePopUps: (state) => state.formItem.configurePopUps,

      }),
    },

    methods: {
      //点击批量编辑
      clickisBatchEditing() {
        this.isBatchEditing = true
        let arr = []

        this.configurationData.firstValueData.forEach(item => {
          let obj = {
            caption: item.name,
            value: item.sort,
            children: []
          }

          this.configurationData.secondValueData[item.sort].forEach(data => {
            obj.children.push(data.name)
          })
          arr.push(obj)
        });
        this.batchEditingData = arr

      },
      //添加其他选项
      addOther() {
        this.$store.commit('handelChangeOperationOther', 'add')
      },
      //删除单选框中的其他选项
      deleteOther() {
        this.$store.commit('handelChangeOperationOther', 'delete')

      },

      clonseAddSecondaryOption() {
        this.isAddSecondaryOption = false
      },
      //批量添加
      batchAddSelectOption(data) {
        this.batchData = this.configurationData.drop_down_list
        this.isBatchEditingSelect = true

      },
      //关闭配置
      handleClose() {
        this.$store.commit('closeConfiguration')
      },
      changeRadioInput(val, index) {
        this.$nextTick(() => {
          this.$refs['input' + index][0].$refs.input.focus()
        })
        this.$store.commit('handlechangeRadioOptionsName', {
          val,
          index
        })
      },
      changeSelectOptionsInput(val, index) {
        this.$nextTick(() => {
          this.$refs['input' + index][0].$refs.input.focus()
        })
        this.$store.commit('handleChangeSelectOptionsInput', {
          val,
          index
        })
      },
      //新增单选多选按钮
      addOption() {
        this.$store.commit('addRadioOptions')
      },
      //删除单选多选
      deleteOption(idx, type) {
        this.$store.commit('deleteRadioOptions', {
          idx,
          type
        })
      },
      clickRadio(sort){

          this.$store.commit('clickRadioOptions', sort)
        //   this.configurationData.checked_sort = sort == this.configurationData.checked_sort ? '' : sort
      },
      changeRadioOptions(val) {
        this.$store.commit('clickRadioOptions', val)
      },

      //新增下拉框里面的选项
      addSelectOption() {
        this.$store.commit('addSelectOptionItem')

      },
      //删除下拉框里面的选项
      deleteSelectOptions(idx) {
        this.$store.commit('deleteSelectOptionsItem', idx)
      },
      //删除二级列表
      deleteSecondOption(item, index) {

        this.$store.commit('deleteSecondOption', {
          item,
          index
        })

      },
      //批量编辑二级列表数据
      batchAddSecondSelectOption() {
        this.batchData = this.configurationData
        this.isAddSecondaryOption = true
        this.batchAddTitle = '批量二级下拉列表数据选项'
      },
      sumbitAddSecondaryOption(data) {
        this.isAddSecondaryOption = false
        this.$store.commit('addTwo_drop_downOptions', data)

      },
      sumbitBatchEditing(fdata, sdata) {
        this.isBatchEditing = false
        this.$store.commit('batchEditingSendSelctOptions', {
          fdata,
          sdata
        })
      },
      clonseBatchEditing() {
        this.isBatchEditing = false
      },
      //修改标题
      handelChangeTitle(val) {
        this.$store.commit('handleChangeFormItemTilet', val)
      },
      //修改描述
      handelChangeDescribe(val) {
        this.$store.commit('handleChangeFormItemDec', val)
      },
      //修改占位符
      handelChangePlaceholder(val) {
        this.$store.commit('handleChangeFormItemPlaceholder', val)
      },
      //修改默认值
      handelChangeDefaultValue(val) {
        this.$store.commit('handleChangeFormItemDefault', {
          default: val
        })
      },
      //修改是否必填
      handlChangeRequired(val) {
        this.$store.commit('handleChangeFormItemRequired', val)
      },
      handleChangeFormItemHandWritenUsePerv(val) {
        this.$store.commit('handleChangeFormItemHandWritenUsePerv', val)
      },
      changeSecondSelectOptionsInput(val, index) {
        this.$store.commit('handlechangeSecondSelectOptionsTitle', {
          val,
          index
        })
      },
      //下拉框修改默认值
      changeSelectDefalut(val) {
        this.$store.commit('handleChangeSelectDefalut', val)
      },
      //修改其他inout框里面的值
      changeOtherInput(val) {
        this.$nextTick(() => {
          this.$refs['other'][0].focus()
        })
        this.$store.commit('handelChangeOtherDefault', val)
      },
      changeFirstDefaultValue(val) {
        this.$store.commit('handleChangeFirstDefault', val)
      },
      changeSecondaryDefault(val) {
        this.$store.commit('handleChangeSecondaryDefault', val)
      },
      //下拉列表批量编辑确定
      sumbitBatchEditingSelect(data) {
        this.isBatchEditingSelect = false
        this.$store.commit('batchEditingSelect', data)
      },
      //下拉列表批量编辑取消
      clonseBatchEditingSelect() {
        this.isBatchEditingSelect = false
      },

    }
  }

</script>

<style>
.el-radio:focus:not(.is-focus):not(:active):not(.is-disabled) .el-radio__inner{
    box-shadow: none;
}
  #el-drawer__title span {
    font-size: 18px;
    font-weight: 400;
  }

  .el-drawer__body {
    overflow: auto;
  }

  .el-drawer__wrapper {
    width: 20%;
    left: 80%;
    left: auto !important;
  }

  .el-drawer__open .el-drawer.rtl {
    background: #e6e6e6;
    padding-left: 10px;
    padding-right: 10px;
  }

  .el-drawer {
    width: 100%;
  }

  .option-item {
    width: 100%;
    display: flex;
    margin-top: 10px;
    align-items: center;

  }

  .option-item .el-radio {
    margin-right: 15px;
  }

  .option-item .el-radio .el-radio__label {
    display: none;
  }

  .option-item .el-checkbox {
    margin-right: 15px!important;
  }

  .option-item .el-checkbox .el-checkbox__label {
    display: none;
  }

  .option-item .el-button--mini {
    /* padding: 12px; */
    margin-left: 10px;
    height: 30px;
  }

  .right-configuration-area {
    /* background: #000; */
    width: 20%;
    height: 100%;
  }

  .device-ios {

    width: 320px;

    height: 548px;

    background: #111;

    border-radius: 55px;

    box-shadow: 0px 0px 0px 2px #aaa;

    padding: 105px 20px;

    position: relative;

    margin-right: 80px;

  }

  .device-ios:before {

    content: '';

    width: 60px;

    height: 10px;

    border-radius: 10px;

    position: absolute;

    left: 50%;

    margin-left: -30px;

    background: #333;

    top: 50px;

  }

  .device-ios:after {

    content: '';

    position: absolute;

    width: 60px;

    height: 60px;

    left: 50%;

    margin-left: -30px;

    bottom: 20px;

    border-radius: 100%;

    box-sizing: border-box;

    border: 5px solid #333;

  }

  .device-inner {

    background-color: #FFF;

    height: 100%;

  }
  .el-input__suffix{
      display: flex!important;
      align-items: center!important;
      justify-content: center!important;


  }
 .el-input__suffix .el-input__suffix-inner .el-icon-circle-close{
      color: red!important;
      font-size: 18px!important;
        margin-top: 2px!important;
  }
.sw-tip{
  font-size: 13px;
  color: #606266;
}
</style>
