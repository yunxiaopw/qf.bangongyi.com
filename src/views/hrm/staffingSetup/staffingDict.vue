<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine>人事字典</HeadLine>

    <!-- 表格筛选项 -->
    <div class="query-form">
      <el-form :inline="true" :model="queryForm" size="small">
        <el-form-item label="">
          <el-input v-model="queryForm.title" placeholder="字段名称"></el-input>
        </el-form-item>
        <el-form-item label="">
           <el-select v-model="queryForm.status" placeholder="全部状态">
                <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="">
           <el-select v-model="queryForm.type" placeholder="全部类型">
                <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="">
           <el-select v-model="queryForm.custom" placeholder="全部来源">
                <el-option
                v-for="item in customOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div class="query-r-btn">
        <el-button size="small" @click="addDialog = true">新增</el-button>
        <el-button size="small" @click="reset">重置</el-button>
        <el-button size="small" type="primary" @click="search">查询</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="tableLoading"
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
      <el-table-column prop="title" align="center" label="字段名称"></el-table-column>
      <el-table-column prop="status" align="center" label="状态">
        <template slot-scope="scope">
            {{ scope.row.status > 0 ? '使用中' : '已停用' }}
        </template>
      </el-table-column>
      <el-table-column prop="type" align="center" label="类型">
        <template slot-scope="scope">
            {{ echoTypeText(scope.row.type) }}
        </template>
      </el-table-column>
      <el-table-column prop="value" align="center" label="说明"></el-table-column>
      <el-table-column prop="custom" align="center" label="来源">
        <template slot-scope="scope">
          {{ scope.row.custom > 0 ? '自定义字段' : '系统字段' }}
        </template>
      </el-table-column>
      <el-table-column prop="create_time" align="center" label="创建时间"></el-table-column>
      <el-table-column prop="edit" align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.able_stop > 0 && scope.row.status > 0" size="size" type="text" @click="setDictEnable(scope.row)">停用</el-button>
          <el-button v-else-if="scope.row.able_stop > 0 && scope.row.status <= 0" size="size" type="text" @click="setDictEnable(scope.row)">启用</el-button>
          <span v-else size="size">不可操作</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryForm.page"
      :limit.sync="queryForm.size"
      @pagination="getTabelList"
    />

    <!-- 新增/修改职级弹层 -->
    <el-dialog
      class="dialog"
      title="新增"
      width="480px"
      :visible.sync="addDialog"
      destroy-on-close
    >
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addForm"
        label-width="100px"
        size="small"
      >
        <el-form-item label="名称：" prop="title">
          <el-input  maxlength="15" v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="属性：" prop="type">
          <el-select
            v-model="addForm.type"
            placeholder="请选择属性"
          >
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="addForm.type === 'radio'" label="设定：" prop="value">
          <div class="addForm_value_list">
            <div class="addForm_value_item" v-for="(item, index) in addForm.value" :key="index">
              <el-input v-model="addForm.value[index]" placeholder="请输入选项内容"></el-input>
              <span class="addForm_value_icon addForm_value_icon_m_l" @click="addFormValueDelete(index)"><el-icon class="el-icon-remove"></el-icon></span>
            </div>
            <span class="addForm_value_icon" @click="addFormValueAdd"><el-icon class="el-icon-circle-plus"></el-icon></span>
          </div>
        </el-form-item>
        <div class="text_center" v-if="addForm.type === 'file'">*支持pdf、xls、xlsx、doc、docx、png、jpg、rar、zip格式</div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="addDialog = false">取消</el-button>
        <el-button size="small" type="primary" @click="add('add')">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { dictList, dictEnable, dictAdd } from "@/api/hrm/staffingSetup/staffingDict";
