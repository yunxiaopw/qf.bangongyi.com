<template>
  <div class="h5-data-form">
    <HeaderDesc :headerInfo="baseParams.info" />
    <div class="line-8"></div>
    <FormData ref="formData" />
    <div class="line-16"></div>
    <div class="wrap-div"></div>
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
import { apiGetCollectListInfo, apiAddFillData } from '@/api/h5'
import './modules/rem.js'

export default {
  components: {
    FormData,
    HeaderDesc
  },
  data() {
    return {
      checked: false,
      baseParams: {},
      dataType: '',
      data_id: ''
    }
  },
  created() {
    const { id } = this.$route.query;
    this.data_id = id
  },
  mounted() {
    this.getBaseInfo()
  },
  methods: {
    async getBaseInfo() {
      const res = await apiGetCollectListInfo({data_id: this.data_id})
      if(res.errno === 0) {
        this.baseParams = res.data
        this.$refs.formData.formDataList = res.data.item_list
      }
    },
    handleCancel() {
      this.$router.go(-1)
    },
    async handleSave() {
      const formDatalist =  this.$refs.formData.formDataList
      let flag = false
      const params = {data_list: []}
      params.data_id = this.data_id;
      // TODO 这里需要通过选人组件获得对应的员工id
      params.staff_id = '5576552'
      formDatalist.forEach(item => {
        if(item.is_required === '1' && !item.value) {
          flag = true
          params.data_list
        }
        params.data_list.push({
          item_id: item.id,
          value: item.value
        })
      })
      if(flag) {
        this.$message.error('* 号项是必填项！')
        return
      }

      const res = await apiAddFillData(params)

      if(res.errno === 0 && this.checked) {
        formDatalist.forEach(item => {
          item.value = ''
        })
        this.$refs.formData.formDataList = formDatalist
      }
    }
  }
}
</script>

<style lang="less" scoped>
.h5-data-form {
  .wrap-div {
    width: 100%;
    height: 0.72rem;
    background: #fff;
  }

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
    background: #fff;
    width: 100%;
    display: flex;
    align-items: center;
    height: 0.72rem;
    justify-content: space-between;
    padding: 0 0.16rem;
    position: fixed;
    bottom: 0;
    left: 0;
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