<template>
  <div id="widget-form-item">
    <div v-if="!eleItem.is_bgy_default_field && eleItem.type != 'select' && eleItem.type != 'secondLevelSelect'"
      class="dec">
      {{eleItem.desc}}</div>

    <el-form-item
      v-if="(eleItem && eleItem.string) && eleItem.type != 'askForLeaveFor' && eleItem.type != 'nextLower' && eleItem.type != 'make'"
      :label="eleItem.title" class="widget-view" :class="{ active: configurationData.string === eleItem.string }"
      @click.native.stop="!eleItem.is_bgy_default_field?handleSelectWidget():''" :required="eleItem.is_required">
      <div class="input-btn">

        <template v-if="eleItem.type === 'hand_written'">
          <div class="single_choice_read_only"></div>
          <span style="opacity: 0">点击输入手写签名</span>
        </template>

        <template v-if="eleItem.type === 'single_line_text'">
             <div class="single_choice_read_only"></div>
          <el-input @input="handleChangeInput"  v-model="eleItem.default"
            :placeholder="eleItem.placeholder" ></el-input>
        </template>
        <!-- 多行文本 -->
        <template v-if="eleItem.type === 'mutil_line_text'">
             <div class="single_choice_read_only"></div>
          <el-input @input="handleChangeInput"  type="textarea" rows="3" v-model="eleItem.default"
            :placeholder="eleItem.placeholder">
          </el-input>
        </template>
        <!-- 单选 -->
        <template v-if="eleItem.type === 'single_choice'">
          <div class="single_choice_read_only"></div>
          <el-radio-group :readonly='true' @change="changeRadioOptions" v-model="eleItem.checked_sort"
            style="display:block">

            <el-radio v-for="(item, index) in eleItem.choice_list" :key="index" :label="item.sort"
              style="display: block;margin-top:5px">{{ item.name }}</el-radio>

          </el-radio-group>

          <el-radio-group v-model="eleItem.checked_sort" @change="changeRadioOptions">
            <el-radio v-for="(item, index) in eleItem.other_list" :key="index" :label="item.sort"
              style="display: block;margin-top:5px">{{ item.name }}</el-radio>
            <el-input  @input="changeotherDefault" v-if="eleItem.other_list.length == 1"
              v-model="eleItem.other_list[0].default" :maxlength="5" show-word-limit></el-input>
          </el-radio-group>
        </template>
        <!-- 多选 -->
        <template v-if="eleItem.type === 'mutil_choice'">
             <div class="single_choice_read_only"></div>
          <el-checkbox-group @change="changeRadioOptions" v-model="eleItem.checked_sort">
            <el-checkbox style="display: block;margin-top:3px" v-for="(item, index) in eleItem.choice_list" :key="index"
              :label="item.sort">{{ item.name }}</el-checkbox>
            <el-checkbox style="display: block;margin-top:3px" v-for="(item) in eleItem.other_list" :key="item.sort"
              :label="item.sort">{{ item.name }}</el-checkbox>
            <el-input  @input="changeotherDefault" v-if="eleItem.other_list.length == 1"
              v-model="eleItem.other_list[0].default" :maxlength="5" show-word-limit></el-input>
          </el-checkbox-group>
        </template>
        <!-- 计数器 -->
        <template v-if="eleItem.type === 'inputNumber'">
          <el-input-number v-model="eleItem.options.defaultValue" :min="eleItem.options.min" :max="eleItem.options.max"
            :controls-position="eleItem.options.position" :disabled="eleItem.options.disabled"></el-input-number>
        </template>

        <!-- 下拉框 -->
        <template v-if="eleItem.type === 'one_drop_down'">
             <div class="single_choice_read_only"></div>
          <el-select  @change="handelChangeSelect"
            v-model="eleItem.checked_sort" placeholder="请选择">
            <el-option v-for="item in eleItem.drop_down_list" :key="item.sort" :label="item.name" :value="item.sort">
            </el-option>
          </el-select>
        </template>
        <template v-if="eleItem.type === 'two_drop_down'">
             <div class="single_choice_read_only"></div>
          <el-select v-model="eleItem.firstDefault" placeholder="请选择" @change="changeFirstDefaultValue">
            <el-option v-for="item in eleItem.firstValueData" :key="item.sort" :label="item.name" :value="item.sort">
            </el-option>
          </el-select>
          <el-select style="margin-top:5px" @change="changeSecondaryDefault" v-model="eleItem.secondaryDefault"
            placeholder="请选择">
            <el-option v-for="item in eleItem.secondValueData[eleItem.firstDefault]" :key="item.sort" :label="item.name"
              :value="item.sort">
            </el-option>
          </el-select>
        </template>
        <!-- 滑块 -->
        <template v-if="eleItem.type === 'slider'">
          <el-slider v-model="eleItem.options.defaultValue" :disabled="eleItem.options.disabled"
            :min="eleItem.options.min" :max="eleItem.options.max"></el-slider>
        </template>
        <!-- 评分  -->
        <template v-if="eleItem.type === 'rate'">
          <el-rate v-model="eleItem.options.defaultValue" :max="eleItem.options.max"
            :disabled="eleItem.options.disabled" :show-text="eleItem.options.text" style="margin-top: 6px"></el-rate>
        </template>
        <!-- 时间选择器 -->
        <template v-if="eleItem.type === 'timePicker'">
             <div class="single_choice_read_only"></div>
          <el-date-picker  v-model="eleItem.default" type="datetime" placeholder="选择日期时间">
          </el-date-picker>

          <!-- <el-time-picker
        :style="{ width: eleItem.options.width }"
        v-model="eleItem.options.defaultValue"
        placeholder="选择时间"
        :disabled="eleItem.options.disabled"
        :clearable="eleItem.options.clearable"
        :default-value="new Date()"
        value-format="HH:mm:ss"
        format="HH:mm:ss"
      >
      </el-time-picker> -->
        </template>
        <!-- 日期选择器 -->
        <template v-if="eleItem.type === 'datePicker'">
             <div class="single_choice_read_only"></div>
          <el-date-picker v-model="eleItem.default" placeholder="选择日期" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" :value-format="eleItem.options.valueFormat" :default-value="new Date()"
            :style="{ width: eleItem.options.width }" :type="eleItem.options.type"
            :clearable="eleItem.options.clearable">
          </el-date-picker>
        </template>
        <!-- 文字 -->
        <template v-if="eleItem.type === 'text'">
          <div :class="{ 'form-text': listdata.config.labelPosition !== 'top' }" :style="{
          display: 'grid',
          'justify-content': eleItem.options.position,
          'font-size': eleItem.options.size + 'px',
          color: eleItem.options.color,
          'line-height': eleItem.options.lineHeight + 'px',
          'font-weight': eleItem.options.weight,
        }">
            <div :style="{
            'padding-left': eleItem.options.leftPadding + 'px',
            'font-style': eleItem.options.style,
            'text-indent': eleItem.options.indent + 'em',
          }">
              {{ eleItem.options.defaultValue }}
            </div>
          </div>
        </template>
        <!-- 分割线 -->
        <template v-if="eleItem.type === 'divider'">
          <div :class="{ 'form-text': listdata.config.labelPosition !== 'top' }">
            <el-divider :content-position="eleItem.options.position">
              {{ eleItem.options.defaultValue }}
            </el-divider>
          </div>
        </template>
      </div>
      <!-- 单行文本 -->


      <!-- 组件操作按钮 -->
      <div class="view-operations" v-if="!eleItem.is_bgy_default_field">
        <!-- 移动 -->
        <div>
          <el-tag effect="dark" class="movetag">
            <i class="el-icon-rank"></i>
          </el-tag>
        </div>
        <!-- 删除 -->
        <div>
          <el-tag effect="dark" @click.native.stop="removeWidgetElement()">
            <i class="el-icon-delete"></i></el-tag>
        </div>
      </div>
    </el-form-item>
    <div v-if="eleItem.type === 'askForLeaveFor'" class="ask-for-leave-box">
      <p>请输入请假事由（必填）</p>
      <div class="square">
        <img src="../assets/svgs/u81.svg" alt="">
      </div>
    </div>
    <div v-if="eleItem.type === 'nextLower'" class="next-lower">
      <p>下一级审批人</p>
      <div class="next">
        <div class="icon—plus">
          <i class="el-icon-plus"></i>
        </div>
      </div>
    </div>
    <div v-if="eleItem.type === 'make'" class="make">
      <p>抄送人</p>
      <div class="next">
        <div class="icon—plus">
          <i class="el-icon-plus"></i>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
  import draggable from "vuedraggable";
  import {
    mapState,
  } from "vuex";
  export default {
    components: {
      draggable: draggable,
    },
    props: ["eleItem", "eleIndex", 'index'],
    data() {
      return {
        selectWidget: this.select,
      };
    },
    computed: {
      ...mapState({
        componentsIndex: (state) => state.formItem.componentsIndex,
        configFormData: (state) => state.formItem.configFormData,
        changeConfigFormData: (state) => state.formItem.changeConfigFormData,
        configurationData: (state) => state.formItem.configurationData,
      }),
    },
    methods: {
      //修改文本的值
      handleChangeInput(val) {
        this.$store.commit('handleChangeWidgetTextDefault', {
          default: val
        })
      },
      //修改单选框默认值
      changeRadioOptions(val) {

        this.$store.commit('clickRadioOptions', val)
      },
      //修改单选或者复选中其他选择的input的值
      changeotherDefault(
        val
      ) {
        this.$store.commit('handleChangeotherDefault', val)
      },
      handelChangeSelect(val) {
        this.$store.commit('handelChangeSelect', val)
      },
      // 点击不同的组件触发
      handleSelectWidget() {
        this.$store.commit('handleChangeComponentsIndex', this.eleIndex)
      },
      changeFirstDefaultValue(val) {
        this.handleSelectWidget()
        this.$store.commit('handleChangeFirstDefault', val)
      },
      changeSecondaryDefault(val) {
        this.handleSelectWidget()
        this.$store.commit('handleChangeSecondaryDefault', val)
      },
      // 删除组件方法
      removeWidgetElement() {
        const index = this.eleIndex;
        this.$store.commit('removeConfigFormDataItem', index)
      },
    },
    watch: {

    },
  };

