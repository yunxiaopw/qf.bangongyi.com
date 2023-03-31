<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine :tab="tabList" :tabActive.sync="tabActive" @tabClick="tabClick">
        入职管理
        <template #r-content>
            <div class="t-r-btn">
                <el-popover
                  placement="bottom"
                  trigger="hover"
                >
                    <div class="sort-list">
                        <div class="sort-item" v-for="(item, index) in sortList" :key="index" @click="sortListSelect(item)">
                            {{ item.text }}
                        </div>
                    </div>
                    <span slot="reference"><el-button class="add_staff_btn" type="primary" size="small">新增待入职员工 <el-icon class="el-icon-arrow-down"></el-icon></el-button></span>
                </el-popover>
                <el-button size="small" @click="goRouter('/entryManagementSetup')">通用设置</el-button>
            </div>
      </template>
    </HeadLine>

    <!-- 状态组件 -->
    <StaffType :active="queryForm.key" :freshen.sync="StaffType_freshen" @selectActive="selectActive" /> 

    <!-- 表格查询项 -->
    <div class="query-form">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline" size="small">
        <el-form-item label="">
          <el-input
            v-model="queryForm.we_name"
            placeholder="姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="queryForm.we_mobile"
            placeholder="手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="queryForm.we_email"
            placeholder="邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            size="small"
            readonly
            v-model="queryListWidget.name"
            placeholder="部门"
            @focus="dialogListWidget(queryListWidget.name, true, 'move_department')"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <MoreInput
            :i_item="{type: 'position_widget'}"
            v-model="queryForm.position_id"
            placeholder="岗位"
          />
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="queryForm.work_type" placeholder="工作性质">
            <el-option v-for="(item, key) in work_type_options" :key="key" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
           <el-date-picker
            v-model="start_end_time"
            type="daterange"
            value-format="yyyy-MM-dd"
            @change="start_end_time_change"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <div class="query-r-btn">
          <el-button size="small" @click="reset">重置</el-button>
          <el-button size="small" type="primary" @click="search">查询</el-button>
        </div>
      </el-form>
    </div>

    <!-- 待入职 表格 -->
    <el-table
    v-if="this.queryForm.type === '1'"
    :data="tableData"
    v-loading="tableLoading"
    :max-height="$el_table_max_height(56,126,query_form_height,96)"
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
        <el-table-column prop="we_name" align="center" label="姓名">
          <template slot-scope="scope">
            <div class="tabel_we_name" @click="goRouter('/entryManagementInfo', scope.row.id)">{{ scope.row.we_name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="we_mobile" align="center" label="手机号码"></el-table-column>
        <el-table-column prop="we_email" align="center" label="邮箱"></el-table-column>
        <el-table-column prop="entry_time_desc" align="center" label="计划入职时间"></el-table-column>
        <el-table-column prop="register_status_desc" align="center" label="资料登记状态"></el-table-column>
        <el-table-column prop="department" align="center" label="部门">
          <template slot-scope="scope">
              {{ scope.row.department.name }}
          </template>
        </el-table-column>
        <el-table-column prop="position_title" align="center" label="岗位"></el-table-column>
        <el-table-column prop="rank" align="center" label="职级">
          <template slot-scope="scope">
            <div class="table_rank">
              <span class="table_rank_no">{{scope.row.rank.rank_no}}</span>
              <span>{{scope.row.rank.title}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="work_type_desc" align="center" label="工作性质"></el-table-column>
        <el-table-column prop="id" align="center" label="操作" width="400px">
          <template slot-scope="scope">
            <div>
              <el-button type="text" size="small" @click="tableItemEdit(scope.row, '资料审核')" v-if="scope.row.register_status=='2'">资料审核</el-button>
              <el-button type="text" size="small" @click="tableItemEdit(scope.row, '入职')">入职</el-button>
              <el-button type="text" size="small" @click="tableItemEdit(scope.row, '邀请补充资料')">邀请补充资料</el-button>
              <el-button type="text" size="small" @click="tableItemEdit(scope.row, '调整入职时间')">调整入职时间</el-button>
              <el-button type="text" size="small" @click="tableItemEdit(scope.row, '取消入职')">取消入职</el-button>
            </div>
          </template>
        </el-table-column>
    </el-table>

    <!-- 取消入职 表格 -->
    <el-table
    v-if="this.queryForm.type === '2'"
    :data="tableData"
    v-loading="tableLoading"
    :max-height="$el_table_max_height(56,126,query_form_height,96)"
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
        <el-table-column prop="we_name" align="center" label="姓名">
          <template slot-scope="scope">
            <div class="tabel_we_name" @click="goRouter('/entryManagementInfo', scope.row.id)">{{ scope.row.we_name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="we_mobile" align="center" label="手机号码"></el-table-column>
        <el-table-column prop="we_email" align="center" label="邮箱"></el-table-column>
        <el-table-column prop="entry_time_desc" align="center" label="计划入职时间"></el-table-column>
        <el-table-column prop="cancel_entry_time_desc" align="center" label="取消入职时间"></el-table-column>
        <el-table-column prop="cancel_remarks" align="center" label="取消入职原因"></el-table-column>
        <el-table-column prop="register_status_desc" align="center" label="资料登记状态"></el-table-column>
        <el-table-column prop="department" align="center" label="部门">
          <template slot-scope="scope">
              {{ scope.row.department.name }}
          </template>
        </el-table-column>
        <el-table-column prop="position_title" align="center" label="岗位"></el-table-column>
        <el-table-column prop="rank" align="center" label="职级">
          <template slot-scope="scope">
            <div class="table_rank">
              <span class="table_rank_no">{{scope.row.rank.rank_no}}</span>
              <span>{{scope.row.rank.title}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="work_type_desc" align="center" label="工作性质"></el-table-column>
        <el-table-column prop="id" align="center" label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="text" size="small" @click="tableItemEdit(scope.row, '重新录用')">重新录用</el-button>
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

    <!-- 入职弹层 -->
    <el-dialog
      class="dialog"
      title="办理入职"
      width="1080px"
      :visible.sync="addFormDialog"
      destroy-on-close
    >
      <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="120px" size="small">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="姓名：" prop="we_name">
                  <span>{{ addForm.we_name }}</span>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="工号：" prop="workno">
                  <el-input v-model="addForm.workno" placeholder="请输入工号"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="手机号：" prop="we_mobile">
                  <el-input v-model="addForm.we_mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="邮箱：" prop="we_email">
                  <el-input v-model="addForm.we_email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="微信：" prop="we_weixinid">
                  <el-input v-model="addForm.we_weixinid" placeholder="请输入微信号"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="员工账号：" prop="we_userid">
                  <el-input v-model="addForm.we_userid" placeholder="请输入员工账号"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="部门：" prop="we_department">
                  <MoreInput
                    :i_item="{
                      type: 'department_widget',
                      form_item_type: '部门',
                      form_item_radio: false,
                      v_model_type: 'String',
                      widget_ids:addForm.we_department,
                    }"
                    :v-model.sync="addForm.we_department" 
                  />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="主部门：" prop="master_we_department">
                  <MoreInput
                    :i_item="{
                      type: 'department_widget',
                      form_item_type: '部门',
                      form_item_radio: true,
                      v_model_type: 'String',
                      widget_ids:addForm.master_we_department,
                    }"
                    :v-model.sync="addForm.master_we_department"
                  />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="岗位：" prop="position_id">
                  <MoreInput
                    :i_item="{type: 'position_widget'}"
                    v-model="addForm.position_id"
                    @change="positionSelectChange"
                  />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="职级：" prop="rank_id">
                  <MoreInput
                    :i_item="{type: 'rankLevel_widget'}"
                    :disabled="!addForm.position_id || addForm.position_id===''"
                    :position_id="position_id"
                    v-model="addForm.rank_id"
                  />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="入职日期：" prop="entry_time">
                  <el-date-picker type="date" placeholder="请选择入职日期" v-model="addForm.entry_time" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="转正日期：" prop="positive_time">
                    <el-date-picker type="date" placeholder="请选择计划转正日期" v-model="addForm.positive_time" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="用工类型：" prop="type">
                    <el-select v-model="addForm.type" placeholder="请选择用工类型" style="width: 100%;">
                      <el-option v-for="item in work_type_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="编制：" prop="is_formal">
                    <el-select v-model="addForm.is_formal" placeholder="请选择编制" style="width: 100%;">
                      <el-option v-for="item in is_formalOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="社保增员月：" prop="name">
                  <el-select v-model="addForm.plan_social_security_incr_month" style="width: 100%;" placeholder="请选择社保增员月">
                    <el-option v-for="item in 12" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-form-item label="资料登记状态：" prop="is_register_pass">
                  <span style="margin-right: 16px;">{{addForm.register_status_desc}}</span>
                  <el-checkbox v-if="addForm.register_status=='2'" v-model="addForm.is_register_pass">通过审核</el-checkbox>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-form-item label="" prop="we_invite" label-width="0px">
            <el-checkbox v-if="Isshowinvitation" v-model="addForm.we_invite">邀请加入企业微信</el-checkbox>
          </el-form-item>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="addFormDialog = false">取消</el-button>
        <el-button size="small" type="primary" v-debounce @click="submitForm('addForm')">确定入职</el-button>
      </div>
    </el-dialog>

    <!-- 调整入职时间 -->
    <el-dialog
      class="dialog"
      title="调整入职时间"
      width="480px"
      :visible.sync="adjustTheTimeOfEntryDialog"
      destroy-on-close
    >
      <el-form :model="adjustTheTimeOfEntryData" :rules="adjustTheTimeOfEntryDataRules" ref="adjustTheTimeOfEntryData" label-width="120px" size="small">
        <el-row :gutter="20">
            <el-col :span="24">
                <el-form-item label="姓名：" prop="we_name">
                  <span>{{adjustTheTimeOfEntryData.we_name}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-form-item label="原定入职日期：" prop="entry_time_desc">
                  <span>{{adjustTheTimeOfEntryData.entry_time_desc}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-form-item label="入职日期：" prop="entry_time">
                  <el-date-picker type="date" placeholder="请选择入职日期" v-model="adjustTheTimeOfEntryData.entry_time" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-form-item label="调整原因：" prop="remarks">
                  <el-input type="textarea" v-model="adjustTheTimeOfEntryData.remarks" placeholder="请输入调整原因" maxlength="200" :autosize="{ minRows: 4, maxRows: 4}"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="adjustTheTimeOfEntryDialog = false">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('adjustTheTimeOfEntryData')">保存</el-button>
      </div>
    </el-dialog>

    <!-- 取消入职 -->
    <el-dialog
      class="dialog"
      title="取消入职"
      width="480px"
      :visible.sync="cancellationOfEntryDialog"
      destroy-on-close
    >
      <el-form :model="cancellationOfEntryData" :rules="cancellationOfEntryDataRules" ref="cancellationOfEntryData" label-width="130px" size="small">
        <el-row :gutter="20">
            <el-col :span="24">
                <el-form-item label="姓名：" prop="we_name">
                  <span>{{cancellationOfEntryData.we_name}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-form-item label="原定入职日期：" prop="entry_time_desc">
                  <span>{{cancellationOfEntryData.entry_time_desc}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-form-item label="取消入职原因：" prop="remarks">
                  <el-input type="textarea" v-model="cancellationOfEntryData.remarks" placeholder="请输入取消入职原因" maxlength="200" :autosize="{ minRows: 4, maxRows: 4}"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancellationOfEntryDialog = false">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('cancellationOfEntryData')">保存</el-button>
      </div>
    </el-dialog>

    <!-- 修改 主/子负责人弹层 -->
    <ListWidget :tabType="listWidgetTabType" :emitType="listWidgetEmitType" :selects="listWidgetSelects" :radio="listWidgetRadio" :visible="listWidgetShow" @ackSelect="ackSelect" @listWidgetHide="listWidgetHide" />
  </div>
</template>

<script> 
import { inductionList, inductionAdjustTimee, inductionCancel, inductionDetails, inductionEntry } from "@/api/hrm/entryManagement";
import { isshowinvitation } from "@/api/hrm/staff/addStaff";
import StaffType from "@/components/hrm/entryManagement/StaffType";

export default {
  name: "entryManagement",
  components: { StaffType },
  data() {
    return {
      query_form_height: 0,
      // 页头tab
      tabList: [{title: "待入职"}, {title: "取消入职"}],
      tabActive: '待入职',
      // 查询入参
      queryForm: {
        key: 'wait_enrty_num',
        type: '1',
        we_name: '',
        we_mobile: '',
        we_email: '',
        master_we_department: '',
        position_id: '',
        work_type: '',
        start_time: '',
        end_time: '',
        page: 1,
        size: 10,
      },
      start_end_time: [],
      // 编制 可选项
      is_formalOptions: [
        {label: '非正式编制', value: '0'},
        {label: '正式编制', value: '1'},
      ],
      work_type_options: [
        {label:'全职', value:'1'},
        {label:'兼职', value:'2'},
        {label:'实习生', value:'3'},
        {label:'劳务派遣', value:'4'},
        {label:'劳务外包', value:'5'},
        {label:'小时工', value:'6'},
        {label:'临时工', value:'7'},
      ],
      // 查询条件 弹层获取的主/子负责人 展示文本信息
      queryListWidget: {
        name: "",
      },
      // 排序项数据
      sortList: [{text:"自助登记", path:'/addEntryManagement'}, {text:"手动录入", path:'/manuallyEntryManagement'}],
      
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

      // 办理入职 相关
      Isshowinvitation: false,
      addForm: { 
        id: '',
        we_mobile: '',
        we_department: [],
        master_we_department: [],
        position_id: '',
        entry_time: '',
        positive_time: '',
        type: '',
        workno: '',
        we_email: '',
        plan_social_security_incr_month: '',
        we_weixinid: '',
        we_userid: '',
        rank_id: '',
        is_register_pass: false,
        we_invite: false,
      },
      addFormDialog: false,
      position_id: '',
      addRules: {
        we_mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        we_email: [{ type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }],
        we_userid: [{ required: true, message: "请输入员工账号", trigger: "blur" }],
        we_department: [{ required: true, message: "请选择部门", trigger: "change" }],
        master_we_department: [{ required: true, message: "请选择主部门", trigger: "change" }],
        position_id: [{ required: true, message: "请选择岗位", trigger: "change" }],
        entry_time: [{ required: true, message: "请选择入职时间", trigger: "change" }],
        positive_time: [{ required: true, message: "请选择转正时间", trigger: "change" }],
        type: [{ required: true, message: "请选择用工类型", trigger: "change" }],
        is_formal: [{ required: true, message: "请选择编制", trigger: "change" }],
      },
      // 调整入职时间 相关
      adjustTheTimeOfEntryData: {
        id: '',
        entry_time: '',
        remarks: '',
      },
      adjustTheTimeOfEntryDataRules: {
        entry_time: [{ required: true, message: "请选择入职时间", trigger: "change" }],
        remarks: [{ required: true, message: "请输入调整原因", trigger: "blur" }],
      },
      adjustTheTimeOfEntryDialog: false,
      // 取消入职 相关
      cancellationOfEntryData: {
        id: '',
        remarks: '',
      },
      cancellationOfEntryDataRules: {
        remarks: [{ required: true, message: "请输入取消入职原因", trigger: "blur" }],
      },
      cancellationOfEntryDialog: false,
      StaffType_freshen: false,
    };
  },
  created() {
    this.queryForm.we_mobile = this.$route.query.we_mobile?this.$route.query.we_mobile:'';
    this.getInductionList();
  },
  mounted() {
    this.query_form_height = document.querySelector(".query-form").offsetHeight;
  },
  methods: {
    // 获取表格数据
    getInductionList(){
      this.tableLoading = true;
      inductionList(this.queryForm).then(res=> {
        this.tableData = res.data.list ? res.data.list : [];
        this.tableDataTotal = res.data.count*1;
      }).finally((e)=> {
        this.tableLoading = false;
      })
    },
    // 分页
    getTabelList(){
      this.getInductionList();
    },
    // 重置
    reset() {
      this.resetQueryForm();
      this.search();
    },
    // 重置 查询条件数据
    resetQueryForm(key) {
      if(this.queryForm.type === '1') {
        this.queryForm = {
          key: key,
          type: '1',
          we_name: '',
          we_mobile: '',
          we_email: '',
          master_we_department: '',
          position_id: '',
          work_type: '',
          start_time: '',
          end_time: '',
          page: 1,
          size: 10,
        }
      }else{
        this.queryForm = {
          key: '',
          type: '2',
          we_name: '',
          we_mobile: '',
          we_email: '',
          master_we_department: '',
          position_id: '',
          work_type: '',
          start_time: '',
          end_time: '',
          page: 1,
          size: 10,
        }
      }
      this.start_end_time = [];
      this.queryListWidget.name = "";
    },
    // 计划入职开始/结束时间
    start_end_time_change(val) {
      if(val && val.length>0) {
        this.queryForm.start_time = val[0];
        this.queryForm.end_time = val[1];
      }else{
        this.queryForm.start_time = '';
        this.queryForm.end_time = '';
      }
    },
    // 查询
    search() {
      this.queryForm.page = 1;
      this.getInductionList()
    },
    // 表格项操作
    async tableItemEdit(item, type) {
      if(type === '资料审核') {
        this.$router.push({path:'/theEnrollmentOfEntryPC', query:{id:item.id, type:'informationAudition'}})
      }else if(type === '入职') {
        await isshowinvitation().then(res => {
          this.Isshowinvitation =  res.data.Isshowinvitation;
        })
        this.getInductionDetails(item.id);
      }else if(type === '邀请补充资料') {
        this.$router.push({path:'/addEntryManagement', query:{id:item.id, type:'invitationForAdditionalInformation'}});
      }else if(type === '调整入职时间') {
        this.adjustTheTimeOfEntryData = {
          id: item.id,
          entry_time_desc: item.entry_time_desc,
          we_name: item.we_name,
          entry_time: '',
          remarks: '',
        };
        this.adjustTheTimeOfEntryDialog = true;
      }else if(type === '取消入职') {
        this.cancellationOfEntryData = {
          id: item.id,
          entry_time_desc: item.entry_time_desc,
          we_name: item.we_name,
          remarks: '',
        }
        this.cancellationOfEntryDialog = true;
      }else if(type === '重新录用') {
        this.$router.push({path:'/manuallyEntryManagement', query:{id:item.id}});
      }
    },
    // 入职人员信息获取（手动、重复录用、办理入职）使用
    getInductionDetails(id) {
      inductionDetails({id}).then(res => {
          if(res.errno === 0) {
              this.addForm = Object.assign(this.addForm, res.data);
              this.addForm.is_register_pass = res.data.register_status==='2';
              this.addFormDialog = true;
          }else{
              this.$message({
                  showClose: true,
                  message: res.errmsg,
                  type: 'error'
              });
          }
      }).catch((error) => {
          this.$message({
              showClose: true,
              message: error.errmsg,
              type: 'error'
          });
      })
    },
    // 入职/调整入职时间/取消入职 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(formName === 'adjustTheTimeOfEntryData') {
            inductionAdjustTimee(this.adjustTheTimeOfEntryData).then(res => {
                if(res.errno === 0) {
                    this.$message({
                        showClose: true,
                        message: res.errmsg,
                        type: 'success'
                    });
                    this.reset();
                    this.adjustTheTimeOfEntryDialog = false;
                    this.StaffType_freshen = true;
                }else{
                    this.$message({
                        showClose: true,
                        message: res.errmsg,
                        type: 'error'
                    });
                }
            }).catch((error) => {
                this.$message({
                    showClose: true,
                    message: error.errmsg,
                    type: 'error'
                });
            })
          }else if(formName === 'cancellationOfEntryData') {
            inductionCancel(this.cancellationOfEntryData).then(res => {
                if(res.errno === 0) {
                    this.$message({
                        showClose: true,
                        message: res.errmsg,
                        type: 'success'
                    });
                    this.reset();
                    this.cancellationOfEntryDialog = false;
                    this.StaffType_freshen = true;
                }else{
                    this.$message({
                        showClose: true,
                        message: res.errmsg,
                        type: 'error'
                    });
                }
            }).catch((error) => {
                this.$message({
                    showClose: true,
                    message: error.errmsg,
                    type: 'error'
                });
            })
          }else if(formName === 'addForm') {
            let data = JSON.parse(JSON.stringify(this.addForm));
            if(data.we_department&&Array.isArray(data.we_department)) data.we_department = data.we_department.map(i=>i.id).join(",");
            if(data.master_we_department&&Array.isArray(data.master_we_department)) data.master_we_department = data.master_we_department.map(i=>i.id).join(",");
            inductionEntry(data).then(res => {
                if(res.errno === 0) {
                    this.$message({
                        showClose: true,
                        message: res.errmsg,
                        type: 'success'
                    });
                    this.reset();
                    this.addFormDialog = false;
                    this.StaffType_freshen = true;
                }else{
                    this.$message({
                        showClose: true,
                        message: res.errmsg,
                        type: 'error'
                    });
                }
            }).catch((error) => {
                this.$message({
                    showClose: true,
                    message: error.errmsg,
                    type: 'error'
                });
            })
          }
        } else {
          return false;
        }
      });
    },
    // 切换页头 tab
    tabClick(item) {
      let tab_type = item === '待入职' ? '1' : '2';
      if(tab_type !== this.queryForm.type && tab_type === '1') {
        this.queryForm.type = tab_type;
        this.queryForm.key = 'wait_enrty_num';
      }else if(tab_type !== this.queryForm.type && tab_type === '2'){
        this.queryForm.type = tab_type;
        this.queryForm.key = '';
      }
      this.resetQueryForm();
      this.search();
      this.tabActive = item;
    },
    // 顶部横向tab 切换
    selectActive({key}) {
      this.queryForm.key = key;
      this.tabActive = '待入职';
      this.queryForm.type = '1';
      this.resetQueryForm(key);
      this.search();
    },
    // 员工信息修改 岗位选框触发
    positionSelectChange(val) {
        this.addForm.rank_id = '';
        this.position_id = val;
    },
    // 排序切换
    sortListSelect(item) {
      this.goRouter(item.path);
    },
    // 部门 弹层
    dialogListWidget(data, radio = false, emitType) {
      this.listWidgetSelects = [];
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
      this.queryForm.master_we_department = selects.map(i => i.id).join(",");
    },
    // 部门弹层 隐藏
    listWidgetHide(visible){
      this.listWidgetShow = visible;
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
.btn-margin-letf {margin-left: 10px;}

.staff-type {
    width: 100%;
    padding: 12px 24px 16px;
    .staff-type-list {
        width: 100%;
        height: 98px;
        background: #F5F5F5;
        border-radius: 4px;
        overflow: hidden;
        display: flex;
        padding: 12px;
        user-select: none;
        .item, .item-active, .divide {
            width: 112px;
            height: 74px;
            min-width: 112px;
            min-height: 74px;
            padding: 8px 8px 8px 12px;
            border-radius: 4px;
            background: #fff;
            cursor: pointer;
            .top {
                font-weight: 400;
                font-size: 12px;
                color: #595959;
                display: flex;
                justify-content: space-between;
            }
            .bottom {
                font-size: 28px;
                font-family: DIN-Medium, DIN;
                font-weight: 500;
                color: #1F1F1F;
            }
        }
        .item {
            border: 1px solid #fff;
        }
        .item-active {
            border: 1px solid #1AAC88;
            .top, .bottom { color: #1AAC88;}
        }
        .divide {
            margin-left: 24px;
        }
        .divide::before{
            content: "";
            width: 1px;
            height: 50px;
            border: 1px solid #D9D9D9;
        }
        .item+.item, .item+.item-active, .item-active+.item{
            margin-left: 12px;
        }
    }
    .staff-type-list:hover{
        overflow-x: auto;
    }
}

.tabel_we_name {
  cursor: pointer;
}
.tabel_we_name:hover {
  color: #1AAC88;
}

.add_staff_btn {
  display: inline-block;
}

.table_rank {
  display: flex;
  align-items: center;
  .table_rank_no {
    background: rgba(26,172,136,0.08);
    border-radius: 2px;
    padding: 1px 4px;
    margin-right: 8px;
  }
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

.dialog {
  /deep/.el-form-item__label {
    display: block !important;
  }
  /deep/.el-form-item__content {
    display: block !important;
  }
  .btns {
    /deep/.el-button {
      display: inline-block !important;
    }
  }
}

/deep/.el-tabs__header {
    padding: 0 24px;
    background: #F9F9FA;
}

/deep/.el-tabs__content {
    padding: 0 24px 56px;
}

</style>

<style lang="less">
    .el-popover .sort-list .sort-item {
        width: 158px;
        height: 32px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #434343;
        line-height: 32px;
        background: #fff;
        cursor: pointer;
    }
    .el-popover .sort-list .sort-item:hover {
        background: rgba(26,172,136,0.09);
    }
    .main-color {
        color: #1AAC88 !important;
    }

/* 编辑信息弹层里的部门选择弹层 半透明黑色背景冲突 */
.v-modal {
    z-index: 2000 !important;
}
</style>