<!-- 添加工资项 -->
<template>
  <div class="add-salary-option">
    <!--  <el-button type="text" @click="dialogFormVisible = true">添加工资项</el-button> -->
    <el-dialog
      title="添加薪资项"
      custom-class="add-modal"
      :visible.sync="dialogFormVisible"
      ref="dialog"
      width="1100px"
    >
      <div class="modal-container">
        <div class="content-left">
          <div class="header">
            <div class="title">
              <div class="line"></div>
              <div class="select_text">可选项</div>
            </div>
            <el-input
              v-model="filterText"
              placeholder="输入字段名称可进行查询"
              prefix-icon="el-icon-search"
              style="margin-left: 17em"
            ></el-input>
          </div>
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox>
          <div style="margin: 15px 0"></div>
          <el-checkbox-group
            v-model="selectedList"
            @change="handleCheckedChange"
          >
            <div class="checkbox-container">
              <div class="checkbox-item" v-for="item in allData">
                <el-checkbox :label="item.id" :key="item.id">
                 {{item.label}}
                </el-checkbox>
              </div>
            </div>
          </el-checkbox-group>
        </div>
        <div class="content-right">
          <div class="right-header">
            <div class="title">
              <div class="line"></div>
              <div class="select_text">已选项</div>
            </div>
            <el-button type="text" style="right: 0; margin-left: 13.2em" @click="handleClick('clear')">清空</el-button>
          </div>
          <div class="selected-container">
            <div class="selected-item" v-for="(item, index) in checkedList" :key="item.id">
              <span class="label">{{item.label}}</span>
              <span class="el-icon-close" style="cursor: pointer" @click="handleClick('delete', index)"></span>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button style="float: left">新建薪资项</el-button>
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="cancel">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { searchItem } from "@/api/remuneration/intellectSalary/index";
export default {
  name: "addItem",
  components: {},
  watch: {
    filterText(val) {
      this.$refs.valueTree.filter(val);
    },
  },

  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      defaultProps: {
        children: "children",
        label: "label",
      },
      filterText: "",
      
      checkAll: false,
      isIndeterminate: false,
      allData: [
        { id: 1, label: "姓名" },
        { id: 2, label: "年龄" },
        { id: 3, label: "账号" },
        { id: 4, label: "部门部门部门部门部门部门部门部门部门12312312312" },
        { id: 5, label: "工资" },
        { id: 6, label: "工资" },
        { id: 7, label: "工资" },
      ],
      selectedList: [],
    };
  },
  computed: {
    checkedList() {
      return this.allData.filter(
          option => this.selectedList.some(
              checked => checked === option.id
          )
      )
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.selectedList = val ? this.allData.map(item => item.id) : [];
      this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.allData.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.allData.length;
    },
    open() {
      this.dialogFormVisible = true;
      searchItem().then((res)=>{
          console.log(res.data)
        })
      return this.$nextTick();
    },
    cancel() {
      this.dialogFormVisible = false;
    },
    handleClick(type, data) {
      switch (type) {
        case 'delete':
          this.selectedList.splice(data, 1);
          break;
        case 'clear': 
          this.selectedList = [];
          this.isIndeterminate = true;
          break;
        default:
          break;
      }
    }
  },
};
</script>
<style lang="less" scoped>
.add-salary-option {
  /deep/ .el-dialog__header {
        border-bottom: 1px solid #F0F0F0;
        padding-top: 13px;
        padding-bottom: 13px;
        .el-dialog__title {
            color: #1F1F1F;
        }
        .el-dialog__headerbtn {
            top: 13px;
        }
    }
    /deep/ .el-dialog__body {
        padding: 26px;
    }
    /deep/ .el-dialog__footer {
        padding-top: 11px;
        padding-bottom: 11px;
        border-top: 1px solid #F0F0F0;
    }
    /deep/ .el-button {
        padding: 8px 17px;
        font-weight: 400;
        border-radius: 2px;
    }

  .add-modal {
    .modal-container {
      width: 100%;
      display: flex;
      min-height: 300px;
      .content-left {
        width: 66%;
        padding-right: 30px;
        .checkbox-container {
          display: flex;
          flex-wrap: wrap;
          .checkbox-item {
            width: 33.3%;
            margin-bottom: 10px;
            /deep/ .el-checkbox {
              width: 100%;
              display: flex;
              align-items: center;
            }
            /deep/ .el-checkbox__label {
              width: calc(100% - 20px);
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
          }
        }
      }
      .content-right {
        width: 34%;
        border-left: 1px solid #F0F0F0;
        padding-left: 30px;
        .selected-container {
          .selected-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 6px 8px;
            border-radius: 4px;
            .label {
              width: calc(100% - 30px);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            &:hover {
              background: #F5F5F5;
            }
          }
        }
      }
    }
  }
  .header, .right-header {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    justify-content: space-between;
  }
  .title {
    display: flex;
    align-items: center;
    .line {
      width: 2px;
      height: 15px;
      background: #1aac88;
      border-radius: 1px 1px 0px 0px;
      margin-right: 6px;
    }
  }
 
}
.el-input {
  width: 320px;
  height: 32px;
  background: #ffffff;
  border-radius: 2px;
}

.select_text {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #262626;
  line-height: 20px;
}

.el-dialog__header {
  border-bottom: #f0f0f0;
}

.el-dialog__body {
  padding-top: 0;
}
</style>
