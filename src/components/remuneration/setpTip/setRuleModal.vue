<template>
  <div class="set-rule-dialog">
    <el-dialog
      :visible.sync="visible"
      :title="title"
      width="510px"
      :loading="submitLoading"
      resize
      destroy-on-close
      :before-close="handleCancel"
    >
      <div class="radio-container">
        <el-radio-group v-model="radio">
          <div class="radio-item" v-for="item in optionList" :key="item.key">
            <div class="btn-wrap">
              <el-radio :label="item.key">{{ item.label }}</el-radio>
              //FIXME 根据是否传入已设置自定义公式 --来确定选择采用textarea 还是公式编辑器
              <!-- <el-button
                v-if="item.isBtn && radio === item.key"
                @click="handleToSet"
                >去设置</el-button
              > -->
               <el-button
                v-if="item.isBtn && radio === item.key"
                @click="open()"
                >去设置</el-button
              >
            </div>
            <el-input
              style="margin-top: 10px"
              v-if="item.isBtn && isShowInput"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="textarea"
            >
            </el-input>
          </div>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </span>
    </el-dialog>
    <cardDialog   ref="cardDialog"></cardDialog>
  </div>
</template>

<script>
import cardDialog from "@/components/remuneration/setSalary/ruleSetting"
export default {
  components:{cardDialog},
  data() {
    return {
      radio: null,
      visible: false,
      title: "规则设置-应发工资",
      submitLoading: false,
      optionList: [
        { key: 1, label: "应发合计（ ）- 应扣合计（ ）", isBtn: false },
        //FIXME 从系统中获取数据 ---点击后出现两个选项 （未完成）
        { key: 2, label: "从系统中获取数据", isBtn: false },
        { key: 3, label: "每月手动导入", isBtn: false },
        { key: 4, label: "每月手动导入", isBtn: true }
      ],
      isShowInput: false,
      textarea: ""
    };
  },
  methods: {
    showModal(payload) {
      this.visible = true;
    },
    // 选中“自定义公式”选项时，如果已设置，则显示已设置的公式内容，点击进入弹窗编辑 
    handleToSet() {
      this.isShowInput = !this.isShowInput;
    },
    handleCancel() {
        this.visible = false;
        this.isShowInput = false;
        this.radio = null;
    },
    open() {
      this.$refs.cardDialog.open((cancel) => {
        cancel();
        console.log("点击提交按钮了");
      });
    },
  }
};
</script>

<style scoped lang="less">
.set-rule-dialog {
  /deep/ .el-dialog__header {
    border-bottom: 1px solid #f0f0f0;
    padding-top: 13px;
    padding-bottom: 13px;
    .el-dialog__title {
      color: #1f1f1f;
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
    border-top: 1px solid #f0f0f0;
  }
  /deep/ .el-button {
    padding: 6px 17px;
    font-weight: 400;
    border-radius: 2px;
  }
}
.radio-container {
  .radio-item {
    width: 459px;
    background: #ffffff;
    border-radius: 2px;
    border: 1px solid #f0f0f0;
    display: flex;
    justify-content: center;
    padding: 17px;
    margin-bottom: 13px;
    flex-direction: column;
    .btn-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
