<template>
  <div class="card-info-item">
    <div class="left">
      <div class="item">
        <span class="key">姓名：</span>
        <span class="value">30人</span>
      </div>
      <div class="item">
        <span class="key">账号：</span>
        <span class="value">28份</span>
      </div>
      <div class="item">
        <span class="key">奖金类型：</span>
        <span class="value">绩效奖金</span>
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
.card-info-item {
  box-shadow: 0 0 0.05rem 0 rgba(0,0,0,0.08);
  border-radius: 0.02rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.12rem 0.18rem;
  .left {
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