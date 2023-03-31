<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine goback>设置提醒</HeadLine>

    <!-- 内容 -->
    <div class="staff_care_content">
      <!-- 生日 -->
      <BirthdayReminder v-if="type < 2" />
      <!-- 入职纪念日 -->
      <EntryDayReminder v-if="type > 1" />
    </div>
  </div>
</template>

<script>
import BirthdayReminder from "../../../components/staffCare/staffCareSetting/setReminders/BirthdayReminder.vue"
import EntryDayReminder from "../../../components/staffCare/staffCareSetting/setReminders/EntryDayReminder.vue"

export default {
  name: "setReminders",
  components: {BirthdayReminder, EntryDayReminder},
  data() {
    return {
      // 区分 生日/入职纪念日
      type: this.$route.query.type || null,
    };
  },
  created() {

  },
  methods: {}
};
</script>

<style lang="less" scoped>
.staff_care_content {
  height: calc(100% - 56px);
  padding: 24px 24px 16px;
}
</style>
