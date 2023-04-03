<template>
  <div class="record-info" v-if="JSON.stringify(formData) !== '{}'">
    <div class="container">
      <HeaderDesc :headerInfo="formData.info" />
      <div class="line"></div>
      <div class="main">
        <div class="form">
          <van-form validate-first :label-width="120">
            <van-field
              v-model="sourceDate"
              label="薪资所属期"
              input-align="right"
              readonly
            >
              <img class="icon-right" :src="rightIcon" slot="right-icon" />
            </van-field>
          </van-form>
        </div>
        <div class="record">
          <div class="item">
            <span class="key">数据状态：</span>
            <span class="value">{{ formData.list_info.is_lock === '1' ? '已锁定' : '未锁定' }}</span>
          </div>
          <div class="item" style="margin-top: 0.04rem">
            <span class="key">最后更新时间：</span>
            <span class="value">2023-03-14 15:20:33</span>
          </div>
        </div>
        <div class="card-group">
          <div class="card" style="margin-right: 0.08rem">
            <div class="card-title">
              <div class="line"></div>
              <div class="title">填报人数</div>
            </div>
            <div class="count">{{ formData.list_info.staff_count }}</div>
          </div>
          <div class="card">
            <div class="card-title">
              <div class="line"></div>
              <div class="title">填写结果</div>
            </div>
            <div class="count">{{ formData.list_info.list_count }}</div>
          </div>
        </div>
      </div>
      <div class="card-container">
        <CardInfo v-for="item in formData.list" :key="item.item_id" :item="item" style="margin-bottom: 0.08rem" />
        <div class="wrap-div"></div>
      </div>
    </div>
    <div class="footer" v-if="formData.list_info.is_lock === '0'">
        <div class="btn-edit" @click="handleToAdd">添加数据采集项</div>
    </div>
  </div>
</template>

<script>
import HeaderDesc from './modules/headerDesc.vue'
import CardInfo from './modules/cardInfo.vue'
import rightIcon from './icons/right-arrow.svg'
import { apiGetRecordFillData } from '@/api/h5'
import './modules/rem.js'

const mockData = {
    "errno": 0,
    "errmsg": "success",
    "data": {
        "info": {
            "filling_type": "2",
            "name": "采集表2",
            "describe": "采集说明2",
            "dept_list": "，，财务部1部，日照公司，SZ",
            "tag_list": "篮子专用,研发部",
            "staff_list": "odk,林颖",
            "staff_ids": [
                "5576290",
                "5576183",
                "5380204",
                "5576581",
                "5380215",
                "5576566",
                "5576394",
                "5576179",
                "5576553",
                "5576583",
                "5576552"
            ],
            "total": 11
        },
        "list": [
            {
                "staff_id": "5576552",
                "item_id": "12",
                "value": "试试水",
                "source_date": "2023-03",
                "group_no": "2303281657199307",
                "updated_at": "2023-03-28 16:57:19",
                "is_lock": "0",
                "item_name": "采集表3-奖金"
            },
            {
                "staff_id": "5576552",
                "item_id": "12",
                "value": "试试水",
                "source_date": "2023-03",
                "group_no": "2303281657199307",
                "updated_at": "2023-03-28 16:57:19",
                "is_lock": "0",
                "item_name": "采集表3-奖金"
            },
            {
                "staff_id": "5576552",
                "item_id": "12",
                "value": "试试水",
                "source_date": "2023-03",
                "group_no": "2303281657199307",
                "updated_at": "2023-03-28 16:57:19",
                "is_lock": "0",
                "item_name": "采集表3-奖金"
            }
        ],
        "list_info": {
            "is_lock": "0",
            "staff_count": 1,
            "list_count": 1
        }
    }
}

export default {
  components: {
    HeaderDesc,
    CardInfo
  },
  data() {
    return {
      rightIcon,
      sourceDate: '',
      formData: {}
    }
  },
  created() {
    this.sourceDate = this.$route.query.source_date
  },
  computed: {
    isShow() {
      return this.$route.query.id
    }
  },
  methods: {
    async getRecordInfo() {
      // const res = await apiGetRecordFillData({
      //   data_id: this.$route.query.id,
      //   source_date: this.$route.query.source_date,
      // })
      // if(res.errno === 0) {
      //   this.formData = res.data
      // }

      this.formData = mockData.data
    },
    handleToAdd() {
      this.$router.push({
        name: 'H5DataForm',
        query: { id: item.id, source_data: this.sourceDate }
      })
    }
  },
  mounted() {
    this.getRecordInfo()
  }
}
</script>

<style lang="less" scoped>
  .record-info {
    display: flex;
    flex-direction: column;
    .container {
      flex: 1;
    }
  }
  .line {
    height:0.08rem;
    background: #f5f5f5;
  }
  .card-container {
    padding: 0.12rem 0.18rem;
  }
  .icon-right {
    width: 0.18rem;
    height: 0.18rem;
    margin-bottom: 0.02rem;
  }
  .main {
    padding: 0 0.18rem;
    .form {
      border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    /deep/ .van-cell {
      padding: 0.1rem 0;
    }
    .record {
      font-size: 0.12rem;
      margin: 0.12rem 0;
      .key {
        color: rgba(0,0,0,0.45);
      }
      .value {
        color: rgba(0,0,0,0.65);
      }
    }
    .card-group {
      display: flex;
      .card {
        background: rgba(0,0,0,0.02);
        border-radius: 0.02rem;
        height: 0.68rem;
        width: 50%;
        padding: 0.08rem 0.12rem;
        .card-title {
          display: flex;
          align-items: center;
        }
        .line {
          width: 0.03rem;
          height: 0.12rem;
          background: #1AAC88;
          margin-right: 0.06rem;
        }
        .count {
          font-size: 0.21rem;
          color: rgba(0,0,0,0.85);
          font-weight: 500;
          margin-top: 0.08rem;
        }
      }
    }
  }

  .wrap-div {
    width: 100%;
    height: 0.72rem;
    background: #fff;
  }
  .footer {
    background: #fff;
    width: 100%;
    height: 0.72rem;
    padding: 0 0.16rem;
    position: fixed;
    display: flex;
    align-items: center;
    bottom: 0;
    left: 0;
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
  }
</style>