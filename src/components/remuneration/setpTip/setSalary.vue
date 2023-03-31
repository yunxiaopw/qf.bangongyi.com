<!-- 配置计薪规则 -->
<template>
  <div class="set-salary-container">
    <!-- 表头 -->
    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="insertEvent()" size="big">新建薪资项</vxe-button>
        <!-- <vxe-button @click="open()" size="big">添加工资项</vxe-button> -->
      </template>
    </vxe-toolbar>
    <div class="content_header">
      <span style="width: 10%; padding: 0 10px">工资项</span>
      <span style="width: 30%; padding: 0 17px">规则</span>
      <span style="width: 20%; padding: 0 10px">发薪审批时是否可见</span>
      <span style="width: 20%; padding: 0 10px">员工工资条是否可见</span>
      <span style="width: 10%; padding: 0 14px">操作</span>
    </div>
    <!-- 表格内容 -->
    <div class="content">
      <!-- 系统默认 -->
      <div class="headBtn"></div>
      <div class="first-table">
        <div class="row-header">
          <span>{{ tableData.title }}</span>
          <div class="edit"></div>
          <div class="delete" @click="deleteBtn(1)"></div>
        </div>
        <vxe-table show-overflow ref="xTable" min-height="210px" :row-config="{ isHover: true }" :data="tableData"
          @cell-dblclick="cellDBLClickEvent" :show-header="false" :key="tableData.id">
          <vxe-column field="title" title="工资项" width="10%" :edit-render="{ type: 'default' }">
            <template v-slot="scope">
              <div class="salary-col">
                <img class="drag-icon" src="../../../assets/svgs/dragIcon.svg" alt="" />
                <span>{{ scope.row.title }}</span>
              </div>
            </template>
          </vxe-column>
          <vxe-column field="desc" title="规则" :formatter="formatterSex" width="30%">
            <template #default="{ row, rowIndex }">
              <vxe-button type="text" @click="handleRules()">{{ row.desc }}</vxe-button>
            </template>
          </vxe-column>
          <!-- 发薪时是否可见 -->
          <vxe-column width="20%" field="approve_is_show " title="发薪审批时是否可见">
            <template #default="{ row, rowIndex }">
              <el-switch v-model="row.approve_is_show
              " active-color="#1AAC88" inactive-color="#BFBFBF">
              </el-switch>
            </template>
          </vxe-column>
          <vxe-column width="20%" field="salary_is_show" title="员工工资条是否可见" show-overflow>
            <template #default="{ row, rowIndex }">
              <el-switch v-model="row.salary_is_show" active-color="#1AAC88" inactive-color="#BFBFBF">
              </el-switch>
            </template>
          </vxe-column>
          <vxe-column title="操作" show-overflow>
            <template #default="{ row }">
              <vxe-button type="text" @click="editEvent(row)">编辑</vxe-button>
              <el-button type="text" @click="handleClick('delete', row)">删除</el-button>
              <!-- <vxe-button type="text" @click="removeEvent(row)" :title="温馨提示">删除</vxe-button> -->
            </template>
          </vxe-column>
        </vxe-table>
        <div class="add-row">
          <img src="../../../assets/svgs/addIcon.svg" alt="">
          <vxe-button type="text" @click="open()">薪资项</vxe-button>
        </div>
      </div>
      <div class="second-table" v-for="item of addNum" :key="item">
        <div class="row-header">
          <span>考勤</span>
          <div class="edit"></div>
          <div class="delete" @click="deleteBtn(2)"></div>
        </div>
        <vxe-table show-overflow ref="xTable" min-height="210px" :row-config="{ isHover: true }" :data="tableData_2"
          @cell-dblclick="cellDBLClickEvent" :show-header="false" :key="tableData.id">
          <vxe-column field="title" title="工资项" width="10%" :edit-render="{ type: 'default' }">
            <template v-slot="scope">
              <div class="salary-col">
                <img class="drag-icon" src="../../../assets/svgs/dragIcon.svg" alt="" />
                <span>{{ scope.row.title }}</span>
              </div>
            </template>
          </vxe-column>
          <vxe-column field="desc" title="规则" :formatter="formatterSex" width="30%">
            <template #default="{ row, rowIndex }">
              <vxe-button type="text" @click="handleRules()">{{
                row.desc
              }}</vxe-button>
            </template>
          </vxe-column>
          <!-- 发薪时是否可见 -->
          <vxe-column width="20%" field="approve_is_show" title="发薪审批时是否可见">
            <template #default="{ row, rowIndex }">
              <el-switch v-model="row.approve_is_show" active-color="#1AAC88" inactive-color="#BFBFBF">
              </el-switch>
            </template>
          </vxe-column>
          <vxe-column width="20%" field="salary_is_show" title="员工工资条是否可见" show-overflow>
            <template #default="{ row, rowIndex }">
              <el-switch v-model="row.salary_is_show" active-color="#1AAC88" inactive-color="#BFBFBF">
              </el-switch>
            </template>
          </vxe-column>
          <vxe-column title="操作" show-overflow>
            <template #default="{ row }">
              <vxe-button type="text" @click="editEvent(row)">编辑</vxe-button>
              <el-button type="text" @click="handleClick('delete', row)">删除</el-button>
              <!-- <vxe-button type="text" @click="removeEvent(row)" :title="温馨提示">删除</vxe-button> -->
            </template>
          </vxe-column>
        </vxe-table>
        <div class="add-row">
          <img src="../../../assets/svgs/addIcon.svg" alt="">
          <vxe-button type="text" @click="open()">薪资项</vxe-button>
        </div>
      </div>
      <addItem ref="dialog"></addItem>
      <!-- <editDialog  ref="dialogRef" /> -->
      <!-- 编辑弹出框 -->
      <vxe-modal v-model="showEdit" :title="selectRow ? '编辑薪资项' : '新建薪资项'" width="45em" min-height="18.75em"
        :loading="submitLoading" resize destroy-on-close center>
        <template #default>
          <vxe-form :data="formData" title-align="center" title-width="16em" @submit="submitEvent">
            <vxe-form-item field="nickname" title="名称" :span="24" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.name" placeholder="请输入名称" style="width: 16em"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item field="name" title="值类型" :span="24" :item-render="{}">
              <vxe-select v-model="value21" placeholder="请选择" clearable style="width: 16em">
                <vxe-option v-for="num in 5" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
              </vxe-select>
            </vxe-form-item>
            <vxe-form-item field="name" title="分类" :span="24" :item-render="{}">
              <vxe-select v-model="value21" placeholder="请选择" clearable style="width: 16em">
                <vxe-option v-for="num in 5" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
              </vxe-select>
            </vxe-form-item>
            <vxe-form-item field="name" title="属性" :span="24" :item-render="{}">
              <vxe-select v-model="value21" placeholder="请选择" clearable style="width: 16em">
                <vxe-option v-for="num in 5" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
              </vxe-select>
            </vxe-form-item>
            <vxe-form-item field="name" title="薪资档案可引用" :span="24" :item-render="{}">
              <vxe-select v-model="value21" placeholder="请选择" clearable style="width: 16em">
                <vxe-option v-for="num in 5" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
              </vxe-select>
            </vxe-form-item>
            <vxe-form-item field="name" title="列表中显示" :span="24" :item-render="{}">
              <vxe-select v-model="value21" placeholder="请选择" clearable style="width: 16em">
                <vxe-option v-for="num in 5" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
              </vxe-select>
            </vxe-form-item>
            <vxe-form-item field="name" title="发薪审批中显示" :span="24" :item-render="{}">
              <vxe-select v-model="value21" placeholder="请选择" clearable style="width: 16em">
                <vxe-option v-for="num in 5" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
              </vxe-select>
            </vxe-form-item>
            <vxe-form-item field="name" title="工资条中显示" :span="24" :item-render="{}">
              <vxe-select v-model="value21" placeholder="请选择" clearable style="width: 16em">
                <vxe-option v-for="num in 5" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
              </vxe-select>
            </vxe-form-item>
            <vxe-form-item align="center" title-align="left" :span="24" style="height: 3.25em" class="cellBtn">
              <template #default>
                <div class="cellBtn" style="">
                  <vxe-button type="reset" style="
                                          width: 60px;
                                          height: 32px;
                                          background: #ffffff;
                                          border: 1px solid #d9d9d9;
                                          font-size: 14px;
                                          font-family: PingFangSC-Regular, PingFang SC;
                                          font-weight: 400;
                                          color: #262626;
                                        ">取消</vxe-button>
                  <vxe-button type="submit" style="
                                          width: 60px;
                                          height: 32px;
                                          background: #1aac88;
                                          font-size: 14px;
                                          font-family: PingFangSC-Regular, PingFang SC;
                                          font-weight: 400;
                                          color: #ffffff;
                                        ">保存</vxe-button>
                </div>
              </template>
            </vxe-form-item>
          </vxe-form>
        </template>
      </vxe-modal>
    </div>

    <SetRuleModal ref="setRuleModalRef" />
  </div>
