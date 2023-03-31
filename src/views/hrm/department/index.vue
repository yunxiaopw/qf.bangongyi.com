<template>
  <div class="main-box">
    <HeadLine>
      组织管理
      <template #r-content>
        <div class="t-r-btn">
          <Tolead />
          <!-- <el-button size="small" @click="tolead">导入</el-button> -->
          <el-button size="small" @click="educe" disabled>导出</el-button>
          <el-button size="small" @click="goRouter('/deactivatedTissue')" >已停用组织</el-button>
        </div>
      </template>
    </HeadLine>

    <NumWarning
      :warningInfo="warningInfoList"
      @viewDetails="viewDetails"
    ></NumWarning>

    <div class="query-form">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline">
        <el-form-item label="">
          <el-input
            size="small"
            v-model="queryForm.dept_no"
            placeholder="请输入组织编码"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            size="small"
            v-model="queryForm.we_name"
            placeholder="请输入部门名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            size="small"
            readonly
            v-model="queryListWidget.query_master.name"
            placeholder="请选择负责人"
            @focus="dialogListWidget(queryListWidget.query_master, true, 'query_master')"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            size="small"
            readonly
            v-model="queryListWidget.query_lead.name"
            @focus="dialogListWidget(queryListWidget.query_lead, true, 'query_lead')"
            placeholder="请选择次负责人"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="query-r-btn">
        <el-button size="small" @click="reset">重置</el-button>
        <el-button size="small" type="primary" @click="search()">查询</el-button>
      </div>
    </div>

    <el-table
      ref="pointMultipleTable"
      :data="tableData"
      style="width: 100%"
      :max-height="$el_table_max_height(56,81,67)"
      border
      v-loading="tableLoading"
      :expand-row-keys="expends"
      @cell-mouse-enter="mouseEnterTable"
      @cell-mouse-leave="mouseLeaveTable"
      :header-cell-style="{
        padding: '0',
        background: '#FAFAFA',
        color: '#8C8C8C',
        fontSize: '12px',
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        fontWeight: '500',
      }"
      row-key="we_id"
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="date" fixed label="组织机构" width="550px">
        <template slot-scope="scope">
          <span
            v-if="scope.$index === 0 && isTopLogo"
            class="company-icon"
            style="margin-left: 5px"
          ></span>
          <span
            :style="
              scope.$index === 0  && isTopLogo
                ? {
                    marginLeft: '4px',
                    fontSize: '16px',
                    fontWeight: '500',
                  }
                : { marginLeft: '0px' }
            "
            @click="goRouter('/departmentInfo', scope.row.we_id)"
            class="pointer name_hover"
            >{{ scope.row.we_name }}</span
          >
          <span
            class="button-all"
            v-show="scope.row.we_id === hoverTd.id"
          >
            <el-button type="text" @click="dialogAll('addChildren', scope.row)"
              >新增下级</el-button
            >
            <el-button
              type="text"
              @click="dialogAll('addChildren', scope.row, true)"
              >编辑</el-button
            >
            <el-button v-if="(scope.$index > 0  || !isTopLogo)" type="text" @click="dialogListWidget(scope.row, true, 'move_department')">移动</el-button>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="dept_no" label="组织编码"> </el-table-column>
      <el-table-column prop="type" label="组织类型"> </el-table-column>
      <el-table-column prop="master">
        <template slot="header">
          <span>负责人</span>
          <el-tooltip
            class="item"
            effect="dark"
            content="主负责人具有该部门审批权限，只能设置一个。"
            placement="top"
          >
            <span class="question"></span>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <span>{{ scope.row.master }}</span>
          <i
            v-show="scope.row.we_id === hoverTd.id"
            class="el-icon-edit pointer hover-icon"
            @click="dialogListWidget(scope.row, true, 'table_master')"
          ></i>
        </template>
      </el-table-column>
      <el-table-column prop="leads">
        <template slot="header">
          <span>次负责人</span>
          <el-tooltip
            class="item"
            effect="dark"
            content="具有查看各应用部门报表、编辑部门员工排班权限；不具备部门负责人审批权限。可设置多个。"
            placement="top"
          >
            <span class="question"></span>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <div class="text-hidden f-centet">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.leads"
              placement="top-end"
            >
              <div class="text-hidden pointer">{{ scope.row.leads }}</div>
            </el-tooltip>
            <i
              v-show="scope.row.we_id === hoverTd.id"
              class="el-icon-edit pointer hover-icon"
              @click="dialogListWidget(scope.row, false, 'table_lead')"
            ></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="员工数量">
        <template slot-scope="scope">
          <span class="pointer name_hover" @click="goRouter('/departmentInfo', scope.row.we_id, 'all')">{{scope.row.count}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="架构图" align="center">
        <template slot-scope="scope">
          <div>
            <img
              class="pointer"
              src="../../../assets/svgs/apartment.svg"
              alt=""
              @click="goRouter('/organizationChart', scope.row.we_id)"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增下级/修改本级 弹层 -->
    <el-dialog
      class="dialog"
      :title="addChildrenTitle"
      width="480px"
      :visible.sync="addChildrenDialog"
      destroy-on-close
    >
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addForm"
        label-width="100px"
        class="demo-addForm"
      >
        <el-form-item label="组织编码：" prop="dept_no">
          <el-input size="small" v-model="addForm.dept_no" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="组织名称：" prop="we_name">
          <el-input size="small" v-model="addForm.we_name" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="组织类型：" prop="type">
          <el-select
            size="small"
            v-model="addForm.type"
            placeholder="请选择组织类型"
          >
            <el-option v-for="(item, index) in addFormTypes" :key="index" :label="item.label" :value="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组织描述：" prop="description">
          <el-input
            size="small"
            type="textarea"
            v-model="addForm.description"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="addChildrenDialog = false"
          >取消</el-button
        >
        <el-button size="small" type="primary" @click="submitForm('addForm')"
          >保存</el-button
        >
      </div>
    </el-dialog>

    <!-- 修改 主/子负责人弹层 -->
    <ListWidget :tabType="listWidgetTabType" :emitType="listWidgetEmitType" :selects="listWidgetSelects" :radio="listWidgetRadio" :visible="listWidgetShow" @ackSelect="ackSelect" @listWidgetHide="listWidgetHide" />
  </div>
</template>
<script>
import NumWarning from "@/components/hrm/department/NumWarning.vue";
import { leaderCensus, departmentList, departmentChild, departmentInfo, createChild, departmentEdit, departmentMove, departmentExport } from "@/api/hrm/department";
export default {
  name: "department",
  components: { NumWarning },
  data() {
    return {
      isTopLogo: true,
      warningInfoList: {},
      queryForm: {
        master_id: "",
        lead_id: "",
        dept_no: "",
        we_name: "",
      },
      // 查询条件 弹层获取的主/子负责人 展示文本信息
      queryListWidget: {
        query_master: {
          name: "",
          id: "",
        },
        query_lead: {
          name: "",
          id: ""
        },
      },
      tableData: [],
      tableLoading: false,
      hoverTd: {
        id: null,
      },
      expends: [],
      // 弹层
      addChildrenDialog: false,
      addChildrenTitle: "",
      addForm: {
        dept_no: "",
        we_name: "",
        type: "",
        description: "",
      },
      addRules: {
        we_name: [{ required: true, message: "请输入组织名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择组织类型", trigger: "change" }],
      },
      addFormTypes: [
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
      // 移动部门 query
      moveForm: {
        we_id: "",
        to_we_id: "",
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
    this.getLeaderCensus();
    this.getDepartmentList('tree');
  },
  methods: {
    // 获取无负责人数据
    getLeaderCensus(){
      leaderCensus().then(res => {
        this.warningInfoList = res.data
      })
    },
    // 获取部门表格数据
    getDepartmentList(type){
      this.tableLoading = true;

      // 是否为树形 
      if(type === 'tree') {
        departmentChild({}).then((res) => {
            this.getDepartmentChild(res.data)
        }).catch((e)=> {
          this.tableLoading = false
        })
      }else{
        departmentList(this.queryForm).then((res) => {
            this.tableData = res.data
            this.tableLoading = false
        }).catch((e)=> {
          this.tableLoading = false
        })
      }
    },
    // 获取列表子级
    async getDepartmentChild(parentData, spreadAll){
      if(spreadAll === 'spreadAll'){
        // let datas = await this.setChildrens(parentData[0].we_id)
        // return datas
      }else{
        departmentChild({we_id: parentData[0].we_id}).then(res => {
          if(res.data){
            parentData[0].children = res.data.map(i => {
              if(i.children){ i.hasChildren = true }
              return i
            })
            this.tableData = parentData
            this.expends.push(this.tableData[0].we_id)
            this.deleteTableTreeLazy();
            this.tableLoading = false
          }
        })
      }
    },
    // 手动处理table 树结构 懒加载的缓存数据不自动清除问题
    deleteTableTreeLazy() {
      // lazyTreeNodeMap和treeData都是固定值
      this.$set(this.$refs["pointMultipleTable"].store.states, "lazyTreeNodeMap", {});
      this.$set(this.$refs["pointMultipleTable"].store.states, "treeData", {});
    },
    // 没有负责人 查看详情
    viewDetails(key) {
      this.queryForm.master_id = "";
      this.queryForm.lead_id = "";
      this.queryListWidget.query_master.name = "";
      this.queryListWidget.query_master.id = "";
      this.queryListWidget.query_lead.name = "";
      this.queryListWidget.query_lead.id = "";
      this.queryForm[key] = "-1";
      this.search('noDeletViewDetails');
    },
    // 查询
    search(noDeletViewDetails = null) {
      // 判断表格是否为树形
      let isTree = Object.values(this.queryForm).every(i => i === "") ? 'tree' : null;
      this.isTopLogo = isTree === 'tree' ? true : false;
      // 常规搜索不携带部门没有负责人的查询条件
      if(noDeletViewDetails === null && this.queryForm.master_id === '-1') {
        this.queryForm.master_id = "";
      }else if(noDeletViewDetails === null && this.queryForm.lead_id === '-1') {
        this.queryForm.lead_id = "";
      }
      this.getDepartmentList(isTree)
    },
    // 重置
    reset() {
      this.resetQueryForm();
      this.search();
    },
    // 重置 查询条件数据
    resetQueryForm() {
      for (const key in this.queryForm) {
        this.queryForm[key] = "";
      }
      // 主/子负责人 弹层选择项 内容置空
      this.queryListWidget.query_master.name = "";
      this.queryListWidget.query_master.id = "";
      this.queryListWidget.query_lead.name = "";
      this.queryListWidget.query_lead.id = "";
    },
    // 鼠标移入
    mouseEnterTable(row) {
      this.hoverTd.id = row.we_id;
    },
    // 鼠标移出
    mouseLeaveTable() {
      this.hoverTd.id = null;
    },
    // 懒加载 获取子结构数据
    load(tree, treeNode, resolve){
      departmentChild({we_id: tree.we_id}).then(res => {
        if(res.data){
          res.data.map(i => {
            if(i.children){ i.hasChildren = true }
            return i
          })
          resolve(res.data)
        }
      })
    },
    // 导入
    tolead() {},
    // 导出
    educe() {
      departmentExport().then(res => {
        // 用返回二进制数据创建一个Blob实例          
        let blob = new Blob([res], {            
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 
        }) // for .xlsx files          

        // 通过URL.createObjectURL生成文件路径          
        let url = window.URL.createObjectURL(blob)          

        // 创建a标签          
        let ele = document.createElement("a")          
        ele.style.display = 'none'          

        // 设置href属性为文件路径，download属性可以设置文件名称          
        ele.href = url          
        ele.download = "测试文件"          

        // 将a标签添加到页面并模拟点击          
        document.querySelectorAll("body")[0].appendChild(ele)          
        ele.click()          

        // 移除a标签          
        ele.remove()   
      })
    },
    // 弹窗显示
    async dialogAll(dialog, row, isUpdate = false) {
      if (isUpdate) {
        await this.getDepartmentInfo(row.we_id);
        this.addChildrenTitle = "编辑本级";
        this[dialog + "Dialog"] = true;
      } else {
        this.resetAddForm();
        this.addForm.we_parentid = row.we_id;
        this.addChildrenTitle = "新增下级";
        this[dialog + "Dialog"] = true;
      }
    },
    // 部门详情
    async getDepartmentInfo(id){
      await departmentInfo({we_id: id}).then(res => {
        this.addForm = res.data
      })
    },
    // 重置新增/修改弹层表单数据
    resetAddForm() {
      this.addForm = {
        dept_no: "",
        we_name: "",
        type: "",
        description: "",
      }
    },
    // 新增下级/修改本级 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.addChildrenTitle === "新增下级"){
            createChild(this.addForm).then(res => {
              this.$message({
                showClose: true,
                message: res.errmsg,
                type: 'success'
              });
              this.resetQueryForm();
              this.search();
              this.addChildrenDialog = false;
            }).catch((error) => {
              this.$message({
                showClose: true,
                message: error.errmsg,
                type: 'error'
              });
            })
          }else if(this.addChildrenTitle === "编辑本级"){
            departmentEdit(this.addForm).then(res => {
              this.$message({
                showClose: true,
                message: res.errmsg,
                type: 'success'
              });
              this.resetQueryForm();
              this.search();
              this.addChildrenDialog = false;
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
    // 查询/修改 主/子负责人弹层
    async dialogListWidget(data, radio = false, emitType) {
      if(emitType === "query_master" || emitType === "query_lead") {
        // 查询条件 主/子负责人
        let we_names = data.name.split(',').filter(i=> i && i.trim());
        this.listWidgetSelects = data.id.split(',').filter(i=> i && i.trim()).map((i, index) => (i = {id: i , we_name: we_names[index]}));
        this.listWidgetTabType = "成员";
      }else if(emitType === "table_master"){
        // 表格修改 主负责人
        await this.getDepartmentInfo(data.we_id);
        let we_names = data.master.split(',').filter(i=> i && i.trim());
        if(data.master_id > 0) { 
          this.listWidgetSelects = data.master_id.split(',').filter(i=> i && i.trim()).map((i, index) => (i = {id: i , we_name: we_names[index]}));
        }else{
          this.listWidgetSelects = [];
        }
        this.listWidgetTabType = "成员";
      }else if(emitType === "table_lead") {
        // 表格修改 子负责人
        await this.getDepartmentInfo(data.we_id);
        let we_names = data.leads.split(',').filter(i=> i && i.trim());
        this.listWidgetSelects = data.lead_ids.split(',').filter(i=> i && i.trim()).map((i, index) => (i = {id: i , we_name: we_names[index]}));
        this.listWidgetTabType = "成员";
      }else if(emitType === "move_department") {
        // 移动部门
        this.listWidgetSelects = [];
        this.moveForm.we_id = data.we_id;
        this.listWidgetTabType = "部门";
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
      }else if(emitType === "query_lead") {
        // 查询条件 子负责人
        this.queryListWidget.query_lead.name = selects.map(i => i.we_name).join(",");
        this.queryListWidget.query_lead.id = selects.map(i => i.id).join(",");
        this.queryForm.lead_id = this.queryListWidget.query_lead.id;
      }else if(emitType === "table_master") {
        // 表格修改 主负责人
        this.addForm.master_id = selects.map(i => i.id).join(",");
        departmentEdit(this.addForm).then(res => {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          });
          this.resetQueryForm();
          this.search();
          this.addChildrenDialog = false;
        }).catch((error) => {
          this.$message({
            showClose: true,
            message: error.errmsg,
            type: 'error'
          });
        })
      }else if(emitType === "table_lead") {
        // 表格修改 子负责人
        this.addForm.lead_ids = selects.map(i => i.id).join(",");
        departmentEdit(this.addForm).then(res => {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          });
          this.resetQueryForm();
          this.search();
          this.addChildrenDialog = false;
        }).catch((error) => {
          this.$message({
            showClose: true,
            message: error.errmsg,
            type: 'error'
          });
        })
      }else if(emitType === "move_department") {
        // 移动部门
        this.moveForm.to_we_id = selects.map(i => i.id).join(",");
        if(this.moveForm.to_we_id !== '') {
          departmentMove(this.moveForm).then(res => {
            this.$message({
              showClose: true,
              message: res.errmsg,
              type: 'success'
            });
            this.resetQueryForm();
            this.search();
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
    // 路由页面跳转
    goRouter(path, id = null, activeName = null) {
      if (id !== null) {
        if(activeName !== null) this.$router.push({ path, query: { id, activeName } });
        else this.$router.push({ path, query: { id } });
      }else{
        this.$router.push({ path });
      }
    },
  },
};
</script>
<style lang='less' scoped>
.query-form {
  height: 67px;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  .el-form--inline .el-form-item {
    margin-right: 8px;
  }
}
.t-r-btn .el-button {
  margin-left: 8px;
}
.query-r-btn {
  display: flex;
  align-items: center;
  .el-button + .el-button {
    margin-left: 8px;
  }
}
.el-table /deep/.el-table__cell {
  padding: 0;
  height: 44px;
}
.company-icon {
  width: 18px;
  height: 18px;
  display: inline-block;
  vertical-align: text-bottom;
  background: url(../../../assets/svgs/company.svg);
}

.question {
  width: 12px;
  height: 12px;
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 2px;
  cursor: pointer;
  background: url(../../../assets/svgs/question.svg);
}
.hover-icon {
  color: #1aac88;
}

.f-centet {
  display: flex;
  align-items: center;
  .hover-icon {
    margin-left: 6px;
  }
}

.button-all {
  margin-left: 24px;
  .el-button + .el-button {
    margin-left: 16px;
  }
}

// 表格样式
.el-table {
  font-size: 14px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #1f1f1f;
  /deep/.el-table__expand-icon {
    .el-icon-arrow-right:before {
      content: "\e791";
    }
  }
}
/deep/.el-table--border .el-table__cell{
  border-right: none;
}
.name_hover:hover {
  color: #1aac88;
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