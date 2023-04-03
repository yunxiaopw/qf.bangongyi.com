<template>
  <div class="card-item">
    <div class="content">
      <div class="left">
        <div class="title">{{ item.name }}</div>
        <div class="desc">
          <span class="key">填报类型：</span>
          <span class="value">{{ item.type === 1 ? '限填一次' : '按月填写' }}</span>
        </div>
      </div>
      <div class="right" v-if="!item.is_fill">
        <div class="tip">未填写</div>
      </div>
    </div>
    <div class="footer">
      <div class="btn-group record" @click="handleClick('record', item)" v-if="item.is_fill">
        <img :src="timeIcon" alt="">
        <span class="btn">查看记录</span>
      </div>
      <div class="btn-group" @click="handleClick('addData', item)">
        <img :src="editIcon" alt="">
        <span class="btn">填报数据</span>
      </div>
    </div>
  </div>
</template>

<script>
import editIcon from '../icons/edit-square.svg'
import timeIcon from '../icons/time-circle.svg'
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
      editIcon,
      timeIcon
    }
  },
  methods: {
    handleClick(type, item) {
      switch (type) {
        case 'record':
          this.$emit('onRecord', item)
          break;
        case 'addData':
          this.$emit('onAddData', item)
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.card-item {
  box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.09);
  border-radius: 0.02rem;
  .content {
    padding: 0.12rem 0.16rem;
    display: flex;
    justify-content: space-between;
    .left {
      .title {
        width: calc(100vw - 1.2rem);
        font-weight: 500;
        color: rgba(0,0,0,0.85);
        font-size: 0.16rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .desc {
        margin-top: 0.08rem;
        font-size: 0.12rem;
        .key {
          color: rgba(0,0,0,0.45);
        }
        .value {
          color: rgba(0,0,0,0.65);
        }
      }
    }
    .right {
      background: #FFF3D0;
      border-radius: 2px;
      height: 0.18rem;
      width: 0.38rem;
      text-align: center;
      line-height: 0.18rem;
      .tip {
        font-size: 0.1rem;
        color: #FF9C00;
      }
    }
  }
  .footer {
    border-top: 1px solid rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 39px;
    img {
      width: 0.15rem;
      height: 0.15rem;
    }
    .btn-group {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      height: 100%;
    }
    .record {
      border-right: 1px solid rgba(0,0,0,0.1);
    }
    .btn {
      margin-left: 0.04rem;
    }
  }
}
</style>