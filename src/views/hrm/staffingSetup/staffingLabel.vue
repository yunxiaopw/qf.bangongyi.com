<template>
   <div class="main-box">
     <HeadLine>
        员工标签管理
        <template #r-content>
          <el-button size="small" @click="dialogAll('redact')">新建标签</el-button>
        </template>
    </HeadLine>
     <el-container class="container">
      <!-- 左侧树结构 -->
      <el-aside width="250px" style="border" class="aside">
        <el-tree :data="positionTypeData" default-expand-all node-key="id" :props="defaultProps" @node-click="getList" :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <img v-show="node.expanded" src="../../../assets/images/folder-open.png" alt="" class="jstree-icon">
                <img v-show="!node.expanded" src="../../../assets/images/folder-close.png" alt="" class="jstree-icon">
                <span>{{ data.title }}</span>
              </span>
              <el-popover
                placement="bottom"
                width="50"
                trigger="hover">
                <div class="flex-btn">
                  <div>
                    <el-button size="small" type="text" @click="dialogAll('addTreeItem', data)">新增子类</el-button>
                  </div>
                  <div v-if="data.id !== positionTypeData[0].id">
                    <el-button size="small" type="text" @click="deleteTreeItem(data)">删除</el-button>
                  </div>
                </div>
                <span slot="reference"><el-icon class="el-icon-more"></el-icon></span>
              </el-popover>
          </span>
        </el-tree>
      </el-aside>

      <!-- 右侧表格 -->
      <el-main class="main">
        <div class="query-form">
            <div class="query-l-label">
                <div class="title item">标签名称</div>
                <div class="num item">员工数量：37</div>
                <div class="num item">部门数量：2</div>
            </div>
            <div class="query-r-btn">
              <el-button size="small" @click="dialogAll('redact')">同步</el-button>
              <el-button size="small" @click="batchMoveDialog">添加员工</el-button>
            </div>
        </div>
        <div style="padding: 0 24px">
          <el-table
            ref="multipleTable"
            border
            :data="tableData"
            style="width: 100%"
            v-loading="tableLoading"
            @selection-change="handleSelectionChange"
            :default-sort = "{prop: 'num', order: null}"
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
            <el-table-column prop="position_no" align="center" label="姓名"></el-table-column>
            <el-table-column prop="title" align="center" label="部门"></el-table-column>
            <el-table-column prop="rank_type" align="center" label="类型"></el-table-column>
            <el-table-column prop="position_dec" header-align="center" label="人事状态">
              <template slot-scope="scope">
                <div class="text-hidden">
                  {{ scope.row.type }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>

    <!-- 树结构新增子级弹层 -->
    <el-dialog
      class="dialog"
      title="新增子类"
      width="480px"
      :visible.sync="addTreeItemDialog"
      destroy-on-close
    >
      <el-form
        :model="addTreeItemForm"
        :rules="addTreeItemRules"
        ref="addTreeItemForm"
        label-width="100px"
      >
        <el-form-item label="类别名称" prop="title">
          <el-input size="small" maxlength="6" v-model="addTreeItemForm.title"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="addTreeItemDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addTreeItem"
          >保存</el-button
        >
      </div>
    </el-dialog>

    <!-- 批量移动弹层 -->
    <el-dialog
      class="dialog"
      title="批量移动"
      width="480px"
      :visible.sync="moveDialog"
      destroy-on-close
    >
      <el-form
        :model="moveForm"
        :rules="moveRules"
        ref="moveForm"
        label-width="100px"
      >
        <el-form-item label="移动至组织" prop="position_type">
          <TreeSelect v-model="moveForm.position_type" :data="moveTreeData" :props="moveTreeProps" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="moveDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="batchMove">保存</el-button>
      </div>
    </el-dialog>

    <!-- 新增/修改职级弹层 -->
    <el-dialog
      class="dialog"
      :title="redactTitle"
      width="480px"
      :visible.sync="redactDialog"
      destroy-on-close
    >
      <el-form
        :model="redactForm"
        :rules="redactRules"
        ref="redactForm"
        label-width="100px"
      >
        <el-form-item label="岗位类别：" prop="position_type">
          <TreeSelect v-model="redactForm.position_type" :data="moveTreeData" :props="moveTreeProps" />
        </el-form-item>
        <el-form-item label="岗位名称：" prop="title">
          <el-input size="small" maxlength="10" v-model="redactForm.title"></el-input>
        </el-form-item>
        <el-form-item label="岗位编码：" prop="position_no">
          <el-input maxlength="10" size="small" v-model="redactForm.position_no"></el-input>
        </el-form-item>
        <el-form-item label="职级通道：" prop="rank_type">
          <el-select
            :disabled="redactTitle === '修改岗位'"
            size="small"
            v-model="redactForm.rank_type"
            placeholder="请选择职级通道"
          >
            <el-option v-for="item in rankTypeOptions" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位描述：" prop="position_dec">
          <el-input
            maxlength="100"
            size="small"
            type="textarea"
            v-model="redactForm.position_dec"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="redactDialog = false"
          >取消</el-button
        >
        <el-button size="small" type="primary" @click="submitForm('redact')"
          >保存</el-button
        >
      </div>
    </el-dialog>
    
   </div>
</template>
<script>
import { positionType, setPositionType, deletePositionType, positionList, setPosition, deletPosition, positionMove } from "@/api/hrm/position";
import { rankTypeList } from "@/api/hrm/rank";

export default {
   name: 'staffingLabel',
   data() {
     return {
      // 树结构数据
      positionTypeData: [{
          title: '一级 1',
          child: [{
            title: '二级 1-1',
            child: [{
              title: '三级 1-1-1'
            }]
          }]
        }, {
          title: '一级 2',
          child: [{
            title: '二级 2-1',
            child: [{
              title: '三级 2-1-1'
            }]
          }, {
            title: '二级 2-2',
            child: [{
              title: '三级 2-2-1'
            }]
          }]
        }, {
          title: '一级 3',
          child: [{
            title: '二级 3-1',
            child: [{
              title: '三级 3-1-1'
            }]
          }, {
            title: '二级 3-2',
            child: [{
              title: '三级 3-2-1'
            }]
          }]
        }],
      position_type: "",
      defaultProps: {
        children: "child",
        label: "title",
      },
      addTreeItemDialog: false,
      addTreeItemForm: {
        id: '',
        parent_id: '',
        title: '',
      },
      addTreeItemRules: {
        title: [{ required: true, message: "请输入类别名称", trigger: "blur" }],
      },
      // 查询条件数据
      queryForm: {
        position_no: "",
        title: "",
      },
      // 表格数据
      tableData: [
          {
            position_no: '王小虎',
            title: '北京分公司>研发部>产研A组',
            rank_type: '组织架构',
            type: '已转正',
          },
          {
            position_no: '王小虎',
            title: '北京分公司>研发部>产研A组',
            rank_type: '组织架构',
            type: '已转正',
          },
          {
            position_no: '王小虎',
            title: '北京分公司>研发部>产研A组',
            rank_type: '组织架构',
            type: '已转正',
          },
        ],
      tableLoading: false,
      multipleSelection: [],
      moveDialog: false,
      redactTitle: '',
      redactDialog: false,
      redactForm: {
        id: "",
        position_type: "",
        title: "",
        position_no: "",
        position_dec: "",
        rank_type: "",
      },
      redactRules: {
        position_type: [{ required: true, message: "请选择岗位类别", trigger: "change" }],
        title: [{ required: true, message: "请输入岗位名称", trigger: "blur" }],
        position_no: [{ required: true, message: "请输入岗位编码", trigger: "blur" }],
        rank_type: [{ required: true, message: "请选择职级通道", trigger: "change" }],
      },
      rankTypeOptions: [],
      // 批量移动相关数据
      moveDialog: false,
      moveForm: {
        position_type: ""
      },
      moveRules: {
        position_type: [{ required: true, message: "请选择岗位类别", trigger: "change" }],
      },
      moveTreeData: [],
      moveTreeProps: {
        label: 'title',
        children: 'child'
      }
     }
   },
   async created() {
    await this.getPositionType();
    await this.getPositionList();
    this.getRankTypeList();
   },
   methods: {
    // 获取岗位词典类别
    async getPositionType() {
      await positionType().then(res => {
        this.position_type = [res.data][0].id;
        this.positionTypeData = [res.data];
        this.moveTreeData = JSON.parse(JSON.stringify([res.data]));
      })
    },
    // 获取岗位列表
    async getPositionList() {
      this.tableLoading = true;
      this.queryForm.position_type = this.position_type;
      await positionList(this.queryForm).then(res => {
        this.tableData = res.data;
        this.tableLoading = false;
      }).catch(error => {
        this.tableLoading = false;
      })
    },
    // 获取 职级通道
    getRankTypeList() {
      rankTypeList().then(res => {
          this.rankTypeOptions = res.data;
      })
    },
    // 点击树结构
    getList(row){
      this.position_type = row.id;
      this.queryFormReset();
      this.getPositionList();
    },
    // 树结构添加子节点
    addTreeItem(){
      this.$refs.addTreeItemForm.validate((valid) => {
        if (valid) {
          setPositionType(this.addTreeItemForm).then(res => {
            this.$message({
              showClose: true,
              message: res.errmsg ? res.errmsg : 'success',
              type: 'success'
            });
            this.addTreeItemDialog = false;
            this.getPositionType();
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
    // 树结构点击删除
    deleteTreeItem(row){
      this.$confirm('确认删除该类别?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        deletePositionType({id: row.id}).then(res => {
          if(res.errno === 0) {
            this.getPositionType();
          }else{
            this.$message({
              showClose: true,
              message: error.errmsg,
              type: 'error'
            });
          }
        }).catch(error => {
          this.$message({
            showClose: true,
            message: error.errmsg,
            type: 'error'
          });
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {});
    },
    // 打开批量移动弹层
    batchMoveDialog(){
      if(this.multipleSelection.length > 0){
        this.moveDialog = true
      }else{
        this.$message({
          showClose: true,
          message: '请选择要移动的数据',
          type: 'warning'
        });
      }
    },
    // 批量移动
    batchMove(){
      this.$refs.moveForm.validate((valid) => {
        if (valid) {
          let data = {
            ids: this.multipleSelection.map(i => i.id),
            position_type: this.moveForm.position_type,
          };
          positionMove(data).then(res => {
            this.$message({
              showClose: true,
              message: res.errmsg,
              type: 'success'
            });
            this.moveDialog = false;
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
    // 表格复选框 触发方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 多数打开弹层操作  主内容为 表格数据 新增 / 修改
    async dialogAll(name, row, isUpdate = false) {
      if (isUpdate) {
        this[name + 'Title'] = "修改岗位";
        await positionList({id: row.id}).then(res => {
          this[name + 'Form'] = res.data;
          this[name + "Dialog"] = true;
        })
      } else if(name === 'addTreeItem'){
        this[name + 'Title'] = "新增岗位分类";
        this.addTreeItemReset();
        this.addTreeItemForm.parent_id = row.id;
        this[name + "Dialog"] = true;
      } else {
        this[name + 'Title'] = "新增岗位";
        this.redactFormReset();
        this[name + "Dialog"] = true;
      }
    },
    // 新增/修改 岗位列表
    submitForm(name) {
      this.$refs[name+'Form'].validate((valid) => {
        if (valid) {
          setPosition(this.redactForm).then(res => {
            this.$message({
              showClose: true,
              message: res.errmsg ? res.errmsg : 'success',
              type: 'success'
            });
            this.$refs[name + 'Form'].resetFields();
            this[name+'Dialog'] = false;
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
   }
};
</script>

<style lang='less' scoped>
.container{
  height: calc(100% - 56px);
  .aside{
    border-right: 1px solid #f0f0f0;
  }
  .main{
    .query-form {
      height: 67px;
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      .query-l-label{
        .title {
            font-size: 16px;
            font-weight: 500;
            color: #141414;
        }
        .num {
            font-size: 14px;
            font-weight: 400;
            color: #8C8C8C;
        }
        .item+.item {
            margin-left: 16px;
        }
      }
      .query-r-btn, .query-l-label{
        display: flex;
        align-items: center;
      }
    }
  }
}

.jstree-icon{
  width: 12px;
  height: 11px;
  margin-right: 6px;
}
.flex-btn{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.el-icon-more{
  transform: rotate(90deg);
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
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