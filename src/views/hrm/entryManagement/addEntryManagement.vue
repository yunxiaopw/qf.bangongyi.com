<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine>
        <span class="pointer" @click="goBack">
            <el-icon class="el-icon-arrow-left" />
        </span>
        自助登记
    </HeadLine>

    <!-- 表单区域 -->
    <div class="main_content">
        <div class="main_content_top">
            <div class="main_content_head">自助登记表单<div class="setup" @click="goRouter('/staffFormConfiguration', '3')">前往配置 <el-icon class="el-icon-arrow-right"></el-icon></div></div>
        </div>

        <!-- 入职人员 -->
        <div class="main_content_staff main_content_item">
            <div class="main_content_head">入职人员<div class="rules">姓名必填，手机号和邮箱至少填写1个</div></div>
            <div :class="formData.staff_data && formData.staff_data.length > 9 ? 'main_content_staff_lists' : ''">
                <div class="main_content_staff_list" v-for="item in formData.staff_data" :key="item.id">
                    <el-input class="main_content_staff_item" size="small" v-model="item.we_name" placeholder="姓名(必填)" style="width: 180px;" :disabled="is_invitationForAdditionalInformation"></el-input>
                    <el-input class="main_content_staff_item" size="small" v-model="item.we_mobile" placeholder="手机号" style="width: 180px;"></el-input>
                    <el-input class="main_content_staff_item" size="small" v-model="item.we_email" placeholder="邮箱" style="width: 180px;"></el-input>
                    <el-date-picker v-if="!is_invitationForAdditionalInformation" class="main_content_staff_item" size="small" v-model="item.entry_time" type="date" placeholder="计划入职日期(必填)" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 180px;"></el-date-picker>
                    <span v-if="!is_invitationForAdditionalInformation" @click="formDataStaffDelet(item.id)"><el-icon class="el-icon-delete pointer"></el-icon></span>
                </div>
            </div>
            <el-button v-if="!is_invitationForAdditionalInformation" type="text" icon="el-icon-plus" @click="formDataStaffAdd">添加</el-button>
        </div>

        <!-- 入职登记邀请 -->
        <div class="main_content_item">
            <div class="main_content_head">入职登记邀请</div>
            <el-form :model="formData.remindFormData" label-width="100px" size="small">
                <el-form-item label="短信邀请：">
                    <el-switch v-model="formData.is_sms_open"></el-switch>
                </el-form-item>
                <el-form-item label="短信内容：" v-if="formData.is_sms_open">
                    <el-input type="textarea" id="sms_content_textarea_top_box" disabled v-model="formData.sms_content" :autosize="{ minRows: 5, maxRows: 5}"></el-input>
                </el-form-item>
                <!-- <el-form-item label="" v-if="formData.is_sms_open">
                    <el-button icon="el-icon-plus" size="small" @click="setTopContent('{员工姓名}', 'sms_content')">员工姓名</el-button>
                    <el-button icon="el-icon-plus" size="small" @click="setTopContent('{表单链接}', 'sms_content')">表单链接</el-button>
                    <el-button icon="el-icon-plus" size="small" @click="setTopContent('{计划入职日期}', 'sms_content')">计划入职日期</el-button>
                    <span class="hint">点击按钮，在适当的位置添加变量</span>
                </el-form-item> -->
                <el-form-item label="邮件邀请：">
                    <el-switch v-model="formData.is_mail_open"></el-switch>
                </el-form-item>
                <el-form-item label="邮箱内容：" v-if="formData.is_mail_open">
                    <el-input type="textarea" id="mail_content_textarea_top_box" v-model="formData.mail_content" :autosize="{ minRows: 5, maxRows: 5}"></el-input>
                </el-form-item>
                <el-form-item label="" v-if="formData.is_mail_open">
                    <el-button icon="el-icon-plus" size="small" @click="setTopContent('{员工姓名}', 'mail_content')">员工姓名</el-button>
                    <el-button icon="el-icon-plus" size="small" @click="setTopContent('{表单链接}', 'mail_content')">表单链接</el-button>
                    <el-button icon="el-icon-plus" size="small" @click="setTopContent('{计划入职日期}', 'mail_content')">计划入职日期</el-button>
                    <span class="hint">点击按钮，在适当的位置添加变量</span>
                </el-form-item>
                <el-form-item label="过期失效：">
                    <span>入职日期超过</span>
                    <el-input-number size="small" :min="0" :max="30" v-model="formData.link_expire_day"></el-input-number>
                    <span>天链接失效</span>
                    <el-tooltip class="item" effect="dark" content="天数为0时,链接有效期为入职日期当天,当日24:00失效; 天数为几,链接有效期为入职日期后相应天数,最多为30天" placement="top">
                        <i class="el-icon-question pointer"></i>
                    </el-tooltip>
                </el-form-item>
            </el-form>
        </div>

        <!-- 登记资料审核 -->
        <div class="main_content_item">
            <div class="main_content_head">登记资料审核</div>
            <el-form ref="remindFormData" :model="formData.remindFormData" label-width="100px" size="small">
                <el-form-item label="审核设置：">
                    <el-radio-group v-model="formData.is_auditor">
                        <el-radio :label="true">登记资料提交后需要审核</el-radio>
                        <el-radio :label="false">无需审核，登记资料提交后直接保存</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="审核提醒：" v-if="formData.is_auditor">
                    <MoreInput
                    :i_item="{
                        type: 'staff_widget',
                        form_item_type: '成员',
                        widget_ids:formData.auditor_ids,
                    }"
                    style="width:300px"
                    :v-model.sync="formData.auditor_ids" 
                    />
                    <div class="rules">扫码入职的表单被提交后，将推送消息给配置人员</div>
                </el-form-item>
            </el-form>
        </div>
    </div>

    <!-- 底部按钮 -->
    <div class="bottom_btns">
        <el-button size="small" @click="goBack">取消</el-button>
        <el-button size="small" type="primary" @click="submit">发送邀请</el-button>
    </div>

  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { inductionAutoRegister, inductionRegisterInvitation, inductionRegisterInvitationEdit } from "@/api/hrm/entryManagement";
