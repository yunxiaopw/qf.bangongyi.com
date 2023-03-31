<template>
    <div class="container_main">
        <HeadLine goback>
            在线编辑
        </HeadLine>
        <div class="state">
            <span>
                点击保存后，被修改的采集表数据将按规则重新计算;
                <br>
                作为唯一标识的字段不支持修改；系统自动计算的字段不支持修改。
            </span>
        </div>
        <vxe-table show-overflow height="400" :loading="loading" :data="tableData" ref="xTable">
            <vxe-column field="name" title="姓名" width="80px"></vxe-column>
            <vxe-column field="id" title="账号"></vxe-column>
            <vxe-column field="age" title="薪资所属期"></vxe-column>
            <vxe-column field="tag" title="部门"></vxe-column>
            <vxe-column field="address" title="奖金类型" show-overflow>
                <template #default="{ row }">
                    <vxe-select v-model="row.sex" transfer>
                        <vxe-option value="commission" label="提成"></vxe-option>

                        <vxe-option value="bonus" label="绩效奖金"></vxe-option>
                    </vxe-select>
                </template>
            </vxe-column>
            <vxe-column field="amount" title="奖金金额">
                <template #default="{ row }">
                    <vxe-input v-model="row.amount" placeholder="" type="float" step="1.0" clearable min="0"
                        max="99999999.9999"></vxe-input>
                </template>
            </vxe-column>
            <vxe-column field="" title="日期" width="250px">
                <template #default="{ row }">
                    <el-date-picker v-model="row.date" type="date" placeholder="选择日期">
                    </el-date-picker>
                </template>
            </vxe-column>
            <vxe-column field="submit" title="公式计算字段"></vxe-column>
            <vxe-column field="role" title="说明">
                <template #default="{ row }">
                    <el-input placeholder="请输入内容" v-model="row.role" clearable>
                    </el-input>
                </template>
            </vxe-column>
        </vxe-table>
        <div class="btnAction" style="margin: 25px auto;margin-left: 41%;">
            <el-button @click="handleAction('cancel')">取消</el-button>
            <el-button type="primary" @click="handleAction('save')">计算并保存</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'onlineEdit',
    data() {
        return {
            tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '绩效奖金', age: 28, amount: 888, address: 'test abc', tag: "未算薪", status: '待提交', submit: "未提交", date: '2022-02-01' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '提成', age: 32, amount: 89, address: 'Shanghai', tag: "已算薪", status: '审批中', submit: "已提交", date: '2022-02-01' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '绩效奖金', age: 23, amount: 1000, address: 'test abc', tag: "未算薪", status: '已通过', submit: "已提交", date: '2022-02-01' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '提成', age: 30, amount: 999, address: 'Shanghai', tag: "已算薪", status: '已拒绝', submit: "未提交", date: '2022-02-01' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '提成', age: 21, amount: 998, address: 'test abc', tag: "未算薪", status: '已通过', submit: "未提交", date: '2022-02-01' },
            ],
            loading: false,
        }
    },
    methods:{
        handleAction(action,data){
            switch(action){
                case 'cancel':
                this.$router.back()
                    break;
                    case 'save':
                        console.log('保存一下')
                        break;
            }
        }
    }
}
</script>
<style>
.is--indeterminate.vxe-export--panel-column-option .vxe-checkbox--icon{
    color: #1AAC88 !important;
}
.is--checked.vxe-export--panel-column-option .vxe-checkbox--icon{
    color: #1AAC88 !important;
}
.vxe-export--panel-column-option:not(.is--disabled):hover .vxe-checkbox--icon{
    color: #1AAC88;
}
</style>
<style lang="less"  scoped>
.state {
    margin: 16px 24px;
    height: 61px;
    background: #F5F5F5;
    border-radius: 4px;
    padding: 12px 16px;

    span {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #595959;
    }
}

.vxe-table {
    margin: 16px 24px;
}


</style>