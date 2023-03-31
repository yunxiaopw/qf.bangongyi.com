<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine goback>转正设置</HeadLine>

    <!-- 表单区域 -->
    <div class="main_content">
        <el-form ref="settingCorrectsData" :model="settingCorrectsData" label-width="170px" size="small">
          <!-- 自动转正 -->
          <div class="main_content_item">
            <div class="main_content_head">自动转正</div>
            <el-form-item label="到期自动转正：">
              <el-switch v-model="settingCorrectsData.is_auto_corrects"></el-switch>
              <span class="rules">*试用期员工将在计划转正日期直接转正。不含待离职、已离职的员工。</span>
            </el-form-item>
            <el-form-item label="自动发起转正申请：">
              <el-switch v-model="settingCorrectsData.is_auth_corrects_apply"></el-switch>
              <span class="rules">*在指定时间，系统自动为员工发起转正申请</span>
            </el-form-item>
            <div class="bg_F5">
              <el-form-item label="发起申请时间：" v-if="settingCorrectsData.auto_corrects_apply_dict">
                <el-select v-model="settingCorrectsData.auto_corrects_apply_dict.flow_id" placeholder="请选择" :style="el_select_style">
                  <el-option v-for="item in auth_corrects_apply_dict_flow_id_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="自动转正审批流程：" style="margin-bottom: 0px;" v-if="settingCorrectsData.auto_corrects_apply_dict">
                <el-select v-model="settingCorrectsData.auto_corrects_apply_dict.apply_day" placeholder="请选择" :style="el_select_style">
                  <el-option v-for="item in auth_corrects_apply_dict_apply_day_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <!-- 员工端转正 -->
          <div class="main_content_item">
            <div class="main_content_head">员工端转正</div>
            <el-form-item label="允许员工发起转正申请：">
              <el-switch v-model="settingCorrectsData.is_staff_corrects_apply"></el-switch>
            </el-form-item>
            <div class="bg_F5">
              <el-form-item label="可见范围：" v-if="settingCorrectsData.staff_corrects_apply_dict">
                  <MoreInput
                    :i_item="{
                      type: 'staff_widget',
                      form_item_type: '成员',
                      widget_ids:settingCorrectsData.staff_corrects_apply_dict.visible_range,
                    }"
                    :style="el_select_style"
                    :v-model.sync="settingCorrectsData.staff_corrects_apply_dict.visible_range" 
                  />
              </el-form-item>
              <el-form-item label="员工申请审批流程：" style="margin-bottom: 0px;" v-if="settingCorrectsData.staff_corrects_apply_dict">
                <el-select v-model="settingCorrectsData.staff_corrects_apply_dict.flow_id" placeholder="请选择" :style="el_select_style">
                  <el-option v-for="item in staff_corrects_apply_dict_visible_range_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <!-- 待转正提醒 -->
          <div class="main_content_item">
              <div class="main_content_head">
                待转正提醒
                <el-form-item label="" label-width="16px" style="margin-bottom: 0px;">
                  <el-switch v-model="settingCorrectsData.is_wait_corrects_reminder"></el-switch>
                </el-form-item>
              </div>
              <div class="bg_F5">
                <el-form-item label="提醒时间：" v-if="settingCorrectsData.wait_corrects_reminder_dict">
                  <el-select v-model="settingCorrectsData.wait_corrects_reminder_dict.reminder_day" placeholder="请选择" :style="el_select_style">
                      <el-option v-for="item in auth_corrects_apply_dict_flow_id_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-row>
                  <el-col :span="15">
                    <el-form-item label="提醒人员：" v-if="settingCorrectsData.wait_corrects_reminder_dict && settingCorrectsData.wait_corrects_reminder_dict.oneself">
                      <el-checkbox v-for="item in reminder_dicts" :key="item.key" v-model="settingCorrectsData.wait_corrects_reminder_dict[item.key].select">{{item.label}}</el-checkbox>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="" label-width="8px" v-if="settingCorrectsData.wait_corrects_reminder_dict && settingCorrectsData.wait_corrects_reminder_dict.specify">
                      <MoreInput
                        :i_item="{
                          type: 'staff_widget',
                          form_item_type: '成员',
                          widget_ids:settingCorrectsData.wait_corrects_reminder_dict.specify.staff,
                        }"
                        :style="el_select_style"
                        :v-model.sync="settingCorrectsData.wait_corrects_reminder_dict.specify.staff" 
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="提醒内容：">
                  <div class="describe_box">
                    <div class="describe_box_content">
                      <el-tabs v-model="wait_corrects_reminder_dict_activeName">
                        <el-tab-pane label="员工本人" name="员工本人" v-if="settingCorrectsData.wait_corrects_reminder_dict && settingCorrectsData.wait_corrects_reminder_dict.oneself">
                          <el-input type="textarea" id="wait_corrects_reminder_dict_oneself_textarea_top_box" v-model="settingCorrectsData.wait_corrects_reminder_dict.oneself.content" :autosize="{ minRows: 5, maxRows: 5}" placeholder="请输入" style="width: 475px;"></el-input>
                        </el-tab-pane>
                        <el-tab-pane label="员工上级" name="员工上级" v-if="settingCorrectsData.wait_corrects_reminder_dict && settingCorrectsData.wait_corrects_reminder_dict.superior">
                          <el-input type="textarea" id="wait_corrects_reminder_dict_superior_textarea_top_box" v-model="settingCorrectsData.wait_corrects_reminder_dict.superior.content" :autosize="{ minRows: 5, maxRows: 5}" placeholder="请输入" style="width: 475px;"></el-input>
                        </el-tab-pane>
                        <el-tab-pane label="指定人员" name="指定人员" v-if="settingCorrectsData.wait_corrects_reminder_dict && settingCorrectsData.wait_corrects_reminder_dict.specify">
                          <el-input type="textarea" id="wait_corrects_reminder_dict_specify_textarea_top_box" v-model="settingCorrectsData.wait_corrects_reminder_dict.specify.content" :autosize="{ minRows: 5, maxRows: 5}" placeholder="请输入" style="width: 475px;"></el-input>
                        </el-tab-pane>
                      </el-tabs>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="">
                  <el-button icon="el-icon-plus" size="small" @click="setTopContent('{员工姓名}', 'wait_corrects_reminder_dict_activeName')">员工姓名</el-button>
                  <el-button icon="el-icon-plus" size="small" @click="setTopContent('{试用期结束日期}', 'wait_corrects_reminder_dict_activeName')">试用期结束日期</el-button>
                  <span class="rules">*点击按钮，在适当的位置添加变量</span>
                </el-form-item>
              </div>
          </div>

          <!-- 已转正提醒 -->
          <div class="main_content_item">
              <div class="main_content_head">
                已转正提醒
                <el-form-item label="" label-width="16px" style="margin-bottom: 0px;">
                  <el-switch v-model="settingCorrectsData.is_open_leader"></el-switch>
                </el-form-item>
              </div>
              <div class="bg_F5">
                <el-row>
                  <el-col :span="15">
                    <el-form-item label="提醒人员：" v-if="settingCorrectsData.has_corrects_reminder_dict && settingCorrectsData.has_corrects_reminder_dict.oneself">
                      <el-checkbox v-for="item in reminder_dicts" :key="item.key" v-model="settingCorrectsData.has_corrects_reminder_dict[item.key].select">{{item.label}}</el-checkbox>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="" label-width="8px" v-if="settingCorrectsData.has_corrects_reminder_dict && settingCorrectsData.has_corrects_reminder_dict.specify">
                      <MoreInput
                        :i_item="{
                          type: 'staff_widget',
                          form_item_type: '成员',
                          widget_ids:settingCorrectsData.has_corrects_reminder_dict.specify.staff,
                        }"
                        :style="el_select_style"
                        :v-model.sync="settingCorrectsData.has_corrects_reminder_dict.specify.staff" 
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="提醒内容：">
                  <div class="describe_box">
                    <div class="describe_box_content">
                      <el-tabs v-model="has_corrects_reminder_dict_activeName">
                        <el-tab-pane label="员工本人" name="员工本人" v-if="settingCorrectsData.has_corrects_reminder_dict && settingCorrectsData.has_corrects_reminder_dict.oneself">
                          <el-input type="textarea" id="has_corrects_reminder_dict_oneself_textarea_top_box" v-model="settingCorrectsData.has_corrects_reminder_dict.oneself.content" :autosize="{ minRows: 5, maxRows: 5}" placeholder="请输入" style="width: 475px;"></el-input>
                        </el-tab-pane>
                        <el-tab-pane label="员工上级" name="员工上级" v-if="settingCorrectsData.has_corrects_reminder_dict && settingCorrectsData.has_corrects_reminder_dict.superior">
                          <el-input type="textarea" id="has_corrects_reminder_dict_superior_textarea_top_box" v-model="settingCorrectsData.has_corrects_reminder_dict.superior.content" :autosize="{ minRows: 5, maxRows: 5}" placeholder="请输入" style="width: 475px;"></el-input>
                        </el-tab-pane>
                        <el-tab-pane label="指定人员" name="指定人员" v-if="settingCorrectsData.has_corrects_reminder_dict && settingCorrectsData.has_corrects_reminder_dict.specify">
                          <el-input type="textarea" id="has_corrects_reminder_dict_specify_textarea_top_box" v-model="settingCorrectsData.has_corrects_reminder_dict.specify.content" :autosize="{ minRows: 5, maxRows: 5}" placeholder="请输入" style="width: 475px;"></el-input>
                        </el-tab-pane>
                      </el-tabs>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="">
                  <el-button icon="el-icon-plus" size="small" @click="setTopContent('{员工姓名}', 'has_corrects_reminder_dict_activeName')">员工姓名</el-button>
                  <el-button icon="el-icon-plus" size="small" @click="setTopContent('{转正日期}', 'has_corrects_reminder_dict_activeName')">转正日期</el-button>
                  <span class="rules">*点击按钮，在适当的位置添加变量</span>
                </el-form-item>
              </div>
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
import { settingCorrects, settingCorrectsEdit } from "@/api/hrm/regularization";
import { insertStr } from "@/utils/utils"

