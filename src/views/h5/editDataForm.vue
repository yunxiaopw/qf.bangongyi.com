<template>
  <div class="h5-data-form">
    <HeaderDesc :headerInfo="baseParams.info" />
    <div class="line-8"></div>
    <FormData ref="formData" />
    <div class="line-16"></div>
    <div class="wrap-div"></div>
    <div class="footer">
      <div class="btn-group">
        <div v-if="type === 'readonly'" class="btn-edit" @click="handleClick('edit')">编辑</div>
        <div v-if="type === 'edit'" class="btn cancel" @click="handleClick('cancel')">取消</div>
        <div v-if="type === 'edit'" class="btn del" @click="handleClick('del')">删除</div>
        <div v-if="type === 'edit'" class="btn save" @click="handleClick('save')">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import FormData from './modules/formData.vue'
import HeaderDesc from './modules/headerDesc.vue'
import { apiGetFillDetail, apiEditFillData, apiDeleteFillData } from '@/api/h5'
import './modules/rem.js'
import { Dialog } from 'vant';
const mockData = {
  "errno": 0,
  "errmsg": "success",
  "data": {
          "info": {
                  "filling_type": "2",
                  "filling_range": "[{'staff_id':'5576552','dept_ids':'3,343,348,347','tag_ids':'','staff_ids':'5576552,5576553'},{'staff_id':'5576552','dept_ids':'3,12,18,347,355','tag_ids':'23,27','staff_ids':'5576552,5576553'}]",
                  "name": "采集表1",
                  "describe": "采集说明",
                  "dept_list": "，加班结算测试，南京公司，日照公司，，财务部1部，SZ",
                  "tag_list": "数学课,语文课,故事会,篮子专用,研发部",
                  "staff_list": "test_liu,songxinzhe",
                  "total": 57
          },
          "detail": [{
                  "id": "1",
                  "name": "姓名",
                  "value_type": "2",
                  "value_json": null,
                  "is_readonly": "1",
                  "value": "张三"
          }, {
                  "id": "2",
                  "name": "帐号",
                  "value_type": "2",
                  "value_json": null,
                  "is_readonly": "1",
                  "value": "zhanghao"
          }, {
                  "id": "3",
                  "name": "薪资所属期",
                  "value_type": "3",
                  "value_json": null,
                  "is_readonly": "1",
                  "value": "2023-03-19"
          }, {
                  "id": "5",
                  "name": "奖金类型-单选",
                  "value_type": "4",
                  "value_json": "['选项A','选项B','选项C']",
                  "is_readonly": "0",
                  "value": "选项B"
          }, {
                  "id": "6",
                  "name": "奖金类型-日期",
                  "value_type": "3",
                  "value_json": null,
                  "is_readonly": "0",
                  "value": "2023-03-10"
          }]
  }
}
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
      dataId: '',
      groupNo: '',
      type: 'readonly'
    }
  },
  created() {
    const { id, group_no } = this.$route.query;
    this.data_id = id
    this.groupNo = group_no
  },
  mounted() {
    this.getBaseInfo()
  },
  methods: {
    async getBaseInfo() {
      // const res = await apiGetFillDetail({data_id: this.dataId, group_no: this.groupNo })
      // if(res.errno === 0) {
        // this.baseParams = res.data
        // this.$refs.formData.formDataList = res.data.item_list
      // }
      this.baseParams = mockData.data
      this.$refs.formData.formDataList = mockData.data.detail
      this.$refs.formData.type = 'readonly'
    },
    handleCancel() {
      this.getBaseInfo()
      this.type = 'readonly'
    },
    handleClick(type) {
      switch (type) {
        case 'edit':
          this.$refs.formData.type = 'edit'
          this.type = 'edit'
          break;
        case 'del': 
          Dialog.alert({
            message: '删除后，此操作无法撤回',
            showCancelButton: true,
            confirmButtonColor: '#1AAC88',
            className: 'dialog-alert'
          }).then(() => {
            this.handleDel()
          });
        default:
          break;
      }
    },
    // 删除单条
    async handleDel() {
      const res = await apiDeleteFillData({group_no: this.groupNo})
      if(res.errno === 0) {
        this.$message.success('删除成功！')
        this.$router.go(-1)
      }
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

      const res = await apiEditFillData(params)

      if(res.errno === 0) {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.h5-data-form {
  .dialog-alert {
      .van-checkbox__icon {
        font-weight: 600 !important;
        font-size: 0.28rem !important;
      }
  }

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
  .btn-edit {
    width: 100%;
    height: 0.44rem;
    background: #1AAC88;
    color: #FFFFFF;
    border-radius: 0.25rem;
    text-align: center;
    line-height: 0.44rem;
    font-size: 0.16rem;
    font-weight: 600;
  }
  .btn-group {
    display: flex;
    align-items: center;
    width: 100%;
    .save {
      margin-left: 0.08rem;
      background: #1AAC88;
      color: #fff;
    }
    .del {
      border: 1px solid #F52F3E;
      color: #F52F3E;
      margin-left: 0.08rem;
    }
  }
}
</style>