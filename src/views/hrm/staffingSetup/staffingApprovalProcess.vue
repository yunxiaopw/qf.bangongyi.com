<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine>
        人事审批流程
        <template #r-content>
          <el-button size="small" @click="goRouter('/approvalProcessEdit')">添加审批流程</el-button>
        </template>
    </HeadLine>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
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
      <el-table-column prop="we_name" header-align="center" label="名称"></el-table-column>
      <el-table-column prop="all_we_parentids" align="center" label="审批路径"></el-table-column>
      <el-table-column prop="count" align="center" label="操作">
        <template>
          <el-button size="size" type="text">编辑</el-button>
          <el-button size="size" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { disableList } from "@/api/hrm/department";
export default {
  name: "staffingApprovalProcess",
  components: {},
  data() {
    return {
        tableData: [
          {
            we_name: '默认审批流程',
            all_we_parentids: '直接上级→自由审批',
            master: '选项A；选项B;',
          },
          {
            we_name: '默认审批流程',
            all_we_parentids: '直接上级→自由审批',
            master: '选项A；选项B;',
          },
          {
            we_name: '默认审批流程',
            all_we_parentids: '直接上级→自由审批',
            master: '选项A；选项B;',
          },
        ],
    };
  },
  created() {
    this.getDisableList()
  },
  mounted() {},
  methods: {
    getDisableList(){
      disableList().then(res=> {
        this.tableData = res.data ? res.data : []
      })
    },
    // 路由页面跳转
    goRouter(path, id = null) {
      if (id !== null) {
        this.$router.push({ path, query: { id } });
      }else{
        this.$router.push({ path });
      }
    },
  },
};
</script>
<style lang='less' scoped>
</style>