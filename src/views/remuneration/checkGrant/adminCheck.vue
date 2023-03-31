<template>
  <div class="main-box">
    <!--页头-->
    <HeadLine>
      薪酬审批
      <template #l-content>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="待审批" name="first"></el-tab-pane>
          <el-tab-pane label="已审批" name="second"></el-tab-pane>
        </el-tabs>
      </template>
    </HeadLine>

    <!--搜索项-->
    <div class="query-form">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline">
        <el-form-item label="" style="width: 142px;">
          <el-select size="small" v-model="queryForm.value" placeholder="薪酬所属时段">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            v-model="queryForm.date"
            size="small"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>

    <!--表格区域-->
    <div style="padding: 0 24px" class="check_table">
      <el-table
        ref="multipleTable"
        border
        v-loading="tableLoading"
        max-height="480"
        size="small"
        :data="tableData"
        style="width: 100%"
        row-key="id"
      >
        <el-table-column prop="we_name" align="left" label="序号">
          <template slot-scope="scope">
            <span style="color: #1aac88">{{ scope.row.we_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          sortable
          label="提交时间">
          <template slot-scope="scope">
            <router-link to="/payDetails">{{ scope.row.time }}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="P_title"
          sortable
          align="left"
          label="薪酬所属时段"></el-table-column>
        <el-table-column
          prop="RL_title"
          align="left"
          label="薪酬方案">
        </el-table-column>
        <el-table-column
          prop="type"
          align="left"
          label="人员类型"></el-table-column>
        <el-table-column
          prop="we_mobile"
          align="left"
          sortable
          label="总人数"></el-table-column>
        <el-table-column
          prop="entry_time"
          align="left"
          sortable
          label="总金额"></el-table-column>
        <el-table-column
          prop="entry_time"
          align="left"
          v-if="activeName === 'second'"
          label="审批结果">
          <template slot-scope="scope">
            <span v-if="computedStatus === '3'" class="check_status color3">已通过</span>
            <span v-if="computedStatus === '4'" class="check_status color4">不通过</span>
            <span v-if="computedStatus === '5'" class="check_status color5">审核中</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="entry_time"
          align="left"
          sortable
          v-if="activeName === 'second'"
          label="提交时间"></el-table-column>
      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryForm.page"
        :limit.sync="queryForm.size"
        @pagination="getTabelList"
      />
    </div>

  </div>
</template>

<script>
  export default {
    name: "adminCheck",
    data() {
      return {
        activeName: 'first',
        options: [{
          value: '选项1',
          label: '提交时段'
        }, {
          value: '选项2',
          label: '薪酬所属字段'
        },{
          value: '选项3',
          label: '提交时段'
        }],
        // 表单查询
        queryForm: {
          value: '',
          date: '',
          page: 1,
          size: 15
        },
        // 表格数据
        tableData: [
          {
            id: 1,
            date: "北京靠谱前程科技有限公司",
            name: "王小虎",
            address: "上海市普",
            time: '2021-02-20'
          },
          {
            id: 2,
            date: "北京靠谱前程科技有限公司",
            name: "王小虎",
            address: "上海市普",
            time: '2021-02-20'
          },
          {
            id: 3,
            date: "北京靠谱前程科技有限公司",
            name: "王小虎",
            address: "上海市普",
            time: '2021-02-20'
          },
          {
            id: 4,
            date: "北京靠谱前程科技有限公司",
            name: "王小虎",
            address: "上海市普",
            time: '2021-02-20'
          },
        ],
        tableLoading: false,
        multipleSelection: [],
        total: 100,
      }
    },
    created() {
      console.log(this.$route)
      if (this.$route.query.activeName) {
        this.activeName = this.$route.query.activeName
      }
    },
    computed: {
      computedStatus() {
        return '1'
      },
    },
    methods: {
      //切换tab请求搜索项
      handleClick() {
        this.queryForm = {
          value: '',
            date: '',
            page: 1,
            size: 15
        }
      },
      // 分页
      getTabelList(){
        this.search();
      },
      checkOut () {
        this.$confirm(`确认要撤回${'xx方案'}吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.$message({
            type: 'success',
            message: '撤回成功!'
          });
        }).catch(() => {});
      }
    }
  }
</script>

<style lang="less" scoped>
  .main-box {
    .query-form{
      margin: 8px 24px;
      .demo-form-inline {
        display: flex;
        align-items: center;
      }
      .el-form--inline .el-form-item {
        margin-right: 0!important;
      }
      /deep/.el-date-editor .el-range-separator {
        width: 8%!important;
      }
      /deep/.el-select .el-input__inner {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: none;
      }
      /deep/ .el-input__inner:nth-last-child(1) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }

    .check_table {
      font-size: 13px;
      .check_status {
        width: 52px;
        height: 20px;
        border-radius: 2px;
        padding: 1px 8px;
      }

      .check_operate {
        font-size: 13px;
        font-weight: 400;
        color: #1AAC88;
        line-height: 20px;
        padding: 0 10px;
        cursor:pointer;
      }

      .color1 {
        background: #F1F7FF;
        color: #0F78FD;
      }
      .color2 {
        background: #FFF5EC;
        color: #EE8E07;
      }
      .color3 {
        background: rgba(82,196,26,0.1);
        color: #52C41A;
      }
      .color4 {
        background: #FFF3F2;
        color: #F43739;
      }
      .color5 {
        background: rgba(82,196,26,0.1);
        color: #EE8E07;
      }
      .color6 {
        background: #F1F7FF;
        color: #52C41A;
      }
      .color7 {
        background: #F1F7FF;
        color: #0F78FD;
      }
    }
  }
</style>
