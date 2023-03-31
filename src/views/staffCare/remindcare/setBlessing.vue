<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine goback>设置祝福</HeadLine>

    <!-- 内容 -->
    <div class="staff_care_content">
      <!-- 生日/入职纪念日 -->
      <BirthdayBlessing v-if="type < 3" />
      <!-- 节日 -->
      <HolidayBlessings v-if="type > 2" />
    </div>
  </div>
</template>

<script>
import BirthdayBlessing from "../../../components/staffCare/staffCareSetting/setBlessing/BirthdayBlessing.vue"
import HolidayBlessings from "../../../components/staffCare/staffCareSetting/setBlessing/HolidayBlessings.vue"

export default {
  name: "setBlessing",
  components: {BirthdayBlessing, HolidayBlessings},
  data() {
    return {
      // 区分 生日/入职纪念日/节日
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
