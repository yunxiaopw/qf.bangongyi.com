<template>
    <vxe-modal  :title="selectRow ? '编辑薪资项' : '新建薪资项'" width="45em" min-height="18.75em"
        :loading="submitLoading" resize destroy-on-close center   :visible.sync="editFormVisible">
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
                            <vxe-button type="reset"
                                style="width: 60px; height: 32px; background: #ffffff; border: 1px solid #d9d9d9; font-size: 14px; font-family: PingFangSC-Regular, PingFang SC; font-weight: 400; color: #262626;">取消</vxe-button>
                            <vxe-button type="submit"
                                style=" width: 60px; height: 32px; background: #1aac88; font-size: 14px; font-family: PingFangSC-Regular, PingFang SC; font-weight: 400; color: #ffffff;">保存</vxe-button>
                        </div>
                    </template>
                </vxe-form-item>
            </vxe-form>
        </template>
    </vxe-modal>
</template>
<script>
export default {
    name: 'editDialog',
    data() {
        return {
            selectRow: null,
            submitLoading: false,
            editFormVisible: false,//是否显示
            title: '',
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
            // 根据action==edit  ||action == add  来判断进行不同的界面
            action: '',

        }
    },
    methods: {
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
            this.editFormVisible = true;
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
            this.editFormVisible = true;
        },
    }
}
</script>

<style scoped lang="less"></style>