<template>
  <div class="main-box">
    <HeadLine>
      薪资计算
      <template #r-content>
        <div class="t-r-btn">
          <el-button size="small" @click="goRouter(id = 'newSalary')" id="newSalary">新建薪资组</el-button>
        </div>
      </template>
    </HeadLine>
    <!-- 内容 -->
    <div class="content_main" style="margin:16px 24px;">
      <!-- 查询没有写 -->
      <vxe-form :data="formData" ref="infoForm">
        <vxe-form-item field="name" :item-render="{}">
          <template #default="{ data }">
            <vxe-input v-model="data.name" placeholder="薪资组"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item field="sex" :item-render="{}">
          <template #default="{ data }">
            <vxe-select v-model="data.sex" placeholder="算薪状态" clearable>
              <vxe-option value="1" label="女"></vxe-option>
              <vxe-option value="2" label="男"></vxe-option>
            </vxe-select>
          </template>
        </vxe-form-item>
        <vxe-form-item field="status" :item-render="{}">
          <template #default="{ data }">
            <vxe-select v-model="data.sex" placeholder="审批状态" clearable>
              <vxe-option value="1" label="女"></vxe-option>
              <vxe-option value="2" label="男"></vxe-option>
            </vxe-select>
          </template>
        </vxe-form-item>
        <vxe-form-item field="submit" :item-render="{}">
          <template #default="{ data }">
            <vxe-select v-model="data.sex" placeholder="工资条提交状态" clearable>
              <vxe-option value="1" label="女"></vxe-option>
              <vxe-option value="2" label="男"></vxe-option>
            </vxe-select>
          </template>
        </vxe-form-item>

        <vxe-form-item>
          <template #default>
            <vxe-button type="submit"
              style="width: 60px;height: 32px;background: #FFFFFF;border-radius: 2px;color: #1AAC88;">查询</vxe-button>
            <vxe-button type="reset" style="height:32px;border-radius: 2px;color: black;">重置</vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>

      <vxe-table show-overflow height="400" :loading="loading" :data="tableData" ref="xTable">
        <vxe-column field="name" title="薪资组"></vxe-column>
        <vxe-column field="sex" title="适用人员"></vxe-column>
        <vxe-column field="age" title="当前计薪月"></vxe-column>
        <vxe-column field="rate" title="算薪状态" width:130px>
          <template #default="{ row }">
            <el-tag size="medium" v-if="row.tag == '未算薪'" type="info">{{ row.tag }}</el-tag>
            <el-tag size="medium" v-if="row.tag == '已算薪'" type="success">{{ row.tag }}</el-tag>
          </template>
        </vxe-column>
        <vxe-column field="status" title="审批状态" width:130px>
          <template #default="{ row }">
            <el-tag size="medium" v-if="row.status == '待提交'">{{ row.status }}</el-tag>
            <el-tag size="medium" v-if="row.status == '审批中'" type="warning">{{ row.status }}</el-tag>
            <el-tag size="medium" v-if="row.status == '已通过'" type="success">{{ row.status }}</el-tag>
            <el-tag size="medium" v-if="row.status == '已拒绝'" type="danger">{{ row.status }}</el-tag>
          </template>
        </vxe-column>
        <vxe-column field="submit" title="工作条提交状态" width:130px>
          <template #default="{ row }">
            <el-tag size="medium" v-if="row.submit == '未提交'" type="info">{{ row.submit }}</el-tag>
            <el-tag size="medium" v-if="row.submit == '已提交'" type="success">{{ row.submit }}</el-tag>
          </template>
        </vxe-column>
        <vxe-column title="操作" show-overflow width="15%"> 
          <template #default="{ row }">
            <vxe-button content="计算薪资" type="text"></vxe-button>
            <vxe-button content="已归档工资" type="text"></vxe-button>
            <vxe-button transfer type="text">
              <template #default>...</template>
              <template #dropdowns>
                <vxe-button content="编辑" type="text" @click="goRouter(id = 'editPage')"></vxe-button>
                <vxe-button content="删除" type="text" @click="removeEvent(row,row.sex)"></vxe-button>
              </template>
            </vxe-button>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
    <vxe-pager background :current-page.sync="page5.currentPage" :page-size.sync="page5.pageSize"
      :total="page5.totalResult"
      :layouts="['Total', 'PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump']">
    </vxe-pager>
  </div>
</template>

<script>
import VXETable from 'vxe-table'
export default {
  data() {
    return {
      page5: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 15
      },
      loading: false,
      formData: {
        name: '',
        sex: ''
      },
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '111', age: 28, amount: 888, address: 'test abc', tag: "未算薪", status: '待提交', submit: "未提交" },
        { id: 10003, name: 'Test3', role: 'PM', sex: '', age: 32, amount: 89, address: 'Shanghai', tag: "已算薪", status: '审批中', submit: "已提交" },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, amount: 1000, address: 'test abc', tag: "未算薪", status: '已通过', submit: "已提交" },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '', age: 30, amount: 999, address: 'Shanghai', tag: "已算薪", status: '已拒绝', submit: "未提交" },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 21, amount: 998, address: 'test abc', tag: "未算薪", status: '已通过', submit: "未提交" },
      ]
    }
  },
  created() {

  },
  methods: {
    goRouter(id) {
      switch (id) {
        case 'newSalary':
          this.$router.push('/newSalary');
          break;
        case 'editPage':
          this.$router.push('/editPage');
          break;
      }
    },
    async removeEvent (row,value) {
      if(row.sex!==""){
        const type = await VXETable.modal.alert({title:'暂时无法删除',content:'该发薪方案已关联适用人员，不能删除'})
              const $table = this.$refs.xTable
              if (type === 'confirm') {
               return 
              }
      }else{
        const type = await VXETable.modal.confirm({title:'删除所选发薪方案',content:'删除后，此操作无法撤回'})
              const $table = this.$refs.xTable
              if (type === 'confirm') {
                $table.remove(row)
              }
      }

             
            },
  }
}
</script>

<style lang="less" scoped>
.vxe-button.type--text {
  width: auto;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #1AAC88;
  line-height: 20px;
}

/* 表单 */
.vxe-grid {
  padding-left: 24px;
  padding-right: 24px;
}

.t-r-btn {
  width: 102px;
  height: 32px;
  background: #1AAC88;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 20px;
}

.el-button {
  color: #FFFFFF;
  background: #1AAC88;
  border: 0;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  height: 32px;
}

.header .title[data-v-256f77da] {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #141414;
  line-height: 20px;
}

.el-button--small {
  padding: 6px 16px;
}

.vxe-pager {
  height: 55px;
  margin-right: 24px;

}

.submitBtn {
  width: 60px;
  height: 32px;
  background: #FFFFFF;
  border-radius: 2px;
  border: 1px solid #1AAC88;
}

.vxe-button--content {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #1AAC88;
  line-height: 20px;
}

.vxe-pager--num-btn .is--active {
  width: 32px;
  height: 32px;
  background: #FFFFFF;
  border-radius: 2px;
  border: 1px solid #1AAC88;
}

html {
  font-size: 16px;
}
.el-step__head.is-success{
  color:none;
}
</style>

