<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine>
        异动管理
        <template #r-content>
            <div class="t-r-btn">
                <el-popover
                placement="bottom"
                trigger="hover"
                >
                    <div class="sort-list pointer">
                        <div class="sort-item" v-for="(item, index) in sortList" :key="index" @click="sortListSelect(item)">
                            {{ item.text }}
                        </div>
                    </div>
                    <span slot="reference"><el-button class="add_staff_btn" size="small">办理异动 <el-icon class="el-icon-arrow-down"></el-icon></el-button></span>
                </el-popover>
                <el-button size="small" @click="adjustTypeDialogShow">异动类型设置</el-button>
            </div>
      </template>
    </HeadLine>

    <!-- 表格查询项 -->
    <div class="query-form">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline" size="small">
        <el-form-item label="">
          <el-input v-model="queryForm.search" placeholder="姓名/工号/手机号"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input readonly v-model="queryListWidget.name" placeholder="当前部门" @focus="dialogListWidget(queryListWidget.name, true, 'move_department')"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="queryForm.type_id" placeholder="异动类型">
            <el-option v-for="item in type_id_options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="queryForm.cause" placeholder="异动原因"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="queryForm.status" placeholder="异动状态">
            <el-option v-for="item in status_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
    :max-height="$el_table_max_height(56,query_form_height,96)"
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
        <el-table-column prop="we_name" header-align="center" label="姓名"></el-table-column>
        <el-table-column prop="workno" align="center" label="工号"></el-table-column>
        <el-table-column prop="department" align="center" label="当前部门">
          <template slot-scope="scope">
            {{ scope.row.department.name }}
          </template>
        </el-table-column>
        <el-table-column prop="adjust_type_name" align="center" label="异动类型"></el-table-column>
        <el-table-column prop="reason" align="center" label="异动原因"></el-table-column>
        <el-table-column prop="status_desc" align="center" label="异动状态"></el-table-column>
        <el-table-column prop="form_id" align="center" label="审批单号"></el-table-column>
        <el-table-column prop="effective_time_desc" align="center" label="异动生效时间"></el-table-column>
        <el-table-column prop="create_time_desc" align="center" label="发起时间"></el-table-column>
        <el-table-column prop="creator_name" align="center" label="发起人"></el-table-column>
        <el-table-column prop="id" align="center" label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="text" size="small" @click="goRouter('/transactedModeInfor', scope.row.id)">查看详情</el-button> 
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

    <!-- 异动类型设置 弹层 -->
    <el-dialog
      class="dialog"
      title="异动类型设置"
      width="480px"
      :visible.sync="adjustTypeDialog"
      destroy-on-close
    >
      <el-form label-width="40px">
        <el-form-item v-for="(item, index) in copy_type_id_options" :key="item.id" :label="adjustTypeItemIndex(index)" class="adjustTypeItem">
          <el-input size="small" v-model="item.name" maxlength="20" :readonly="item.readonly"></el-input>
          <span v-if="!item.readonly" class="icon-delete" @click="adjustTypeItemDelete(item.id)"><i class="el-icon-delete"></i></span>
          <span v-else class="icon-delete-no"></span>
        </el-form-item>
        <el-button type="text" size="small" icon="el-icon-plus" @click="adjustTypeItemAdd">添加</el-button>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="adjustTypeDialog = false">取消</el-button>
        <el-button size="small" type="primary" @click="submitAdjustType">保存</el-button>
      </div>
    </el-dialog>

    <!-- 修改 主/子负责人弹层 -->
    <ListWidget :tabType="listWidgetTabType" :emitType="listWidgetEmitType" :selects="listWidgetSelects" :radio="listWidgetRadio" :visible="listWidgetShow" @ackSelect="ackSelect" @listWidgetHide="listWidgetHide" />
    
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { adjustType, adjustTypeEdit, adjustList } from "@/api/hrm/transactedMode";

