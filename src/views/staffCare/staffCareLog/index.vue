<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine>员工关怀日志</HeadLine>
    <!-- 表格筛选头 -->
    <div class="query-form">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline">
        <el-form-item label="">
          <el-date-picker
            size="small"
            v-model="begin_times"
            value-format="yyyy-MM-dd"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="queryForm.type" placeholder="请选择类型" size="small">
            <el-option v-for="item in staffCareLogQueryFormTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-input
            size="small"
            v-model="queryForm.name"
            placeholder="请输入员工姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            size="small"
            v-model="queryForm.to_name"
            placeholder="请输入消息接收人"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="query-r-btn">
        <el-button size="small" @click="reset">重置</el-button>
        <el-button size="small" type="primary" @click="search">查询</el-button>
      </div>
    </div>

    <!-- 表格数据 -->
    <el-table
      :data="tableData" 
      v-loading="tableLoading"
      style="width: 100%"
      max-height="480"
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
      <el-table-column prop="created_at" align="center" label="发送时间"></el-table-column>
      <el-table-column prop="type" align="center" label="类型">
        <template slot-scope="scope">
          <span>{{ filterType(scope.row.type, scope.row.master_staff_id, scope.row.to_staff_id) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="staff_name" align="center" label="员工姓名">
        <template slot-scope="scope">
          <div v-html="scope.row.staff_name"></div>
        </template>
      </el-table-column>
      <el-table-column prop="we_name" align="center" label="消息接收人">
        <template slot-scope="scope">
          <span v-html="scope.row.type !== 'birthday'&&scope.row.type !== 'anniversary' ? '全部' : scope.row.we_name"></span>
        </template>
      </el-table-column>
      <el-table-column prop="status" align="center" label="发送状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status > 0 ? '已投递' : '未投递' }}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryForm.page"
      :limit.sync="queryForm.page_size"
      @pagination="getTabelList"
    />
  </div>
</template>
<script>
import { remindLogList } from "@/api/staffCare/index"
import { mapState } from "vuex";

export default {
  name: "staffCareLog",
  data() {
    return {
      begin_times: [],
      queryForm: {
        page: 1,
        page_size: 10,
        begin_time: "",
        finish_time: "",
        type: "",
        name: "",
        to_name: "",
      },
      tableData: [],
      total: 0,
      tableLoading: false,
    };
  },
  created() {
    this.getTableData();
  },
  computed: {
    ...mapState({
        // 员工关怀日志
        staffCareLogQueryFormTypes: (state) => state.staffCare.staffCareLogQueryFormTypes,
    }),
  },
  watch: {
    begin_times(n, v) {
      if(n && n.length > 0) {
        this.queryForm.begin_time = n[0];
        this.queryForm.finish_time = n[1];
      }else{
        this.queryForm.begin_time = "";
        this.queryForm.finish_time = "";
      }
    }
  },
  methods: {
    // 获取表格数据
    getTableData() {
      this.tableLoading = true;
      remindLogList(this.queryForm).then(res => {
        this.tableData = res.data.list;
        this.total = Number(res.data.count);
        this.tableLoading = false;
      }).catch(error => {
        this.tableLoading = false;
      })
    },
    // 查询
    search() {
      this.getTableData();
    },
    // 重置
    reset() {
      this.resetQueryForm();
      this.search();
    },
    // 重置 查询条件数据
    resetQueryForm() {
      this.queryForm = {
        page: 1,
        page_size: 10,
        begin_time: "",
        finish_time: "",
        type: "",
        name: "",
        to_name: "",
      };
      this.begin_times = [];
    },
    // tab 分页切换
    getTabelList() {
      this.getTableData();
    },
    // 表格 类别字段显示处理
    filterType(type, master_staff_id, to_staff_id) {
      if(type === "birthday") {
        return master_staff_id === to_staff_id ? '生日祝福' : '生日提醒'
      }else if(type === "anniversary") {
        return master_staff_id === to_staff_id ? '入职纪念日祝福' : '入职纪念日提醒'
      }else{
        return '节日祝福'
      }
    },
  }
};
</script>
<style lang="less" scoped>
.query-form {
  height: 67px;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  .el-form--inline .el-form-item {
    margin-right: 8px;
  }
}
.query-r-btn {
  height: 32px;
  display: flex;
}
</style>
