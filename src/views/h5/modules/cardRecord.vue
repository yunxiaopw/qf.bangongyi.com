<template>
  <div class="card-record-item" @click="handleToDetail">
    <div class="left">
      <div class="title">
        <span>薪资所属期：</span>
        <span>{{item.source_date}}</span>
        <span class="tip" v-if="item.is_lock === '1'">
          <span>本期数据已锁定</span>
        </span>
      </div>
      <div class="item">
        <span class="key">填报人数：</span>
        <span class="value">{{ item.staff_count }}人</span>
      </div>
      <div class="item">
        <span class="key">填写结果：</span>
        <span class="value">{{ item.group_count }}份</span>
      </div>
      <div class="item">
        <span class="key">最后更新时间：</span>
        <span class="value">{{ item.updated_at }}</span>
      </div>
    </div>
    <div class="right">
      <img :src="rightArrow" mode="" />
    </div>
  </div>
</template>

<script>
import rightArrow from '../icons/right-arrow.svg'
export default {
  name: 'CardItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rightArrow
    }
  },
  methods: {
    handleToDetail() {
      this.$router.push({
        name: 'H5RecordInfo',
        query: {
          id: this.item.id,
          source_date: this.item.source_date
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.card-record-item {
  box-shadow: 0 0 0.05rem 0 rgba(0,0,0,0.08);
  border-radius: 0.02rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.12rem 0.18rem;
  .left {
    .title {
      font-size: 0.16rem;
      color: rgba(0,0,0,0.85);
      display: flex;
      align-items: center;
      .tip {
        color: #8C8C8C;
        font-size: 0.12rem;
        margin-left: 0.08rem;
        background: #F5F5F5;
      }
    }
    .item {
      font-size: 0.12rem;
      color: rgba(0,0,0,0.45);
      margin-top: 0.06rem;
      .value {
        color: rgba(0,0,0,0.65);
      }
    }
  }
  .right {
    img {
      width: 0.18rem;
      height: 0.18rem;
    }
  }
}
</style>