import { insertStr } from "@/utils/utils"
import { mapState, mapMutations } from "vuex"

export default {
  name: "addEntryManagement",
  data() {
    return {
      id: this.$route.query.id || '',
      is_invitationForAdditionalInformation: false,
      formData: {
        staff_data: [
            {
                we_name: "",
                we_mobile: "",
                we_email: "",
                entry_time: "",
                id: uuidv4(),
            },
        ],
        is_sms_open: true,
        sms_content: "{员工姓名}您好，欢迎入职{公司名称}，请点击以下链接，填写入职资料：{表单链接}",
        is_mail_open: true,
        mail_content: "{员工姓名}您好，欢迎入职办公逸，请点击以下链接，填写入职资料：{表单链接}",
        is_auditor: true,
        is_repeat_hire: false,
        is_retain_data: false,
        link_expire_day: 0,
      },
    };
  },
  computed: {
    ...mapState({
        registerInvitation: (state) => state.hrm.registerInvitation
    })
  },
  async created() {
    this.is_invitationForAdditionalInformation = this.$route.query.type === 'invitationForAdditionalInformation';
    // vuex 获取上次存储的编辑
    if(Object.keys(this.registerInvitation).length>0) {
        this.formData = this.registerInvitation;
    }else if(this.is_invitationForAdditionalInformation) {
        // 是否是 邀请补充资料
        await this.getInductionRegisterInvitation();
    }
  },
  methods: {
    ...mapMutations(['setRegisterInvitation', 'delRegisterInvitation']),
    // 邀请补充资料 资料填充
    async getInductionRegisterInvitation() {
        await inductionRegisterInvitation({id:this.id}).then(res => {
            if(res.data.mail_content === null) {
                this.formData.staff_data = res.data.staff_data;
            }else{
                this.formData = res.data;
            }
        })
    },
    // 入职人员删除
    formDataStaffDelet(id) {
        this.formData.staff_data = this.formData.staff_data.filter(i => i.id !== id);
    },
    // 入职人员添加
    formDataStaffAdd() {
        this.formData.staff_data.push({
            we_name: "",
            we_mobile: "",
            we_email: "",
            entry_time: "",
            id: uuidv4(),
        })
    },
    // 短信/邮箱 提醒内容添加字段
    setTopContent(text, name) {
        let dom_id = `${name}_textarea_top_box`;
        let { selectionStart } = document.getElementById(dom_id);
        this.formData[name] = insertStr(this.formData[name], selectionStart, text);
    },
    // 保存
    submit() {
        if(this.formDataRules()) {
            // 邀请补充资料
            if(this.is_invitationForAdditionalInformation) {
                let data = {id:this.id, ...this.formData};
                inductionRegisterInvitationEdit(data).then(res => {
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
            }else{
            // 自助登记
                inductionAutoRegister(this.formData).then(res => {
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
            }
        }
    },
    // 数据校验提示
    formDataRules() {
        let formData = this.formData;
        if(formData.staff_data.length<=0) {
            this.$message({showClose: true, message: '入职人员至少有一位', type: 'error'});
            return false
        }else if(formData.staff_data.some(i => (i.we_name==='' || i.entry_time==='' || (i.we_mobile===''&&i.we_email==='')))) {
            this.$message({showClose: true, message: '入职人员（姓名，入职日期）必填。（手机号，邮箱）必填一项。', type: 'error'});
            return false
        }
        return true
    },
    // 路由页面跳转
    goRouter(path, type = null) {
      if (type !== null) {
        this.setRegisterInvitation(this.formData);
        this.$router.push({ path, query: { type } });
      }else{
        this.$router.push({ path });
      }
    },
    // 返回
    goBack() {
        this.delRegisterInvitation();
        this.$router.back();
    },
  },
};
</script>

<style lang='less' scoped>
.bottom_btns {
    position: fixed;
    z-index: 2;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 55px;
    background: #FFFFFF;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.14);
    display: flex;
    justify-content: center;
    align-items: center;
}
.main_content {
    width: 100%;
    height: calc(100% - 55px);
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
    .main_content_staff {
        .main_content_staff_lists {  
            height: 395px;
            overflow-y: auto;
        }
        .main_content_staff_list {
            display: flex;
            align-items: center;
            .main_content_staff_item+.main_content_staff_item {
                margin-left: 8px;
            }
            .el-icon-delete {
                margin-left: 24px;
            }
            .el-icon-delete:hover {
                color: red;
            }
        }
        .main_content_staff_list+.main_content_staff_list {
            margin-top: 8px;
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

.hint {
    margin-left: 6px;
}

.main_content::-webkit-scrollbar {
    display: none;
}
</style>