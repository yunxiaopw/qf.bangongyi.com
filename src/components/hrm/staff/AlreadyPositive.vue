<template>
  <div>
    <!-- 表格查询项 -->
    <div class="query-form">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline" size="small">
        <el-form-item label="">
          <el-input
            v-model="queryForm.dept_no"
            placeholder="姓名/工号/手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
            <el-select v-model="queryForm.we_name" placeholder="转正审批状态">
                <el-option
                v-for="item in [{value: '111', label: '111',}]"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-input
            readonly
            v-model="queryListWidget.query_master.name"
            placeholder="部门"
            @focus="
              dialogListWidget(queryListWidget.query_master.name, true, 'move_department')
            "
          ></el-input>
        </el-form-item>
        <el-form-item label="">
            <el-select v-model="queryForm.we_name" placeholder="岗位">
                <el-option
                v-for="item in [{value: '111', label: '111',}]"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="queryForm.dept_no"
            placeholder="工作性质"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            v-model="queryForm.dept_no"
            type="date"
            placeholder="入职时间"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            v-model="queryForm.dept_no"
            type="date"
            placeholder="预计转正日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd">
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
      <el-table-column prop="we_name" header-align="center" label="工号"></el-table-column>
      <el-table-column prop="we_name1" header-align="center" label="姓名"></el-table-column>
      <el-table-column prop="we_name2" header-align="center" label="人事状态"></el-table-column>
      <el-table-column prop="we_name3" header-align="center" label="转正审批"></el-table-column>
      <el-table-column prop="we_name4" header-align="center" label="审批单号"></el-table-column>
      <el-table-column prop="we_name5" header-align="center" label="部门"></el-table-column>
      <el-table-column prop="we_name6" header-align="center" label="岗位"></el-table-column>
      <el-table-column prop="we_name7" header-align="center" label="职级"></el-table-column>
      <el-table-column prop="we_name8" header-align="center" label="工作性质"></el-table-column>
      <el-table-column prop="we_name9" header-align="center" label="入职时间"></el-table-column>
      <el-table-column prop="we_name10" header-align="center" label="计划转正日期"></el-table-column>
      <el-table-column prop="we_name11" header-align="center" label="手机号码"></el-table-column>
      <el-table-column prop="we_name12" header-align="center" label="操作">
        <template slot-scope="scope">
            <div>
                {{ scope.row.we_name12 }}
            </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <pagination
      v-show="tableDataTotal > 0"
      :total="tableDataTotal"
      :page.sync="queryForm.page"
      :limit.sync="queryForm.page_size"
      @pagination="getTabelList"
    />

    <!-- 修改 主/子负责人弹层 -->
    <ListWidget :tabType="listWidgetTabType" :emitType="listWidgetEmitType" :selects="listWidgetSelects" :radio="listWidgetRadio" :visible="listWidgetShow" @ackSelect="ackSelect" @listWidgetHide="listWidgetHide" />
  </div>
</template>

<script>
export default {
  name: "AlreadyPositive",
  props: {},
  data () {
    return {
        // 查询入参
      queryForm: {
        page: 1,
        page_size: 15,
      },
      tableLoading: false,
      tableData: [],
      tableDataTotal: 30,
      // 查询条件 弹层获取的主/子负责人 展示文本信息
      queryListWidget: {
        query_master: {
          name: "",
          id: "",
        },
      },
      // ListWidget 组件相关数据
      listWidgetShow: false,
      listWidgetRadio: false,
      listWidgetEmitType: "",
      listWidgetTabType: "",
      listWidgetSelects: [],
    }
  },
  created () {
    this.getTabelList();
  },
  methods: {
    // 获取部门表格数据
    getTabelList(){
      this.tableLoading = true;
    //   departmentList(this.queryForm).then((res) => {
    //       this.tableData = res.data
    //       this.tableLoading = false
    //   }).catch((e)=> {
    //     this.tableLoading = false
    //   })
    },
    // 查询
    search() {
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
            page: 1,
            page_size: 15,
        },
      // 主/子负责人 弹层选择项 内容置空
      this.queryListWidget.query_master.name = "";
      this.queryListWidget.query_master.id = "";
    },
    // 查询/修改 主/子负责人弹层
    async dialogListWidget(data, radio = false, emitType) {
      if(emitType === "query_master") {
        // 查询条件 主/子负责人
        let we_names = data.name.split(',').filter(i=> i && i.trim());
        this.listWidgetSelects = data.id.split(',').filter(i=> i && i.trim()).map((i, index) => (i = {id: i , we_name: we_names[index]}));
        this.listWidgetTabType = "成员";
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
      if(emitType === "query_master") {
        // 查询条件 主负责人
        this.queryListWidget.query_master.name = selects.map(i => i.we_name).join(",");
        this.queryListWidget.query_master.id = selects.map(i => i.id).join(",");
        this.queryForm.master_id = this.queryListWidget.query_master.id;
      }
    },
    // 修改主/子负责人弹层 隐藏
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
}
</script>
<style scoped lang="less">
.query-form {
  display: flex;
  justify-content: space-between;
}
.query-r-btn {
  float: right;
  margin:0 10px 18px 0;
  display: flex;
  align-items: center;
  .el-button + .el-button {
    margin-left: 8px;
  }
}
</style>