export default {
  name: "regularizationSetup",
  data() {
    return {
      // 页面下拉框宽度
      el_select_style: {
        width: '240px'
      },
      settingCorrectsData: {},
      // 发起申请时间 可选项
      auth_corrects_apply_dict_flow_id_options: [
        {label:'试用期结束前3天', value:1},
        {label:'试用期结束前1周', value:2},
      ],
      // 自动转正审批流程 可选项
      auth_corrects_apply_dict_apply_day_options: [
        {label:'流程一', value:1},
        {label:'流程二', value:2},
      ],
      // 员工申请审批流程 可选项
      staff_corrects_apply_dict_visible_range_options: [
        {label:'流程一', value:1},
        {label:'流程二', value:2},
      ],

      wait_corrects_reminder_dict_activeName: '员工本人',
      has_corrects_reminder_dict_activeName: '员工本人',
      reminder_dicts: [
        {key:'oneself', label:'员工本人'},
        {key:'superior', label:'员工上级'},
        {key:'specify', label:'指定人员'},
      ],
    };
  },
  async created() {
    await this.getSettingCorrects();
  },
  methods: {
    // 获取初始值
    async getSettingCorrects() {
      await settingCorrects().then(res => {
        this.settingCorrectsData = res.data;
      })
    },
    // 待转正提醒/已转正提醒 提醒内容添加字段
    setTopContent(text, type) {
      if(type === 'wait_corrects_reminder_dict_activeName') {
        // 待转正提醒
        let id = this[type] === '员工本人' ? 'wait_corrects_reminder_dict_oneself_textarea_top_box' : this[type] === '员工上级' ? 'wait_corrects_reminder_dict_superior_textarea_top_box' : 'wait_corrects_reminder_dict_specify_textarea_top_box';
        let key = this[type] === '员工本人' ? 'oneself' : this[type] === '员工上级' ? 'superior' : 'specify';
        let { selectionStart } = document.getElementById(id);
        this.settingCorrectsData.wait_corrects_reminder_dict[key].content = insertStr(this.settingCorrectsData.wait_corrects_reminder_dict[key].content, selectionStart, text);
      } else if(type === 'has_corrects_reminder_dict_activeName') {
        // 已转正提醒
        let id = this[type] === '员工本人' ? 'has_corrects_reminder_dict_oneself_textarea_top_box' : this[type] === '员工上级' ? 'has_corrects_reminder_dict_superior_textarea_top_box' : 'has_corrects_reminder_dict_specify_textarea_top_box';
        let key = this[type] === '员工本人' ? 'oneself' : this[type] === '员工上级' ? 'superior' : 'specify';
        let { selectionStart } = document.getElementById(id);
        this.settingCorrectsData.has_corrects_reminder_dict[key].content = insertStr(this.settingCorrectsData.has_corrects_reminder_dict[key].content, selectionStart, text);
      }
    },
    // 保存
    submit() {
      settingCorrectsEdit(this.settingCorrectsData).then(res => {
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
    width: 800px;
    padding-bottom: 65px;
    height: calc(100%-56px);
    overflow-y: auto;
    .rules {
        font-size: 12px;
        font-weight: 400;
        color: #8C8C8C;
        margin-left: 18px;
    }
    .bg_F5 {
      background: #F5F5F5;
      border-radius: 2px;
      padding: 16px 0;
    }
    /deep/.el-checkbox{
      margin-right: 24px;
    }
    /deep/.el-checkbox:last-of-type {
      margin-right: 0;
    }
    .describe_box {
      padding-right: 38px;
      &_content {
        background: #FFFFFF;
        border-radius: 2px;
        padding: 0 24px 16px;
        border: 1px solid #D9D9D9;
      }
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
        margin-left: -6px;
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
        padding: 0 32px;
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
    .main_content_item+.main_content_item{
        margin-top: 15px;
    }
}
.main_content::-webkit-scrollbar {
  display: none;
}

</style>