<template>
  <div class="card-record">
    <HeaderDesc />
    <div class="line"></div>
    <div class="card-container">
      <CardRecord />
      <CardRecord />
      <CardRecord />
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