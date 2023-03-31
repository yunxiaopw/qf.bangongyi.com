<template>
  <div class="record-info">
    <HeaderDesc />
    <div class="line"></div>
    <div class="main">
      <div class="form">
        <van-form validate-first :label-width="120">
          <van-field
            v-model="formData.value1"
            name="value1"
            label="薪资所属期"
            input-align="right"
            readonly
            :rules="[{ required: true, message: '请输入正确内容' }]"
          >
            <img class="icon-right" :src="rightIcon" slot="right-icon" />
          </van-field>
        </van-form>
      </div>
      <div class="record">
        <div class="item">
          <span class="key">数据状态：</span>
          <span class="value">未锁定</span>
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
          <div class="count">48</div>
        </div>
        <div class="card">
          <div class="card-title">
            <div class="line"></div>
            <div class="title">填写结果</div>
          </div>
          <div class="count">39</div>
        </div>
      </div>
    </div>
    <div class="card-container">
      <CardInfo />
      <CardInfo />
      <CardInfo />
    </div>
  </div>
</template>

<script>
import HeaderDesc from './modules/headerDesc.vue'
import CardInfo from './modules/cardInfo.vue'
import rightIcon from './icons/right-arrow.svg'
import './modules/rem.js'
export default {
  components: {
    HeaderDesc,
    CardInfo
  },
  data() {
    return {
      rightIcon,
      formData: {
        value1: '',
      }
    }
  },
}
</script>

<style lang="less" scoped>
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
</style>