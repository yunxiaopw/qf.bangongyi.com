<template>
  <div class="header">
    <div class="title">
      <span v-if="goback" class="pointer" @click="goBack">
        <el-icon class="el-icon-arrow-left" />
      </span>
      <slot />
    </div>

    <div v-if="tab.length > 0" class="tabs">
        <div v-for="(item, index) in tab" :key="index" :id="tabActive == item.title?'tabActive':''" class="tab-item" @click="tabClick(item)">
          <div>{{ item.title }}</div>
        </div>
        <div class="b-border" :style="`width:${bBorderWidth}px;transform:translateX(${bBorderOffsetW}px);`"></div>
    </div>
    <div class="l-content">
      <slot name="l-content" />
    </div>

    <div class="r-content">
      <slot name="r-content" />
    </div>
  </div>
</template>
<script>
export default {
  name: "headline",
  props: {
    goback: {
      type: Boolean,
      default: false
    },
    tab: {
      type: Array,
      default: () => []
    },
    tabActive: {
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {
      bBorderWidth: 0,
      bBorderOffsetW: 0,
    };
  },
  watch: {
    tabActive(val, ovl) {
      if(val!==ovl) {
        this.initTabActive();
      }
    }
  },
  mounted() {
    this.initTabActive();
    
  },
  methods: {
    // 初始化tab样式
    initTabActive() {
      if(this.tab.length > 0) {
        this.$nextTick(()=>{
            this.bBorderWidth = document.getElementById('tabActive').offsetWidth;
            this.bBorderOffsetW = document.getElementById('tabActive').offsetLeft;
        })
      }
    },
    // tab切换
    tabClick(item){
      this.$nextTick(()=>{
          this.bBorderWidth = document.getElementById('tabActive').offsetWidth;
          this.bBorderOffsetW = document.getElementById('tabActive').offsetLeft;
      })
      this.$emit('update:tabActive', item.title)
      this.$emit('tabClick', item.title);
    },
    // 返回
    goBack() {
      this.$router.back()
    }
  },
};
</script>

<style lang='less' scoped>
.header {
  width: 100%;
  height: 56px;
  padding-left: 24px;
  padding-right: 24px;
  background: #ffffff;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  .title {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #141414;
    line-height: 26px;
  }

  .tabs {
    height: 100%;
    margin-left: 24px;
    display: flex;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8C8C8C;
    position: relative;
    .tab-item {
      padding:0 12px;
      flex-grow: 1;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    #tabActive {
      font-size: 18px;
      font-weight: 500;
      color: #262626;
    }
    .b-border {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      background: #1AAC88;
      border-radius: 2px 2px 0px 0px;
      transition-duration: 0.2s;
      z-index: 1;
    }
  }
  .tabs::before {
    content: "";
    width: 1px;
    height: 20px;
    background: #F0F0F0;
    position: absolute;
    left: -12px;
    top: 50%;
    transform: translateY(-50%);
  }
  .l-content {
    margin-left: 20px;
    padding-left: 20px;
    border-left: 1px solid #F0F0F0;
    /deep/.el-tabs__header {
      margin: 0!important;
    }
    /deep/ .el-tabs__nav-wrap::after {
      background-color: white;
    }
  }
  .r-content {
    margin-left: auto;
    .el-button {
      display: inline-block;
    }
  }
  .el-icon-arrow-left{
    background:url(../../assets/images/arrows.png);
    width:24px;
    height:24px;
    margin-right:4px;
}
.el-icon-arrow-left:before {
    content: "../../assets/images/arrows.png";
    visibility: hidden;
    width:24px;
    height:24px;
  
}
}
</style>
