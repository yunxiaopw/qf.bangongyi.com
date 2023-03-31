<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine>
        员工花名册
        <template #r-content>
            <div class="t-r-btn">
                <Tolead />
                <el-button class="btn-margin-letf" size="small" @click="educe" disabled>导出</el-button>
                <el-button size="small" @click="sync" disabled>同步</el-button>
                <el-button size="small" type="primary" @click="goRouter('/addStaff')">新增员工</el-button>
            </div>
      </template>
    </HeadLine>

    <!-- 状态组件 -->
    <StaffType @selectActive="selectActive" />

    <!-- 表格查询项 -->
    <div class="query-form">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline">
        <el-form-item label="">
          <el-input
            size="small"
            v-model="queryForm.work_no"
            placeholder="工号"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            size="small"
            v-model="queryForm.we_name"
            placeholder="姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            size="small"
            readonly
            v-model="queryListWidget.name"
            placeholder="部门"
            @focus="dialogListWidget(queryListWidget.name, false, 'move_department')"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button size="small" @click="drawer = true">高级筛选</el-button>
        </el-form-item>
        <el-form-item label="">
          <div class="query-r-btn">
            <el-button size="small" @click="reset">重置</el-button>
            <el-button size="small" type="primary" @click="search">查询</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div class="query-r-btn">
        <el-popover
        placement="bottom"
        trigger="hover"
        >
            <div class="sort-list">
                <div :class="item.key === queryForm.order ? 'sort-item main-color' : 'sort-item' " v-for="item in sortList" :key="item.key" @click="sortListSelect(item.key)">
                    {{ item.text }}
                </div>
            </div>
            <span slot="reference"><el-button size="small">排序 <el-icon class="el-icon-arrow-down"></el-icon></el-button></span>
        </el-popover>
      </div>
    </div>

    <!-- 表格 -->
    <el-table
    :data="tableData"
    v-loading="tableLoading"
    style="width: 100%"
    :max-height="$el_table_max_height(56,126,48,96)"
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
        <el-table-column prop="we_name" label="姓名">
          <template slot-scope="scope">
            <div class="tabel_we_name" @click="goRouter('/staffInfo', scope.row.id)">{{ scope.row.we_name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="workno" label="工号"></el-table-column>
        <el-table-column prop="we_userid" label="账号"></el-table-column>
        <el-table-column prop="we_department" label="部门"></el-table-column>
        <el-table-column prop="P_title" label="岗位"></el-table-column>
        <el-table-column prop="RL_title" label="职级">
          <template slot-scope="scope">
            <div class="table_rank">
              <span class="table_rank_no">{{scope.row.rank_no}}</span>
              <span class="table_RL_title">{{scope.row.RL_title}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="工作性质"></el-table-column>
        <el-table-column prop="status" label="人事状态"></el-table-column>
        <el-table-column prop="entry_time" label="入职时间"></el-table-column>
        <el-table-column prop="we_mobile" label="手机号码"></el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <pagination
    v-show="tableDataTotal>0"
    :total="tableDataTotal"
    :page.sync="queryForm.page"
    :limit.sync="queryForm.size"
    @pagination="getTabelList"
    />

    <!-- 右侧抽屉 -->
    <el-drawer
    title="高级筛选"
    :visible.sync="drawer"
    class="demo-drawer"
    ref="drawer"
    >
      <div class="demo-drawer__content">
          <el-tabs v-model="activeName">
              <el-tab-pane label="岗位信息" name="first">
                  <el-form label-position="top" :model="queryForm" size="small">
                      <el-form-item label="岗位：" :label-width="formLabelWidth">
                        <MoreInput
                            :i_item="{type: 'position_widget'}"
                            v-model="queryForm.position"
                            placeholder="请选择岗位"
                            clearable
                        />
                      </el-form-item>
                      <el-form-item label="职级：" :label-width="formLabelWidth">
                          <el-select style="width: 100%" v-model="queryForm.rank_title" placeholder="请选择职级" clearable>
                            <el-option-group v-for="group in rank_titleOptions" :key="group.id" :label="group.title">
                              <el-option v-for="item in group.levels" :key="item.id" :label="item.rank_no+' '+item.title" :value="item.id"></el-option>
                            </el-option-group>
                          </el-select>
                      </el-form-item>
                      <el-form-item label="员工账号：" :label-width="formLabelWidth">
                          <el-input v-model="queryForm.we_userid" autocomplete="off" placeholder="请输入员工账号" clearable></el-input>
                      </el-form-item>
                      <el-form-item label="考勤编号：" :label-width="formLabelWidth">
                          <el-input v-model="queryForm.check_id" autocomplete="off" placeholder="请输入考勤编号" clearable></el-input>
                      </el-form-item>
                      <el-form-item label="用工类型：" :label-width="formLabelWidth">
                          <el-select style="width: 100%" v-model="queryForm.type" placeholder="请选择用工类型">
                              <el-option v-for="(item, key) in typeOptions" :key="key" :label="item" :value="key"></el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item label="人事状态：" :label-width="formLabelWidth">
                          <el-select style="width: 100%" v-model="queryForm.status" placeholder="请选择人事状态">
                              <el-option v-for="(item, key) in statusOptions" :key="key" :label="item" :value="key"></el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item label="编制：" :label-width="formLabelWidth">
                          <el-select style="width: 100%" v-model="queryForm.authorized" placeholder="请选择编制" clearable>
                              <el-option v-for="item in authorizedOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item label="工作电话：" :label-width="formLabelWidth">
                          <el-input v-model="queryForm.we_mobile" autocomplete="off" placeholder="请输入工作电话" clearable></el-input>
                      </el-form-item>
                      <el-form-item label="工作地址：" :label-width="formLabelWidth">
                          <el-input v-model="queryForm.address" autocomplete="off" placeholder="请输入工作地址" clearable></el-input>
                      </el-form-item>
                      <el-form-item label="入/离职日期：" :label-width="formLabelWidth">
                          <el-date-picker
                          style="width: 100%"
                          v-model="queryForm.entryQuiteTime"
                          value-format="yyyy-MM-dd"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="入职日期"
                          end-placeholder="离职日期"
                          @change="entryQuiteTimeChange">
                          </el-date-picker>
                      </el-form-item>
                      <el-form-item label="正式转正时间：" :label-width="formLabelWidth">
                        <el-date-picker
                          style="width: 100%"
                          v-model="queryForm.positive_time"
                          type="date"
                          placeholder="请选择正式转正时间"
                          value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-form-item>
                      <el-form-item label="归属公司：" :label-width="formLabelWidth">
                          <el-input v-model="queryForm.belong_company" autocomplete="off" placeholder="请输入归属公司" clearable></el-input>
                      </el-form-item>
                      <el-form-item label="直接上级：" :label-width="formLabelWidth">
                          <el-input v-model="queryForm.lead_id" autocomplete="off" placeholder="请输入直接上级" clearable></el-input>
                      </el-form-item>
                      <el-form-item label="合同期限：" :label-width="formLabelWidth">
                          <el-date-picker
                          style="width: 100%"
                          v-model="queryForm.now_contract_end_date"
                          value-format="yyyy-MM-dd"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
                          </el-date-picker>
                      </el-form-item>
                  </el-form>
              </el-tab-pane>

              <!-- 个人信息 -->
              <el-tab-pane label="个人信息" name="second">
                  <el-form label-position="top" :model="queryForm" size="small">
                      <el-form-item label="性别：" :label-width="formLabelWidth">
                          <el-select style="width: 100%" v-model="queryForm.we_gender" placeholder="请选择性别" clearable>
                              <el-option v-for="item in we_genderOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item label="英文名：" :label-width="formLabelWidth">
                        <el-input v-model="queryForm.english_name" autocomplete="off" placeholder="请输入英文名" clearable></el-input>
                      </el-form-item>
                      <el-form-item label="民族：" :label-width="formLabelWidth">
                        <el-select style="width: 100%" v-model="queryForm.nationality" placeholder="请选择民族" clearable>
                          <el-option v-for="(item, key) in nationalityOptions" :key="key" :label="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="出生日期：" :label-width="formLabelWidth">
                        <el-date-picker
                          style="width: 100%"
                          v-model="queryForm.birthday_g"
                          type="date"
                          placeholder="请选择出生日期"
                          value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-form-item>
                      <el-form-item label="籍贯：" :label-width="formLabelWidth">
                        <MoreInput
                          :i_item="{type: 'area_widget'}"
                          v-model="queryForm.residence_place_id"
                          placeholder="请选择籍贯"
                          clearable
                        />
                      </el-form-item>
                      <el-form-item label="户口性质：" :label-width="formLabelWidth">
                          <el-select style="width: 100%" v-model="queryForm.account_type" placeholder="请选择户口性质" clearable>
                              <el-option v-for="(item, key) in account_typeOptions" :key="key" :label="item" :value="item"></el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item label="证件号：" :label-width="formLabelWidth">
                        <el-input v-model="queryForm.idcode" autocomplete="off" placeholder="请输入证件号" clearable></el-input>
                      </el-form-item>
                      <el-form-item label="政治面貌：" :label-width="formLabelWidth">
                          <el-select style="width: 100%" v-model="queryForm.political_state" placeholder="请选择政治面貌" clearable>
                              <el-option v-for="(item, key) in political_stateOptions" :key="key" :label="item" :value="item"></el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item label="最高学历：" :label-width="formLabelWidth">
                          <el-select style="width: 100%" v-model="queryForm.highest_education" placeholder="请选择最高学历" clearable>
                              <el-option v-for="(item, key) in highest_educationOptions" :key="key" :label="item" :value="key"></el-option>
                          </el-select>
                      </el-form-item>
                  </el-form>
              </el-tab-pane>
          </el-tabs>
          
          <div class="demo-drawer__footer">
              <el-button size="small" type="primary" @click="handleClose">确 定</el-button>
              <el-button size="small" @click="resed">重 置</el-button>
          </div>
      </div>
    </el-drawer>

    <!-- 修改 主/子负责人弹层 -->
    <ListWidget :tabType="listWidgetTabType" :emitType="listWidgetEmitType" :selects="listWidgetSelects" :radio="listWidgetRadio" :visible="listWidgetShow" @ackSelect="ackSelect" @listWidgetHide="listWidgetHide" />
  </div>
</template>

<script>
import StaffType from "@/components/hrm/staff/StaffType";
import { staffList, widgetOptions, widgetRank, positionType, widgetArea } from "@/api/hrm/staff/index";

export default {
  name: "staff",
  components: { StaffType },
  data() {
    return {
      // 查询入参
      queryForm: {
        work_no: '',
        we_name: '',
        we_ids: '',
        order: '',
        position: '',
        rank_title: '',
        we_userid: '',
        check_id: '',
        type: '',
        status: '-1',
        authorized: '',
        we_tel: '',
        address: '',
        entry_time: '',
        quite_time: '',
        positive_time: '',
        belong_company: '',
        lead_id: '',
        now_contract_end_date: '',
        we_gender: '',
        english_name: '',
        nationality: '',
        birthday_g: '',
        residence_place_id: '',
        account_type: '',
        idcode: '',
        political_state: '',
        highest_education: '',
        page: 1,
        size: 10,
      },
      // 岗位 可选项
      positionOptions: [],
      positionProps: {
        label: 'title',
        children: 'child'
      },
      // 职级 可选项
      rank_titleOptions: [],
      // 用工类型 可选项
      typeOptions: [],
      // 人事状态 可选项
      statusOptions: [],
      // 编制 可选项
      authorizedOptions: [
        {label: '正式编制', value: '1'},
        {label: '非正式编制', value: '2'},
      ],
      // 性别 可选项
      we_genderOptions: [
        {label: '男', value: '1'},
        {label: '女', value: '2'},
      ],
      // 民族 可选项
      nationalityOptions: [],
      // 籍贯 可选项
      residence_place_idOptions: [],
      // 户口性质 可选项
      account_typeOptions: [],
      // 政治面貌 可选项
      political_stateOptions: [],
      // 最高学历 可选项
      highest_educationOptions: [],
      // 查询条件 弹层获取的主/子负责人 展示文本信息
      queryListWidget: {
        name: "",
      },
      // 排序项数据
      sortList: [{text: "入职日期正序", key: '1'}, {text: "入职日期倒序", key: '2'}, {text: "工号正序", key: '3'}, {text: "工号倒序", key: '4'}],
      //   抽屉相关
      drawer: false,
      activeName: "first",
      formLabelWidth: '180px',
      timer: null,
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
    };
  },
  async created() {
    this.getWidgetOptions();
    this.getPositionType();
    this.getWidgetRank();
    this.hetWidgetArea();
    this.getDisableList();
  },
  methods: {
    // 获取 所有下拉框选项的数据 合集
    getWidgetOptions() {
      widgetOptions().then(res => {
        let { staff_type, staff_status, household_type, politicalState, nationality, highest_education } = res.data;
        
        this.typeOptions = staff_type;
        this.statusOptions = staff_status;
        this.account_typeOptions = household_type;
        this.political_stateOptions = politicalState;
        this.nationalityOptions = nationality;
        this.highest_educationOptions = highest_education;
      })
    },
    // 获取岗位词典类别
    getPositionType() {
        positionType().then(res => {
            this.positionOptions = JSON.parse(JSON.stringify([res.data]));
        })
    },
    // 获取职级可选数据
    getWidgetRank() {
        widgetRank().then(res => {
            this.rank_titleOptions = res.data;
        })
    },
    // 获取籍贯可选数据
    hetWidgetArea() {
      widgetArea().then(res => {
        this.residence_place_idOptions = res.data;
      })
    },
    // 获取表格数据
    getDisableList(){
      this.tableLoading = true;
      staffList(this.queryForm).then(res=> {
        this.tableData = res.data.list ? res.data.list : [];
        this.tableDataTotal = res.data.count*1;
      }).finally((e)=> {
        this.tableLoading = false;
      })
    },
    // 分页
    getTabelList(){
      this.getDisableList();
    },
    // 查询
    search() {
      this.queryForm.page = 1;
      this.getDisableList()
    },
    // 重置
    reset() {
      this.queryFormInit();
      this.search();
    },
    // 顶部横向tab 切换
    selectActive({key, value}) {
      this.queryFormInit();
      this.queryForm.status = '';
      this.queryForm.type = '';
      // if(value !== '-1') {
        this.queryForm[key] = value;
      // }
      this.search();
    },
    // 初始化 高级筛选中的筛选项
    queryFormInit() {
      this.queryForm = {
        work_no: '',
        we_name: '',
        we_ids: '',
        order: '',
        position: '',
        rank_title: '',
        we_userid: '',
        check_id: '',
        type: '',
        status: '-1',
        authorized: '',
        we_tel: '',
        address: '',
        entry_time: '',
        quite_time: '',
        positive_time: '',
        belong_company: '',
        lead_id: '',
        now_contract_end_date: '',
        we_gender: '',
        english_name: '',
        nationality: '',
        birthday_g: '',
        residence_place_id: '',
        account_type: '',
        idcode: '',
        political_state: '',
        highest_education: '',
        page: 1,
        size: 10,
      }
      // 人员/部门 弹层选择项 内容置空
      this.queryListWidget.name = "";
    },
    // 入/离职时间选择
    entryQuiteTimeChange(val) {
      if(val !== null) {
        this.queryForm.entry_time = val[0];
        this.queryForm.quite_time = val[1];
      }else {
        this.queryForm.entry_time = '';
        this.queryForm.quite_time = '';
      }
    },
    // 导出
    educe(){},
    // 同步
    sync(){},
    // 排序切换
    sortListSelect(key) {
      // 两次选择相同 取消选中状态 执行按后台默认获取列表数据
      if(this.queryForm.order === key) {
        this.queryForm.order = '';
      } else {
        this.queryForm.order = key;
      }
      this.search();
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
      this.queryForm.we_ids = selects.map(i => i.id).join(",");
    },
    // 部门弹层 隐藏
    listWidgetHide(visible){
      this.listWidgetShow = visible;
    },
    // 抽屉 重置
    resed() {
      let newQueryForm = {
        position: '',
        rank_title: '',
        we_userid: '',
        check_id: '',
        type: '',
        status: '-1',
        authorized: '',
        we_tel: '',
        address: '',
        entry_time: '',
        quite_time: '',
        positive_time: '',
        belong_company: '',
        lead_id: '',
        now_contract_end_date: '',
        we_gender: '',
        english_name: '',
        nationality: '',
        birthday_g: '',
        residence_place_id: '',
        account_type: '',
        idcode: '',
        political_state: '',
        highest_education: '',
        page: 1,
        size: 10,
      }
      this.queryForm = {...this.queryForm, ...newQueryForm};
      this.drawer = false;
      this.search();
    },
    // 抽屉 确定
    handleClose() {
      this.drawer = false;
      this.search();
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


.query-form {
  height: 48px;
  padding: 0px 24px;
  display: flex;
  justify-content: space-between;
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

.query-r-btn {
  .el-button {
    display: inline-block !important;
  }
}

.tabel_we_name {
  cursor: pointer;
}
.tabel_we_name:hover {
  color: #1AAC88;
}

.demo-drawer {
    width: 100%;
    /deep/.el-drawer {
      background: #fff !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
    /deep/.el-drawer__header{
        padding: 12px 24px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #1F1F1F;
        margin-bottom: 0px;
    }
    /deep/.demo-drawer__footer {
        width: 100% !important;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 360px;
        height: 56px;
        background: #FFFFFF;
        border-top: 1px solid #F0F0F0;
        padding: 12px 24px;
        .el-button {
          display: inline-block;
        }
    }
}

.demo-drawer {
  /deep/.el-form-item__content {
    display: block !important;
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
</style>