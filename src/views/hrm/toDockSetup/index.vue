<template>
   <div class="main-box">
      <!-- 页头 -->
      <HeadLine>第三方对接设置</HeadLine>
      
      <!-- 内容区 -->
      <div class="content_box">
        <div class="head">企业微信CorpID：123456789</div>
        <!-- 手动同步 -->
        <div class="content_item_head"><span class="left">手动同步</span></div>
        <div class="manual">
          <div class="manual_item">
            <div class="label">组织信息：</div>
            <div class="r_value">
              <el-button size="small" @click="dialogAll(1)">办公逸同步到企业微信</el-button>
              <el-button size="small" @click="dialogAll(2)">企业微信同步到办公逸</el-button>
            </div>
          </div>
          <div class="manual_item">
            <div class="label">员工信息：</div>
            <div class="r_value">
              <el-button size="small" @click="dialogAll(3)">办公逸同步到企业微信</el-button>
              <el-button size="small" @click="dialogAll(4)">企业微信同步到办公逸</el-button>
            </div>
          </div>
        </div>

        <!-- 自动同步设置 -->
        <div class="content_item_head"><span class="left">自动同步设置</span></div>
        <div class="manual_auto">
          <div class="head">企业微信 → 办公逸</div>
          <div class="border_content" v-if="isInstall">
            <span @click="isInstall = false">已开启</span>
          </div>
          <div class="border_content" v-else>
            <img src="../../../assets/images/user.png">
            <span>办公逸通讯录</span>
            <el-button size="small" @click="isInstall = true">安装</el-button>
          </div>
          <div class="head">办公逸 → 企业微信</div>
          <div class="border_content_2">
            <div class="manual_item">
              <div class="label">组织信息：</div>
              <div class="r_value">
                <el-checkbox-group v-model="checkList_1">
                  <el-checkbox label="新增"></el-checkbox>
                  <el-checkbox label="移动"></el-checkbox>
                  <el-checkbox label="停用">停用（在企业微信删除该组织）</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div class="manual_item">
              <div class="label">员工信息：</div>
              <div class="r_value">
                <el-checkbox-group v-model="checkList_2">
                  <el-checkbox label="新增"></el-checkbox>
                  <el-checkbox label="异动"></el-checkbox>
                  <el-checkbox label="离职时在企业微信删除"></el-checkbox>
                  <el-checkbox label="离职时在企业微信禁用"></el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- 手动同步相关 弹层 -->
    <el-dialog
      class="dialog"
      :title="manualTitle"
      width="480px"
      :visible.sync="manualDialog"
      destroy-on-close
    >
      <div class="dialog_content">
        <div class="dialog_item" v-if="manualDialogType < 3">
          <div class="label">同步内容：</div>
          <div class="value">组织名称，上级组织</div>
        </div>
        <el-checkbox-group v-model="checkList_3" v-else-if="manualDialogType === 3">
          <el-checkbox label="更新员工资料"></el-checkbox>
          <el-checkbox label="增加新员工"></el-checkbox>
          <el-checkbox label="邀请新员工"></el-checkbox>
        </el-checkbox-group>
        <el-checkbox-group v-model="checkList_4" v-else>
          <el-checkbox label="更新员工部门"></el-checkbox>
          <el-checkbox label="增加新员工"></el-checkbox>
        </el-checkbox-group>
      </div>
      
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="startSync">开始同步</el-button>
      </div>
    </el-dialog>

   </div>
</template>

<script>
export default {
   name: 'toDockSetup',
   data() {
     return {
        isInstall: false,
        checkList_1: ['新增','移动', '停用'],
        checkList_2: ['新增','异动', '离职时在企业微信删除', '离职时在企业微信禁用'],
        // 手动同步相关 弹层
        manualTitle: '',
        manualDialog: false,
        manualDialogType: null,
        checkList_3: ['更新员工资料','增加新员工', '邀请新员工'],
        checkList_4: ['更新员工部门','增加新员工'],
     }
   },
   created() {
     
   },
   methods: {
      // 开始同步
      startSync() {
        this.manualDialog = false;
      },
      // 打开手动同步弹层
      dialogAll(type) {
        this.manualDialogType = type;
        if(type === 1) {
          this.manualTitle = '组织信息 - 办公逸同步到企业微信';
        }else if(type === 2) {
          this.manualTitle = '组织信息 - 企业微信同步到办公逸';
        }else if(type === 3) {
          this.manualTitle = '员工信息 - 办公逸同步到企业微信';
        }else if(type === 4) {
          this.manualTitle = '员工信息 - 企业微信同步到办公逸';
        }
        this.manualDialog = true;
      },
   }
};
</script>

<style lang='less' scoped>
.content_box {
  padding: 24px;
  .head {
    font-size: 16px;
    font-weight: 500;
    color: #1D2331;
    margin-bottom: 16px;
  }
  // 手动同步
  .manual {
    padding-top: 16px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 8px;
    padding-left: 16px;
    margin-bottom: 16px;
    .manual_item {
      display: flex;
      align-items: center;
    }
  }
  // 自动同步设置
  .manual_auto {
    padding-left: 16px;
    padding-top: 16px;

  }

  .border_content {
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    padding: 16px;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    img {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
    span {
      margin-right: 8px;
    }
  }
  .border_content_2 {
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    padding: 16px;
    margin-bottom: 16px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 8px;
    .manual_item {
      display: flex;
      align-items: center;
    }
  }

  // 内部通用标题
  .content_item_head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    .left {
      font-size: 16px;
      font-weight: 500;
      color: #1D2331;
      margin-left: 10px;
    }
    .right {
      span {
        cursor: pointer;
        font-size: 14px;
        font-weight: 400;
        color: #1AAC88;
      }
      span+span {
        margin-left: 16px;
      }
    }
  }
  .content_item_head::before {
    content: "";
    display: inline-block;
    position: absolute;
    width: 2px;
    height: 16px;
    background: #1AAC88;
    border-radius: 2px 2px 0px 0px;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
}

// 弹层样式
.dialog {
  /deep/.el-dialog__header {
    height: 48px;
    padding: 12px 24px 12px;
    border-bottom: 1px solid #f0f0f0;
    .el-dialog__title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
    }
    .el-dialog__headerbtn {
      top: 12px;
    }
  }
  /deep/.el-dialog__body {
    padding: 24px;
  }
  /deep/.el-dialog__footer {
    height: 52px;
    border-top: 1px solid #f0f0f0;
    padding: 10px 24px;
  }
}

.dialog_item {
  display: flex;
  align-items: center;
}
</style>