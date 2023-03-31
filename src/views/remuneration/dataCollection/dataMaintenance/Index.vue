<template>
    <div class="main-box">
        <HeadLine goback>
            数据维护-{{ this.title_name }}
            <template #r-content>
                <div class="t-r-btn">
                    <el-button @click="handleAction('dataLock')" v-show="showBtn">锁定本期数据</el-button>
                    <el-button @click="handleAction('unLock')" v-show="!showBtn">解锁本期数据</el-button>
                    <vxe-button @click="openExportEvent" style="margin-left:5px;">导出</vxe-button>
                    <vxe-button @click="handleAction('deleteBatch')" v-show="showBtn">批量删除</vxe-button>
                    <el-button v-show="showBtn" style="margin-left: 5px;" @click="goRouter('edit')">编辑</el-button>
                    <el-button v-show="showBtn" @click="handleAction('uploadBatch')">批量导入</el-button>
                    <el-button size="small" id="newSalary" v-show="showBtn" @click="handleAction('add')">新增</el-button>
                </div>
            </template>
        </HeadLine>
        <!-- 内容 -->
        <div class="content_main" style="margin:16px 24px;">
            <!-- 查询没有写 -->

            <vxe-form :data="formData" ref="infoForm">
                //TODO 需要薪资所属期判断
                //FIXME 需要传入参数
                <!-- 薪资所属期：调取月份选择控件，选择月份进行查询【采集表是<限填一次>类型时，没有薪资所属期查询条件] 传入薪资项暑期字段-->
                <vxe-form-item field="name" :item-render="{}">
                    <template #default="{ data }">
                        <div class="block">
                            <span class="demonstration">薪资所属期：</span>
                            <el-date-picker v-model="value2" type="month" placeholder="选择月" style="height: 32px;">
                            </el-date-picker>
                        </div>
                    </template>
                </vxe-form-item>
                <vxe-form-item field="name" :item-render="{}">
                    <template #default="{ data }">
                        <vxe-input v-model="data.name" placeholder="请选择部门/员工"></vxe-input>
                    </template>
                </vxe-form-item>
                <vxe-form-item field="name" :item-render="{}">
                    <template #default="{ data }">
                        <vxe-input v-model="data.name" placeholder="员工姓名/账号"></vxe-input>
                    </template>
                </vxe-form-item>
                <vxe-form-item>
                    <template #default>
                        <vxe-button type="submit"
                            style="width: 70px;height: 32px;background: #FFFFFF;border-radius: 2px;color: #1AAC88;">查询</vxe-button>
                        <vxe-button type="reset" style="height:32px;border-radius: 2px;color: black;">重置</vxe-button>
                    </template>
                </vxe-form-item>
            </vxe-form>

            <vxe-table show-overflow height="400" :loading="loading" :data="tableData" ref="xTable" :export-config="{}" :column-config="{useKey:true}">
                <vxe-column type="checkbox" width="70px"></vxe-column>
                <div class="tableBtn" v-for="(item, index) in getDataList" :key="index">
                        <vxe-column :title="item.name" width="135px" :field="getDataList[index].name"  ></vxe-column>
                    <!-- <vxe-column field="sex" title="账号"></vxe-column>
                    <vxe-column field="age" title="薪资所属期"></vxe-column>
                    <vxe-column field="tag" title="部门"></vxe-column>
                    <vxe-column field="address" title="奖金类型"></vxe-column>
                    <vxe-column field="amount" title="奖金金额"></vxe-column>
                    <vxe-column field="date" title="日期"></vxe-column>
                    <vxe-column field="submit" title="公式计算字段"></vxe-column>
                    <vxe-column field="id" title="说明"></vxe-column> -->
                    //FIXME 需要关联当前薪资所属期 锁定+当前所属期
                </div>
                <vxe-column title="操作" width="15%">
                    <template #default="{ row ,column}">
                        <vxe-button content="操作记录" type="text" @click="goRouter('operate')"></vxe-button>
                        <vxe-button content="删除" type="text" @click="removeEvent(row, row.sex,column)"></vxe-button>
                    </template>
                </vxe-column>
            </vxe-table>
        </div>
        <vxe-pager background :current-page.sync="page5.currentPage" :page-size.sync="page5.pageSize"
            :total="page5.totalResult"
            :layouts="['Total', 'PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump']">
        </vxe-pager>
        <addDatas ref="addDataRef"></addDatas>
        <uploadFile ref="uploadFileRef"></uploadFile>
    </div>
</template>
  
