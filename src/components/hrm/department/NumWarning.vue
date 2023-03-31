<template>
  <div class="box">
    <div class="warning-box" v-if="Object.keys(warningInfo).length > 0">
      <div class="item-box" v-for="(value, key) in warningInfo" :key="key">
        <div class="img-box"><img src="../../../assets/svgs/warning.svg"></div>
        <div class="text" v-if="key === 'master_count'">{{ value }}个部门没有主负责人</div>
        <div class="text" v-if="key === 'lead_count'">{{ value }}个部门没有次负责人</div>
        <el-button class="btn" type="text" @click="viewDetails(key)">查看详情</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NumWarning",
  props: {
    warningInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    viewDetails(key) {
      let newKey = key.replace("count", "id");
      this.$emit('viewDetails', newKey)
    }
  },
};
</script>
<style lang='less' scoped>
  .box{
    padding: 9px 24px 0;
  }
.warning-box {
  width: 100%;
  background: #fffbe6;
  border: 1px solid #ffe58f;
  border-radius: 3px;
  padding: 9px 24px 9px 16px;
  .item-box:nth-child(2) { margin-top: 8px; }
  .item-box{
    height: 22px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #595959;
    display: flex;
    align-items: center;
    .img-box {
      width: 16px;
      height: 16px;
      img {
        width: 100%;
        height: 100%;
        vertical-align: initial;
      }
    }
    .w-icong {
        width: 16px;
        height: 16px;
        display: inline-block;
        vertical-align: middle;
    }
    .text{
        flex-grow: 1;
        margin-left: 3px;
    }
    .btn{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
    }
  }
  
}
</style>