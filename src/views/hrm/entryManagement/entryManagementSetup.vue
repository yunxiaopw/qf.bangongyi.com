<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine goback>入职设置</HeadLine>

    <!-- 表单区域 -->
    <div class="main_content">
        <el-form ref="formData" :model="formData" label-width="150px" size="small">
          <!-- 社保、公积金增员 -->
          <div class="main_content_item">
            <div class="main_content_head">社保、公积金增员</div>
            <el-form-item label="默认增员时间：">
                <el-select v-model="formData.insurance_increase_time" placeholder="请选择" style="width: 100px;">
                    <el-option v-for="item in 31" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                号之前入职（含当天），当月增员。反之则次月增员
            </el-form-item>
          </div> 

          <!-- 入职提醒 -->
          <div class="main_content_item">
              <div class="main_content_head">
                入职提醒
                <el-form-item label="" label-width="16px" style="margin-bottom: 0px;">
                  <el-switch v-model="formData.is_open_induction_reminder"></el-switch>
                </el-form-item>
              </div>
              <el-form-item label="提醒人员：">
                <el-row type="flex">
                  <el-col :span="4" v-if="formData.induction_reminder_dict && formData.induction_reminder_dict.specify">
                    <el-checkbox v-for="item in reminder_dicts" :key="item.key" v-model="formData.induction_reminder_dict[item.key].select">{{item.label}}</el-checkbox>
                  </el-col>
                  <el-col :span="8" v-if="formData.induction_reminder_dict && formData.induction_reminder_dict.specify">
                    <MoreInput
                      :i_item="{
                        type: 'staff_widget',
                        form_item_type: '成员',
                        widget_ids:formData.induction_reminder_dict.specify.staff,
                      }"
                      :style="el_select_style"
                      :v-model.sync="formData.induction_reminder_dict.specify.staff" 
                    />
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="提醒内容：">
                <el-tabs v-model="induction_reminder_dict_activeName" type="card">
                  <el-tab-pane label="员工上级" name="员工上级" v-if="formData.induction_reminder_dict && formData.induction_reminder_dict.superior">
                    <el-input type="textarea" id="induction_reminder_dict_superior_textarea_top_box" v-model="formData.induction_reminder_dict.superior.content" :autosize="{ minRows: 5, maxRows: 5}" maxlength="200" placeholder="请输入内容"></el-input>
                  </el-tab-pane>
                  <el-tab-pane label="指定人员" name="指定人员" v-if="formData.induction_reminder_dict && formData.induction_reminder_dict.specify">
                    <el-input type="textarea" id="induction_reminder_dict_specify_textarea_top_box" v-model="formData.induction_reminder_dict.specify.content" :autosize="{ minRows: 5, maxRows: 5}" maxlength="200" placeholder="请输入内容"></el-input>
                  </el-tab-pane>
                </el-tabs>
              </el-form-item>
              <el-form-item label="" class="btns">
                <el-button icon="el-icon-plus" size="small" @click="setContent('{员工姓名}', 'induction_reminder_dict_activeName')">员工姓名</el-button>
                <el-button icon="el-icon-plus" size="small" @click="setContent('{部门}', 'induction_reminder_dict_activeName')">部门</el-button>
                <el-button icon="el-icon-plus" size="small" @click="setContent('{岗位}', 'induction_reminder_dict_activeName')">岗位</el-button>
                <el-button icon="el-icon-plus" size="small" @click="setContent('{职级}', 'induction_reminder_dict_activeName')">职级</el-button>
                <span class="rules">点击按钮，在适当的位置添加变量</span>
              </el-form-item>
          </div>
        </el-form>
    </div>

    <!-- 底部按钮 -->
    <div class="bottom_btns">
        <el-button size="small" @click="goBack">取消</el-button>
        <el-button size="small" type="primary" @click="submit">保存</el-button>
    </div>

  </div>
</template>

<script>
import { settingInduction, settingInductionEdit } from "@/api/hrm/entryManagement";
import { insertStr } from "@/utils/utils"

export default {
  name: "entryManagementSetup",
  data() {
    return {
      // 页面下拉框宽度
      el_select_style: {
        width: '100%'
      },
      formData: {},

      induction_reminder_dict_activeName: '员工上级',
      reminder_dicts: [
        {key:'superior', label:'员工上级'},
        {key:'specify', label:'指定人员'},
      ],

    };
  },
  async created() {
    await this.getSettingInduction();
  },
  methods: {
    // 入职通用设置 获取
    async getSettingInduction() {
      await settingInduction().then(res => {
        this.formData = res.data
      })
    },
    // 提醒内容添加字段
    setContent(text, type) {
        let id = this[type] === '员工上级' ? 'induction_reminder_dict_superior_textarea_top_box' : 'induction_reminder_dict_specify_textarea_top_box';
        let key = this[type] === '员工上级' ? 'superior' : 'specify';
        let { selectionStart } = document.getElementById(id);
        this.formData.induction_reminder_dict[key].content = insertStr(this.formData.induction_reminder_dict[key].content, selectionStart, text);
    },
    // 保存
    submit() {
      settingInductionEdit(this.formData).then(res => {
        if(res.errno === 0) {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          });
          // setTimeout(() => {
          //   this.goBack();
          // }, 500);
        }else{
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'error'
          });
        }
      }).catch((error) => {
        this.$message({
          showClose: true,
          message: error.errmsg,
          type: 'error'
        });
      })
    },
    // 返回
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang='less' scoped>
.bottom_btns {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 55px;
    background: #FFFFFF;
    z-index: 2;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.14);
    display: flex;
    justify-content: center;
    align-items: center;
}
.main_content {
    width: 100%;
    height: calc(100%-56px);
    overflow-y: auto;
    padding: 24px 24px 65px;

    /deep/.el-form-item__label {
      display: block !important;
    }
    /deep/.el-form-item__content {
      display: inherit !important;
    }
    .btns {
      /deep/.el-button {
        display: inline-block !important;
      }
    }
    .rules {
        font-size: 12px;
        font-weight: 400;
        color: #8C8C8C;
        margin-left: 6px;
    }
    
    // 表格内标题头
    .main_content_head {
        height: 54px;
        display: flex;
        align-items: center;
        padding: 16px 0;
        font-size: 16px;
        font-weight: 500;
        color: #262626;
        padding-left: 8px;
        position: relative;
    }
    .main_content_head::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        display: inline-block;
        width: 2px;
        height: 14px;
        background: #1AAC88;
        border-radius: 2px 2px 0px 0px;
    }

    .main_content_item {
        border: 1px solid #F0F0F0;
        border-radius: 2px;
        padding: 0 16px 16px;
        margin-top: 15px;
    }
}
.main_content::-webkit-scrollbar {
  display: none;
}

</style>