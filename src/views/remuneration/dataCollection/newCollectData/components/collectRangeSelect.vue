<template>
  <div>
    <div
      class="collect-range-wrap"
      v-for="(item, index) in collectRangeData"
      :key="item.id"
    >
      <div class="collect-range">
        <span class="desc">由</span>
        <MoreInput
          :i_item="{
            type: 'staff_widget',
            form_item_type: '成员',
            widget__init_text: item.dept_name,
            form_item_radio: true
          }"
          :v-model.sync="item.dept_name"
          style="width: 100px"
        />
        <span class="desc">填报</span>
        <MoreInput
          :i_item="{
            type: 'staff_widget',
            form_item_type: '成员',
            widget__init_text: item.dept_name,
            form_item_radio: true
          }"
          :v-model.sync="item.dept_name"
          style="width: 100px"
        />
        <span class="desc">数据</span>
      </div>
      <div
        v-if="index > 0"
        class="del-btn"
        @click="handleClick('del', item.id)"
      >
        删除
      </div>
    </div>
    <div class="add-item" @click="handleClick('add')">+ 添加</div>
  </div>
</template>

<script>
export default {
  name: 'collectRangeSelect',
  props: {
    rangeData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      collectRangeData: [{
        id: 1,
        dept_ids: '',
        staff_id: '',
        tag_ids: '',
        staff_ids: ''
      }],
    };
  },
  watch: {
    collectRangeData: {
      handler(val) {
        this.$emit('updated:rangeData', val);
      },
      deep: true
    }
  },
  methods: {
    handleClick(type, id) {
      switch (type) {
        case 'add':
          this.collectRangeData.push({
            id: this.collectRangeData.length + 1,
            dept_name: ''
          });
          break;
        case 'del':
          this.collectRangeData = this.collectRangeData.filter(
            item => item.id !== id
          );
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.collect-range-wrap {
  position: relative;
}
.collect-range {
  display: flex;
  align-items: center;
  border: 1px solid #E6E6E6;
  padding: 10px;
  display: flex;
  align-items: center;
  width: 380px;
  margin-bottom: 10px;
  .desc {
    margin: 0 10px;
  }
}

.del-btn {
  position: absolute;
  left: 400px;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
  color: #FF4D4F;
}

.add-item {
  cursor: pointer;
  color: #1890FF;
  border: 1px solid #E6E6E6;
  width: 380px;
  text-align: center;
  margin-top: 10px;
}
</style>