
<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine>
        转正管理
        <template #r-content>
            <div class="t-r-btn">
                <el-button size="small" @click="goRouter('regularizationSetup')">通用设置</el-button>
            </div>
      </template>
    </HeadLine>

    <!-- 状态组件 -->
    <StaffType :active.sync="queryForm.key" @selectActive="selectActive"  />  

    <!-- 分页内容区 -->
    <div class="tabs-page">
      <el-tabs v-model="tabs_name" @tab-click="handleClick">
        <el-tab-pane label="待转正" name="1"></el-tab-pane>
        <el-tab-pane label="已转正" name="2"></el-tab-pane>
        <el-tab-pane label="未予转正" name="3"></el-tab-pane>
      </el-tabs>
    </div>
    
    <!-- 表格查询项 -->
    <div class="query-form">
      <el-form :inline="true" :model="queryForm" size="small">
        <el-form-item label="">
          <el-input v-model="queryForm.search" placeholder="姓名/工号/手机号"></el-input>
        </el-form-item>
        <el-form-item label="">
            <el-select v-model="queryForm.status" placeholder="转正审批状态">
                <el-option v-for="item in status_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-input readonly v-model="queryListWidget.name" placeholder="部门" @focus="dialogListWidget(queryListWidget.name, true, 'move_department')"></el-input>
        </el-form-item>
        <el-form-item label="">
          <MoreInput :i_item="{type: 'position_widget'}" v-model="queryForm.position_id" placeholder="岗位"/>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="queryForm.type" placeholder="工作性质">
              <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            v-model="queryForm.entry_start_end_date"
            type="daterange"
            range-separator="至"
            start-placeholder="入职日期前"
            end-placeholder="入职日期后"
            value-format="yyyy-MM-dd"
            @change="entry_start_end_date_change">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            v-model="queryForm.positive_start_end_date"
            type="daterange"
            range-separator="至"
            start-placeholder="预计转正前"
            end-placeholder="预计转正后"
            value-format="yyyy-MM-dd"
            @change="positive_start_end_date_change">
          </el-date-picker>
        </el-form-item>
        <div class="query-r-btn">
            <el-button size="small" @click="reset" v-debounce>重置</el-button>
            <el-button size="small" type="primary" @click="search">查询</el-button>
        </div>
      </el-form>
    </div>

    <!-- 待转正 表格 -->
    <el-table
      v-if="tabs_name === '1'"
      :data="tableData"
      v-loading="tableLoading"
      style="width: 100%"
      :max-height="$el_table_max_height(56,126,54,query_form_height,96)"
      :header-cell-style="{
        height: '34px',
        padding: '0',
        background: '#FAFAFA',
        color: '#8C8C8C',
        fontSize: '12px',
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        fontWeight: '500'
      }"
      row-key="id"
    >
      <el-table-column prop="workno" align="center" label="工号"></el-table-column>
      <el-table-column prop="we_name" align="center" label="姓名">
        <template slot-scope="scope">
          <div class="tabel_we_name" @click="goRouter('/regularizationInfor', scope.row.id)">{{scope.row.we_name}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" align="center" label="人事状态">
        <template slot-scope="scope">
            {{ statusEcho(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column prop="flow1" align="center" label="转正审批">
        <template slot-scope="scope">
          <span v-if="scope.row.flow">{{scope.row.flow.status_desc}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="flow2" align="center" label="审批单号">
        <template slot-scope="scope">
          <div class="tabel_we_name">{{scope.row.flow.id}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="department" align="center" label="部门">
        <template slot-scope="scope">
            {{ scope.row.department.name }}
        </template>
      </el-table-column>
      <el-table-column prop="position_title" align="center" label="岗位"></el-table-column>
      <el-table-column prop="rank" align="center" label="职级" min-width="150px">
        <template slot-scope="scope">
            <span class="table_rank_no" v-if="scope.row.rank.rank_no">{{scope.row.rank.rank_no}}</span>
            <span class="table_RL_title">{{scope.row.rank.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type_desc" align="center" label="工作性质"></el-table-column>
      <el-table-column prop="entry_time" align="center" label="入职时间"></el-table-column>
      <el-table-column prop="planned_time" align="center" label="计划转正日期"></el-table-column>
      <el-table-column prop="we_mobile" align="center" label="手机号码"></el-table-column>
      <el-table-column prop="id" align="center" label="操作">
        <template slot-scope="scope">
            <div>
              <el-button v-if="scope.row.flow.status<=0" type="text" size="small" @click="goRouter('/transactRegularization', scope.row)">办理转正</el-button>
              <el-button v-else type="text" size="small" @click="goRouter('/regularizationInfor', scope.row.id)">详情</el-button>
            </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 已转正 表格 -->
    <el-table
      v-if="tabs_name === '2'"
      :data="tableData"
      v-loading="tableLoading"
      style="width: 100%"
      :max-height="$el_table_max_height(56,126,54,query_form_height,96)"
      :header-cell-style="{
        height: '34px',
        padding: '0',
        background: '#FAFAFA',
        color: '#8C8C8C',
        fontSize: '12px',
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        fontWeight: '500'
      }"
      row-key="id"
    >
      <el-table-column prop="workno" align="center" label="工号"></el-table-column>
      <el-table-column prop="we_name" align="center" label="姓名">
        <template slot-scope="scope">
          <div class="tabel_we_name" @click="goRouter('/regularizationInfor', scope.row.id)">{{scope.row.we_name}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" align="center" label="人事状态">
        <template slot-scope="scope">
            {{ statusEcho(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column prop="flow1" align="center" label="转正审批">
        <template slot-scope="scope">
          <span v-if="scope.row.flow">{{scope.row.flow.status_desc}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="flow2" align="center" label="审批单号">
        <template slot-scope="scope">
            <div class="tabel_we_name">{{scope.row.flow.id}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="department" align="center" label="部门">
        <template slot-scope="scope">
            {{ scope.row.department.name }}
        </template>
      </el-table-column>
      <el-table-column prop="position_title" align="center" label="岗位"></el-table-column>
      <el-table-column prop="rank" align="center" label="职级" min-width="150px">
        <template slot-scope="scope">
            <span class="table_rank_no" v-if="scope.row.rank.rank_no">{{scope.row.rank.rank_no}}</span>
            <span class="table_RL_title">{{scope.row.rank.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type_desc" align="center" label="工作性质"></el-table-column>
      <el-table-column prop="entry_time" align="center" label="入职时间"></el-table-column>
      <el-table-column prop="planned_time" align="center" label="计划转正日期"></el-table-column>
      <el-table-column prop="positive_time" align="center" label="正式转正日期"></el-table-column>
      <el-table-column prop="id" align="center" label="操作">
        <template slot-scope="scope">
            <div>
              <el-button type="text" size="small" @click="goRouter('/regularizationInfor', scope.row.id)">详情</el-button>
            </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 未予转正 表格 -->
    <el-table
      v-if="tabs_name === '3'"
      :data="tableData"
      v-loading="tableLoading"
      style="width: 100%"
      :max-height="$el_table_max_height(56,126,54,query_form_height,96)"
      :header-cell-style="{
        height: '34px',
        padding: '0',
        background: '#FAFAFA',
        color: '#8C8C8C',
        fontSize: '12px',
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        fontWeight: '500'
      }"
      row-key="id"
    >
      <el-table-column prop="workno" align="center" label="工号"></el-table-column>
      <el-table-column prop="we_name" align="center" label="姓名">
        <template slot-scope="scope">
          <div class="tabel_we_name" @click="goRouter('/regularizationInfor', scope.row.id)">{{scope.row.we_name}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" align="center" label="人事状态">
        <template slot-scope="scope">
            {{ statusEcho(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column prop="flow1" align="center" label="转正审批">
        <template slot-scope="scope">
          <span v-if="scope.row.flow">{{scope.row.flow.status_desc}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="flow2" align="center" label="审批单号">
        <template slot-scope="scope">
            <div class="tabel_we_name">{{scope.row.flow.id}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="department" align="center" label="部门">
        <template slot-scope="scope">
            {{ scope.row.department.name }}
        </template>
      </el-table-column>
      <el-table-column prop="position_title" align="center" label="岗位"></el-table-column>
      <el-table-column prop="rank" align="center" label="职级" min-width="150px">
        <template slot-scope="scope">
            <span class="table_rank_no" v-if="scope.row.rank.rank_no">{{scope.row.rank.rank_no}}</span>
            <span class="table_RL_title">{{scope.row.rank.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type_desc" align="center" label="工作性质"></el-table-column>
      <el-table-column prop="entry_time" align="center" label="入职时间"></el-table-column>
      <el-table-column prop="positive_time" align="center" label="原定转正日期"></el-table-column>
      <el-table-column prop="positive_start_date" align="center" label="离职日期"></el-table-column>
      <el-table-column prop="we_mobile" align="center" label="手机号码"></el-table-column>
      <el-table-column prop="id" align="center" label="操作">
        <template slot-scope="scope">
            <div>
              <el-button type="text" size="small" @click="goRouter('/regularizationInfor', scope.row.id)">详情</el-button>
            </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <pagination
      v-show="tableDataTotal > 0"
      :total="tableDataTotal"
      :page.sync="queryForm.page"
      :limit.sync="queryForm.size"
      @pagination="getTabelList"
    />

    <!-- 选人/部门 弹层 -->
    <NewListWidget
    :tabType="listWidgetTabType" 
    :selects="listWidgetSelects" 
    :radio.sync="listWidgetRadio" 
    :visible.sync="listWidgetShow" 
    @ackSelect="ackSelect" />

  </div>
</template>
 
<script>
import StaffType from "@/components/hrm/regularization/StaffType";

import { correctsList } from "@/api/hrm/regularization";

export default {
  name: "regularization",
  components: { StaffType },
  data () {
    return {
      query_form_height: 0,
      tabs_name: '1',
      queryForm: {
        key: 'trial',
        mode: '1',
        department: '',
        position_id: '',
        type: '',
        status: '',
        entry_start_date: '',
        entry_end_date: '',
        entry_start_end_date: [],
        positive_start_date: '',
        positive_end_date: '',
        positive_start_end_date: [],
        page: 1,
        size: 10,
      },
      // 审批状态 可选项
      status_options: [
        {label:'未发起', value:'0'},
        {label:'审批中', value:'1'},
        {label:'已通过', value:'2'},
        {label:'未通过', value:'3'},
        {label:'已撤销', value:'4'},
      ],
      // 用工类型 可选项
      typeOptions: [
        {label: '全职', value: '1'},
        {label: '兼职', value: '2'},
        {label: '实习', value: '3'},
        {label: '劳务派遣', value: '4'},
        {label: '劳务外包', value: '5'},
        {label: '小时工', value: '6'},
        {label: '临时工', value: '7'},
      ],
      StaffType_freshen: false,
      // 表格相关
      tableLoading: false,
      tableData: [],
      tableDataTotal: 0,
      // 选人/部门 展示文本信息
      queryListWidget: {
        name: "",
      },
      // ListWidget 组件相关数据
      listWidgetShow: false,
      listWidgetRadio: true,
      listWidgetTabType: "",
      listWidgetSelects: [],
    }
  },
  created () {
    this.getTabelList();
  },
  mounted() {
    this.query_form_height = document.querySelector(".query-form").offsetHeight;
  },
  methods: {
    // 获取部门表格数据
    getTabelList(){
      this.tableLoading = true;
      correctsList(this.queryForm).then(res=> {
        this.tableData = res.data.list ? res.data.list : [];
        this.tableDataTotal = res.data.count*1;
      }).finally((e)=> {
        this.tableLoading = false;
      })
    },
    // 查询
    search() {
      this.queryForm.page = 1;
      this.getTabelList()
    },
    // 重置
    reset() {
      this.resetQueryForm();
      this.search();
    },
    // 重置 查询条件数据
    resetQueryForm() {
      this.queryForm = {
        key: '',
        mode: '1',
        department: '',
        position_id: '',
        type: '',
        status: '',
        entry_start_date: '',
        entry_end_date: '',
        entry_start_end_date: [],
        positive_start_date: '',
        positive_end_date: '',
        positive_start_end_date: [],
        page: 1,
        size: 10,
      }
      this.queryForm.mode = this.tabs_name;
      this.queryListWidget.name = "";
    },
    // 入职前后日期选择
    entry_start_end_date_change(val) {
      if(val && val.length>0) {
        this.queryForm.entry_start_date = val[0];
        this.queryForm.entry_end_date = val[1];
      }else{
        this.queryForm.entry_start_date = '';
        this.queryForm.entry_end_date = '';
      }
    },
    // 预计转正日期选择
    positive_start_end_date_change(val) {
      if(val && val.length>0) {
        this.queryForm.positive_start_date = val[0];
        this.queryForm.positive_end_date = val[1];
      }else{
        this.queryForm.positive_start_date = '';
        this.queryForm.positive_end_date = '';
      }
    },
    // 选人/部门 弹层
    dialogListWidget() {
      this.listWidgetSelects = [];
      this.listWidgetTabType = "部门";
      this.listWidgetShow = true;
    },
    // 选人/部门弹层 确定
    ackSelect(data) {
      let { selects } = data;
      this.queryListWidget.name = selects.map(i => i.we_name).join(",");
      // this.queryListWidget.id = selects.map(i => i.id).join(",");
      this.queryForm.department = selects.map(i => i.id).join(",");
    },
    // 切换tab
    handleClick() {
      this.resetQueryForm();
      this.search();
    },
    // 顶部横向tab 切换
    selectActive() {
      this.search();
    },
    // 路由页面跳转
    goRouter(path, id = null) {
      if (id !== null) {
        if(path==='/transactRegularization') {
          let infor = JSON.stringify({ staff:id.we_name, id:id.id, planned_time:id.planned_time });
          this.$router.push({ path, query: { infor } });
        }else{
          this.$router.push({ path, query: { id } });
        }
      }else{
        this.$router.push({ path });
      }
    },
    // 人事状态 文字回显
    statusEcho(status) {
      return status=='0'?'已转正':status=='1'?'试用期':status=='2'?'兼职':status=='3'?'离职':''
    },
  },
}
</script>

<style scoped lang="less">

.tabel_we_name {
  cursor: pointer;
}
.tabel_we_name:hover {
  color: #1AAC88;
}
.table_rank_no {
  background: rgba(26,172,136,0.08);
  border-radius: 2px;
  padding: 1px 4px;
  margin-right: 8px;
}

.tabs-page {
  padding: 0 24px;
}
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
</style>
