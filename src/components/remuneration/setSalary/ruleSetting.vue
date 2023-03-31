<!-- 规则设置 -->
// card-dialog组件内部
<template>
  <div class="set-salary-option">
    <el-dialog title="公式设置" :visible.sync="dialogsTable" custom-class="set-modal">
      <div class="modal-container">
        <div class="content-left">
          <div class="header">
            <div class="title">
              <div class="line"></div>
              <div class="select_text">应发工资=</div>
              <el-form :inline="true" :model="formInline" class="demo-form-inline"
                style="margin-top:15px;position:absolute;right:35%;">
                <el-form-item label="">
                  <el-select v-model="formInline.region" placeholder="活动区域" style="width:112px;height: 32px;">
                    <el-option v-for="(item, index) in formulaList" :lable="item.label" :key="index"
                      :value="item.label"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="保留">
                  <el-select v-model="formInline.num" placeholder="活动区域" style="width:60px;height: 32px;">
                    <el-option v-for="num in 4" :label="`${num}`" :key="num" :value="num"></el-option>
                  </el-select>
                  <span>位小数</span>
                </el-form-item>
              </el-form>
            </div>

          </div>
          <!-- 文本输入框 -->
          <el-input type="textarea" :rows="4" v-model="textarea" @focus="handleFocus()" ref="focusTextarea"></el-input>
          <div class="testBtn" style="margin-top:10px;">
            <el-button>
              公式校验
            </el-button>
          </div>
          <!-- 插入运算符 -->
          <div class="operator" style="margin-top:10px;">
            <div class="title">
              <div class="line"></div>
              <div class="select_text" style="margin-right:12px;">插入运算符</div>
              <div class="operatorBtn" v-for="(item, index) in operatorList" :key="item.id">{{ item.label }}</div>
            </div>
          </div>
          <!-- 插入字段 -->
          <div class="insertFild">
            <div class="title" style="margin-top: 30px;">
              <div class="line"></div>
              <div class="select_text" style="margin-right:12px;">插入字段</div>
            </div>
            <div class="insertContent">
              <div class="btnBox">
                <div v-for="(item, index) in contentList" :key="item.key" style="display: block;">{{ item.label }}</div>
              <div class="contentBtn" v-for="(item, index) in insertContentList" :key="item.key">{{ item.label }}</div>
              </div>
              <div class="btnBox">
                <div v-for="(item, index) in contentList" :key="item.key" >{{ item.label }}</div>
              <div class="contentBtn" v-for="(item, index) in insertContentList" :key="item.key">{{ item.label }}</div>
              </div>
              <div class="btnBox">
                <div v-for="(item, index) in contentList" :key="item.key" >{{ item.label }}</div>
              <div class="contentBtn" v-for="(item, index) in insertContentList" :key="item.key">{{ item.label }}</div>
              </div>
            </div>
          </div>
          <div style="margin: 15px 0"></div>


        </div>
        <div class="content-right">
          <div class="right-header">
            <div class="title">
              <div class="line"></div>
              <div class="select_text">已选项</div>

            </div>

          </div>

        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="cancel">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'cardDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogsTable: false,
      formInline: {
        user: '',
        region: '四舍五入',
        num: '2',
      },
      formulaList: [
        { label: '四舍五入' },
        { label: '向上取整' },
        { label: '向下取整' },
      ],
      textarea: '',
      // 插入运算符
      operatorList: [
        { id: 1001, label: '+' },
        { id: 1002, label: '-' },
        { id: 1003, label: '*' },
        { id: 1004, label: '/' },
        { id: 1005, label: '()' },
        { id: 1006, label: '>' },
        { id: 1007, label: '<' },
        { id: 1008, label: '>=' },
        { id: 1009, label: '<=' },
        { id: 1010, label: '≠' },
        { id: 1011, label: `''` },
      ],
      // 插入字段
      contentList: [
        { label: '人事信息', key: 1 }
      ],
      insertContentList: [
        { key: 101, label: '入职日期' },
        { key: 102, label: '转正日期' },
        { key: 103, label: '职级' },
        { key: 104, label: '员工状态' },
        { key: 105, label: '姓名' },
      ]

    }
  },
  // mounted() {
  //   this.$refs.focusTextarea.focus();
  // },
  // 使用计算属性获取visible变化值
  // computed: {
  //   dialogsTable: {
  //     get() {
  //       return this.visible
  //     },
  //     set(val) {
  //       console.log(val)
  //       this.$emit('update:visible', val) // openCardDialog改变的时候通知父组件
  //     }
  //   }
  // },
  methods: {
    open() {
      this.dialogsTable = true;
      return this.$nextTick();
    },
    cancel() {
      this.dialogsTable = false;
    },
    handleFocus() {
      console.log(111111111)
    }

  }
}
</script>

<style scoped lang="less">
.set-salary-option {
  /deep/ .el-dialog__header {
    border-bottom: 1px solid #F0F0F0;
    padding-top: 13px;
    padding-bottom: 13px;

    .el-dialog__title {
      color: #1F1F1F;
    }

    .el-dialog__headerbtn {
      top: 13px;
    }
  }

  /deep/ .el-dialog__body {
    padding: 26px;
  }

  /deep/ .el-dialog__footer {
    padding-top: 11px;
    padding-bottom: 11px;
    border-top: 1px solid #F0F0F0;
  }

  /deep/ .el-button {
    padding: 8px 17px;
    font-weight: 400;
    border-radius: 2px;
  }

  .set-modal {
    .modal-container {
      width: 100%;
      display: flex;
      min-height: 500px;

      .content-left {
        width: 66%;
        padding-right: 30px;
      }

      .content-right {
        width: 34%;
        border-left: 1px solid #F0F0F0;
        padding-left: 30px;
      }

      .testBtn .el-button {
        background: #1AAC88;
        height: 32px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        border: none;
      }

      .select_text {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #262626;
      }

      .operatorBtn {
        width: 36px;
        height: 32px;
        background: #FFFFFF;
        border: 1px solid #D9D9D9;
        text-align: center;
        margin-right: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #262626;
      }

      .insertContent {
        padding: 12px 16px;
        height: 291px;
        background: #FFFFFF;
        border-radius: 2px;
        border: 1px solid #D9D9D9;
        overflow: auto;
        margin-top:12px;
      }

      .contentBtn {
        width: 136px;
        height: 32px;
        background: #FFFFFF;
        border: 1px solid #D9D9D9;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        text-align: center;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #262626;
        margin-right: 8px;
        margin-top:12px;
        display: inline-block;
        float: left;
        line-height: 32px;
      }
      .btnBox{
        margin-bottom: 10px;
        clear: both;
        margin-top: 12px;
      }
    }
  }

  .header,
  .right-header {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    justify-content: space-between;
  }

  .title {
    display: flex;
    align-items: center;

    .line {
      width: 2px;
      height: 15px;
      background: #1aac88;
      border-radius: 1px 1px 0px 0px;
      margin-right: 6px;
    }
  }

}

.el-input {
  width: 320px;
  height: 32px;
  background: #ffffff;
  border-radius: 2px;
}

.el-dialog__header {
  border-bottom: #f0f0f0;
}

.el-dialog__body {
  padding-top: 0;
}

/deep/ .el-form-item__label {
  width: 50px;
}

/deep/ .el-input__inner {
  height: 32px;
}
</style>