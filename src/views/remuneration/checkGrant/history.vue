<template>
  <div class="main-box">
    <!--页头-->
    <HeadLine goback>
      薪酬审批及发薪的历史记录
    </HeadLine>
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
          prop="check_id"
          align="left"
          sortable
          label="提交时间"></el-table-column>
        <el-table-column
          sortable
          align="left"
          class="pointer"
          label="薪酬所属时段">
          <template slot-scope="scope" class="pointer">

            <router-link to="/payDetails">{{ scope.row.time }}</router-link>
          </template>
        </el-table-column>
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
          label="总金额">
          <template slot-scope="scope" class="pointer">

            <router-link to="/payDetails">{{ scope.row.time }}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="entry_time"
          align="left"
          label="审批状态">
          <template slot-scope="scope" class="pointer">
            <span v-if="computedStatus === '1'" class="check_status color1">已删除</span>
            <span v-if="computedStatus === '2'" class="check_status color2">已通过</span>
            <span v-if="computedStatus === '3'" class="check_status color3">不通过</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="entry_time"
          align="left"
          sortable
          label="操作时间"></el-table-column>
        <el-table-column
          prop="entry_time"
          align="left"
          label="操作者">
        </el-table-column>
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
    name: "history",
    data() {
      return {
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
    computed: {
      computedStatus() {
        return 1
      },
    },
    methods: {
      // 分页
      getTabelList(){
        this.search();
      },
      // 计算状态
      // 撤回操作
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
