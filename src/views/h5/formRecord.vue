<template>
  <div class="card-record">
    <HeaderDesc :headerInfo="dataInfo.info" />
    <div class="line"></div>
    <div class="card-container">
      <CardRecord style="margin-bottom: 0.08rem" v-for="item in dataInfo.list" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script>
import CardRecord from './modules/cardRecord.vue'
import HeaderDesc from './modules/headerDesc.vue'
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
                "source_date": "2023-03",
                "staff_count": 2,
                "group_count": 3,
                "is_lock": "0",
                "updated_at": "2023-03-18 17:19:17"
            },
            {
                "source_date": "2023-04",
                "staff_count": 1,
                "group_count": 1,
                "is_lock": "1",
                "updated_at": "2023-03-17 11:26:33"
            }
        ]
    }
}

export default {
  components: {
    CardRecord,
    HeaderDesc
  },
  data() {
    return {
      dataInfo: [],
      pageNum: 1,
      pageSize: 10,
      limit: 10, // 每页显示的数据条数
      isLoading: false // 是否正在加载数据
    }
  },
  mounted() {
    this.loadData();
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll);
    })
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
     handleScroll() {
      // 获取滚动条当前的位置和滚动区域的高度
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      // 判断是否滚动到底部
      if (scrollTop + clientHeight >= scrollHeight && !this.loading && this.hasMore) {
        this.loadData();
      }
    },
    loadData() {
      this.loading = true;
      // 发送加载数据的请求
      // 这里使用 setTimeout 模拟异步请求的延迟
      setTimeout(() => {
        // const data = this.mockData(this.pageNum, this.pageSize);
        // this.dataList = [...this.dataList, ...data];
        this.dataInfo = mockData.data;
        // this.pageNum++;
        // this.loading = false;
        // this.hasMore = data.length === this.pageSize;
      }, 1000);
    },
  }
}
</script>

<style lang="less" scoped>
.card-record {
  .line {
    height:0.08rem;
    background: #f5f5f5;
  }

  .card-container {
    padding: 0.12rem 0.16rem;
  }
}
</style>