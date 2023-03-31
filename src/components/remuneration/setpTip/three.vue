<!-- 配置计薪规则 -->
<template>
  <div class="mainBox">
    <!-- 表头 -->
<div class="content_header" style="height:34px;background:#FAFAFA ;padding: 0 24px;">
  <span style="width:9.375rem;">工资项</span>
  <span style="width:370px;">规则</span>
  <span style="width:509px;">发薪审批时是否可见</span>
  <span style="width:509px;">员工工资条是否可见</span>
  <span>操作</span>
</div>
    <!-- 表格内容 -->
    <div class="content" style="margin:10px auto;width:96%;">
      <!-- 系统默认 -->
      <vxe-table show-overflow ref="xTable" min-height="210px" :row-config="{ isHover: true }" :data="tableData"
        @cell-dblclick="cellDBLClickEvent" :show-header="false" style="margin-top:18px;">
        <vxe-column field="name" title="工资项" width="150"></vxe-column>
        <vxe-column field="sex" title="规则" :formatter="formatterSex" width="370"></vxe-column>
        <!-- 发薪时是否可见 -->
        <vxe-column field="flag" title="发薪审批时是否可见">
          <template #default="{ row, rowIndex }">
                <vxe-switch v-model="row.flag"  active-color="#1AAC88" inactive-color=" #BFBFBF"></vxe-switch>
          </template>
        </vxe-column>
        <vxe-column field="flags" title="员工工资条是否可见" show-overflow>
          <template #default="{ row, rowIndex }">
                <vxe-switch v-model="row.flags"  active-color="#1AAC88" inactive-color=" #BFBFBF"></vxe-switch>
          </template>
        </vxe-column>
        <vxe-column title="操作" width="150" show-overflow>
          <template #default="{ row }">
            <vxe-button type="text" @click="editEvent(row)">编辑</vxe-button>
            <el-popconfirm title="这是一段内容确定删除吗？">
              <el-button type="text" slot="reference">删除</el-button>
            </el-popconfirm>
            <!-- <vxe-button type="text" @click="removeEvent(row)" :title="温馨提示">删除</vxe-button> -->
          </template>
        </vxe-column>
      </vxe-table>
      <vxe-table show-overflow ref="xTable" min-height="210px" :row-config="{ isHover: true }" :data="tableData"
        @cell-dblclick="cellDBLClickEvent" :show-header="false" style="margin-top:18px;">
        <vxe-column field="name" title="工资项" width="150"></vxe-column>
        <vxe-column field="sex" title="规则" :formatter="formatterSex" width="370"></vxe-column>
        <!-- 发薪时是否可见 -->
        <vxe-column field="flag" title="发薪审批时是否可见">
          <template #default="{ row, rowIndex }">
                <vxe-switch v-model="row.flag"  active-color="#1AAC88" inactive-color=" #BFBFBF"></vxe-switch>
          </template>
        </vxe-column>
        <vxe-column field="flags" title="员工工资条是否可见" show-overflow>
          <template #default="{ row, rowIndex }">
                <vxe-switch v-model="row.flags"  active-color="#1AAC88" inactive-color=" #BFBFBF"></vxe-switch>
          </template>
        </vxe-column>
        <vxe-column title="操作" width="150" show-overflow>
          <template #default="{ row }">
            <vxe-button type="text" @click="editEvent(row)">编辑</vxe-button>
            <el-popconfirm title="这是一段内容确定删除吗？">
              <el-button type="text" slot="reference">删除</el-button>
            </el-popconfirm>
            <!-- <vxe-button type="text" @click="removeEvent(row)" :title="温馨提示">删除</vxe-button> -->
          </template>
        </vxe-column>
      </vxe-table>
      <!-- 编辑弹出框 -->
      <vxe-modal v-model="showEdit" :title="selectRow ? '编辑&保存' : '新增&保存'" width="800" min-width="600" min-height="300"
        :loading="submitLoading" resize destroy-on-close>
        <template #default>
          <vxe-form :data="formData" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent">
            <vxe-form-item title="Basic information" title-align="left" :title-width="200" :span="24"
              :title-prefix="{ icon: 'vxe-icon-comment' }"></vxe-form-item>
            <vxe-form-item field="name" title="Name" :span="12" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.name" placeholder="请输入名称"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item field="nickname" title="Nickname" :span="12" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.name" placeholder="请输入名称"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item field="role" title="Role" :span="12" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.name" placeholder="请输入角色"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item field="sex" title="Sex" :span="12" :item-render="{}">
              <template #default="{ data }">
                <vxe-select v-model="data.sex" transfer>
                  <vxe-option v-for="item in sexList" :key="item.value" :value="item.value"
                    :label="item.label"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item field="age" title="Age" :span="12" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.age" type="number" placeholder="请输入年龄"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item field="flag1" title="是否单身" :span="12" :item-render="{}">
              <template #default="{ data }">
                <vxe-radio-group v-model="data.flag1">
                  <vxe-radio label="Y" content="是"></vxe-radio>
                  <vxe-radio label="N" content="否"></vxe-radio>
                </vxe-radio-group>
              </template>
            </vxe-form-item>
            <vxe-form-item field="checkedList" title="可选信息" :visible-method="visibleMethod" :span="24"
              :item-render="{}">
              <template #default="{ data }">
                <vxe-checkbox-group v-model="data.checkedList">
                  <vxe-checkbox label="1" content="运动、跑步"></vxe-checkbox>
                  <vxe-checkbox label="2" content="听音乐"></vxe-checkbox>
                  <vxe-checkbox label="3" content="爬山"></vxe-checkbox>
                  <vxe-checkbox label="4" content="吃美食"></vxe-checkbox>
                </vxe-checkbox-group>
              </template>
            </vxe-form-item>
            <vxe-form-item title="Other information" title-align="left" :title-width="200" :span="24"
              :title-prefix="{ message: '请填写必填项', icon: 'vxe-icon-info-circle-fill' }"></vxe-form-item>
            <vxe-form-item field="num" title="Number" :span="12" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.num" type="number" placeholder="请输入数值"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item field="date3" title="Date" :span="12" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.date3" type="date" placeholder="请选择日期" transfer></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item field="address" title="Date" :span="24" :item-render="{}"
              :title-suffix="{ message: '提示信息！！', icon: 'vxe-icon-question-circle-fill' }">
              <template #default="{ data }">
                <vxe-textarea v-model="data.address" :autosize="{ minRows: 2, maxRows: 4 }"></vxe-textarea>
              </template>
            </vxe-form-item>
            <vxe-form-item align="center" title-align="left" :span="24">
              <template #default>
                <vxe-button type="submit">提交</vxe-button>
                <vxe-button type="reset">重置</vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
        </template>
      </vxe-modal>

    </div>
  </div>