</template>

<script>
import { salaryConfigList } from "@/api/remuneration/intellectSalary/index";
import Vue from "vue";
import VXETable from "vxe-table";
import addItem from "@/components/remuneration/setSalary/addItem";
// import editDialog from "@/components/remuneration/editDialog";
import Sortable from "sortablejs";
import SetRuleModal from "@/components/remuneration/setpTip/setRuleModal";
import { searchItem } from "@/api/remuneration/intellectSalary/index";
import { async } from "q";
const state = Vue.observable({
  tableData: [
    {
      id: 10001,
      name: "Test1",
      nickname: "T1",
      role: "Develop",
      sex: "规则设置",
      sex2: ["0"],
      num1: 40,
      value: true,
      address: "Shenzhen",
      date12: "",
      date13: "",
      flag: true,
      flags: false,
    },
    {
      id: 10002,
      name: "Test2",
      nickname: "T2",
      role: "Designer",
      sex: "应发应扣",
      sex2: ["0", "1"],
      num1: 20,
      value: false,
      address: "Guangzhou",
      date12: "",
      date13: "2020-08-20",
      flag: true,
      flags: false,
    },
    {
      id: 10003,
      name: "Test3",
      nickname: "T3",
      role: "Test",
      sex: "从花名册中获取",
      sex2: ["1"],
      num1: 200,
      value: true,
      address: "Shanghai",
      date12: "2020-09-10",
      date13: "",
      flag: false,
      flags: false,
    },
    {
      id: 10004,
      name: "Test4",
      nickname: "T4",
      role: "Designer",
      sex: "每月手动导入",
      sex2: ["1"],
      num1: 30,
      value: false,
      address: "Shenzhen",
      date12: "",
      date13: "2020-12-04",
      flag: true,
      flags: false,
    },
  ],
});
export default {
  name: "setSalary",
  components: { addItem, SetRuleModal },
  data() {
    return {
      title:'',//
      rule_id: 2,
      submitLoading: false,
      tableData: [
        {
          id: '',
          title: '',
          type: '',
          category_id: '',//分类值
          rule_type: '',
          calc: '',
          desc: '',
          approve_is_show: '',//发薪审批是否显示
          salary_is_show: '',//工资条是否显示
          is_required: '',//是否必填项
          sort: '',
          child: []
        }

        // {
        //   id: 10001,
        //   name: "Test1",
        //   nickname: "T1",
        //   role: "Develop",
        //   sex: "规则设置",
        //   sex2: ["0"],
        //   num1: 40,
        //   value: true,
        //   address: "Shenzhen",
        //   date12: "",
        //   date13: "",
        //   flag: true,
        //   flags: false,
        // },
        // {
        //   id: 10002,
        //   name: "Test2",
        //   nickname: "T2",
        //   role: "Designer",
        //   sex: "应发应扣",
        //   sex2: ["0", "1"],
        //   num1: 20,
        //   value: false,
        //   address: "Guangzhou",
        //   date12: "",
        //   date13: "2020-08-20",
        //   flag: true,
        //   flags: false,
        // },
        // {
        //   id: 10003,
        //   name: "Test3",
        //   nickname: "T3",
        //   role: "Test",
        //   sex: "从花名册中获取",
        //   sex2: ["1"],
        //   num1: 200,
        //   value: true,
        //   address: "Shanghai",
        //   date12: "2020-09-10",
        //   date13: "",
        //   flag: false,
        //   flags: false,
        // },
        // {
        //   id: 10004,
        //   name: "Test4",
        //   nickname: "T4",
        //   role: "Designer",
        //   sex: "每月手动导入",
        //   sex2: ["1"],
        //   num1: 30,
        //   value: false,
        //   address: "Shenzhen",
        //   date12: "",
        //   date13: "2020-12-04",
        //   flag: true,
        //   flags: false,
        // },
      ],
      tableData_2:[],
      tableDataT: [
        {
          id: "1",
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: "2",
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          id: "3",
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          id: "4",
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      selectRow: null,
      showEdit: false,
      formData: {
        name: null,
        nickname: null,
        role: null,
        sex: null,
        age: null,
        num: null,
        checkedList: [],
        flag1: null,
        date3: null,
        address: null,
      },
      formRules: {
        name: [
          { required: true, message: "请输入名称" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符" },
        ],
        nickname: [{ required: true, message: "请输入昵称" }],
        sex: [{ required: true, message: "请选择性别" }],
      },
      value: true,
      value1: true,
      action: "",
      value21: "",
      addNum: 1,
      id: ''
    };
  },
  methods: {
    formatterSex({ cellValue }) {
      let item = this.sexList.find((item) => item.value === cellValue);
      return item ? item.label : "";
    },
    visibleMethod({ data }) {
      return data.flag1 === "Y";
    },
    cellDBLClickEvent({ row }) {
      this.editEvent(row);
    },
    // 根据不同的action 来操作
    // 插入数据
    insertEvent(row, action) {
      this.formData = {
        name: "",
        nickname: "",
        role: "",
        sex: "",
        value: "",
        num: "",
        checkedList: [],
        flag1: "",
        date3: "",
        address: "",
      };
      this.selectRow = null;
      this.showEdit = true;
    },
    // 编辑
    editEvent(row) {
      this.formData = {
        name: row.name,
        nickname: row.nickname,
        role: row.role,
        sex: row.sex,
        age: row.age,
        num: row.num,
        checkedList: row.checkedList,
        flag1: row.flag1,
        date3: row.date3,
        address: row.address,
      };
      this.selectRow = row;
      this.showEdit = true;
    },
    // 删除
    // editEvent(){
    //   this.$refs.dialogRef.editEvent(()=>{
    //   })
    // },
    async confirm(row) {
      const $table = this.$refs.xTable;
      $table.remove(row);
    },
    async removeEvent(row) {

      const $table = this.$refs.xTable;
      $table.remove(row);
      // const type = await VXETable.modal.confirm('您确定要删除该数据?')
      // const $table = this.$refs.xTable
      // if (type === 'confirm') {
      //   $table.remove(row)
      // }
    },
    submitEvent() {
      this.submitLoading = true;
      setTimeout(() => {
        const $table = this.$refs.xTable;
        this.submitLoading = false;
        this.showEdit = false;
        if (this.selectRow) {
          VXETable.modal.message({ content: "保存成功", status: "success" });
          Object.assign(this.selectRow, this.formData);
        } else {
          VXETable.modal.message({ content: "新增成功", status: "success" });
          $table.insert(this.formData);
        }
      }, 500);
    },
    // 合并行
    colspanMethod({ _rowIndex, _columnIndex }) {
      if (_rowIndex % 2 === 0) {
        if (_columnIndex === 2) {
          return { rowspan: 1, colspan: 2 };
        } else if (_columnIndex === 3) {
          return { rowspan: 0, colspan: 0 };
        }
      }
    },
    addItemValue() {
      this.$refs.dialog.dialogFormVisible = true;
    },
    open() {
      this.$refs.dialog.open((cancel) => {    
      });
    },
    // 规则设置
    handleRules() {
      this.$refs.setRuleModalRef.showModal();
    },
    async init() {
      // 获取薪资项列表
      await salaryConfigList({ rule_id: this.rule_id }).then((res) => {
        this.tableData = res.data[0].child
        this.tableData_2=res.data[2].child
        this.tableData.title = res.data[0].title
         }).catch((errmsg) => {
          console.log(errmsg,"失败了")
         })
      // 根据sortNo升序排列
      state.tableData.sort((a, b) => {
        return a.sortNo - b.sortNo;
      });
    },
    // 拖拽功能
    initSortTable() {
      // 获取 tbody 节点
      const el = document.querySelector(
        ".first-table .vxe-table--body-wrapper tbody"
      );
      const sortable = new Sortable(el, {
        group: 'tables',
        group: {
          pull: true, //允许拖拽到其他列表
          put: true,//允许其他列表拖拽放置在此列表
        },
        dataIdAttr: "id",
        animation: 300, // 拖拽延时，效果更好看
        onAdd: function (evt) {
          console.log(evt)

        },
        onEnd: async (evt) => {
          // state.tableData.splice(
          //   evt.newIndex,
          //   0,
          //   state.tableData.splice(evt.oldIndex, 1)[0]
          // );
          // state.tableData.forEach((item, index) => {
          //   item.sortNo = index + 1; // 重新给sortNo赋值
          // });
          // 接口(param).then((res) => {})
        },
        onAdd: async (evt) => {
          // console.log(evt)
        }
      });

      const el2 = document.querySelector(
        ".second-table .vxe-table--body-wrapper tbody"
      );
      const sortable2 = new Sortable(el2, {
        group: 'tables2',
        group: {
          pull: true,
          put: true,
        },
        dataIdAttr: "id",
        animation: 300, // 拖拽延时，效果更好看
        onEnd: async (evt) => {
          // state.tableData.splice(
          //   evt.newIndex,
          //   0,
          //   state.tableData.splice(evt.oldIndex, 1)[0]
          // );
          // state.tableData.forEach((item, index) => {
          //   item.sortNo = index + 1; // 重新给sortNo赋值
          // });

          // 接口(param).then((res) => {})
        },
        onAdd: function (evt) {
          // console.log(evt)
        }
      });

    },
    handleClick(type, data) {
      // 假设这些是系统id
      const systemId = [2, 3];//姓名账号
      switch (type) {
        case "delete":
          if (systemId.includes(data.id)) {
            this.$message.warning("此项为系统项，不可删除！");
          } else {
            this.$confirm(
              "删除薪资项有可能引起其他引用本薪资项的公式错误，请核对公式校验",
              "删除该项目吗？",
              {
                confirmButtonText: "确定",
                cancelButtonText: '取消',
                // callback: (action) => {
                //   console.log(action);
                // },
              }).then(() => {
                // this.removeEvent(row)
                this.$message({
                  type: 'success',
                  message: "删除成功！"
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: "已取消删除"
                  })
                })
              })
          }
          break;

        default:
          break;
      }
    },
    addBtn() {
      this.addNum++
    },
    deleteBtn(id) {
      if (id !== 2) {
        this.$message.warning("存在不可删除的项：姓名，账号，不可删除！")
      } else {
        this.$confirm(
          "删除将一并删除分组内的薪资项及薪资规则。",
          "确认删除【人事信息】分组吗？",
          {
            confirmButtonText: "确定",
            cancelButtonText: '取消',
            // type: warning,
            // callback: (action) => {          
            //   this.addNum--
            // },
          }).then(() => {
            this.addNum--
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      }
    },
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      this.initSortTable();
    });
  },
};
</script>

<style lang="less" scoped>
.set-salary-container {
  width: 100% !important;

  .row-header {
    padding: 14px 26px;
    border: 1px solid #F0F0F0;
    border-bottom: 0;
    display: flex;
    align-items: center;
    background: #FAFAFA;
    margin-top: 14px;
    color: #434343;

    .edit,
    .delete {
      width: 17px;
      height: 17px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      margin-left: 17px;
    }

    .edit {
      background-image: url(../../../assets/svgs/edit.svg);

      &:hover {
        background-image: url(../../../assets/svgs/edit-active.svg);
      }
    }

    .delete {
      background-image: url(../../../assets/svgs/delete.svg);

      &:hover {
        background-image: url(../../../assets/svgs/delete-active.svg);
      }
    }

    img {
      width: 17px;
      margin-left: 17px;
      cursor: pointer;
    }
  }

  .add-row {
    padding: 14px 26px;
    border: 1px solid #F0F0F0;
    border-top: 0;
    display: flex;
    align-items: center;
    color: #8C8C8C;
    cursor: pointer;

    img {
      width: 17px;
      margin-bottom: 2px;
      margin-right: 4px;
    }
  }

  .salary-col {
    display: flex;
  }

  .drag-icon {
    opacity: 0;
    cursor: pointer;
  }

  /deep/ .vxe-table--render-default .vxe-body--row.row--hover {
    .drag-icon {
      opacity: 1;
    }
  }
}

.vxe-header--column .vxe-resizable.is--line:before {
  width: 0em;
  height: 0%;
  background-color: #d9dddf;
}

.vxe-button:not(.is--disabled),
.el-button--text {
  height: 1.25em;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #1aac88;
  line-height: 20px;
}

.vxe-switch.is--on .vxe-switch--button {
  padding-right: 1.7em;
  background-color: #1aac88;
}

.content_header {
  display: flex;
  height: 36px;
  background: #fafafa;
  align-items: center;
}

.content_header span {
  display: inline-block;
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #8c8c8c;
  line-height: 48px;
  text-align: left;
}

.vxe-table--render-default .vxe-cell {
  padding: 0 24px;
}

html {
  font-size: 16px;
}

.vxe-button:not(.is--disabled) {
  height: 2.125em;
}

.vxe-form .vxe-form--item-inner>.align--center {
  text-align: right;
}

.vxe-input:not(.is--disabled).is--active .vxe-input--inner {
  border: 1px solid #1aac88;
}

.vxe-select.is--active:not(.is--filter)>.vxe-input .vxe-input--inner {
  border: 1px solid #1aac88;
}

.vxe-modal--wrapper .vxe-modal--header {
  height: 48px;
  background-color: #ffffff;
}

.add-row .vxe-button {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8C8C8C;
  padding-left: 0;
}

.add-row .vxe-button:hover {
  color: #1aac88;
}

// .c--tooltip .vxe-button--content{
//   font-size: 14px;
// font-family: PingFang-SC-Medium, PingFang-SC;
// font-weight: 500;
// color: #1F1F1F;
// }
</style>
