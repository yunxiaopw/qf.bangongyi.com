<!-- 创建薪资组 -->
<template>
  <div class="mainBox">
    <HeadLine goback>
            新建薪资组
            <template #r-content v-if="active==2">
                <!-- <el-button >设置应发应扣项</el-button> -->
                <el-button class="addBtn"  @click="handleAddBtn()">添加分组</el-button>
            </template>
        </HeadLine>
    <div class="contarin" style="width:80%;margin:24px auto;">
      <el-steps :active="active" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="选择配薪方式"></el-step>
        <el-step title="配置计薪规则"></el-step>
      </el-steps>
      <!-- 内容区 -->
      <div class="container_main" style="margin-bottom:15px;margin-top:35px;">
        <!-- 第一步 -->
        <firstStep v-if="active==0" style="margin:0px auto;left:10%;"></firstStep>
        <!-- 第二步 -->
        <template v-else-if="active == 1" >
          <div class="container_two" style="width:33%;margin:0px auto;">
            <el-radio v-model="radio" label="1" style="margin-bottom:16px;left:25%;" >使用通用模板（可修改）</el-radio>
          <br>
          <el-radio v-model="radio" label="2" style="left:25%;">复制已有薪资组规则</el-radio>
          <div class="show" v-show="radio == 2" >
            <el-form v-model="numberValidateForm" ref="numberValidateForm" label-width="290px" class="demo-ruleForm" style="margin-top:16px;">
              <el-form-item label="薪资组名称" prop="age" :rules="[
                 { required: true, message: '请选择薪资组', trigger: 'change' }
              ]">
                <el-select v-model="value" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          </div>
        </template>
        <!-- 第三步 -->
         <setSalary v-else style="width:80%;margin:35px auto;" ref="setSalary"></setSalary>
      </div>
      <!-- 按钮 -->
      <div class="btnTip" style="text-align: center;">
        <template v-if="active == 0">
          <el-button style="margin-top: 12px;" @click="goBack">取消</el-button>
          <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
        </template>
        <template v-else-if="active==1">
          <el-button style="margin-top: 12px;" @click="before">上一步</el-button>
          <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
        </template>
        <template v-else-if="active==2">
          <el-button style="margin-top: 12px;" @click="before">上一步</el-button>
          <el-button style="margin-top: 12px;" @click="next">完成</el-button>
        </template>
      </div>

    </div>

  </div>


</template>
<script>
import setSalary from '@/components/remuneration/setpTip/setSalary';
import firstStep from '@/components/remuneration/setpTip/first';
import Sortable from 'sortablejs';
export default {
  name: "index",
  components:{setSalary,firstStep},
  data() {
    return {
      radio: '1',
      ruleForm: {
        name: '',
        region: '',
      },
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        value: '办公逸总部',
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ]
      },
      active: 0,
      numberValidateForm:''
    };
  },

  methods: {
    goBack() {
      this.$router.push('/intellectSalary')
    },
    next() {
      if (this.active++ > 2) this.active = 0;
      if (this.active == 0) {

      }

    },
    before() {
      if (this.active-- < 0) this.active = 2;
    },
     // 添加分组
     handleAddBtn(){
            this.$refs.setSalary.addBtn(()=>{         
            })
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
.el-step__head.is-process ,
.el-step__head.is-success{
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
.el-step__head.is-process .el-step__icon{
background:#1AAC88;
}
.el-step__head.is-process .el-step__icon.is-text,
.el-step__head.is-success .el-step__icon.is-text
{
  border: 1px solid #1AAC88;
  background: #1AAC88;
  z-index: 1;
}
/* 文字 */
.el-step__icon{
  width:28px;
  height:28px;
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
.el-step__icon.is-text{
  z-index: 999;
}
.addBtn{
    background: #1AAC88 !important;
    color: #FFFFFF;
}
</style>
