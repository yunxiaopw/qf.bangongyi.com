<template>
    <div class="main-box">
        <!-- 页头 -->
        <HeadLine>人事表单设置</HeadLine>

        <!-- 内容区 -->
        <div class="staffing_form">
            <div class="staffing_form_item" v-for="item in staffingFormList" :key="item.type">
                <div class="staffing_form_item_title">{{item.form_title}}</div>
                <div class="staffing_form_item_infor">{{item.form_dec}}</div>
                <div class="staffing_form_item_infor2">
                    <span>基础字段：{{item.base_count}}个</span>
                    <span>自定义字段：{{item.custom_count}}个</span>
                </div>
                <el-button type="primary" size="small" @click="goRouter('/staffFormConfiguration', item.type)">修改设置</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { dictFormData } from "@/api/hrm/staffingSetup/staffingFormSetup";

export default {
    name: "staffingFormSetup",
    data () {
        return {
            staffingFormList: [],
        }
    },
    created () {
        this.getDictFormData();
    },
    methods: {
        // 获取人事表单数据
        getDictFormData() {
            dictFormData().then(res => {
                this.staffingFormList = res.data;
            });
        },
        // 路由页面跳转
        goRouter(path, type = null) {
            if (type !== null) {
                this.$router.push({ path, query: { type } });
            }else{
                this.$router.push({ path });
            }
        },
    },
}
</script>

<style scoped lang="less">
.staffing_form {
    margin: 24px;
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(3, 1fr);
    &_item {
        box-shadow: 0px 2px 4px 0px #FAFAFA;
        border-radius: 2px;
        border: 1px solid #F0F0F0;
        padding: 16px;
        font-size: 14px;
        font-weight: 400;
        &_title {
            font-size: 16px;
            font-weight: 500;
            color: #141414;
        }
        &_infor {
            color: #8C8C8C;
            margin: 4px 0 12px;
        }
        &_infor2 {
            color: #1F1F1F;
            margin: 4px;
            margin-bottom: 20px;
            span:nth-child(1) {
                margin-right: 12px;
            }
        }
    }
}
</style>