export default {
  name: "transactedMode",
  components: {},
  data() {
    return {
      query_form_height: 0,
      // 查询入参
      queryForm: {
        search: '',
        department: '',
        type_id: '',
        cause: '',
        status: '',
        start_date: '',
        end_date: '',
        start_end_date: '',
        page: 1,
        size: 10,
      },
      // 查询条件 弹层获取的主/子负责人 展示文本信息
      queryListWidget: {
        name: "",
      },
      // 异动类型 可选项
      type_id_options: [],
      copy_type_id_options: [],
      del_copy_type_id_options: [],
      set_copy_type_id_options: [],
      adjustTypeDialog: false,
      // 异动状态 可选项
      status_options: [
        {label: '审批中', value: '1'},
        {label: '待生效', value: '2'},
        {label: '已驳回', value: '3'},
        {label: '已撤销', value: '4'},
        {label: '已生效', value: '5'},
      ],
      // 办理异动项数据
      sortList: [{text: "单个员工异动", path: "/soleTransactedMode", listWidgetRadio: true}, {text: "批量异动", path: "/soleTransactedMode", listWidgetRadio: false}],
      
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
  created() {
    this.getAdjustType();
    this.getAdjustList();
  },
  mounted() {
    this.query_form_height = document.querySelector(".query-form").offsetHeight;
  },
  methods: {
    // 获取异动类型
    getAdjustType() {
      adjustType().then(res => {
        this.type_id_options = res.data;
      })
    },
    // 异动类型设置 弹层 index
    adjustTypeItemIndex(index) {
      return index > 8 ? (index+1)+'' : '0'+(index+1)
    },
    // 异动类型设置 弹层
    adjustTypeDialogShow() {
      this.set_copy_type_id_options = [];
      this.del_copy_type_id_options = [];
      this.copy_type_id_options = JSON.parse(JSON.stringify(this.type_id_options));
      this.adjustTypeDialog = true;
    },
    // 异动类型设置 单个删除
    adjustTypeItemDelete(id) {
      let isSome = this.type_id_options.some(i => i.id === id);
      if(isSome) {
        this.del_copy_type_id_options.push(id);
      }
      this.set_copy_type_id_options = this.set_copy_type_id_options.filter(i => i.id !== id);
      this.copy_type_id_options = this.copy_type_id_options.filter(i => i.id !== id);
    },
    // 异动类型设置 单个添加
    adjustTypeItemAdd() {
      let obj = {
        id: uuidv4(),
        name: ''
      };
      this.set_copy_type_id_options.push(obj);
      this.copy_type_id_options.push(obj);
    },
    // 异动类型设置 校验提示
    isRulesFuc(arr) {
      if(arr.length <= 0) { 
        this.$message({
          showClose: true,
          message: '至少设置一个异动类型',
          type: 'error'
        });
        return false 
      }
      if(arr.some(i => i.name === '')) { 
        this.$message({
          showClose: true,
          message: '异动类型不能为空',
          type: 'error'
        });
        return false 
      }
      return true
    },
    // 异动类型设置
    submitAdjustType() {
      let isRules = this.isRulesFuc(this.copy_type_id_options);
      if(!isRules) return
      let set = JSON.parse(JSON.stringify(this.set_copy_type_id_options.map(i => {
          i = { id:0, name:i.name}
          return i
        })));
      let obj = {
        set,
        del: this.del_copy_type_id_options,
      }
      adjustTypeEdit(obj).then(res => {
        if(res.errno === 0) {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          });
          this.adjustTypeDialog = false;
          this.getAdjustType();
        } else {
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
    // 获取表格数据
    getAdjustList(){
      this.tableLoading = true;
      adjustList(this.queryForm).then(res=> {
        this.tableData = res.data.list ? res.data.list : [];
        this.tableDataTotal = res.data.count*1;
      }).finally((e)=> {
        this.tableLoading = false;
      })
    },
    // 分页
    getTabelList(){
      this.getAdjustList();
    },
    // 重置
    reset() {
      this.resetQueryForm();
      this.search();
    },
    // 重置 查询条件数据
    resetQueryForm() {
      this.queryForm = {
        search: '',
        department: '',
        type_id: '',
        cause: '',
        status: '',
        start_date: '',
        end_date: '',
        start_end_date: '',
        page: 1,
        size: 10,
      };
      // 主/子负责人 弹层选择项 内容置空
      this.queryListWidget.name = "";
    },
    // 办理异动切换
    sortListSelect({path, listWidgetRadio}) {
      this.$router.push({ path, query: { listWidgetRadio }});
    },
    // 查询
    search() {
      this.queryForm.page = 1;
      this.getAdjustList()
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
  padding: 12px 24px 0;
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
  color: #1AAC88;
}
.main-color {
  color: #1AAC88 !important;
}

.adjustTypeItem {
  margin-bottom: 8px;
  /deep/.el-form-item__content {
    display: flex;
    .icon-delete {
      margin-left: 8px;
      font-size: 16px;
      cursor: pointer;
    }
    .icon-delete-no {
      margin-left: 8px;
      width: 16px;
    }
    .icon-delete:hover {
      color: red;
    }
  }
}

.add_staff_btn {
  display: inline-block;
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

.dialog /deep/.el-form {
  max-height: 225px;
  overflow-y: auto;
}
.dialog /deep/.el-form::-webkit-scrollbar {
  display: none;
}
</style>