</template>

<script>
import VXETable from 'vxe-table'

export default {
  name: 'threeStep',
  data() {
    return {
      submitLoading: false,
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, value: true, address: 'Shenzhen', date12: '', date13: '',flag:true,flags:false},
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, value: false, address: 'Guangzhou', date12: '', date13: '2020-08-20',flag:true ,flags:false },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, value: true, address: 'Shanghai', date12: '2020-09-10', date13: '' ,flag:false ,flags:false},
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, value: false, address: 'Shenzhen', date12: '', date13: '2020-12-04',flag:true ,flags:false }
      ],
      selectRow: null,
      showEdit: false,
      sexList: [
        { label: '女', value: '0' },
        { label: '男', value: '1' }
      ],
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
        address: null
      },
      formRules: {
        name: [
          { required: true, message: '请输入名称' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
        ],
        nickname: [
          { required: true, message: '请输入昵称' }
        ],
        sex: [
          { required: true, message: '请选择性别' }
        ]
      },
      value: true,
      value1: true,
    }
  },
  methods: {
    formatterSex({ cellValue }) {
      let item = this.sexList.find(item => item.value === cellValue)
      return item ? item.label : ''
    },
    visibleMethod({ data }) {
      return data.flag1 === 'Y'
    },
    cellDBLClickEvent({ row }) {
      this.editEvent(row)
    },
    // 插入数据
    insertEvent() {
      this.formData = {
        name: '',
        nickname: '',
        role: '',
        sex: '',
        value: '',
        num: '',
        checkedList: [],
        flag1: '',
        date3: '',
        address: ''
      }
      this.selectRow = null
      this.showEdit = true
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
        address: row.address
      }
      this.selectRow = row
      this.showEdit = true
    },
    // 删除
    async confirm(row){
      const $table=this.$refs.xTable;
      $table.remove(row)
    },
    async removeEvent(row) {
      const $table=this.$refs.xTable;
      $table.remove(row)
      // const type = await VXETable.modal.confirm('您确定要删除该数据?')
      // const $table = this.$refs.xTable
      // if (type === 'confirm') {
      //   $table.remove(row)
      // }
    },
    submitEvent() {
      this.submitLoading = true
      setTimeout(() => {
        const $table = this.$refs.xTable
        this.submitLoading = false
        this.showEdit = false
        if (this.selectRow) {
          VXETable.modal.message({ content: '保存成功', status: 'success' })
          Object.assign(this.selectRow, this.formData)
        } else {
          VXETable.modal.message({ content: '新增成功', status: 'success' })
          $table.insert(this.formData)
        }
      }, 500)
    },
    // 合并行
    colspanMethod({ _rowIndex, _columnIndex }) {
      if (_rowIndex % 2 === 0) {
        if (_columnIndex === 2) {
          return { rowspan: 1, colspan: 2 }
        } else if (_columnIndex === 3) {
          return { rowspan: 0, colspan: 0 }
        }
      }
    }

  }
}


</script>

<style>
.vxe-header--column .vxe-resizable.is--line:before {
  width: 0px;
  height: 0%;
  background-color: #d9dddf;
}
.vxe-button:not(.is--disabled),
.el-button--text{
  height: 20px;
font-size: 14px;
font-family: PingFangSC-Regular, PingFang SC;
font-weight: 400;
color: #1AAC88;
line-height: 20px;
}
.vxe-switch.is--on .vxe-switch--button {
    padding-right: 1.7em;
    background-color: #1AAC88;
}
.content_header span{
  display: inline-block;
  height: 48px;
font-size: 12px;
font-family: PingFangSC-Medium, PingFang SC;
font-weight: 500;
color: #8C8C8C;
line-height: 48px;
text-align: left;
}
.vxe-table--render-default .vxe-cell{
  padding:0 24px;
}
</style>
