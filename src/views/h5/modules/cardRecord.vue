<template>
  <div class="card-record-item">
    <div class="left">
      <div class="title">
        <span>薪资所属期：</span>
        <span>2023年2月</span>
        <span class="tip">
          <span>本期数据已锁定</span>
        </span>
      </div>
      <div class="item">
        <span class="key">填报人数：</span>
        <span class="value">30人</span>
      </div>
      <div class="item">
        <span class="key">填写结果：</span>
        <span class="value">28份</span>
      </div>
      <div class="item">
        <span class="key">最后更新时间：</span>
        <span class="value">2023-02-14 15:20:33</span>
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
    handleClick(type, item) {
      switch (type) {
        case 'record':
          this.$emit('onRecord', item)
          break;
        case 'addData':
          this.$emit('addData', item)
          break;
        default:
          break;
      }
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