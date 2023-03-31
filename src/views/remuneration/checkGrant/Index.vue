<template>
  <div class="main-box">
    <!--页头-->
    <HeadLine>
      薪酬审批
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
            :picker-options="pickerOptions"
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
          label="用工类型"></el-table-column>
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
          label="审批状态">
          <template slot-scope="scope">
            <span v-if="computedStatus === '1'" class="check_status color1">待审核</span>
            <span v-if="computedStatus === '2'" class="check_status color2">审核中</span>
            <span v-if="computedStatus === '3'" class="check_status color3">已通过，待存档</span>
            <span v-if="computedStatus === '4'" class="check_status color4">不通过</span>
            <span v-if="computedStatus === '5'" class="check_status color5">已存档</span>
            <span v-if="computedStatus === '6'" class="check_status color6">已直接下发，待存档</span>
            <span v-if="computedStatus === '7'" class="check_status color7">已下发，待存档</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="entry_time"
          align="left"
          sortable
          label="审批时间"></el-table-column>
        <el-table-column
          prop="entry_time"
          align="left"
          label="其他操作">
          <template slot-scope="scope">
            <div>
              <span @click="checkOut('cat')" class="check_operate">查看</span>
              <span @click="checkOut('edit')" class="check_operate">修改</span>
              <span @click="checkOut('grant')" class="check_operate">发薪</span>
              <span @click="checkOut('archive')" class="check_operate">存档</span>
              <span @click="checkOut('history')" class="check_operate">历史记录</span>
              <span @click="checkOut('del')" class="check_operate">删除</span>
              <span @click="checkOut('out')" class="check_operate">撤回</span>
            </div>
          </template>
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

    <!--弹出发薪方式-->

    <el-dialog title="发薪" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="通知方式">
          <el-select size="small" v-model="form.type" placeholder="选择发薪通知方式">
            <el-option label="办公逸企业微信通知" value="bangognyi"></el-option>
            <el-option label="邮件通知" value="email"></el-option>
            <el-option label="以上都需要" value="all"></el-option>
          </el-select>
        </el-form-item>
        <div>
          需发送条数: <span style="color: red;">123</span>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        // pickerOptions: {
        //   onPick: ({ maxDate, minDate }) => {
        //     this.choiceDate = minDate.getTime()
        //     if (maxDate) {
        //       this.choiceDate = ''
        //     }
        //   },
        //   disabledDate: (time) => {
        //     const self = this
        //     if (self.choiceDate) {
        //       let minMonth = new Date(self.choiceDate).getMonth(),
        //         lastYear = new Date(self.choiceDate.minDate).setMonth(minMonth - 1),
        //         nextYear = new Date(self.choiceDate.minDate).setMonth(minMonth + 1);
        //       let minTime = new Date(self.choiceDate).getTime()
        //       let nextTime = new Date().setMonth(new Date().getMonth() + 1)
        //       let lastTime = new Date().setMonth(new Date().getMonth() - 1)
        //       if (minTime <= nextTime || minTime >= lastTime) {
        //         //开始日期少于当前月+12个月 并且大于当前月-12个月，则表示只限制前面的范围
        //         return time.valueOf() > new Date().getTime() || time.valueOf() > nextYear.valueOf() || time.valueOf() < lastYear.valueOf()
        //       }
        //       else {
        //         // 只能选 minDate 前后一年的范围
        //         return time.valueOf() < lastYear.valueOf() || time.valueOf() > nextYear.valueOf();
        //       }
        //     }
        //   }
        // },
        options: [{
          value: '选项1',
          label: '提交时段'
        }, {
          value: '选项2',
          label: '薪酬所属字段'
        },{
          value: '选项3',
          label: '审批时段'
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
        // 发薪方式通知
        dialogFormVisible: false,
        form: {
          type: ''
        }
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
      checkOut (type) {
        switch (type) {
          // 查看
          case 'cat':
            this.$router.push('/payDetails');
            break;
          // 修改
          case 'edit':
            break;
          // 发薪
          case 'grant':
            this.dialogFormVisible = true;
            break;
          // 存档
          case 'archive':
            this.archive();
            break;
          // 前往历史记录
          case 'history':
            this.$router.push('/payHistory');
            break;
          // 删除
          case 'del':
            this.del();
            break;
          // 撤回
          case 'out':
            this.out();
            break;
        }
      },
      grant() {
        this.$confirm(`
        <div></div>>
        `, '发薪', {
          confirmButtonText: '确定下发',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '存档成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消存档'
          });
        });
      },
      archive() {
        this.$confirm('您确定是否存档，一旦存档就不可再修改了，请谨慎操作！', '确定存档', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }).then(() => {
          this.$confirm('您确定是否存档，一旦存档就不可再修改了，请谨慎操作！', '确定存档', {
            confirmButtonText: '前往"已存档列表"',
            cancelButtonText: '返回"薪酬审批及发薪"',
            dangerouslyUseHTMLString: true,
            type: 'success'
          }).then(() => {}).catch(() => {});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消存档'
          });
        });
      },
      del () {
        this.$confirm('您确定是要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      out(){
        this.$confirm(`<strong>确认要撤回${'xx方案'}吗?</strong><br />提示：撤回的薪资方案会回到“薪资方案设置-草稿件”内。`, '发薪', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '撤回成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消撤回'
          });
        });
      },
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

    /deep/.el-dialog {
      width: 420px;
    }
  }
</style>
