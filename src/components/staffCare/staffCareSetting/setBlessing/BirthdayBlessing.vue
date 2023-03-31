<template>
  <div class="content_box">
    <!-- 左侧 -->
    <div class="left">
        <div class="title">设置祝福</div>
        <el-form ref="remindFormData" :model="remindFormData" label-width="100px" size="small">
            <el-form-item label="祝福内容：">
                <el-input type="textarea" id="textarea_box" v-model="remindFormData.content" :autosize="{ minRows: 5, maxRows: 5}"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-button icon="el-icon-plus" size="small" @click="setContent('{员工姓名}')">员工姓名</el-button>
                <el-button icon="el-icon-plus" size="small" v-if="type < 2" @click="setContent('{生日日期}')">生日日期</el-button>
                <el-button icon="el-icon-plus" size="small" v-else @click="setContent('{入职时长(年)}')">入职时长(年)</el-button>
                <span class="hint">点击按钮，在适当的位置添加变量</span>
            </el-form-item>
            <el-form-item label="落款：">
                <el-input v-model="remindFormData.inscription" placeholder="请输入落款公司名称"></el-input>
            </el-form-item>
            <el-form-item label="发送时间：">
                提前
                <el-select v-model="remindFormData.send_day" style="width: 82px;">
                    <el-option v-for="(item, index) in 61" :key="item" :label="index" :value="index"></el-option>
                </el-select>
                天，
                <el-select v-model="remindFormData.send_time" style="width: 82px;">
                    <el-option v-for="(item, index) in 24" :key="item" :label="index" :value="index"></el-option>
                </el-select>
                点发送
            </el-form-item>
            <el-form-item>
                <el-button @click="$router.back()">取消</el-button>
                <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>

    <!-- 右侧 -->
    <div class="right">
        <div class="title">预览</div>
        <div :class="type < 2 ? 'bg_shengRi' : 'bg_ruZhiJiNianRi' ">
            <div class="user_img">
                <img src="../../../../assets/images/user.png" />
            </div>
            <div class="content_text">
                <div class="top">{{ showContent }}</div>
                <div class="bottom">{{ remindFormData.inscription }}</div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import { remind, remindSetEdit } from "@/api/staffCare/index"
import { insertStr } from "@/utils/utils"

export default {
  name: "BirthdayBlessing",
  props: {},
  data() {
    return {
        id: this.$route.query.id || null,
        type: this.$route.query.type || null,
        remindFormData: {
            content: "",
        },
    };
  },
  computed: {
    // 右侧预览区 文本内容
    showContent() {
        return this.remindFormData.content.replace(/\{员工姓名}/g, "楚雨荨").replace(/\{生日日期}/g, "1991-05-02").replace(/\{入职时长\(年\)}/g, "2(年)");
    }
  },
  created() {
    this.getRemind();
  },
  methods: {
    // 员工关怀设置 数据回显
    getRemind() {
        remind({id: this.id}).then(res => {
            this.remindFormData = res.data;
        })
    },
    // 祝福内容添加字段
    setContent(text) {
        let { selectionStart } = document.getElementById('textarea_box');
        this.remindFormData.content = insertStr(this.remindFormData.content, selectionStart, text);
    },
    // 保存
    onSubmit() {
        let { id, content, inscription, send_day, send_time } = this.remindFormData;
        remindSetEdit({ id, content, inscription, send_day, send_time }).then(res => {
            if(res.errno === 0) {
                this.$message({
                    showClose: true,
                    message: res.errmsg,
                    type: 'success'
                });
                this.$router.back();
            }else{
                this.$message({
                    showClose: true,
                    message: res.errmsg,
                    type: 'error'
                });
            }
        }).catch(error => {
            this.$message({
            showClose: true,
            message: error.errmsg,
            type: 'error'
            });
        })
    },
  }
};
</script>
<style lang="less" scoped>
.content_box {
    height: 100%;
    display: flex;
    padding-bottom: 30px;
    .left {
        flex-grow: 1;
        min-width: 708px;
        margin-right: 24px;
        .hint {
            margin-left: 8px;
            font-size: 12px;
            font-weight: 400;
            color: #8C8C8C;
        }
    }
    .right {
        width: 375px;
        .bg_shengRi { background: url('../../../../assets/images/bg_shengRi.png'); }
        .bg_ruZhiJiNianRi { background: url('../../../../assets/images/bg_ruZhiJiNianRi.png'); }
        .bg_shengRi, .bg_ruZhiJiNianRi{
            width: 100%;
            height: 100%;
            min-width: 343px;
            min-height: 530px;
            background-repeat: no-repeat;
            background-size: 100%;
            position: relative;
        }
        .user_img {
            width: 72px;
            height: 72px;
            padding: 2px;
            background: #FFFFFF;
            border-radius: 50%;
            position: absolute;
            top: 35px;
            left: 50%;
            transform: translateX(-50%);
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .content_text {
            width: 260px;
            height: 265px;
            font-size: 28px;
            font-weight: 400;
            position: absolute;
            top: 129px;
            left: 50%;
            transform: translateX(-50%);
            .top {
                width: 100%;
                height: 210px;
                font-size: 14px;
                font-weight: 400;
                color: rgba(0,0,0,0.65);
                white-space: pre-wrap;
                margin-bottom: 30px;
                overflow-y: auto;
            }
            .top::-webkit-scrollbar {
                display: none;
            }
            .bottom {
                font-size: 12px;
                font-weight: 400;
                color: rgba(0,0,0,0.45);
                text-align: right;
            }
        }
    }
    .left, .right {
        height: 100%;
        min-height: 600px;
        background: #FFFFFF;
        border-radius: 2px;
        border: 1px solid #F0F0F0;
        padding: 16px;
    }
    .title {
        font-size: 16px;
        font-weight: 500;
        color: #262626;
        padding-left: 8px;
        margin-bottom: 16px;
        position: relative;
    }
    .title::before {
        content: '';
        display: inline-block;
        width: 2px;
        height: 14px;
        background: #1AAC88;
        border-radius: 2px 2px 0px 0px;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
    }
}
</style>
