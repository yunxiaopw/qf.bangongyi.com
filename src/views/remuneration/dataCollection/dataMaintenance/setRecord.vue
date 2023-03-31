<template>
    <div class="container_main">
        <HeadLine goback>
            操作记录
        </HeadLine>
        <div class="firstContent" style="margin:16px 24px">
            <div class="title">
                <div class="line"></div>
                <div class="select_text">当前数据</div>
            </div>
            <vxe-table :loading="loading" :row-config="{ isHover: true }" :data="staff_data">
                <vxe-column field="name" title="姓名" ></vxe-column>
                <vxe-column field="id" title="账号" ></vxe-column>
                <vxe-column field="we_date" title="薪资所属期" ></vxe-column>
                <vxe-column field="we_department" title="部门" ></vxe-column>
                <vxe-column field="address" title="奖金类型" ></vxe-column>
                <vxe-column field="age" title="奖金金额" ></vxe-column>
               
            </vxe-table>

        </div>
        <div class="firstContent" style="margin:16px 24px">
            <div class="title">
                <div class="line"></div>
                <div class="select_text">操作记录</div>
            </div>
            <vxe-table :loading="loading" :row-config="{ isHover: true }" :data="tableData">
                <vxe-column field="operate_date" title="操作时间" ></vxe-column>
                <vxe-column field="operate_staff" title="操作人" ></vxe-column>
                <vxe-column field="operate_type" title="操作类型" ></vxe-column>
                <vxe-column field="operate_data" title="数据项" ></vxe-column>
                <vxe-column field="update_fre" title="修改前" ></vxe-column>
                <vxe-column field="update_yes" title="修改后" ></vxe-column>
            </vxe-table>
            <vxe-pager background :current-page.sync="page5.currentPage" :page-size.sync="page5.pageSize"
            :total="page5.totalResult"
            :layouts="['Total', 'PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump']">
        </vxe-pager>
        </div>
    </div>
</template>
<script>
export default {
    name: 'onlineEdit',
    data() {
        return {
            staff_data:[
            { id: 10009, name: '张三', we_date: 'Test', we_department: '1', age: 21, address: 'test abc' },
            ],
            tableData : [
                { id: 10001, operate_staff: 'Test1', operate_date: '2021-05-1', operate_type: '办公逸', operate_data: 28, operate_data: 'test abc' ,update_fre:'你好',update_yes:'zenme'},
                { id: 10002, operate_staff: 'Test2', operate_date: '2021-05-1', operate_type: '办公逸', operate_data: 22, operate_data: 'Guangzhou' ,update_fre:'你好',update_yes:'zenme'},
                { id: 10003, operate_staff: 'Test3', operate_date: '2021-05-1', operate_type: '0', operate_data: 32, operate_data: 'Shanghai',update_fre:'你好',update_yes:'zenme' },
                { id: 10004, operate_staff: 'Test4', operate_date: '2021-05-1', operate_type: '1', operate_data: 23, operate_data: 'test abc' ,update_fre:'你好',update_yes:'zenme'},
                { id: 10005, operate_staff: 'Test5', operate_date: '2021-05-1', operate_type: '1', operate_data: 30, operate_data: 'Shanghai' ,update_fre:'你好',update_yes:'zenme'},
                { id: 10006, operate_staff: 'Test6', operate_date: '2021-05-1', operate_type: '1', operate_data: 21, operate_data: 'test abc' ,update_fre:'你好',update_yes:'zenme'},
                { id: 10007, operate_staff: 'Test7', operate_date: '2021-05-1', operate_type: '0', operate_data: 29, operate_data: 'test abc' ,update_fre:'你好',update_yes:'zenme'},
              ],
              loading : false,
              page5: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 15
            },
        }
    }
}
</script>
<style lang="less" scoped>
.title {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    .line {
        width: 2px;
        height: 15px;
        background: #1aac88;
        border-radius: 1px 1px 0px 0px;
        margin-right: 6px;
    }
}

.select_text {
    height: 20px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #262626;
    line-height: 20px;
}
</style>