<template>
  <div class="contentBox">
      <HeadLine :tab="tabList" @tabClick="tabClick" goback>
          编辑采集表
          <template #r-content v-if="this.tabActive == '配置采集项'">
              <!-- <el-button >设置应发应扣项</el-button> -->
              <el-button class="addBtn" @click="handleAddBtn()">新建采集项</el-button>
          </template>
      </HeadLine>
      <div class="content_main" style="margin-top:35px">
          <div class="content_1" v-if="this.tabActive == '设置基本信息'">    
        <firstStep ></firstStep>
        <!-- 第三步 -->

      
  
              <div class="btn" style="left: 120px;position: relative;">
                  <el-button
                      style="margin:25px auto 0; height: 32px;text-align: center;line-height: 0px;position: relative;margin-right: 8px;">取消</el-button>
                  <el-button
                      style="margin:25px auto 0; height: 32px;background: #1AAC88;color: #FFFFFF;text-align: center;line-height: 0px;position: relative;"
                      @click="handleSave()">保存</el-button>
              </div>
          </div>
          <div class="content_2" v-else>
            <twoStep ></twoStep>
              <div class="btn" style="text-align: center;position: relative;">
                  <el-button
                      style="margin:25px auto 0; height: 32px;text-align: center;line-height: 0px;position: relative;margin-right: 8px;">取消</el-button>
                  <el-button
                      style="margin:25px auto 0; height: 32px;background: #1AAC88;color: #FFFFFF;text-align: center;line-height: 0px;position: relative;">保存</el-button>
              </div>

          </div>
          <actionDialog ref="dialogRef"></actionDialog>
      </div>
  </div>
</template>
<script>
import firstStep from '@/views/remuneration/dataCollection/newCollectData/components/firstStep.vue'
import twoStep from '@/views/remuneration/dataCollection/newCollectData/components/twoStep.vue'
import actionDialog from '@/views/remuneration/dataCollection/newCollectData/components/actionDialog.vue'
import { addGatherList } from "@/api/remuneration/dataCollection/newCollectData/index.js";
export default {
  name: 'editPage',
  components: { firstStep, twoStep, actionDialog  },

  data() {
      return {
          tabList: [{ title: "设置基本信息" }, { title: "配置采集项" }],
          tabActive: '设置基本信息',

      }
  },
  created() {

  },
  methods: {
      tabClick(item, index) {
          this.tabActive = item;
          this.tabActiveIndex = index
          // console.log(item, '页头tab');
          // console.log(index, '页头tab');
      },
      // // 保存
      handleSave() {
        this.$refs.firstStep.getConfigAction(()=>{
        })
      },
      // 添加分组
      handleAddBtn(){
        this.$refs.dialogRef.handleAction('add');
          

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