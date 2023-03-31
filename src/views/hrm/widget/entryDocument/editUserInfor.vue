<template>
   <div class="widget_main_box">
     <van-form @submit="onSubmit">
        <van-field
            v-model="formData.username"
            name="姓名"
            label="姓名"
            required
            placeholder="请输入"
            input-align="right"
            :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
            v-model="formData.username"
            name="年龄"
            label="年龄"
            placeholder="请输入"
            input-align="right"
        />
        <van-field
            v-model="formData.username"
            name="数值"
            label="数值"
            placeholder="请输入"
            input-align="right"
        />
        <van-field
            readonly
            clickable
            name="时间"
            :value="formData.date"
            label="时间"
            placeholder="请选择"
            right-icon="arrow"
            input-align="right"
            @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker
                type="date"
                :max-date="maxDate"
                v-model="currentDate"
                @confirm="onConfirm"
                @cancel="showPicker = false"
            />
        </van-popup>
        <div class="bottom_btn">
            <van-button round block type="info" native-type="submit" color="#1AAC88">提交</van-button>
        </div>
    </van-form>
   </div>
</template>

<script>
export default {
   name: 'editUserInfor',
   data() {
     return {
        formData: {
            username: '',
            password: '',
            date: this.formatter(),
        },
        showPicker: false,
        maxDate: new Date(),
        currentDate: new Date()
     }
   },
   computed: {
     
   },
   watch: {
     
   },
   created() {
     
   },
   methods: {
    formatter(time) {
      let nowdata =time == null ?  new Date() : new Date(time);
      let year = nowdata.getFullYear();
      let month = nowdata.getMonth() + 1;
      let date = nowdata.getDate();
      let nowtime = year + "-";
      if (month < 10) {
        nowtime += "0";
      }
      nowtime += month + "-";
      if (date < 10) {
        nowtime += "0";
      }
      nowtime += date;

      return nowtime;
    },
    onConfirm(time) {
        this.formData.date = this.formatter(time);
        this.showPicker = false;
    },
     onSubmit(values) {
      console.log('submit', values);
    },
   }
};
</script>

<style lang='less' scoped>
// 底部按钮
.bottom_btn {
    padding: .8rem .4rem .4rem;
}
</style>