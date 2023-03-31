<template>
  <div class="content_box">
    <!-- 复选框 头 -->
    <div class="content_header">
        <div class="top">
            <div class="label">祝福节日：</div>
            <div>
                <el-checkbox-group v-model="checkList" size="small">
                    <el-checkbox v-for="item in festivalList" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </div>
        </div>
        <!-- tab页 -->
        <div v-if="tab.length > 0" class="tabs">
            <div v-for="item in tab" :key="item.id" :class="tabActive == item.id?'tab_active':'tab_item'" @click="tabClick(item)">
                <div>{{ item.name }}</div>
            </div>
        </div>
    </div>

    <!-- 主内容区域 -->
    <div class="content" v-if="isShow">
        <!-- 左侧 -->
        <div class="left">
            <el-form ref="remindFormData" :model="remindFormData" label-width="100px" size="small">
                <el-form-item label="祝福内容：">
                    <el-input type="textarea" id="textarea_box" v-model="remindFormData.content[tabActiveIndex].content" :autosize="{ minRows: 5, maxRows: 5}"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button icon="el-icon-plus" size="small" @click="setContent('{员工姓名}')">员工姓名</el-button>
                    <span class="hint">点击按钮，在适当的位置添加变量</span>
                </el-form-item>
                <el-form-item label="落款：">
                    <el-input v-model="remindFormData.content[tabActiveIndex].inscription" placeholder="请输入落款公司名称"></el-input>
                </el-form-item>
                <el-form-item label="发送时间：">
                    提前
                    <el-select v-model="remindFormData.content[tabActiveIndex].send_day" style="width: 82px;">
                        <el-option v-for="(item, index) in 61" :key="item" :label="index" :value="index"></el-option>
                    </el-select>
                    天，
                    <el-select v-model="remindFormData.content[tabActiveIndex].send_time" style="width: 82px;">
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
            <div :class="bg_class">
                <div class="user_img">
                    <img src="../../../../assets/images/user.png" />
                </div>
                <div class="content_text">
                    <div class="top">{{ showContent }}</div>
                    <div class="bottom">{{ remindFormData.content[tabActiveIndex].inscription }}</div>
                </div>
            </div>
        </div>
    </div>
    
  </div>
</template>
<script>
import { festivalInfo, remindSetFestival } from "@/api/staffCare/index"
import { insertStr } from "@/utils/utils"
import { mapState } from "vuex";

export default {
  name: "BirthdayBlessing",
  props: {},
  data() {
    return {
        id: this.$route.query.id || null,
        // 复选框组的所有选中项
        checkList: [],
        // tab当前选中项
        tabActive: "",
        // 整体数据
        remindFormData: {
            id: this.$route.query.id || null,
            content: [],
        },
    };
  },
  computed: {
    tab() {
        if(!this.checkList.some(i => i === this.tabActive)) this.tabActive = this.checkList[0];
        return this.checkList.map(i => this.festivalList.find(c_i => c_i.id === i));
    },
    isShow() {
        return this.checkList.length > 0
    },
    bg_class() {
        if(this.tabActive === "1") {
            return "bg_yuanDan"
        }else if(this.tabActive === "2") {
            return "bg_chunJie"
        }else if(this.tabActive === "3") {
            return "bg_yuanXiao"
        }else if(this.tabActive === "4") {
            return "bg_duanWu"
        }else if(this.tabActive === "5") {
            return "bg_zhongQiu"
        }else if(this.tabActive === "6") {
            return "bg_guoQing"
        }else{
            // 元旦兜底
            return "bg_yuanDan"
        }
    },
    // 右侧预览区 文本内容
    showContent() {
        return this.tabActiveIndex !== -1 ? this.remindFormData.content[this.tabActiveIndex].content.replace(/\{员工姓名}/g, "楚雨荨") : "";
    },
    // 当前正在编辑的 remindFormData.content 的下标
    tabActiveIndex() {
        return this.remindFormData.content.findIndex(i => i.type === this.tabActive) !== -1 ? this.remindFormData.content.findIndex(i => i.type === this.tabActive) : 0;
    },
    ...mapState({
        // 员工关怀 节日列表
        festivalList: (state) => state.staffCare.festivalList,
    }),
  },
  created() {
    this.getRemind();
  },
  methods: {
    // 切换 tab
    tabClick(item) {
        this.tabActive = item.id;
    },
    // 员工关怀设置 数据回显
    getRemind() {
        festivalInfo({id: this.id}).then(res => {
            this.checkList = res.data.festival;
            this.tabActive = res.data.content[0].type ? res.data.content[0].type : '';
            this.remindFormData.content = res.data.content;
        })
    },
    // 祝福内容添加字段
    setContent(text) {
        let { selectionStart } = document.getElementById('textarea_box');
        this.remindFormData.content[this.tabActiveIndex].content = insertStr(this.remindFormData.content[this.tabActiveIndex].content, selectionStart, text);
    },
    // 保存
    onSubmit() {
        this.remindFormData.festival = this.checkList;
        remindSetFestival(this.remindFormData).then(res => {
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
    border-radius: 2px;
    border: 1px solid #F0F0F0;
    .content_header {
        border-bottom: 1px solid #F0F0F0;
        .top {
            display: flex;
            padding: 24px;
            font-size: 14px;
            font-weight: 400;
            color: #434343;
        }
        .tabs {
            height: 30px;
            display: flex;
            font-size: 14px;
            font-weight: 400;
            color: #595959;
            padding: 0 24px;
            .tab_active {
                font-weight: 500;
                color: #141414;
            }
            .tab_active::before {
                content: "";
                display: inline-block;
                width: 28px;
                height: 2px;
                background: #1AAC88;
                border-radius: 2px 2px 0px 0px;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
            }
            .tab_item, .tab_active {
                width: 60px;
                height: 100%;
                text-align: center;
                cursor: pointer;
                position: relative;
            }
        }
    }
    .content {
        width: 100%;
        height: 100%;
        padding: 24px;
        display: flex;
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
            .bg_yuanDan { background: url('../../../../assets/images/bg_yuanDan.png'); }
            .bg_chunJie { background: url('../../../../assets/images/bg_chunJie.png'); }
            .bg_yuanXiao { background: url('../../../../assets/images/bg_yuanXiao.png'); }
            .bg_duanWu { background: url('../../../../assets/images/bg_duanWu.png'); }
            .bg_zhongQiu { background: url('../../../../assets/images/bg_zhongQiu.png'); }
            .bg_guoQing { background: url('../../../../assets/images/bg_guoQing.png'); }
            .bg_yuanDan, .bg_chunJie, .bg_yuanXiao, .bg_duanWu, .bg_zhongQiu, .bg_guoQing{
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
        }
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
