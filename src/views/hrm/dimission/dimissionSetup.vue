<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine goback>离职设置</HeadLine>

    <!-- 表单区域 -->
    <div class="main_content">
        <!-- 社保、公积金减员 -->
        <div class="main_content_item">
            <div class="main_content_head">社保、公积金减员</div>
            <el-form :model="formData" label-width="180px" size="small">
              <el-form-item label="默认减员时间：">
                <el-radio-group v-model="formData.social_security_reduction_type">
                  <el-radio v-for="item in social_security_reduction_type_options" :key="item.value" :label="item.value">
                    <span v-if="item.value!==3">{{item.label}}</span>
                    <span v-else>
                      <span>每月</span>
                      <el-select v-model="formData.social_security_reduction_time" placeholder="请选择" style="width: 100px;">
                        <el-option
                          v-for="(item, index) in 31"
                          :key="index"
                          :label="item"
                          :value="item">
                        </el-option>
                      </el-select>
                      <span>号之前离职（含当天），次月减员。反之则当月减员。</span>
                    </span>
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
        </div>

        <!-- 员工端离职 -->
        <div class="main_content_item">
            <div class="main_content_head">员工端离职</div>
            <el-form :model="formData" label-width="180px" size="small">
              <el-form-item label="允许员工发起离职申请：">
                  <el-switch v-model="formData.is_staff_initiated_quit_apply"></el-switch>
              </el-form-item>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="可见范围：" v-if="formData.staff_initiated_quit_dict">
                    <MoreInput
                    :i_item="{
                      type: 'staff_widget',
                      form_item_type: '成员',
                      widget_ids:formData.staff_initiated_quit_dict.visible_range,
                    }"
                    :style="el_select_style"
                    :v-model.sync="formData.staff_initiated_quit_dict.visible_range" 
                  />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="员工申请审批流程：" v-if="formData.staff_initiated_quit_dict">
                    <el-select v-model="formData.staff_initiated_quit_dict.flow_id" placeholder="请选择离职类型" :style="el_select_style">
                      <el-option v-for="item in staff_corrects_apply_dict_visible_range_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="员工上传离职交接文件：">
                  <el-switch v-model="formData.is_staff_quit_handover_file"></el-switch>
              </el-form-item>
            </el-form>
        </div>

        <!-- 离职事项 -->
        <div class="main_content_item">
            <div class="main_content_head">
              申请离职提醒
              <div style="margin-left: 12px;">
                <el-switch v-model="formData.is_apply_quit_reminder" size="small"></el-switch>
              </div>
            </div>
            <el-form ref="remindFormData" :model="formData.remindFormData" label-width="180px" size="small">
              <el-form-item label="提醒人员：">
                    <el-row type="flex">
                        <el-col :span="6" v-if="formData.apply_quit_reminder_dict && formData.apply_quit_reminder_dict.specify">
                          <el-checkbox v-for="item in reminder_dicts" :key="item.key" v-model="formData.apply_quit_reminder_dict[item.key].select">{{item.label}}</el-checkbox>
                        </el-col>
                        <el-col :span="8" v-if="formData.apply_quit_reminder_dict && formData.apply_quit_reminder_dict.specify">
                          <MoreInput
                            :i_item="{
                              type: 'staff_widget',
                              form_item_type: '成员',
                              widget_ids:formData.apply_quit_reminder_dict.specify.staff,
                            }"
                            :style="el_select_style"
                            :v-model.sync="formData.apply_quit_reminder_dict.specify.staff" 
                          />
                        </el-col>
                    </el-row>
              </el-form-item>
              <el-form-item label="提醒内容：">
                <el-tabs v-model="apply_quit_reminder_dict_activeName" type="card">
                  <el-tab-pane label="员工本人" name="员工本人" v-if="formData.apply_quit_reminder_dict && formData.apply_quit_reminder_dict.oneself">
                    <el-input type="textarea" id="apply_quit_reminder_dict_oneself_textarea_top_box" v-model="formData.apply_quit_reminder_dict.oneself.content" :autosize="{ minRows: 5, maxRows: 5}" maxlength="200" placeholder="请输入内容"></el-input>
                  </el-tab-pane>
                  <el-tab-pane label="员工上级" name="员工上级" v-if="formData.apply_quit_reminder_dict && formData.apply_quit_reminder_dict.superior">
                    <el-input type="textarea" id="apply_quit_reminder_dict_superior_textarea_top_box" v-model="formData.apply_quit_reminder_dict.superior.content" :autosize="{ minRows: 5, maxRows: 5}" maxlength="200" placeholder="请输入内容"></el-input>
                  </el-tab-pane>
                  <el-tab-pane label="指定人员" name="指定人员" v-if="formData.apply_quit_reminder_dict && formData.apply_quit_reminder_dict.specify">
                    <el-input type="textarea" id="apply_quit_reminder_dict_specify_textarea_top_box" v-model="formData.apply_quit_reminder_dict.specify.content" :autosize="{ minRows: 5, maxRows: 5}" maxlength="200" placeholder="请输入内容"></el-input>
                  </el-tab-pane>
                </el-tabs>
              </el-form-item>
              <el-form-item label="">
                  <el-button icon="el-icon-plus" size="small" @click="setTopContent('{员工姓名}', 'apply_quit_reminder_dict_activeName')">员工姓名</el-button>
                  <el-button icon="el-icon-plus" size="small" @click="setTopContent('{发起人}', 'apply_quit_reminder_dict_activeName')">发起人</el-button>
                  <el-button icon="el-icon-plus" size="small" @click="setTopContent('{离职日期}', 'apply_quit_reminder_dict_activeName')">离职日期</el-button>
                  <span class="hint">点击按钮，在适当的位置添加变量</span>
              </el-form-item>
            </el-form>
        </div>

        <!-- 已离职提醒 -->
        <div class="main_content_item">
            <div class="main_content_head">
              已离职提醒
              <div style="margin-left: 12px;">
                <el-switch v-model="formData.is_open_leader" size="small"></el-switch>
              </div>
            </div>
            <el-form ref="remindFormData" :model="formData.remindFormData" label-width="180px" size="small">
              <el-form-item label="提醒人员：">
                    <el-row type="flex">
                        <el-col :span="4" v-if="formData.has_quit_reminder_dict && formData.has_quit_reminder_dict.specify">
                          <el-checkbox v-for="item in has_quit_reminder_dicts" :key="item.key" v-model="formData.has_quit_reminder_dict[item.key].select">{{item.label}}</el-checkbox>
                        </el-col>
                        <el-col :span="8" v-if="formData.has_quit_reminder_dict && formData.has_quit_reminder_dict.specify">
                          <MoreInput
                            :i_item="{
                              type: 'staff_widget',
                              form_item_type: '成员',
                              widget_ids:formData.has_quit_reminder_dict.specify.staff,
                            }"
                            :style="el_select_style"
                            :v-model.sync="formData.has_quit_reminder_dict.specify.staff" 
                          />
                        </el-col>
                    </el-row>
              </el-form-item>
              <el-form-item label="提醒内容：">
                <el-tabs v-model="has_quit_reminder_dict_activeName" type="card">
                  <el-tab-pane label="员工上级" name="员工上级" v-if="formData.has_quit_reminder_dict && formData.has_quit_reminder_dict.superior">
                    <el-input type="textarea" id="has_quit_reminder_dict_superior_textarea_top_box" v-model="formData.has_quit_reminder_dict.superior.content" :autosize="{ minRows: 5, maxRows: 5}" maxlength="200" placeholder="请输入内容"></el-input>
                  </el-tab-pane>
                  <el-tab-pane label="指定人员" name="指定人员" v-if="formData.has_quit_reminder_dict && formData.has_quit_reminder_dict.specify">
                    <el-input type="textarea" id="has_quit_reminder_dict_specify_textarea_top_box" v-model="formData.has_quit_reminder_dict.specify.content" :autosize="{ minRows: 5, maxRows: 5}" maxlength="200" placeholder="请输入内容"></el-input>
                  </el-tab-pane>
                </el-tabs>
              </el-form-item>
              <el-form-item label="">
                  <el-button icon="el-icon-plus" size="small" @click="setTopContent('{员工姓名}', 'has_quit_reminder_dict_activeName')">员工姓名</el-button>
                  <el-button icon="el-icon-plus" size="small" @click="setTopContent('{离职日期}', 'has_quit_reminder_dict_activeName')">离职日期</el-button>
                  <span class="hint">点击按钮，在适当的位置添加变量</span>
              </el-form-item>
            </el-form>
        </div>
    </div>

    <!-- 底部按钮 -->
    <div class="bottom_btns">
        <el-button size="small" @click="goBack">取消</el-button>
        <el-button size="small" type="primary" @click="submit">保存</el-button>
    </div>

  </div>