<script>
import VXETable, { ColumnConfig } from 'vxe-table'
import addDatas from '@/views/remuneration/dataCollection/dataMaintenance/components/addDatas.vue'
import uploadFile from '@/views/remuneration/dataCollection/dataMaintenance/components/uploadFile.vue'
import { getMainList } from '@/api/remuneration/dataCollection/dataMaintenance'
export default {
    components: { addDatas, uploadFile },
    data() {
        return {
            page5: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 15
            },
            value2: '',
            loading: false,
            formData: {
                name: '',
                sex: ''
            },
            tableData: [
          name=''
            ],
            getDataList: [
            ],
            showBtn: true,
            fieldList: [
                {
                    id: '',
                    value: ''
                }
            ],
            data_id:'',
          
        }
    },
    created() {
        this.data_id = this.$route.query.id
        this.title_name = this.$route.query.name
        this.init()

    },
    methods: {
        async init() {
            await getMainList({ data_id: this.data_id }).then((res) => {
                this.getDataList = res.data.title
                var listBtn=[]
                 listBtn = res.data.list.reduce((r,m)=>r.concat(m),[]) //表格数据
                listBtn.forEach((item,index)=>{
                    console.log(item,"11111111")
                })
                // function arrToObj(arr){
                //         return arr.reduce((obj,item)=>{
                //             obj[item.id]=item.value
                //             return obj
                //         })
                    
                // }
                // const obj1=arrToObj(this.tableData)
                // this.tableData.id=Object.keys(obj1)
                // this.tableData.value=Object.values(obj1)
                // this.tableData.value.forEach(item=> {
                //     this.tableData.push(item)
                //     this.tableData.name=item
                //     console.log(item)
                // });
                
            })
        },
        goRouter(id) {
            switch (id) {
                case 'operate':
                    this.$router.push('/setRecord');
                    break;
                case 'edit':
                    this.$router.push('/onlineEdit');
                    break;
            }
        },
        async removeEvent(row, value,column) {
            console.log(column)
            const type = await VXETable.modal.confirm({ title: '删除所选采集项', content: '确认删除所选的数据吗？' })
            const $table = this.$refs.xTable
            if (type === 'confirm') {
                $table.remove(row)
            }
        },

        async handleAction(action, data,column) {
            console.log(column)
            switch (action) {
                // 批量删除操作
                case "deleteBatch":
                    const $table = this.$refs.xTable
                    const selectRecords = $table.getCheckboxRecords()
                    if (selectRecords.length !== 0) {
                        const type = await VXETable.modal.confirm({ title: `确认删除所选的${selectRecords.length}条数据吗？`, content: '删除后，此操作无法撤回' })
                        const $table = this.$refs.xTable
                        if (type === 'confirm') {
                            // $table.remove(row)
                            this.$refs.xTable.removeCheckboxRow()
                        }
                    } else {
                        console.log(selectRecords.length)
                        this.$message({
                            showClose: true,
                            message: '请选中至少1条数据进行操作',
                            type: 'warning',
                            duration: 3000,
                        });
                        // VXETable.modal.alert("至少选中一条数据！")
                    }

                    break;
                // 锁定本期数据
                case 'dataLock':
                    this.$confirm('锁定后该日期范围内的数据不能再新增修改删除。', '确认锁定本期数据？', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(() => {
                        this.showBtn = !this.showBtn
                    }).catch(() => {
                        return false;

                    });
                    break;
                // 解锁本期数据
                case 'unLock':
                    this.$confirm('解锁后可以对本期数据进行修改，确认要进行修改吗。', '确认解锁本期数据？', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(() => {
                        this.showBtn = !this.showBtn
                    }).catch(() => {
                        return false;

                    });
                    break;
                case 'add':
                    this.$refs.addDataRef.handleAction('open')
                    
                    break;
                case 'uploadBatch':
                    this.$refs.uploadFileRef.handleAction('open')
                    break;
                default:
                    break;
            }
        },
        // 获取删除条数
        getRemoveEvent() {
            const $table = this.$refs.xTable
            const removeRecords = $table.getRemoveRecords()
            //   VXETable.modal.alert(removeRecords.length)
        },
        // 获取选中的数据
        getSelectionEvent() {
            const $table = this.$refs.xTable
            const selectRecords = $table.getCheckboxRecords()
            VXETable.modal.alert(selectRecords.length)
        },
        //导出
        openExportEvent() {
            this.$refs.xTable.openExport()
        }
    },
    mounted() {
        this.data_id = this.$route.query.id
        this.title_name = this.$route.query.name
    }
}
</script>
<style>
.vxe-input:not(.is--disabled).is--active .vxe-input--inner {
    border: 1px solid #1AAC88 !important;
}
</style>
<style lang="less" scoped>
.vxe-button.type--button {
    padding: 0 20px;
    border-radius: 2px;
}

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
    width: auto;
    height: 32px;
    // background: #1AAC88;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 32px;
}

.el-button {
    height: 32px;
    padding: 0 20px !important;
    border-radius: 2px;
    // line-height: 32px;
}

#newSalary {
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

/deep/.el-input__inner {
    height: 34px !important;
}

/deep/.el-input__icon {
    line-height: 34px;
}

/deep/.el-message--warning {
    width: 1200px;
    height: 40px;
    background: #FFFBE6;
    border-radius: 2px;
    border: 1px solid #FFE58F;
}

.vxe-modal--content {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #595959;
}

.vxe-modal--header {
    border-bottom: 0 !important;
    background-color: #FFFFFF;
    border-radius: 2px !important;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;

}

.vxe-modal--box {
    width: 480px;
    height: 180px;
    background: #FFFFFF;
    box-shadow: 0px 0px 16px 0px rgba(104, 126, 154, 0.12), 0px 2px 4px 0px rgba(12, 25, 52, 0.02);
    border-radius: 2px;
}

.vxe-input:not(.is--disabled).is--active .vxe-input--inner {
    border: 1px solid #1AAC88;
}

.el-date-editor.el-input {
    width: 220px !important;
}

.vxe-button+.vxe-button {
    margin-left: 5px;
}
</style>
  
  