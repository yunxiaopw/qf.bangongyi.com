<template>
  <div class="form-data">
    <van-form ref="formDataRef" validate-first :label-width="120">
      <div v-for="item in formDataList" :key="item.id">
        <van-field :readonly="type === 'readonly'" v-if="item.value_type === '1'" v-model="item.value" :label="item.name" input-align="right">
          <img v-if="type !== 'readonly'" class="icon-right" :src="rightIcon" slot="right-icon" />
        </van-field>
        <van-field :readonly="type === 'readonly'" v-if="item.value_type === '2'" v-model="item.value" :label="item.name" input-align="right">
          <img v-if="type !== 'readonly'" class="icon-right" :src="rightIcon" slot="right-icon" />
        </van-field>
        <van-field :readonly="type === 'readonly'" v-if="item.value_type === '4'" v-model="item.value" :label="item.name"  input-align="right"
         @click="handleClick('radio', item)">
          <img v-if="type !== 'readonly'" class="icon-right" :src="rightIcon" slot="right-icon" />
        </van-field>
        <van-field :readonly="type === 'readonly'" v-if="item.value_type === '3'" v-model="item.value" :label="item.name" input-align="right"
          @click="handleClick('date', item)">
          <img v-if="type !== 'readonly'" class="icon-right" :src="rightIcon" slot="right-icon" />
        </van-field>
      </div>
    </van-form>
    <!-- 单选 -->
    <van-popup v-model="typeVisible" position="bottom">
      <van-picker show-toolbar :columns="columns" @confirm="(e) => handleOk(e,'radio')" @cancel="handleCancel" />
    </van-popup>
    <!-- 时间选择 -->
    <van-popup v-model="dateVisible" position="bottom">
      <van-datetime-picker type="year-month" @confirm="(e) => handleOk(e,'date')" @cancel="dateVisible = false" />
    </van-popup>
  </div>
</template>

<script>
import moment from 'moment'
import rightIcon from '../icons/right-arrow.svg'
export default {
  data() {
    return {
      formDataList: [],
      rightIcon,
      typeVisible: false,
      dateVisible: false,
      columns: [],
      currentItem: {},
      type: 'readonly'
    }
  }, 
  methods: {
    handleClick(type, data) {
      if(this.type === 'readonly') return
      switch(type){
        case 'date':
          this.dateVisible = true
          this.currentItem = data
          break;
        case 'radio':
          this.typeVisible = true
          this.columns = data.value_json
          this.currentItem = data
        default:
          break
      }
    },
    handleOk(e, type) {
      switch(type){
        case 'date':
          this.dateVisible = false
          this.currentItem.value = moment(e).format('YYYY-MM')
          break;
        case 'radio':
          this.typeVisible = false
          this.currentItem.value = e
        default:
          break
      }
    },
    handleCancel() {
      this.typeVisible = false
    },
    initData() {
      this.formDataList = {}
    },
    // handleSubmit() {
    //   this.$refs.formDataRef.validate().then(() => {
    //     this.$emit('ok', this.formDataList)
    //   }).catch(() => {
    //     console.log('failed')
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
.icon-right {
  width: 0.18rem;
  height: 0.18rem;
  margin-bottom: 0.02rem;
}
</style>