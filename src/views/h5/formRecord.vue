<template>
  <div class="card-record">
    <HeaderDesc />
    <div class="line"></div>
    <div class="card-container">
      <CardRecord v-for="item in dataList" :key="item.id" />
    </div>
  </div>
</template>

<script>
import CardRecord from './modules/cardRecord.vue'
import HeaderDesc from './modules/headerDesc.vue'
import './modules/rem.js'
export default {
  components: {
    CardRecord,
    HeaderDesc
  },
  data() {
    return {
      dataList: [],
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
      console.log('document.body.scrollTop', document.body.scrollTop)
      // 获取滚动条当前的位置和滚动区域的高度
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      // 判断是否滚动到底部
      console.log({scrollTop})
      if (scrollTop + clientHeight >= scrollHeight && !this.loading && this.hasMore) {
        this.loadData();
      }
    },
    loadData() {
      this.loading = true;
      // 发送加载数据的请求
      // 这里使用 setTimeout 模拟异步请求的延迟
      setTimeout(() => {
        const data = this.mockData(this.pageNum, this.pageSize);
        this.dataList = [...this.dataList, ...data];
        this.pageNum++;
        this.loading = false;
        this.hasMore = data.length === this.pageSize;
      }, 1000);
    },
    mockData(pageNum, pageSize) {
      // 模拟数据
      const data = [];
      const startIndex = (pageNum - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      for (let i = startIndex; i < endIndex; i++) {
        data.push({ id: i, text: `数据${i + 1}` });
      }
      return data;
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