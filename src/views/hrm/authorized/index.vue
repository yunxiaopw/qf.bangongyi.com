<template>
   <div class="main-box">
    <HeadLine>
      编制管理
      <template #r-content>
        <el-button size="small" @click="dialogAll('general')">通用设置</el-button>
      </template>
    </HeadLine>

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
        <el-form-item>
          <el-button size="small" @click="reset">重置</el-button>
          <el-button size="small" type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="query-r-btn">
        <el-button size="small" @click="tolead" disabled>导入</el-button>
        <el-button size="small" @click="tolead" disabled>导出</el-button>
      </div>
    </div>
     
    <el-table
      ref="pointMultipleTable"
      :data="tableData"
      v-loading="tableLoading"
      :max-height="$el_table_max_height(56,67)"
      border
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
      <el-table-column
        prop="we_name"
        header-align="center"
        fixed
        width="550px"
        label="组织">
          <template slot-scope="scope">
            <span
              :style="
                scope.$index === 0 && isTopLogo
                  ? {
                      marginLeft: '4px',
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#1F1F1F',
                    }
                  : { marginLeft: '0px' }
              "
              class="pointer"
              >{{ scope.row.we_name }}</span
            >
            <span class="button-all" v-show="scope.row.we_id === hoverTd.id">
              <el-button type="text" @click="goRouter('/modifyCompile', scope.row.we_id)">修改编制</el-button>
            </span>
          </template>
      </el-table-column>
      
      <el-table-column header-align="center" prop="dept_no" label="组织编码" width="175px"></el-table-column>

      <el-table-column header-align="center" label="总编制-正式编">
        <el-table-column
          prop="formal_num_all"
          align="center"
          label="编制数量">
        </el-table-column>
        <el-table-column
          prop="_formal_num_all"
          align="center"
          label="在职人数">
          <template slot-scope="scope">
            <div @click="dialogAll('servingOfficer', scope.row, 'formal_staff_all', '总编制_正式编')" :class="scope.row.we_id === hoverTd.id ? 'hover-pointer' : 'pointer'">
              {{ scope.row._formal_num_all }}
              <span class="red" v-if="scope.row.diff_formal_num_all < 0">缺</span>
              <span class="green" v-else-if="scope.row.diff_formal_num_all > 0">超</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="diff_formal_num_all"
          align="center"
          width="100px"
          label="缺编/超编数量">
          <template slot-scope="scope">
            <span>{{ setDiffNum(scope.row.diff_formal_num_all) }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column header-align="center" label="总编制-非正式编">
        <el-table-column
          prop="informal_num_all"
          align="center"
          label="编制数量">
        </el-table-column>
        <el-table-column
          prop="_informal_num_all"
          align="center"
          label="在职人数">
          <template slot-scope="scope">
            <div @click="dialogAll('servingOfficer', scope.row, '_informal_num_all', '总编制_非正式编')" :class="scope.row.we_id === hoverTd.id ? 'hover-pointer' : 'pointer'">
              {{ scope.row._informal_num_all }}
              <span class="red" v-if="scope.row.diff_informal_num_all < 0">缺</span>
              <span class="green" v-else-if="scope.row.diff_informal_num_all > 0">超</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="diff_informal_num_all"
          align="center"
          width="100px"
          label="缺编/超编数量">
          <template slot-scope="scope">
            <span>{{ setDiffNum(scope.row.diff_informal_num_all) }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column header-align="center" label="总编制-岗位编制">
        <el-table-column
          prop="deficit_position_num_all"
          align="center"
          label="缺编岗位">
          <template slot-scope="scope">
            <div @click="dialogAll('vacancyPosition', scope.row, 'position_all', '总编制_缺编岗位')" :class="scope.row.we_id === hoverTd.id ? 'hover-pointer' : 'pointer'">
              {{ scope.row.deficit_position_num_all }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="overflow_position_num_all"
          align="center"
          label="超编岗位">
          <template slot-scope="scope">
            <div @click="dialogAll('vacancyPosition', scope.row, 'position_all', '总编制_超编岗位')" :class="scope.row.we_id === hoverTd.id ? 'hover-pointer' : 'pointer'">
              {{ scope.row.overflow_position_num_all }}
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column header-align="center" label="直属编制-正式编">
        <el-table-column
          prop="formal_num"
          align="center"
          label="编制数量">
        </el-table-column>
        <el-table-column
          prop="_formal_num"
          align="center"
          label="在职人数">
          <template slot-scope="scope">
            <div @click="dialogAll('servingOfficer', scope.row, 'formal_staff', '直属编制_正式编')" :class="scope.row.we_id === hoverTd.id ? 'hover-pointer' : 'pointer'">
              {{ scope.row._formal_num }}
              <span class="red" v-if="scope.row.diff_formal_num < 0">缺</span>
              <span class="green" v-else-if="scope.row.diff_formal_num > 0">超</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="diff_formal_num"
          align="center"
          width="100px"
          label="缺编/超编数量">
          <template slot-scope="scope">
            <span>{{ setDiffNum(scope.row.diff_formal_num) }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column header-align="center" label="直属编制-非正式编">
        <el-table-column
          prop="informal_num"
          align="center"
          label="编制数量">
        </el-table-column>
        <el-table-column
          prop="_informal_num"
          align="center"
          label="在职人数">
          <template slot-scope="scope">
            <div @click="dialogAll('servingOfficer', scope.row, 'informal_staff', '直属编制_非正式编')" :class="scope.row.we_id === hoverTd.id ? 'hover-pointer' : 'pointer'">
              {{ scope.row._informal_num }}
              <span class="red" v-if="scope.row.diff_informal_num < 0">缺</span>
              <span class="green" v-else-if="scope.row.diff_informal_num > 0">超</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="diff_informal_num"
          align="center"
          width="100px"
          label="缺编/超编数量">
          <template slot-scope="scope">
            <span>{{ setDiffNum(scope.row.diff_informal_num) }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column header-align="center" label="直属编制-岗位编制">
        <el-table-column
          prop="deficit_position_num"
          align="center"
          label="缺编岗位">
          <template slot-scope="scope">
            <div @click="dialogAll('vacancyPosition', scope.row, 'position', '直属编制_缺编岗位')" :class="scope.row.we_id === hoverTd.id ? 'hover-pointer' : 'pointer'">
              {{ scope.row.deficit_position_num }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="overflow_position_num"
          align="center"
          label="超编岗位">
          <template slot-scope="scope">
            <div @click="dialogAll('vacancyPosition', scope.row, 'position', '直属编制_超编岗位')" :class="scope.row.we_id === hoverTd.id ? 'hover-pointer' : 'pointer'">
              {{ scope.row.overflow_position_num }}
            </div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>

    <!-- 通用设置弹层 -->
    <el-dialog
      class="dialog"
      title="通用设置"
      width="720px"
      :visible.sync="generalDialog"
      destroy-on-close
    >
      <el-form
        :model="generalForm"
      >
        <div class="title"><span></span>不同员工编制类型：</div>
        <el-form-item label="全职：">
          <el-radio-group value="1">
            <el-radio label="1">正式编制</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="兼职/外包/小时工/临时工：">
          <el-radio-group value="1">
            <el-radio label="1">非正式编制</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="实习：">
          <el-radio-group v-model="generalForm.authorized">
            <el-radio label="0">正式编制</el-radio>
            <el-radio label="1">非正式编制</el-radio>
            <el-radio label="2">办理入职时手动选择</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="generalDialog = false"
          >取消</el-button
        >
        <el-button size="small" type="primary" @click="setGrading"
          >保存</el-button
        >
      </div>
    </el-dialog>

    <!-- 在职人员弹层 -->
    <el-dialog
      class="dialog"
      title="在职人员"
      width="1080px"
      :visible.sync="servingOfficerDialog"
      destroy-on-close
    >
      <div class="table-title">
        <div>部门：{{ servingOfficer_vacancyPosition_dialog_top_info.we_name }}</div>
        <div>范围：{{ servingOfficer_vacancyPosition_dialog_top_info.scope }}</div>
        <div>{{ servingOfficer_vacancyPosition_dialog_top_info.staffing }}：{{ servingOfficer_vacancyPosition_dialog_top_info.formal_num_all }}</div>
        <div>在职人数：{{ servingOfficer_vacancyPosition_dialog_top_info.count }}
          <span class="red" v-if="servingOfficer_vacancyPosition_dialog_top_info.diff_formal_num_all < 0">缺</span>
          <span class="green" v-else-if="servingOfficer_vacancyPosition_dialog_top_info.diff_formal_num_all > 0">超</span>
        </div>
      </div>

      <el-table
        max-height="350px"
        :data="servingOfficerTableData"
        border
        :header-cell-style="{
          height: '34px',
          padding: '0',
          background: '#FAFAFA',
          color: '#8C8C8C',
          fontSize: '12px',
          fontFamily: 'PingFangSC-Medium, PingFang SC',
          fontWeight: '500',
        }"
        style="width: 100%">
        <el-table-column
          prop="check_id"
          label="工号">
        </el-table-column>
        <el-table-column
          prop="we_name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="position"
          label="岗位">
        </el-table-column>
        <el-table-column
          prop="type"
          label="工作性质">
        </el-table-column>
        <el-table-column
          prop="status"
          label="人事状态">
        </el-table-column>
      </el-table>

      <pagination
        v-show="servingOfficerTotal>0"
        :total="servingOfficerTotal"
        :page.sync="servingOfficerForm.page"
        :limit.sync="servingOfficerForm.size"
        @pagination="getServingOfficerTabelList"
      />
    </el-dialog>

    <!-- 超/缺编岗位弹层 -->
    <el-dialog
      class="dialog"
      :title="vacancyPositionDialogTitle"
      width="1080px"
      :visible.sync="vacancyPositionDialog"
      destroy-on-close
    >
      <div class="table-title">
        <div>部门：{{ servingOfficer_vacancyPosition_dialog_top_info.we_name }}</div>
        <div>范围：{{ servingOfficer_vacancyPosition_dialog_top_info.scope }}</div>
      </div>

      <el-table
        max-height="350px"
        :data="vacancyPositionTableData"
        border
        :header-cell-style="{
          height: '34px',
          padding: '0',
          background: '#FAFAFA',
          color: '#8C8C8C',
          fontSize: '12px',
          fontFamily: 'PingFangSC-Medium, PingFang SC',
          fontWeight: '500',
        }"
        style="width: 100%">
        <el-table-column
          prop="position_no"
          label="岗位编码">
        </el-table-column>
        <el-table-column
          prop="title"
          label="岗位名称">
        </el-table-column>
        <el-table-column
          prop="num"
          label="岗位编制">
        </el-table-column>
        <el-table-column
          prop="position_count"
          label="在职人数">
        </el-table-column>
        <el-table-column
          v-if="vacancyPositionDialogTitle === '超编岗位'"
          prop="address"
          label="超编人数">
        </el-table-column>
        <el-table-column
          v-else
          prop="address"
          label="缺编人数">
        </el-table-column>
      </el-table>

      <pagination
        v-show="vacancyPositionTotal>0"
        :total="vacancyPositionTotal"
        :page.sync="vacancyPositionForm.page"
        :limit.sync="vacancyPositionForm.size"
        @pagination="getVacancyPositionTabelList"
      />
    </el-dialog>

   </div>
</template>
<script> 
import { authiruzed, authiruzedSetting, setAuthiruzedSetting, authiruzedStaff, authiruzedPosition } from "@/api/hrm/authorized";

export default {
   name: 'authorized',
   data() {
     return {
      // 查询条件
      queryForm: {
        we_name: "",
        dept_no: "",
      },
      // 表格数据
      tableData: [],
      isTopLogo: true,
      tableLoading: false,
      // 表格的展开
      expends: [],
      // 当前 hover 的单元格数据
      hoverTd: {
        id: null,
      },
      // 在职人员
      servingOfficerDialog: false,
      servingOfficerTableData: [],
      servingOfficerTotal: 0,
      servingOfficerForm:{
        page: 1,
        size: 15,
      },
      // 超/缺编岗位
      vacancyPositionDialog: false,
      vacancyPositionDialogTitle: '',
      vacancyPositionTableData: [],
      vacancyPositionTotal: 0,
      vacancyPositionForm:{
        page: 1,
        size: 15,
      },
      // 在职人员/超缺编岗位 弹层头部展示内容
      servingOfficer_vacancyPosition_dialog_top_info: {},
      // 通用设置
       generalDialog: false,
       generalForm: {
        authorized: '1',
       },
     }
   },
   created() {
    this.getAuthiruzed('tree');
   },
   methods: {
    // 获取部门编制列表
    getAuthiruzed(type) {
      this.tableLoading = true;
      let data = {we_id: "", we_parentid: "0"};
      if(type !== 'tree') {
        Object.assign(data, this.queryForm);
      }
      authiruzed(data).then(res => {
        // 是否为树形 
        if(type === 'tree'){
          this.getAuthiruzedChild(res.data);
        }else{
          this.tableData = res.data
          this.tableLoading = false
        }
        this.tableLoading = fal;
      }).catch((e)=> {
        this.tableLoading = false
      })
    },
    // 获取部门编制列表子级
    getAuthiruzedChild(parentData){
      authiruzed({we_parentid: parentData[0].we_id}).then(res => {
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
    },
    // 手动处理table 树结构 懒加载的缓存数据不自动清除问题
    deleteTableTreeLazy() {
      // lazyTreeNodeMap和treeData都是固定值
      this.$set(this.$refs["pointMultipleTable"].store.states, "lazyTreeNodeMap", {});
      this.$set(this.$refs["pointMultipleTable"].store.states, "treeData", {});
    },
    // 懒加载 获取子结构数据
    load(tree, treeNode, resolve){
      authiruzed({we_parentid: tree.we_id}).then(res => {
        if(res.data){
          res.data.map(i => {
            if(i.children){ i.hasChildren = true }
            return i
          })
          resolve(res.data)
        }
      })
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
    },
    // 搜索
    search() {
      // 判断表格是否为树形
      let isTree = Object.values(this.queryForm).every(i => i === "") ? 'tree' : null;
      this.isTopLogo = isTree === 'tree' ? true : false;
      this.getAuthiruzed(isTree);
    },
    // 导入
    tolead(){},
    // 保存通用设置
    setGrading(){
      setAuthiruzedSetting(this.generalForm).then(res => {
        this.$message({
          showClose: true,
          message: res.errmsg,
          type: 'success'
        });
        this.search();
        this.generalDialog = false;
      }).catch((error) => {
        this.$message({
          showClose: true,
          message: error.errmsg,
          type: 'error'
        });
      })
    },
    // 鼠标 hover 在某个表格的单元格上
    mouseEnterTable(row) {
      this.hoverTd.id = row.we_id;
    },
    // 鼠标 离开了 某个表格的单元格
    mouseLeaveTable() {
      this.hoverTd.id = null;
    },
     // 多数打开弹层操作  
    async dialogAll(name, row, data_type, dialogTitle) {
      if(name === "general") {
        // 通用设置
        await authiruzedSetting().then(res => {
          this.generalForm.authorized = res.data.authorized+"";
        })
      }else if(name === "servingOfficer") {
        // 在职人员列表
        this.servingOfficer_vacancyPosition_dialog_top_info = row;
        if(dialogTitle === '总编制_正式编') {
          this.servingOfficer_vacancyPosition_dialog_top_info.scope = '部门及所有子部门';
          this.servingOfficer_vacancyPosition_dialog_top_info.staffing = '正式编制数量';
        }else if(dialogTitle === '总编制_非正式编') {
          this.servingOfficer_vacancyPosition_dialog_top_info.scope = '部门及所有子部门';
          this.servingOfficer_vacancyPosition_dialog_top_info.staffing = '非正式编制数量';
        }else if(dialogTitle === '直属编制_正式编') {
          this.servingOfficer_vacancyPosition_dialog_top_info.scope = '部门直属，不含子部';
          this.servingOfficer_vacancyPosition_dialog_top_info.staffing = '正式编制数量';
        }else if(dialogTitle === '直属编制_非正式编') {
          this.servingOfficer_vacancyPosition_dialog_top_info.scope = '部门直属，不含子部';
          this.servingOfficer_vacancyPosition_dialog_top_info.staffing = '非正式编制数量';
        }
        this.servingOfficerFormReset();
        this[name + "Form"].data_type = data_type;
        this[name + "Form"].we_id = row.we_id;
        await authiruzedStaff(this[name + "Form"]).then(res => {
          this[name + "TableData"] = res.data.list;
          this[name + "Total"] = res.data.count * 1;
          // 在职人数弹层顶部在职人数显示
          this.servingOfficer_vacancyPosition_dialog_top_info.count = res.data.count;
        })
      }else if(name === "vacancyPosition") {
        // 超/缺编岗位列表
        this.servingOfficer_vacancyPosition_dialog_top_info = row;
        if(dialogTitle === '总编制_超编岗位') {
          this.servingOfficer_vacancyPosition_dialog_top_info.scope = '部门及所有子部门';
          this[name + "DialogTitle"] = '超编岗位';
        }else if(dialogTitle === '总编制_缺编岗位') {
          this.servingOfficer_vacancyPosition_dialog_top_info.scope = '部门及所有子部门';
          this[name + "DialogTitle"] = '缺编岗位';
        }else if(dialogTitle === '直属编制_超编岗位') {
          this.servingOfficer_vacancyPosition_dialog_top_info.scope = '部门直属，不含子部';
          this[name + "DialogTitle"] = '超编岗位';
        }else if(dialogTitle === '直属编制_缺编岗位') {
          this.servingOfficer_vacancyPosition_dialog_top_info.scope = '部门直属，不含子部';
          this[name + "DialogTitle"] = '缺编岗位';
        }

        this.vacancyPositionFormReset();
        this[name + "Form"].data_type = data_type;
        this[name + "Form"].we_id = row.we_id;
        await authiruzedPosition(this[name + "Form"]).then(res => {
          this[name + "TableData"] = res.data.list;
          this[name + "Total"] = res.data.count * 1;
        })
      }
      // console.log(this.servingOfficer_vacancyPosition_dialog_top_info, "=======servingOfficer_vacancyPosition_dialog_top_info");
      this[name + "Dialog"] = true;
    },
    // 重置 servingOfficerForm
    servingOfficerFormReset() {
      this.servingOfficerForm = {
        page: 1,
        size: 15,
      }
    },
    // 重置 vacancyPositionForm
    vacancyPositionFormReset() {
      this.vacancyPositionForm = {
        page: 1,
        size: 15,
      }
    },
    // 在职人员弹层 表格的分页事件
    getServingOfficerTabelList(){
      authiruzedStaff(this.servingOfficerForm).then(res => {
        this.servingOfficerTableData = res.data.list;
        this.servingOfficerTotal = res.data.count * 1;
      })
    },
    // 在职人员弹层 表格的分页事件
    getVacancyPositionTabelList(){
      authiruzedPosition(this.vacancyPositionForm).then(res => {
        this.vacancyPositionTableData = res.data.list;
        this.vacancyPositionTotal = res.data.count * 1;
      })
    },
    // 路由页面跳转
    goRouter(path, id = null) {
      if (id !== null) {
        this.$router.push({ path, query: { id } });
      }else{
        this.$router.push({ path });
      }
    },
    // 返回表格人数差异 展示的文本样式
    setDiffNum(num) {
      if(num > 0) {
        return `+${num}`
      }else{ 
        return num
      }
    }
   }
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
  .query-r-btn{
    display: flex;
    align-items: center;
  }
}
// 固定表格行高
.el-table /deep/.el-table__cell {
  padding: 0;
  height: 44px;
}
// 修改树结构表格小三角
.el-table /deep/.el-table__expand-icon {
  .el-icon-arrow-right:before {
    content: "\e791";
  }
}
.el-table .hover-pointer{
  color: #1aac88;
  font-weight: 500;
  cursor: pointer;
}
.el-table .green {
  width: 24px;
  height: 24px;
  display: inline-block;
  border: 1px solid #1aac88;
  color: #1aac88;
  font-size: 12px;
  border-radius: 4px;
}
.el-table .red {
  width: 24px;
  height: 24px;
  display: inline-block;
  border: 1px solid red;
  color: red;
  font-size: 12px;
  border-radius: 4px;
}
.button-all {
  margin-left: 24px;
  .el-button + .el-button {
    margin-left: 16px;
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
  // 通用设置内部样式 
  .title{
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #262626;
    span{
      display: inline-block;
      width: 2px;
      height: 14px;
      background: #1AAC88;
      margin-right: 6px;
    }
  }
  & .title:nth-child(1){
    margin-bottom: 10px;
  }
  /deep/.el-form-item{
    margin-left: 10px;
  }
  // 在职人员 / 缺编岗位 弹层标题样式
  .table-title{
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-gap: 20px 0px;
    color: #333333;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 400;
    margin-bottom: 20px;
    span{
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      display: inline-block;
      border: 1px solid red;
      color: red;
      margin-left: 6px;
    }
  }
}
</style>