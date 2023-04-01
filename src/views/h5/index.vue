<template>
  <div class="data-home">
    <template v-if="dataCardList.length">
      <CardItem class="card-container" v-for="item in dataCardList" :key="item.id" :item="item" @onRecord="handleRecord" @onAddData="handleAddData" />
    </template>
    <div class="empty" v-else>
      <div class="container">
        <img :src="emptyIcon" alt="">
        <div>暂时没有需要填报的采集表</div>
      </div>
    </div>

    <van-popup v-model="dateVisible" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        @confirm="handleOk"
        @cancel="handleCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import CardItem from './modules/cardItem.vue'
import emptyIcon from './icons/empty.png'
import './modules/rem.js'
import { apiGetCollectList } from '@/api/h5'
import moment from 'moment'
export default {
  components: {
    CardItem
  },
  data() {
    return {
      emptyIcon,
      dataCardList:[
        {                 
          "id": "2",                 
          "name": "采集表1",                 
          "type": "2",                 
          "source_date": null,               
          "created_at": "2023-03-07 16:48:46",             
          "is_lock": "0",               
          "is_fill": 1      
        }, 
        {                
        "id": "3",                 
          "name": "采集表2",                
          "type": "2",               
          "source_date": "2023-03",         
          "created_at": "2023-03-07 16:48:46",          
          "is_lock": "0",             
          "is_fill": 0       
        },
        {                
        "id": "4",                 
          "name": "采集表3",                
          "type": "1",               
          "source_date": null,         
          "created_at": "2023-03-07 16:48:46",          
          "is_lock": "1",             
          "is_fill": 1       
        }
      ],
      dateVisible: false,
      currentDate: new Date(),
      currentData: {}
    }
  },
  methods: {
    async getCollectList() {
      const res = await apiGetCollectList()
      if(res.errno === 0) {
        // this.dataCardList = res.data
      }
    },
    handleAddData(item) {
      this.currentData = item
      if(item.type == 2) {
        this.dateVisible = true
        return
      }
      if(item.is_lock == 1) {
        this.$toast.fail('数据已锁定，不可填报')
      }else {
        this.$router.push({ name: 'H5DataForm', query: { id: item.id, type: 'add' } })
      }
    },
    handleRecord(item) {
        this.$router.push({ name: 'H5FormRecord', query: { id: item.id } })
    },
    handleOk() {
      const date = moment(this.currentDate).format('YYYY-MM')
      console.log(date)
      if(date == this.currentData.source_date && this.currentData.is_lock == 1) {
        this.$toast.fail(`${this.currentData.source_date}数据已锁定，不可填报`)
      }else {
        this.$router.push({ name: 'H5DataForm', query: { id: this.currentData.id, type: 'add' } })
      }
      this.handleCancel()
    },
    handleCancel() {
      this.dateVisible = false
      this.currentData = {}
    }
  }
}
</script>

<style lang="less" scoped>
.data-home {
  padding: 0.16rem;
  .card-container {
    margin-bottom: 0.08rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .empty {
    margin-top: 0.4rem;
    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    img {
      width: 1.44rem;
    }
  }
}
</style>