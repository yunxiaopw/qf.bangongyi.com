<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine>
        离职管理
        <template #r-content>
          <el-button size="small" @click="goRouter('/dimissionSetup')">通用设置</el-button>
          <el-button size="small" @click="goRouter('/setDimission')">办理离职</el-button>
      </template>
    </HeadLine>

    <!-- 状态组件 -->
    <StaffType :active.sync="queryForm.key" :freshen.sync="StaffType_freshen" @selectActive="selectActive" />

    <!-- 表格查询项 -->
    <div class="query-form">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline" size="small">
        <el-form-item label="">
          <el-input v-model="queryForm.search"  placeholder="姓名/工号/手机号"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            readonly
            v-model="queryListWidget.name"
            placeholder="部门"
            @focus="dialogListWidget(queryListWidget.name, true, 'move_department')"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="queryForm.quit_status" placeholder="离职状态">
            <el-option v-for="item in quit_status_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="queryForm.flow_status" placeholder="审批状态">
            <el-option v-for="item in flow_status_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="queryForm.flow_id" placeholder="审批单号"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            v-model="queryForm.start_end_date"
            type="daterange"
            value-format="yyyy-MM-dd"
            placeholder="离职日期"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="start_end_dateChange">
          </el-date-picker>
        </el-form-item>
        <div class="query-r-btn">
          <el-button size="small" @click="reset">重置</el-button>
          <el-button size="small" type="primary" @click="search">查询</el-button>
        </div>
      </el-form>
    </div>

    <!-- 表格 -->
    <el-table
    :data="tableData"
    v-loading="tableLoading"
    style="width: 100%"
    :max-height="$el_table_max_height(56,126,query_form_height,96)"
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
        <el-table-column prop="workno" align="center" label="工号"></el-table-column>
        <el-table-column prop="we_name" header-align="center" label="姓名">
          <template slot-scope="scope">
            <span class="hover_text" @click="goRouter('/dimissionInfor', scope.row.id)">
              {{ scope.row.we_name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="department" align="center" label="部门">
          <template slot-scope="scope">
              {{ scope.row.department.name }}
          </template>
        </el-table-column>
        <el-table-column prop="type_desc" align="center" label="用工类型"></el-table-column>
        <el-table-column prop="operation_type_desc" align="center" label="离职类型"></el-table-column>
        <el-table-column prop="operation_time_desc" align="center" label="离职日期"></el-table-column>
        <el-table-column prop="operation_reason" align="center" label="离职原因"></el-table-column>
        <el-table-column prop="quit_status_desc" align="center" label="离职状态"></el-table-column>
        <el-table-column prop="flow_status_desc" align="center" label="离职审批"></el-table-column>
        <el-table-column prop="form_id" align="center" label="审批单号">
          <template slot-scope="scope">
              <span class="hover_text">
              {{ scope.row.form_id }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" align="center" label="离职交接"></el-table-column>
        <el-table-column prop="entry_time_desc" align="center" label="入职时间"></el-table-column>
        <el-table-column prop="id" align="center" label="操作" width="300px">
          <template slot-scope="scope">
            <div>
              <el-button v-if="scope.row.status !== '2'" size="small" type="text" @click="goRouter('/dimissionInfor', scope.row.id)">详情</el-button>
              <el-button v-if="scope.row.status === '5' || scope.row.status === '1'" size="small" type="text" @click="quitRevokeDialogShow(scope.row)">撤销离职</el-button>
              <el-button v-if="scope.row.status === '5' || scope.row.status === '2'" size="small" type="text" @click="goRouter('/printDimission', scope.row.id)">打印离职证明</el-button>
            </div>
          </template>
        </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <pagination
    v-show="tableDataTotal>0"
    :total="tableDataTotal"
    :page.sync="queryForm.page"
    :limit.sync="queryForm.size"
    @pagination="getTabelList"
    />

    <!-- 撤销离职弹层 -->
    <el-dialog
      class="dialog"
      title="撤销离职"
      width="1080px"
      :visible.sync="quitRevokeDialog"
      destroy-on-close
    >
      <el-form :model="quitRevokeForm" :rules="quitRevokeRules" ref="quitRevokeForm" label-width="130px" size="small">
        <el-row>
            <el-col :span="8">
                <el-form-item label="姓名：" prop="we_name">
                  <span>{{quitRevokeForm.we_name}}</span>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="离职状态：" prop="quit_status_desc">
                  <span>{{quitRevokeForm.quit_status_desc}}</span>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="离职审批：" prop="flow_status_desc">
                  <span>{{quitRevokeForm.flow_status_desc}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-form-item label="撤销离职原因：" prop="reason">
                  <el-input type="textarea" v-model="quitRevokeForm.reason" maxlength="200" :autosize="{ minRows: 4, maxRows: 4}" style="width: 100%"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="quitRevokeDialog = false">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('quitRevokeForm')">确定</el-button>
      </div>
    </el-dialog>

    <!-- 修改 主/子负责人弹层 -->
    <ListWidget :tabType="listWidgetTabType" :emitType="listWidgetEmitType" :selects="listWidgetSelects" :radio="listWidgetRadio" :visible="listWidgetShow" @ackSelect="ackSelect" @listWidgetHide="listWidgetHide" />
  </div>
</template>

<script>
import StaffType from "@/components/hrm/dimission/StaffType";
import { quitList, quitRevoke } from "@/api/hrm/dimission";


export default {
  name: "dimission",
  components: { StaffType },
  data() {
    return {
      query_form_height: 0,
      // 查询入参
      queryForm: {
        key: 'submit_num',
        search: '',
        department: '',
        quit_status: '',
        flow_status: '',
        flow_id: '',
        start_date: '',
        end_date: '',
        start_end_date: '',
        page: 1,
        size: 10,
      },
      StaffType_freshen: false,
      // 查询条件 弹层获取的主/子负责人 展示文本信息
      queryListWidget: {
        name: "",
      },
      // 离职状态 可选项
      quit_status_options: [
        {label: '审批中', value: '1'},
        {label: '已离职', value: '2'},
        {label: '已撤销', value: '3'},
        {label: '待离职', value: '5'},
      ],
      // 审批状态 可选项
      flow_status_options: [
        {label: '未发起', value: '0'},
        {label: '审批中', value: '1'},
        {label: '已通过(待生)', value: '2'},
        {label: '未通过(已驳回', value: '3'},
        {label: '已撤销', value: '4'},
      ],
      
      // 表格数据
      tableData: [],
      tableLoading: false,
      tableDataTotal: 0,
      // ListWidget 组件相关数据
      listWidgetShow: false,
      listWidgetRadio: false,
      listWidgetEmitType: "",
      listWidgetTabType: "",
      listWidgetSelects: [],

      // 办理入职 弹层相关
      quitRevokeDialog: false,
      quitRevokeForm: {
        id: "",
        we_name: "",
        quit_status_desc: "",
        flow_status_desc: "",
        reason: "",
      },
      quitRevokeRules: {
        reason: [{ required: true, message: "请输入撤销离职原因", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getQuitList()
  },
  mounted() {
    this.query_form_height = document.querySelector(".query-form").offsetHeight;
  },
  methods: {
    // 获取表格数据
    getQuitList(){
      this.tableLoading = true;
      quitList(this.queryForm).then(res=> {
        this.tableData = res.data.list ? res.data.list : [];
        this.tableDataTotal = res.data.count*1;
      }).finally((e)=> {
        this.tableLoading = false;
      })
    },
    // 分页
    getTabelList(){
      this.getQuitList();
    },
    // 重置
    reset() {
      this.resetQueryForm();
      this.search();
    },
    // 顶部横向tab 切换
    selectActive() {
      this.search();
    },
    // 重置 查询条件数据
    resetQueryForm() {
        this.queryForm = {
          key: 'submit_num',
          search: '',
          department: '',
          quit_status: '',
          flow_status: '',
          flow_id: '',
          start_date: '',
          end_date: '',
          start_end_date: '',
          page: 1,
          size: 10,
      }
      // 主/子负责人 弹层选择项 内容置空
      this.queryListWidget.name = "";
      // this.queryListWidget.query_master.id = "";
      // this.queryListWidget.query_lead.name = "";
      // this.queryListWidget.query_lead.id = "";
    },
    // 查询
    search() {
      this.queryForm.page = 1;
      this.getQuitList()
    },
    // 部门 弹层
    dialogListWidget(data, radio = false, emitType) {
        // 移动部门
      this.listWidgetSelects = [];
    //   this.moveForm.we_id = data.we_id;
      this.listWidgetTabType = "部门";

      this.listWidgetShow = true;
      this.listWidgetRadio = radio;
      this.listWidgetEmitType = emitType;
    },
    // 部门弹层 确定
    ackSelect(data) {
      let { emitType, visible, selects } = data;
      this.listWidgetShow = visible;
      this.listWidgetSelects = selects;
      // 切换部门
      this.queryListWidget.name = selects.map(i => i.we_name).join(",");
    //   this.queryListWidget.query_master.id = selects.map(i => i.id).join(",");
    //   this.queryForm.master_id = this.queryListWidget.query_master.id;
      this.queryForm.department = selects.map(i => i.id).join(",");
      // this.search();
    },
    // 部门弹层 隐藏
    listWidgetHide(visible){
      this.listWidgetShow = visible;
    },
    // 离职开始/结束日期
    start_end_dateChange(val) {
      if(val !== null) {
        this.queryForm.start_date = val[0];
        this.queryForm.end_date = val[1];
      }else {
        this.queryForm.start_date = '';
        this.queryForm.end_date = '';
      }
    },
    // 撤销离职 弹层
    quitRevokeDialogShow(item) {
      let { id, we_name, quit_status_desc, flow_status_desc } = item;
      this.quitRevokeForm = { id, we_name, quit_status_desc, flow_status_desc, reason: ''};
      this.quitRevokeDialog = true;
    },
    // 撤销离职 确认
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let { id, reason } = this.quitRevokeForm;
          quitRevoke({id, reason}).then(res => {
            this.$message({
              showClose: true,
              message: res.errmsg ? res.errmsg : 'success',
              type: 'success'
            });
            this.$refs[formName].resetFields();
            this.search();
            this.quitRevokeDialog = false;
            this.StaffType_freshen = true;
          }).catch((error) => {
            this.$message({
              showClose: true,
              message: error.errmsg,
              type: 'error'
            });
          })
        } else {
          return false;
        }
      });
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
.query-form {
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  /deep/.el-form--inline {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
}
.query-r-btn {
  margin: 0 10px 18px auto;
  display: flex;
  align-items: center;
  .el-button + .el-button {
    margin-left: 8px;
  }
}

.hover_text {
  cursor: pointer;
}
.hover_text:hover {
  color: #1AAC88;
}

// 弹层样式
.dialog {
  /deep/.el-dialog__header {
    height: 48px;
    padding: 12px 24px 12px;
    border-bottom: 1px solid #f0f0f0;
    .el-dialog__title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
    }
    .el-dialog__headerbtn {
      top: 12px;
    }
  }
  /deep/.el-dialog__body {
    padding: 24px;
  }
  /deep/.el-dialog__footer {
    height: 52px;
    border-top: 1px solid #f0f0f0;
    padding: 10px 24px;
  }
}

</style>