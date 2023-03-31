<template>
  <div class="left-button-area">
    <div class="control-box">
      <div class="btn-box">
        <el-button type="primary" plain="" size="small" @click="addControl('input')">
          <img style="width:20px;height:20px;margin-right: 5px;" src="../assets/svgs/u9.svg" alt="" /> 单行文本
        </el-button>
      </div>
      <div class="btn-box">
        <el-button type="primary" plain="" size="small" @click="addControl('textarea')">
          <img style="width:20px;height:20px;margin-right: 5px;" src="../assets/svgs/u15.svg" alt="" /> 多行文本
        </el-button>
      </div>
      <div class="btn-box">
        <el-button type="primary" plain="" size="small" @click="addControl('radio')">
          <img style="width:20px;height:20px;margin-right: 5px;" src="../assets/svgs/u20.svg" alt="" /> 单选按钮
        </el-button>
      </div>
      <div class="btn-box">
        <el-button type="primary" plain="" size="small" @click="addControl('checkbox')">
          <img style="width:20px;height:20px;margin-right: 5px;" src="../assets/svgs/u25.svg" alt="" /> 复选按钮
        </el-button>
      </div>
      <div class="btn-box">
        <el-button type="primary" plain="" size="small" @click="addControl('select')">
          <img style="width:20px;height:20px;margin-right: 5px;" src="../assets/svgs/u30.svg" alt="" /> 下拉列表
        </el-button>
      </div>
      <div class="btn-box">
        <el-button type="primary" plain="" size="small" @click="addControl('secondLevelSelect')">
          <img style="width:20px;height:20px;margin-right: 5px;" src="../assets/svgs/u35.svg" alt="" /> 二级列表
        </el-button>
      </div>
      <div class="btn-box">
        <el-button type="primary" plain="" size="small" @click="addControl('hand_written')">
          <img style="width:20px;height:20px;margin-right: 5px;" src="../assets/svgs/edit.svg" alt="" /> 手写签名
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      addControl(type) {
        this.$store.commit('addComponentItem', type)
      }
    }
  }

</script>

<style >
  .left-button-area {
    width: 18%;
    height: 100%;
    background: #e6e6e6;
  }
  .el-button--small, .el-button--small.is-round span{
    display: flex;
    align-items: center;
  }
  .btn-box button{
    margin-top: 20px;
  }


  .control-box {
    display: flex;
    flex-wrap: wrap;

  }

  .btn-box {
    width: 50%;
    height: 50px;
    display: flex;
    align-items: center;
    align-items: center;
    justify-content: center;

  }

</style>
