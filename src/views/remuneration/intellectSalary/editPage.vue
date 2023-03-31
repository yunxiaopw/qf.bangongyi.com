<!-- 编辑 -->
<template>
    <div class="contentBox">
        <HeadLine :tab="tabList" @tabClick="tabClick" goback>
            编辑发薪方案
            <template #r-content v-if="this.tabActive == '计薪规则设置'">
                <!-- <el-button >设置应发应扣项</el-button> -->
                <el-button class="addBtn" @click="handleAddBtn()">添加分组</el-button>
            </template>
        </HeadLine>
        <div class="content_main" style="margin-top:35px">
            <div class="content_1" v-if="this.tabActive == '基础设置'">
                <firstStep ref="firstStep"></firstStep>
                <div class="btn" style="left: 120px;position: relative;">
                    <el-button
                        style="margin:25px auto 0; height: 32px;text-align: center;line-height: 0px;position: relative;margin-right: 8px;">取消</el-button>
                    <el-button
                        style="margin:25px auto 0; height: 32px;background: #1AAC88;color: #FFFFFF;text-align: center;line-height: 0px;position: relative;"
                        @click="handleSave()">保存</el-button>
                </div>
            </div>
            <div class="content_2" v-else>
                <setSalary ref="setSalary"></setSalary>
                <div class="btn" style="text-align: center;position: relative;">
                    <el-button
                        style="margin:25px auto 0; height: 32px;text-align: center;line-height: 0px;position: relative;margin-right: 8px;">取消</el-button>
                    <el-button
                        style="margin:25px auto 0; height: 32px;background: #1AAC88;color: #FFFFFF;text-align: center;line-height: 0px;position: relative;">保存</el-button>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import setSalary from '@/components/remuneration/setpTip/setSalary';
import firstStep from '@/components/remuneration/setpTip/first';
import { configAction } from "@/api/remuneration/intellectSalary/index";
export default {
    name: 'editPage',
    components: { setSalary, firstStep },

    data() {
        return {
            tabList: [{ title: "基础设置" }, { title: "计薪规则设置" }],
            tabActive: '基础设置',

        }
    },
    created() {

    },
    methods: {
        tabClick(item, index) {
            this.tabActive = item;
            this.tabActiveIndex = index
            console.log(item, '页头tab');
            console.log(index, '页头tab');
        },
        // // 保存
        handleSave() {
          this.$refs.firstStep.getConfigAction(()=>{
          })
        },
        // 添加分组
        handleAddBtn(){
            this.$refs.setSalary.addBtn(()=>{
                
            })
            

        }

    }
}
</script>
<style lang="less" scoped>
.el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0;
}

.el-tabs__item {
    padding: 0 20px;
    height: 56px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 56px;
    display: inline-block;
    list-style: none;
    color: #303133;
    position: relative;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
}

.header .r-content[data-v-256f77da] {
    margin-left: 24px !important;

}

.addBtn {
    background: #1AAC88 !important;
    color: #FFFFFF;
}

.el-button {
    border-radius: 2px;
}

.content_main {
    width: 80%;
    margin: 0 auto;
    margin-left: 24px;
}
</style>