</script>
<style scoped>
  .square {
    /* border: 1px solid #8a8686; */
    width: 40px;
    height: 40px;
  }

  .view-operations {
    display: none;
    width: 30%;
  }

  .input-btn {
    width: 70%;
  }


  .active {
    border: 2px solid #409eff !important;
  }

  .active .view-operations {
    position: absolute;
    bottom: 0px;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    height: 100%;
    z-index: 5;
  }

  .grid-template {
    margin-left: -100px !important;
  }

  .grid-template>.columns {
    border: 2px solid #9999;
    height: 50px;
  }

  .radioLineHeight {
    line-height: 32px;
  }

  .form-text {
    margin-left: -100px;
  }

  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    background: #fff;
    padding-top: 3px;
    padding-bottom: 3px;
  }

  .el-input.is-disabled .el-input__inner {
    background: #fff;
  }

  .ask-for-leave-box {
    width: 100%;
    height: 90px;
    border: 1px solid #b1aaaa;
    padding-left: 10px;
    padding-bottom: 10px;
    background: #fff;
  }

  .next {
    width: 100%;
    height: 90px;
    /* border: 1px solid #000; */
    background: #fff;
    display: flex;
    align-items: center;


  }

  .next-lower {
    margin-top: 10px;
    margin-bottom: 10px;

  }

  .make {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .icon—plus {
    width: 50px;
    height: 50px;
    border: 1px solid #000;

    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .icon—plus i {
    font-size: 30px;
  }

  #widget-form-item .dec {
    margin-bottom: 5px;
    height: 17px;
  }

  .single_choice_read_only {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

</style>
