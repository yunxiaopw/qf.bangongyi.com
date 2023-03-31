<template>
  <div class="mainBox">
    <HeadLine goback>
      新建采集表
      <template #r-content v-if="active == 1">
        <!-- <el-button >设置应发应扣项</el-button> -->
        <el-button class="addBtn" @click="handleAction('add')">新建采集项</el-button>
      </template>
    </HeadLine>
    <div class="contarin" style="width:80%;margin:24px auto;">
      <el-steps :active="active" finish-status="success">
        <el-step title="设置基本信息"></el-step>
        <el-step title="配置采集项"></el-step>

      </el-steps>
      <!-- 内容区 -->
      <div class="container_main" style="margin-bottom:15px;margin-top:35px;">
        <!-- 第一步 -->

        <!-- 第二步 -->
        <twoStep v-if="active == 1" ></twoStep>
        <firstStep v-else @onStep="handleStep"></firstStep>
        <!-- 第三步 -->

      </div>
      <actionDialog ref="dialogRef"></actionDialog>
      <!-- 按钮 -->
      <div class="btnTip" style="text-align: center;">
       
        <!-- <template>
          <el-button style="margin-top: 12px;" @click="before">上一步</el-button>
          <el-button style="margin-top: 12px;width: 74px;" @click="next" type="primary">保存</el-button>
        </template> -->
      </div>

    </div>

  </div>
</template>

<script>
import firstStep from '@/views/remuneration/dataCollection/newCollectData/components/firstStep.vue'
import twoStep from '@/views/remuneration/dataCollection/newCollectData/components/twoStep.vue'
import actionDialog from '@/views/remuneration/dataCollection/newCollectData/components/actionDialog.vue'
import { addGatherList } from "@/api/remuneration/dataCollection/newCollectData/index.js";
export default {
  name: "index",
  components: { firstStep, twoStep, actionDialog },
  data() {
    return {
      active: 0,
      data_id:''
      // filling_range:' [{"staff id":557655231}]'
    }
  },
  methods: {
    goBack() {
      this.$router.push('/dataCollection')
    },
    next() {
      if (this.active++ > 1) this.active = 0;
      if (this.active==1) {
        this.handleAction('save')
      }
    },
    before() {
      if (this.active-- < 0) this.active = 1;
    },
    handleStep(payload) {
      console.log({payload})
    },
    async handleAction(action) {
      switch (action) {
        case 'add':
          this.$refs.dialogRef.handleAction('add');
          break;
        case 'edit':
          this.$refs.dialogRef.handleAction('edit');
          break;
        case 'save':
          // var qy=JSON.parse(JSON.stringify({}))

        //  var  qy=JSON.stringify(this.filling_range)


       let data={
        filling_range:{staff_id:5576552},
        name: '采集表6', type: 1, scheme_type: 1, filling_type: 1, remind_begin: '1', remind_finish: '1',
        
       }
      data.filling_range= JSON.parse(JSON.stringify(data.filling_range) )
      //  data["staff_id"] =  JSON.stringify(data.filling_range)[0].staff_id;   
      //  data.filling_range=JSON.stringify(data.filling_range)
      //  console.log(data.filling_range,'1111')
          await addGatherList(data).then((res) => {
            this.data_id=res.data
          })
          break;


      }
    }
  }
}


</script>

<style>
.el-page-header__left::after {
  width: 0;
}

.el-page-header__left .el-icon-back::before {
  height: 24px;
  width: 24px;
}

.el-page-header__left {
  margin-right: 8px;
  margin-left: 24px;
}

.el-page-header {
  width: 100%;
  height: 56px;
  border-bottom: 1px solid #F0F0F0;
}

/* header栏 */
.el-page-header__content {
  font-size: 18px;
  color: #303133;
  line-height: 56px;
}

.el-step__title.is-success {
  color: #1AAC88;
}

.el-step__title.is-process {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #262626;
}

/* 进度条文字部分 */
.el-step__head.is-process,
.el-step__head.is-success {
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 22px;
  z-index: 99;

}

.el-radio__label {

  padding-left: 10px;
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #595959;
  line-height: 22px;
}

.el-step__head.is-process .el-step__icon {
  background: #1AAC88;
}

.el-step__head.is-process .el-step__icon.is-text,
.el-step__head.is-success .el-step__icon.is-text {
  border: 1px solid #1AAC88;
  background: #1AAC88;
  z-index: 1;
}

/* 文字 */
.el-step__icon {
  width: 28px;
  height: 28px;
}

.el-step__head.is-success {
  color: #FFFFFF;
  border-color: #C0C4CC;
}

.el-step__head.is-success .el-step__line {
  position: absolute;
  border-color: inherit;
  background-color: #C0C4CC;
  z-index: 1;
}

.el-step__icon.is-text {
  z-index: 999;
}

.addBtn,
.el-button--primary {
  background: #1AAC88 !important;
  color: #FFFFFF;
  height: 32px;
  line-height: 32px;
  display: inline-block;
  padding: 0 20px !important;
  border-radius: 2px;

}

.el-button {
  height: 32px;
  line-height: 32px;
  display: inline-block;
  padding: 0 20px !important;
  border-radius: 2px;
}
</style>


