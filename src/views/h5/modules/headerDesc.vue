<template>
  <div class="header-wrap" v-if="headerInfo">
    <div class="title">{{ headerInfo.name }}</div>
    <template v-if="show">
      <div class="desc" v-if="headerInfo.describe">{{ headerInfo.describe }}</div>
      <div class="container">
        <div class="item">
          <span class="key">填报类型：</span>
          <span class="value">{{ headerInfo.filling_type === 1 ? '限填一次' : '按月填写' }}</span>
        </div>
        <div class="item" v-if="headerInfo.tag_list">
          <span class="key">采集范围：</span>
          <span class="value">{{ headerInfo.tag_list }}</span>
        </div>
        <div class="item" v-if="headerInfo.total">
          <span class="key">采集人数：</span>
          <span class="value">{{ headerInfo.total }} 人</span>
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
  props: {
    headerInfo: {
      type: Object,
      default: () => {}
    }
  },
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