</template>

<script>
import { settingQuit, settingQuitEdit } from "@/api/hrm/dimission/index";
import { insertStr } from "@/utils/utils"

export default {
  name: "dimissionSetup",
  data() {
    return {
      // 页面下拉框宽度
      el_select_style: {
        width: '100%'
      },
      formData: {},
      // 默认减员时间 可选项
      social_security_reduction_type_options: [
        {label:'离职当月减员', value:1},
        {label:'离职次月减员', value:2},
        {label:'', value:3},
      ],
      // 员工申请审批流程 可选项
      staff_corrects_apply_dict_visible_range_options: [
        {label:'流程一', value:1},
        {label:'流程二', value:2},
      ],

      apply_quit_reminder_dict_activeName: '员工本人',
      has_quit_reminder_dict_activeName: '员工上级',
      reminder_dicts: [
        {key:'oneself', label:'员工本人'},
        {key:'superior', label:'员工上级'},
        {key:'specify', label:'指定人员'},
      ],
      has_quit_reminder_dicts: [
        {key:'superior', label:'员工上级'},
        {key:'specify', label:'指定人员'},
      ],
    };
  },
  async created() {
    await this.getSettingQuit();
  },
  methods: {
    // 离职通用设置 获取
    async getSettingQuit() {
      await settingQuit().then(res => {
        this.formData = res.data
      })
    },
    // 申请离职提醒/已离职提醒 提醒内容添加字段
    setTopContent(text, type) {
      // debugger
      if(type === 'apply_quit_reminder_dict_activeName') {
        // 申请离职提醒
        let id = this[type] === '员工本人' ? 'apply_quit_reminder_dict_oneself_textarea_top_box' : this[type] === '员工上级' ? 'apply_quit_reminder_dict_superior_textarea_top_box' : 'apply_quit_reminder_dict_specify_textarea_top_box';
        let key = this[type] === '员工本人' ? 'oneself' : this[type] === '员工上级' ? 'superior' : 'specify';
        let { selectionStart } = document.getElementById(id);
        this.formData.apply_quit_reminder_dict[key].content = insertStr(this.formData.apply_quit_reminder_dict[key].content, selectionStart, text);
      } else if(type === 'has_quit_reminder_dict_activeName') {
        // 已离职提醒
        let id = this[type] === '员工上级' ? 'has_quit_reminder_dict_superior_textarea_top_box' : 'has_quit_reminder_dict_specify_textarea_top_box';
        let key = this[type] === '员工上级' ? 'superior' : 'specify';
        let { selectionStart } = document.getElementById(id);
        this.formData.has_quit_reminder_dict[key].content = insertStr(this.formData.has_quit_reminder_dict[key].content, selectionStart, text);
      }
    },
    // 保存
    submit() {
      settingQuitEdit(this.formData).then(res => {
        if(res.errno === 0) {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          });
          setTimeout(() => {
            this.goBack();
          }, 500);
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
    .main_content_top {
        border: 1px solid #F0F0F0;
        border-radius: 2px;
        padding: 0 16px;
        .setup {
            margin-left: 12px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 400;
            color: #1AAC88;
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
        /deep/.el-form-item__label {
          display: block !important;
        }
        /deep/.el-form-item__content {
          display: block !important;
        }
        /deep/.el-button {
          display: inline-block !important;
        }
    }
    .main_content_item+.main_content_item {
        margin-top: 16px;

    }
}
.main_content::-webkit-scrollbar {
  display: none;
}


.hint {
  font-size: 12px;
  font-weight: 400;
  color: #8C8C8C;
  margin-left: 8px;
}

</style>