<template>
  <div class="form-data">
    <van-form ref="formDataRef" validate-first @failed="onFailed" :label-width="120">
      <van-field
        v-model="formData.value1"
        name="value1"
        label="薪资所属期"
        input-align="right"
        :rules="[{ required: true, message: '请输入正确内容' }]"
      >
        <img class="icon-right" :src="rightIcon" slot="right-icon" />
      </van-field>
      <van-field
        v-model="formData.value111"
        name="value1"
        label="姓名"
        placeholder="请选择"
        input-align="right"
        :rules="[{ required: true, message: '请输入正确内容' }]"
      >
        <img class="icon-right" :src="rightIcon" slot="right-icon" />
      </van-field>
      <van-field
        v-model="formData.value2"
        name="pattern"
        label="账号"
        input-align="right"
        :rules="[{ required: true, message: '请输入正确内容' }]"
      />
      <van-field
        v-model="formData.value3"
        name="pattern"
        label="部门"
        input-align="right"
      />
      <van-field
        v-model="formData.value4"
        name="pattern"
        label="奖金类型"
        placeholder="请选择"
        input-align="right"
        :rules="[{ required: true, message: '请输入正确内容' }]"
        @click="typeVisible = true"
      >
        <img class="icon-right" :src="rightIcon" slot="right-icon" />
      </van-field>
      <van-field
        v-model="formData.value5"
        name="pattern"
        label="奖金金额"
        input-align="right"
        :rules="[{ required: true, message: '请输入正确内容' }]"
      />
      <van-field
        v-model="formData.value6"
        name="pattern"
        label="日期"
        placeholder="请选择"
        input-align="right"
        @click="handleClick('date')"
      >
        <img class="icon-right" :src="rightIcon" slot="right-icon" />
      </van-field>
      <van-field
        v-model="formData.value7"
        name="pattern"
        placeholder="根据公式计算"
        label="xxx公式计算字段"
        input-align="right"
      />
      <van-field
        v-model="formData.value8"
        name="pattern"
        label="文本"
        placeholder="请输入"
        input-align="right"
      />
    </van-form>

    <!-- 绩效类型 -->
    <van-popup v-model="typeVisible" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="handleOk('type')"
        @cancel="handleCancel"
      />
    </van-popup>

    <!-- 时间选择 -->
    <van-popup v-model="dateVisible" position="bottom">
      <van-datetime-picker
        type="year-month"
        @confirm="handleOk('date')"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import rightIcon from '../icons/right-arrow.svg'
export default {
  data() {
    return {
      formData: {},
      rightIcon,
      typeVisible: false,
      dateVisible: false,
      columns: ['提成', '绩效奖金'],
    }
  },
  methods: {
    handleClick(type) {
      if (type === 'date') {
        this.dateVisible = true
      }
    },
    onFailed(errorInfo) {
      console.log('failed', errorInfo)
    },
    handleOk() {
      this.typeVisible = false
    },
    handleCancel() {
      this.typeVisible = false
    },
    initData() {
      this.formData={}
    },
    handleSubmit() {
      this.$refs.formDataRef.validate().then(() => {
        this.$emit('ok', this.formData)
      }).catch(() => {
        console.log('failed')
      })
    }
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