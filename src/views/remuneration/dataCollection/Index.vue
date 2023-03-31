<template>
  <div class="main-box">
    <HeadLine>
      薪资计算
      <template #r-content>
        <div class="t-r-btn">
          <el-button size="small" @click="goRouter(id = 'newCollect')" id="newSalary">新建采集表</el-button>
        </div>
      </template>
    </HeadLine>
    <!-- 内容 -->
    <div class="content_main" style="margin:16px 24px;">
      <!-- 查询没有写 -->

      <vxe-form :data="formData" ref="infoForm">
        <vxe-form-item field="status" :item-render="{}">
          <template #default="{ data }">
            <vxe-select v-model="data.status" placeholder="全部状态" clearable>
              <vxe-option value="1" label="全部状态"></vxe-option>
              <vxe-option value="2" label="启用"></vxe-option>
              <vxe-option value="3" label="禁用"></vxe-option>
            </vxe-select>
          </template>
        </vxe-form-item>
        <vxe-form-item field="gatherList" :item-render="{}">
          <template #default="{ data }">
            <vxe-input v-model="data.gatherList" placeholder="查询采集表"></vxe-input>
          </template>
        </vxe-form-item>

        <vxe-form-item field="gatherType" :item-render="{}">
          <template #default="{ data }">
            <vxe-select v-model="data.gatherType" placeholder="所有采集类型" clearable>
              <vxe-option value="1" label="所有采集类型"></vxe-option>
              <vxe-option value="2" label="按月填写"></vxe-option>
              <vxe-option value="3" label="限填一次"></vxe-option>
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
        <vxe-column field="name" title="采集表"></vxe-column>
        <vxe-column field="type" title="采集类型"></vxe-column>
        <vxe-column field="created_at" title="最新薪资所属期"></vxe-column>
        <vxe-column field="filling_range" title="采集范围"></vxe-column>
        <vxe-column field="is_show" title="状态" width:130px>
          <template #default="{ row }">
            <vxe-button transfer type="text" >
              <template #default>启用</template>
              <template #dropdowns >
                <vxe-button content="启用" type="text"  @click="handleAction('status',row)" ></vxe-button>
                <vxe-button content="禁用" type="text"></vxe-button>
              </template>
            </vxe-button>
          </template>
        </vxe-column>

        <vxe-column title="操作" show-overflow>
          <template #default="{ row }">
            <vxe-button content="数据维护" type="text" @click="goRouter('dataMaintenance',row)"></vxe-button>
            <vxe-button content="编辑" type="text" @click="goRouter('editPage',row.id)"></vxe-button>
            <vxe-button content="删除" type="text" @click="removeEvent(row, row.is_show)"></vxe-button>
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
import { getGatherList, setGatherStatus ,delGatherList} from '@/api/remuneration/dataCollection/Index.js'
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
        status: '全部状态',
        gatherList: '',
        gatherType: '所有采集类型',
      },
      tableData: [{
        name:'',
        type:'',
        id:'',

      }],
      id:''
    }
  },
  created() {
    this.initGatherList()
   
  },
  methods: {
    async initGatherList() {
      await getGatherList().then((res) => {
        this.tableData = res.data
        // console.log(res,'res')
        // console.log(this.tableData,'this.tableData')
      })
    },
    goRouter(id,row) {
     
      switch (id) {
        case 'newCollect':
          this.$router.push('/newCollectData');
          break;
        case 'editPage':
          // console.log(row)
          this.$router.push({path:'/dataEditPage',query:{id:row}});
          break;
        case 'dataMaintenance':
          console.log(row)
          this.$router.push({path:'/dataMaintenance',query:{id:row.id,name:row.name}});
          break;
      }
    },
    // 删除
    async removeEvent(row, value) {
    if(row.is_show==1){
      const type=await VXETable.modal.alert({title:'暂时无法删除',content:'该采集表处于启用状态，不能删除'})
      const $table=this.$refs.xTable
      if(type=='confirm'){
        return false
      }
    }else{
      const type = await VXETable.modal.confirm({ title: '删除所选采集表', content: '删除后，此操作无法撤回' })
        const $table = this.$refs.xTable
        if (type === 'confirm' ) {
          this.$nextTick(()=>{
            delGatherList({id:row.id }).then((res)=>{
              if(res.errmsg!=='')
              console.log(res.errmsg)

            })
          })
          $table.remove(row)  
        }
    }
     
    },
    // 修改状态
   async confirmStatus(row) {
      // await setGatherStatus({ id:this.tableData[0].id }).then((res) => {
      //   console.log(res)
      // })
    },
  async  handleAction(action,row) {
      switch(action){
        case 'status':
          console.log(row)
        await setGatherStatus({ id:row.id}).then((res) => {
        console.log(res)
      })
      this.initGatherList()
          break;
          default:
            break;
      }
    }
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

.el-step__head.is-success {
  color: none;
}
</style>

