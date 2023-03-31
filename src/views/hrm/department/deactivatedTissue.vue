<template>
  <div class="main-box">
    <HeadLine goback> 已停用组织 </HeadLine>

    <el-table
      :data="tableData"
      style="width: 100%"
      :max-height="$el_table_max_height(56)"
      :header-cell-style="{
        height: '34px',
        padding: '0',
        background: '#FAFAFA',
        color: '#8C8C8C',
        fontSize: '12px',
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        fontWeight: '500',
      }"
      row-key="id"
    >
      <el-table-column prop="we_name" header-align="center" label="部门"></el-table-column>
      <el-table-column prop="all_we_parentids" align="center" label="上级部门"></el-table-column>
      <el-table-column prop="type" align="center" label="组织类型"></el-table-column>
      <el-table-column prop="master" align="center" label="负责人"></el-table-column>
      <el-table-column prop="leads" align="center" label="次负责人"></el-table-column>
      <el-table-column prop="delete_time" align="center" label="停用时间"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { disableList } from "@/api/hrm/department";
export default {
  name: "deactivatedTissue",
  components: {},
  data() {
    return {
      tableData: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getDisableList()
  },
  mounted() {},
  methods: {
    getDisableList(){
      disableList().then(res=> {
        this.tableData = res.data ? res.data : []
      })
    }
  },
};
</script>
<style lang='less' scoped>
</style>