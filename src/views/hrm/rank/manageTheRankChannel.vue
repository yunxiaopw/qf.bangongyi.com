
<template>
   <div>
     <HeadLine goback>职级通道管理</HeadLine>

    <div class="tabel-top-box">
      <el-button size="small" type="primary" @click="dialogAll('addRank')">新增职级通道</el-button>
    </div>

    <el-table
      class="tabel-box"
      :data="tableData"
      v-loading="tableLoading"
      style="width: 100%"
      :max-height="$el_table_max_height(56,56)"
      :header-cell-style="{
        height: '44px',
        padding: '0',
        background: '#FAFAFA',
        color: '#8C8C8C',
        fontSize: '12px',
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        fontWeight: '500',
      }"
      row-key="id"
    >
      <el-table-column align="center" prop="title" label="职级通道"></el-table-column>
      <el-table-column header-align="center" prop="type_dec" label="说明"></el-table-column>
      <el-table-column align="center" prop="staff_count" label="已定级人数"></el-table-column>
      <el-table-column align="center" prop="id" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="dialogAll('addRank', scope.row, true)">编辑</el-button>
            <el-button v-show="scope.row.staff_count <= 0" type="text" @click="deleteRank(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增下级弹层 -->
    <el-dialog
      class="dialog"
      :title="addRankTitle"
      width="480px"
      :visible.sync="addRankDialog"
      destroy-on-close
    >
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addForm"
        label-width="100px"
        class="demo-addForm"
      >
        <el-form-item label="通道名称：" prop="title">
          <el-input size="small" v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="说明：" prop="type_dec">
          <el-input
            size="small"
            type="textarea"
            maxlength="100"
            v-model="addForm.type_dec"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="addRankDialog = false"
          >取消</el-button
        >
        <el-button size="small" type="primary" @click="submitForm('addForm')"
          >保存</el-button
        >
      </div>
    </el-dialog>

   </div>
</template>
<script>
import { rankTypeList, setRankType, deleteRankType } from "@/api/hrm/rank";

export default {
   name: 'manageTheRankChannel',
   data() {
     return {
      tableLoading: false,
      tableData:[],
      // 弹层
      addRankDialog: false,
      addRankTitle: "",
      addForm: {
        id: '',
        title: '',
        type_dec: '',
        rank_min: '',
        rank_max: '',
      },
      addRules: {
        title: [{ required: true, message: "请输入通道名称", trigger: "blur" }, { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }],
      },
     }
   },
   created() {
     this.getRankTypeList();
   },
   methods: {
    // 获取职级通道列表
    getRankTypeList(id = "") {
      if(id === "") { this.tableLoading = true; }
      rankTypeList({id}).then(res => {
        if(id !== "") {
          this.addForm = res.data;
        }else{
          this.tableData = res.data;
        }
        this.tableLoading = false;
      }).catch(error => {
          this.tableLoading = false;
      })
    },
    // 弹层显示
    dialogAll(dialog, row, isUpdate = false) {
      if (isUpdate) {
        this.addRankTitle = "编辑职级通道";
        this.getRankTypeList(row.id);
        this[dialog + "Dialog"] = true;
      } else {
        this.addRankTitle = "新增职级通道";
        this.reset();
        this[dialog + "Dialog"] = true;
      }
    },
    // 重置 addForm 数据
    reset() {
      for (const key in this.addForm) {
        this.addForm[key] = "";
      }
    },
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          setRankType(this.addForm).then(res => {
            this.addRankDialog = false;
            this.$message({
              showClose: true,
              message: res.errmsg,
              type: 'success'
            });
            this.getRankTypeList();
          }).catch(error => {
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
    // 删除职级通道
    deleteRank(id) {
      this.$confirm('确认删除该职级道具?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          deleteRankType({id}).then(res => {
            if(res.errno === 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
            this.getRankTypeList();
          }).catch(error => {
            this.$message({
              showClose: true,
              message: error.errmsg,
              type: 'error'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
   }
};
</script>
<style lang='less' scoped>
.tabel-top-box{
  height: 56px;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 24px;
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