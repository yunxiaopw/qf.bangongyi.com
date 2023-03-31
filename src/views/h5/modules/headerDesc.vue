<template>
  <div class="header-wrap">
    <div class="title">采集表的名称是这个最长十五个字</div>
    <template v-if="show">
      <div class="desc">此处为填报说明，最多在后台设置输入200字符此处为填报说明，最多在后台设置输入200字符此处为填报说明，最多在后台设置输入200字符此处为填报说明，最多在后台设置输入200</div>
      <div class="container">
        <div class="item">
          <span class="key">填报类型：</span>
          <span class="value">按月填写</span>
        </div>
        <div class="item">
          <span class="key">采集范围：</span>
          <span class="value">xx部门、cc标签、dd员工姓名</span>
        </div>
        <div class="item">
          <span class="key">采集人数：</span>
          <span class="value">108 人</span>
        </div>
      </div>
    </template>
    <div class="show" @click="handleShow">
      <div class="show-item" v-if="show">
        <span class="tip">展开</span>
        <img :src="downCircle" alt="" />
      </div>
      <div class="show-item" v-else>
        <span class="tip">收起</span>
        <img :src="upCircle" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import downCircle from '../icons/down-circle.svg'
import upCircle from '../icons/up-circle.svg'
export default {
  data() {
    return {
      downCircle,
      upCircle,
      show: true
    }
  },
  methods: {
    handleShow() {
      this.show = !this.show
    }
  }
}
</script>

<style lang="less" scoped>
  .header-wrap {
    padding: 0.12rem 0.16rem;
    .title {
      font-size: 0.16rem;
      color: rgba(0,0,0,0.85);
      margin-bottom: 0.12rem;
    }
    .desc {
      font-size: 0.12rem;
      color: rgba(0,0,0,0.45);
      margin-bottom: 0.12rem;
    }
    .container {
      font-size: 0.12rem;
      .key {
        color: rgba(0,0,0,0.45);
      }
      .value {
        color: rgba(0,0,0,0.65);
      }
    }

    .show-item {
      font-size: 0.14rem;
      display: flex;
      align-items: center;
      color: #1AAC88; 
      margin-top: 0.08rem;
      .tip {
        margin-right: 0.04rem;
      }
      img {
        width: 0.15rem;
        height: 0.15rem;
      }
    }
  }
</style>