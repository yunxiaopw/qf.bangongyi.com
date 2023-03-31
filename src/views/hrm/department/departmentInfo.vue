<template>
  <div class="main-box">
    <HeadLine goback>
      {{ basics.we_name }}
      <template #r-content>
        <div class="t-r-btn">
          <el-button size="small" type="primary" @click="blockUp">停用</el-button>
        </div>
      </template>
    </HeadLine>
    <div class="tabel-all">
      <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
        <!-- 基础信息 -->
        <el-tab-pane label="基础信息" name="basicInfo">
          <!-- 展示板 -->
          <div class="display-board" v-show="!isEdit">
              <div class="nth-1"> {{ basics.we_name }}
                <div class="pointer" @click="isEdit = true">
                  <img
                    src="../../../assets/svgs/u21.svg"
                    alt=""
                  />
                  <span>编辑</span>
                </div>
              </div>
              <div class="flex">
                <div>组织编码：<span>{{ basics.dept_no }}</span></div>
                <div>组织类型：<span>{{ basics.type }}</span></div>
              </div>
              <div class="flex">
                <div>负责人：<span>{{ basics.master }}</span></div>
                <div>次负责人：<span>{{ basics.leads }}</span></div>
              </div>
              <div class="flex">
                <div class="text-hidden">上级组织：<span class="text-hidden">{{ basics.deps }}</span></div>
                <div>下级组织：
                  <img
                    src="../../../assets/svgs/apartment.svg"
                    alt=""
                  />
                  <span class="check" @click="goRouter('/organizationChart', basics.we_id)">点击查看</span>
                </div>
              </div>
              <div class="row-50">
                <div>启用日期：<span>{{ basics.create_time }}</span></div>
              </div>
              <div class="row-50">
                <div>组织描述：</div>
                <div class="span">{{ basics.description }}</div>
              </div>
          </div>
          <!-- 编辑板 -->
          <div class="editorial-board" v-show="isEdit">
            <el-form :model="basics" :rules="basicsRules" ref="basicsForm" label-width="0px">
              <div class="nth-1">
                <el-form-item label="" prop="we_name">
                  <el-input v-model="basics.we_name" placeholder="请输入部门"></el-input>
                </el-form-item>
              </div>
              <div class="flex">
                <div>
                  <el-form-item label="" prop="dept_no">
                    <span class="label">组织编码：</span>
                    <el-input v-model="basics.dept_no" size="medium" placeholder="请输入组织编码"></el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="" prop="type">
                    <span class="label">组织类型：</span>
                    <el-select v-model="basics.type" size="medium" placeholder="请选择组织类型">
                      <el-option
                        v-for="(item, index) in organizationOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.label">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="flex">
                <div>
                  <el-form-item label="" prop="master">
                    <span class="label">负责人：</span>
                    <el-input readonly v-model="basics.master" size="medium" placeholder="请输入负责人" @focus="dialogListWidget(basics, true, 'basics_master')"></el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="" prop="leads">
                    <span class="label">次负责人：</span>
                    <el-input readonly v-model="basics.leads" size="medium" placeholder="请输入子负责人" @focus="dialogListWidget(basics, false, 'basics_lead')"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="flex">
                <div>
                  <el-form-item label="" prop="deps">
                    <span class="label">上级组织：</span>
                    <el-input readonly v-model="basics.deps" size="medium" placeholder="上级组织"></el-input>
                  </el-form-item>
                </div>
                <div>
                  <span class="label">下级组织：</span>
                  <img
                    src="../../../assets/svgs/u237.svg"
                    alt=""
                  />
                </div>
              </div>
              <div>
                <div>
                  <el-form-item label="" prop="create_date">
                    <span class="label">启用日期：</span>
                    <el-date-picker type="date" size="medium" value-format="yyyy-MM-dd" placeholder="启用日期" v-model="basics.create_time"></el-date-picker>
                  </el-form-item>
                </div>
              </div>
              <div class="row-50">
                <div>组织描述：</div>
                <el-form-item label="" prop="description">
                  <el-input v-model="basics.description" type="textarea" :rows="3" size="medium" placeholder="请输入组织描述"></el-input>
                </el-form-item>
              </div>
            </el-form>
            <div class="btns">
              <el-button size="small" type="primary" @click="keepDate('basicsForm')">保存</el-button>
              <el-button size="small" @click="isEdit = false">取消</el-button>
            </div>
          </div>
        </el-tab-pane>

        <!-- 直属员工 -->
        <el-tab-pane label="直属员工" name="directly">
          <div class="query-form">
            <el-form :inline="true" :model="queryForm" class="demo-form-inline">
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
                  v-model="queryForm.check_id"
                  placeholder="工号"
                ></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-input
                  size="small"
                  v-model="queryForm.position"
                  placeholder="岗位"
                ></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-select
                  size="small"
                  clearable
                  v-model="queryForm.type"
                  placeholder="工作性质"
                >
                  <el-option v-for="item in statusOptions" :key="item.value" :label="item.title" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="">
                <el-input
                  size="small"
                  v-model="queryForm.we_mobile"
                  placeholder="手机号码"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" @click="reset">重置</el-button>
                <el-button size="small" type="primary" @click="search">查询</el-button>
              </el-form-item>
            </el-form>
            <div class="query-r-btn">
              <el-button size="small" @click="dialogListWidget(multipleSelection, true, 'move_staff')">批量移动</el-button>
              <el-button size="small" @click="tolead" disabled>导出</el-button>
            </div>
          </div>
          <div style="padding: 0 24px">
            <el-table
              ref="multipleTable"
              border
              v-loading="tableLoading"
              :max-height="$el_table_max_height(56,96,86,96)"
              :data="tableData"
              style="width: 100%"
              @selection-change="handleSelectionChange"
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
              <el-table-column
                type="selection"
                align="center"
                width="50">
              </el-table-column>
              <el-table-column prop="we_name" align="center" label="姓名">
                <template slot-scope="scope">
                  <span style="color: #1aac88">{{ scope.row.we_name }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="check_id" align="center" label="工号"></el-table-column>
              <el-table-column prop="P_title" align="center" label="岗位"></el-table-column>
              <el-table-column prop="RL_title" align="center" label="职级">
                <template slot-scope="scope">
                  <span>{{ `${scope.row.rank_no} ${scope.row.RL_title}` }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="type" align="center" label="工作性质"></el-table-column>
              <el-table-column prop="we_mobile" align="center" label="手机号码"></el-table-column>
              <el-table-column prop="entry_time" align="center" label="入职时间"></el-table-column>
            </el-table>

            <pagination
              v-show="total>0"
              :total="total"
              :page.sync="queryForm.page"
              :limit.sync="queryForm.size"
              @pagination="getTabelList"
            />
          </div>
        </el-tab-pane>

        <!-- 全部员工 -->
        <el-tab-pane label="全部员工" name="all">
          <div class="query-form">
            <el-form :inline="true" :model="queryForm" class="demo-form-inline">
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
                  v-model="queryForm.check_id"
                  placeholder="工号"
                ></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-input
                  size="small"
                  v-model="queryForm.position"
                  placeholder="岗位"
                ></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-select
                  size="small"
                  clearable
                  v-model="queryForm.type"
                  placeholder="工作性质"
                >
                  <el-option v-for="item in statusOptions" :key="item.value" :label="item.title" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="">
                <el-input
                  size="small"
                  v-model="queryForm.we_mobile"
                  placeholder="手机号码"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" @click="reset">重置</el-button>
                <el-button size="small" type="primary" @click="search">查询</el-button>
              </el-form-item>
            </el-form>
            <div class="query-r-btn">
              <el-button size="small" @click="dialogListWidget(multipleSelection, true, 'move_staff')">批量移动</el-button>
              <el-button size="small" @click="tolead" disabled>导出</el-button>
            </div>
          </div>
          <div style="padding: 0 24px">
            <el-table
              ref="multipleTable"
              border
              v-loading="tableLoading"
              :max-height="$el_table_max_height(56,96,86,96)"
              :data="tableData"
              style="width: 100%"
              @selection-change="handleSelectionChange"
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
              <el-table-column
                type="selection"
                align="center"
                width="50">
              </el-table-column>
              <el-table-column prop="we_name" align="center" label="姓名">
                <template slot-scope="scope">
                  <span style="color: #1aac88">{{ scope.row.we_name }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="check_id" align="center" label="工号"></el-table-column>
              <el-table-column prop="we_department" align="center" label="子部门"></el-table-column>
              <el-table-column prop="P_title" align="center" label="岗位"></el-table-column>
              <el-table-column prop="RL_title" align="center" label="职级">
                <template slot-scope="scope">
                  <span>{{ `${scope.row.rank_no} ${scope.row.RL_title}` }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="type" align="center" label="工作性质"></el-table-column>
              <el-table-column prop="we_mobile" align="center" label="手机号码"></el-table-column>
              <el-table-column prop="entry_time" align="center" label="入职时间"></el-table-column>
            </el-table>

            <pagination
              v-show="total>0"
              :total="total"
              :page.sync="queryForm.page"
              :limit.sync="queryForm.size"
              @pagination="getTabelList"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 修改 主/子负责人 上级组织 员工批量移动 弹层 -->
    <ListWidget :tabType="listWidgetTabType" :emitType="listWidgetEmitType" :selects="listWidgetSelects" :radio="listWidgetRadio" :visible="listWidgetShow" @ackSelect="ackSelect" @listWidgetHide="listWidgetHide" />
  </div>
</template>
<script>
import { departmentInfo, departmentEdit, staff, staffMove, rankSetting, departmentStop } from "@/api/hrm/department";

export default {
  name: "departmentInfo",
  components: {},
  data() {
    return {
      we_id: null,
      activeName: "basicInfo",
      isEdit: false,
      // 组织信息编辑
      basics: {},
      basicsRules: {
        dept_no: [{ required: true, message: "请输入组织编号", trigger: "blur" }],
        we_name: [{ required: true, message: "请输入组织名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择组织类型", trigger: "change" }],
      },
      organizationOptions: [
        { label: "部门", },
        { label: "中心", },
        { label: "组", },
        { label: "事业部", },
        { label: "事业群", },
        { label: "办公室", },
        { label: "区域", },
        { label: "项目组", },
        { label: "子公司", },
        { label: "门店", },
        { label: "网点", },
        { label: "分支机构", },
      ],
      // 表格数据 查询条件
      queryForm: {
        we_name: "",
        check_id: "",
        position: "",
        type: "",
        we_mobile: "",
        page: 1,
        size: 15,
      },
      statusOptions:[],
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
      total: 0,
      // 树形选框数据
      treeData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      treeId: 1,
      moveForm: {
        type: "2",
      },
      // ListWidget 组件相关数据
      listWidgetShow: false,
      listWidgetRadio: false,
      listWidgetEmitType: "",
      listWidgetTabType: "",
      listWidgetSelects: [],
    };
  },
  created() {
    this.we_id = this.$route.query.id;
    if(this.$route.query.activeName) this.activeName = this.$route.query.activeName;
    this.getDepartmentTabInfos(this.activeName);
    this.getRankSetting();
  },
  methods: {
    // 根据 选中tab页  获取相应tab页所需的信息
    getDepartmentTabInfos(tab){
      if(tab === 'basicInfo'){
        // 基础信息
        departmentInfo({we_id: this.we_id}).then(res => {
          this.basics = res.data
        })
      }else if(tab === 'directly'){
        // 直属员工
        this.queryForm.we_id = this.we_id;
        this.queryForm.direct = "1";
        this.tableLoading = true;
        staff(this.queryForm).then(res => {
          this.tableData = res.data.list;
          this.tableLoading = false;
          this.total = res.data.count * 1;
        }).catch(error => {
          this.tableLoading = false;
        })
      }else if(tab === 'all'){
        // 全部员工
        this.queryForm.we_id = this.we_id;
        this.queryForm.direct = "0";
        this.tableLoading = true;
        staff(this.queryForm).then(res => {
          this.tableData = res.data.list;
          this.tableLoading = false;
          this.total = res.data.count * 1;
        }).catch(error => {
          this.tableLoading = false;
        })
      }
    },
    // 工作性质下拉项
    getRankSetting() {
      rankSetting().then(res => {
        this.statusOptions = res.data;
      })
    },
    // tab 分页切换
    getTabelList() {
      this.getDepartmentTabInfos(this.activeName);
    },
    // 停用
    blockUp() {
      let data = { we_id: this.we_id };
      departmentStop(data).then(res => {
        this.$message({
          showClose: true,
          message: res.errmsg,
          type: 'success'
        });
        if(res.errno === 0) this.$router.back();
      }).catch((error) => {
        this.$message({
          showClose: true,
          message: error.errmsg,
          type: 'error'
        });
      });
    },
    // 切换 tab
    handleClick({name}) {
      this.queryFormReset();
      this.getDepartmentTabInfos(name);
    },
    // 查询/修改 主/子负责人弹层
    async dialogListWidget(data, radio = false, emitType) {
      if(emitType === "basics_master") {
        // 编辑板 主负责人
        let we_names = data.master.split(',').filter(i=> i && i.trim());
        if(data.master_id > 0) { 
          this.listWidgetSelects = data.master_id.split(',').filter(i=> i && i.trim()).map((i, index) => (i = {id: i , we_name: we_names[index]}));
        }else{
          this.listWidgetSelects = [];
        }
        this.listWidgetTabType = "成员";
      }else if(emitType === "basics_lead"){
        // 编辑板 子负责人
        let we_names = data.leads.split(',').filter(i=> i && i.trim());
        this.listWidgetSelects = data.lead_ids.split(',').filter(i=> i && i.trim()).map((i, index) => (i = {id: i , we_name: we_names[index]}));
        this.listWidgetTabType = "成员";
      }else if(emitType === "move_staff") {
        // 员工批量移动部门
        if(data.length <= 0) {
          this.$message({
            showClose: true,
            message: '请选择要移动部门的员工',
            type: 'warning'
          });
          return false
        }else {
          this.listWidgetSelects = [];
          this.listWidgetTabType = "部门";
        }
      }
      this.listWidgetShow = true;
      this.listWidgetRadio = radio;
      this.listWidgetEmitType = emitType;
    },
    // 查询/修改 主/子负责人弹层 确定
    ackSelect(data) {
      let { emitType, visible, selects } = data;
      this.listWidgetShow = visible;
      this.listWidgetSelects = selects;
      if(emitType === "basics_master") {
        // 编辑板 主负责人
        this.basics.master = selects.map(i => i.we_name).join(",");
        this.basics.master_id = selects.map(i => i.id).join(",");
      }else if(emitType === "basics_lead") {
        // 编辑板 子负责人
        this.basics.leads = selects.map(i => i.we_name).join(",");
        this.basics.lead_ids = selects.map(i => i.id).join(",");
      }else if(emitType === "move_staff") {
        // 移动部门
        this.moveForm.to_we_id = selects.map(i => i.id).join(",");
        this.moveForm.staffids = this.multipleSelection.map(i => i.id);
        if(this.moveForm.to_we_id !== '') {
          staffMove(this.moveForm).then(res => {
            this.$message({
              showClose: true,
              message: res.errmsg,
              type: 'success'
            });
            this.reset();
          }).catch((error) => {
            this.$message({
              showClose: true,
              message: error.errmsg,
              type: 'error'
            });
          })
        }
      }
    },
    // 修改主/子负责人弹层 隐藏
    listWidgetHide(visible){
      this.listWidgetShow = visible;
    },
    // 编辑信息 保存
    keepDate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          departmentEdit(this.basics).then(res => {
            this.$message({
              showClose: true,
              message: res.errmsg,
              type: 'success'
            });
            this.getDepartmentTabInfos(this.activeName);
            this.isEdit = false;
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
    // 表格项选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 导出
    tolead() {},
    // 表格 条件查询
    search() {
      this.queryForm.page = 1;
      this.getDepartmentTabInfos(this.activeName);
    },
    // 表格 重置
    reset() {
      this.queryFormReset();
      this.getDepartmentTabInfos(this.activeName);
    },
    // 查询条件重置
    queryFormReset() {
      for (const key in this.queryForm) {
        this.queryForm[key] = "";
      }
      this.queryForm.page = 1;
      this.queryForm.size = 15;
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
.tabel-all{
  padding: 24px;
  // 展示板
  .display-board{
    display: grid;
    grid-template-columns: repeat(1, 100%);
    grid-gap: 20px 0px;
    font-size: 16px;
    color: #7F7F7F;
    font-weight: 400;
    font-family: PingFangSC-Medium, PingFang SC;
    .nth-1{
      width: 50%;
      display: flex;
      font-size: 19px;
      color: #555555;
      div{
        margin-left: 30px;
        span{
          font-size: 14px;
          color: #1AAC88;
        }
      }
    }
    .flex{
      display: flex;
      justify-content: space-between;
      div{
        width: 50%;
        span{
          color: #333333;
        }
        .check{
          font-size: 16px;
          color: #1AAC88;
          cursor: pointer;
        }
      }
    }
    .row-50{
      width: 50%;
      span,.span{
        color: #333333;
      }
    }
  }
  // 编辑版
  .editorial-board{
    display: grid;
    grid-template-columns: repeat(1, 100%);
    grid-gap: 20px 0px;
    font-size: 16px;
    color: #7F7F7F;
    font-weight: 400;
    font-family: PingFangSC-Medium, PingFang SC;
    .nth-1{
      width: 20%;
      display: flex;
      font-size: 19px;
      color: #555555;
    }
    .flex{
      display: flex;
      justify-content: space-between;
      div{
        width: 50%;
        .label{
          width: 80px;
          display: inline-block;
        }
        .check{
          font-size: 16px;
          color: #1AAC88;
          cursor: pointer;
        }
      }
    }
    .label{
      width: 80px;
      display: inline-block;
    }
    .row-50{
      width: 50%;
      span,.span{
        color: #333333;
      }
    }
    .btns{
      margin-top: 20px;
      text-align: center;
      .el-button {
          display: inline-block;
      }
    }
  }
}
.query-r-btn .el-button {
  display: inline-block;
}
.query-form {
  min-height: 67px;
  padding: 12px 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-form--inline .el-form-item {
    margin-right: 8px;
  }
  .query-r-btn {
    margin-left: auto;
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
    padding: 26px 24px 24px;
  }
  /deep/.el-dialog__footer {
    height: 52px;
    border-top: 1px solid #f0f0f0;
    padding: 10px 24px;
  }
}
</style>