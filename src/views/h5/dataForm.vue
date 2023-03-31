<template>
  <div class="h5-data-form">
    <HeaderDesc />
    <div class="line-8"></div>
    <FormData ref="formData" />
    <div class="line-16"></div>
    <div class="footer">
      <van-checkbox v-model="checked">复选框</van-checkbox>
      <div class="btn-group">
        <div class="btn" @click="handleCancel">取消</div>
        <div class="btn save" @click="handleSave">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import FormData from './modules/formData.vue'
import HeaderDesc from './modules/headerDesc.vue'
import './modules/rem.js'
export default {
  components: {
    FormData,
    HeaderDesc
  },
  data() {
    return {
      checked: false
    }
  },
  methods: {
    handleCancel() {
      this.$router.go(-1)
    },
    handleSave() {
      console.log('formData', this.$refs.formData)
      this.$refs.formData.handleSubmit()
    }
  }
}
</script>

<style lang="less" scoped>
.h5-data-form {
  /deep/ .van-checkbox__icon--checked .van-icon {
    background-color: #1AAC88;
    border-color: #1AAC88;
  }
  .line-8 {
    height:0.08rem;
     background: #f5f5f5;
  }
  .line-16 {
    height:0.16rem;
    background: #f5f5f5;
  }
  .footer {
    display: flex;
    align-items: center;
    height: 0.72rem;
    justify-content: space-between;
    padding: 0 0.16rem;
  }
  .btn {
    width: 1.09rem;
    height: 0.44rem;
    background: #FFFFFF;
    border-radius: 0.25rem;
    border: 1px solid rgba(0,0,0,0.15);
    text-align: center;
    line-height: 0.44rem;
    font-size: 0.16rem;
    font-weight: 600;
  }
  .btn-group {
    display: flex;
    align-items: center;
    .save {
      margin-left: 0.08rem;
      background: #1AAC88;
      color: #FFFFFF;
    }
  }
}
</style>