export default {
  name: "staffingDict",
  components: {},
  data() {
    return {
        query_form_height: 0,
        queryForm: {
            status: "",
            type: "",
            title: "",
            custom: "",
            page: 1,
            size: 10,
        },
        statusOptions: [
          {
            value: '1',
            label: '使用中'
          },
          {
            value: '0',
            label: '已停用'
          },
        ],
        typeOptions: [
          {
            value: 'text',
            label: '文本'
          },
          {
            value: 'file',
            label: '附件'
          },
          {
            value: 'radio',
            label: '单选'
          },
          {
            value: 'date',
            label: '时间'
          },
          {
            value: 'select',
            label: '下拉框'
          },
          {
            value: 'checkbox',
            label: '多选'
          },
        ],
        customOptions: [
          {
            value: '0',
            label: '全部'
          },
          {
            value: '1',
            label: '自定义字段'
          },
          {
            value: '-1',
            label: '系统字段'
          },
        ],
        total: 0,
        tableLoading: false,
        tableData: [],
        addDialog: false,
        addForm: {
          title: '',
          type: 'text',
          value: [],
        },
        addRules: {
          title: [{ required: true, message: "请输入名称", trigger: "blur" }],
        },
    };
  },
  created() {
    this.getDictList()
  },
  mounted() {
    this.query_form_height = document.querySelector(".query-form").offsetHeight;
  },
  methods: {
    // 获取列表数据
    getDictList(){
      this.tableLoading = true;
      dictList(this.queryForm).then(res => {
        this.tableData = res.data.list ? res.data.list : [];
        this.total = res.data.count ? res.data.count : 0;
      }).finally(() => {
        this.tableLoading = false;
      })
    },
    // 分页切换
    getTabelList() {
      this.getDictList()
    },
    // 查询
    search() {
      this.queryForm.page = 1;
      this.getDictList()
    },
    // 重置
    reset() {
      this.resetQueryForm();
      this.search();
    },
    // 重置 查询条件数据
    resetQueryForm() {
      this.queryForm = {
            status: "",
            type: "",
            title: "",
            custom: "",
            page: 1,
            size: 10,
        }
    },
    // 表格类型文字显示 回显
    echoTypeText(type) {
      let item = this.typeOptions.filter(i => i.value === type);
      return item.length > 0 ? item[0].label : type;
    },
    // 字典 启用/停用
    setDictEnable({key, status}) {
      let data = { key };
      if(status > 0) {
        this.$confirm('停用后，该字段将自动从所有表单中移除。已保存的数据不会丢失，重新启用字段后仍然存在。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          dictEnable(data).then(res => {
            this.search();
            this.$message({
              showClose: true,
              message: "已停用！",
              type: 'success'
            });
          }).catch((error) => {
            this.$message({
              showClose: true,
              message: "停用失败！",
              type: 'error'
            });
          });
        }).catch(() => {});
      } else {
        dictEnable(data).then(res => {
          this.search();
          this.$message({
            showClose: true,
            message: "已启用！",
            type: 'success'
          });
        }).catch((error) => {
          this.$message({
            showClose: true,
            message: "启用失败！",
            type: 'error'
          });
        });
      }
    },
    // 单选/复选/下拉 可选内容删除
    addFormValueDelete(index) {
      this.addForm.value.splice(index, 1);
    },
    // 单选/复选/下拉 可选内容添加
    addFormValueAdd() {
      this.addForm.value.push('');
    },
    // 新增
    add(name){
      this.$refs[name+'Form'].validate((valid) => {
        if (valid) {
          this.addForm.key = uuidv4();
          dictAdd(this.addForm).then(res => {
            this.$message({
              showClose: true,
              message: res.errmsg ? res.errmsg : 'success',
              type: 'success'
            });
            this.$refs[name + 'Form'].resetFields();
            this.search();
            this.addDialog = false;
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
.text_center {
  text-align: center;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #8C8C8C;
}
// 新增弹层中样式
.addForm_value_list {
  width: 100%;
  max-height: 170px;
  overflow-y: auto;
}
.addForm_value_list::-webkit-scrollbar {
  display: none;
}
.addForm_value_item {
  display: flex;
  align-items: center;
}
.addForm_value_item+.addForm_value_item {
  margin-top: 18px;
}
.addForm_value_icon {
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #8C8C8C;
  cursor: pointer;
}
.addForm_value_icon_m_l {
  margin-left: 20px;
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