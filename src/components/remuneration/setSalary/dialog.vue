<template>
    <vxe-modal v-model="showEdit" :title="selectRow ? '编辑薪资项' : '新建薪资项'" width="800" min-width="600" min-height="300"
        :loading="submitLoading" resize destroy-on-close>
        <template #default>

            <vxe-form :data="formData" :rules="formRules" title-align="right" title-width="110" @submit="submitEvent">
                <vxe-form-item field="nickname" title="名称" :span="24" :item-render="{}">
                    <template #default="{ data }">
                        <vxe-input v-model="data.name" placeholder="请输入名称" style="width: 298px;"></vxe-input>
                    </template>
                </vxe-form-item>
                <vxe-form-item field="name" title="值类型" :span="24" :item-render="{}">
                    <vxe-select v-model="value21" placeholder="请选择" clearable>
                        <vxe-option v-for="num in 5" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
                    </vxe-select>
                </vxe-form-item>
                <vxe-form-item field="name" title="分类" :span="24" :item-render="{}">
                    <vxe-select v-model="value21" placeholder="请选择" clearable>
                        <vxe-option v-for="num in 5" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
                    </vxe-select>
                </vxe-form-item>
                <vxe-form-item field="name" title="属性" :span="24" :item-render="{}">
                    <vxe-select v-model="value21" placeholder="请选择" clearable>
                        <vxe-option v-for="num in 5" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
                    </vxe-select>
                </vxe-form-item>
                <vxe-form-item field="name" title="薪资档案可引用" :span="24" :item-render="{}">
                    <vxe-select v-model="value21" placeholder="请选择" clearable>
                        <vxe-option v-for="num in 5" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
                    </vxe-select>
                </vxe-form-item>
                <vxe-form-item field="name" title="列表中显示" :span="24" :item-render="{}">
                    <vxe-select v-model="value21" placeholder="请选择" clearable>
                        <vxe-option v-for="num in 5" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
                    </vxe-select>
                </vxe-form-item>
                <vxe-form-item field="name" title="发薪审批中显示" :span="24" :item-render="{}">
                    <vxe-select v-model="value21" placeholder="请选择" clearable>
                        <vxe-option v-for="num in 5" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
                    </vxe-select>
                </vxe-form-item>
                <vxe-form-item field="name" title="工资条中显示" :span="24" :item-render="{}">
                    <vxe-select v-model="value21" placeholder="请选择" clearable>
                        <vxe-option v-for="num in 5" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
                    </vxe-select>
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
</template>
<script>
export default {
    name: 'dialog',
    data() {
        return {
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
                address: null
            },
            value21: ''
        }
    },
    methods: {
        insertEvent(row, action) {
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
    }
}
</script>